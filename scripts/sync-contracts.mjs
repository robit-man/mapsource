import { createHash } from "node:crypto";
import {
  mkdtemp,
  readFile,
  rename,
  rm,
  statfs,
  writeFile,
} from "node:fs/promises";
import { join, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const origin = (
  process.env.MAPSOURCE_CONTRACT_ORIGIN ?? "https://api.mapsource.io"
).replace(/\/$/, "");
const maximumBytes = 8 * 1024 * 1024;
const safetyFloor = 256 * 1024 * 1024;
const sources = {
  openapi: "/api/openapi.json",
  mcp: "/mcp.json",
  llms: "/llms.txt",
  llmsFull: "/llms-full.txt",
};

function assertProjectPath(path) {
  if (!path.startsWith(`${root}${sep}`))
    throw new Error(`Refusing to write outside the repository: ${path}`);
}

async function fetchBounded(path) {
  const url = `${origin}${path}`;
  const response = await fetch(url, {
    headers: {
      accept: path.endsWith(".json") ? "application/json" : "text/plain",
    },
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  const declared = Number(response.headers.get("content-length") ?? 0);
  if (declared > maximumBytes)
    throw new Error(`${url} exceeds the ${maximumBytes}-byte contract limit`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > maximumBytes)
    throw new Error(`${url} exceeds the ${maximumBytes}-byte contract limit`);
  return {
    url,
    bytes,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

function json(bytes, label) {
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error(`${label} is not valid JSON`);
  }
}

function operationInventory(openapi) {
  const methods = new Set(["get", "post", "put", "delete", "patch"]);
  const operations = new Map();
  for (const [path, item] of Object.entries(openapi.paths ?? {})) {
    for (const [method, definition] of Object.entries(item ?? {})) {
      if (!methods.has(method) || !definition?.operationId) continue;
      const current = operations.get(definition.operationId);
      if (current) {
        current.methods.push(method.toUpperCase());
        continue;
      }
      operations.set(definition.operationId, {
        id: definition.operationId,
        category: definition.tags?.[0] ?? "uncategorized",
        method: method.toUpperCase(),
        methods: [method.toUpperCase()],
        path,
        summary: definition.summary ?? "",
        description: definition.description ?? "",
        access:
          Array.isArray(definition.security) && definition.security.length === 0
            ? "public"
            : "authenticated",
      });
    }
  }
  return [...operations.values()];
}

function catalogSource(operations) {
  const catalog = Object.fromEntries(
    operations.map((operation) => [operation.id, operation]),
  );
  return (
    `/* Generated from contracts/openapi.json by scripts/sync-contracts.mjs. Do not edit. */\n` +
    `export const operationCatalog = ${JSON.stringify(catalog, null, 2)} as const;\n\n` +
    `export type OperationId = keyof typeof operationCatalog;\n` +
    `export type MapsourceOperation = (typeof operationCatalog)[OperationId];\n` +
    `export type OperationCategory = MapsourceOperation["category"];\n` +
    `export const operationIds = Object.freeze(Object.keys(operationCatalog) as OperationId[]);\n` +
    `export const allOperations = Object.freeze(Object.values(operationCatalog)) as readonly MapsourceOperation[];\n` +
    `const grouped: Partial<Record<OperationCategory, MapsourceOperation[]>> = {};\n` +
    `for (const operation of allOperations) (grouped[operation.category] ??= []).push(operation);\n` +
    `export const operationsByCategory = Object.freeze(grouped);\n`
  );
}

function operationsMarkdown(operations) {
  const rows = operations.map(
    (operation) =>
      `| \`${operation.id}\` | ${operation.category} | ${operation.methods.map((method) => `\`${method}\``).join(", ")} | \`${operation.path}\` | ${operation.summary.replaceAll("|", "\\|")} |`,
  );
  return `# Mapsource operation catalog\n\nThis file is generated from the published OpenAPI contract. It contains all ${operations.length} stable operation IDs.\n\n| Operation ID | Category | Method | Path | Purpose |\n|---|---|---|---|---|\n${rows.join("\n")}\n`;
}

let temporary;
try {
  const filesystem = await statfs(root);
  const freeBytes = filesystem.bavail * filesystem.bsize;
  const projectedBytes = maximumBytes * Object.keys(sources).length;
  if (freeBytes - projectedBytes < safetyFloor)
    throw new Error(
      `Contract sync would cross the ${safetyFloor}-byte free-space floor`,
    );

  temporary = await mkdtemp(join(root, ".mapsource-contract-sync-"));
  assertProjectPath(temporary);
  const entries = await Promise.all(
    Object.entries(sources).map(async ([name, path]) => [
      name,
      await fetchBounded(path),
    ]),
  );
  const fetched = Object.fromEntries(entries);
  const openapi = json(fetched.openapi.bytes, "OpenAPI document");
  const mcp = json(fetched.mcp.bytes, "MCP card");
  const operations = operationInventory(openapi);
  const uniqueTools = new Set(mcp.tools ?? []);
  if (operations.length !== 61)
    throw new Error(
      `Expected 61 published method operations; received ${operations.length}`,
    );
  if (Object.keys(openapi.paths ?? {}).length !== 57)
    throw new Error("Expected 57 published OpenAPI paths");
  if (uniqueTools.size !== 13 || (mcp.toolDefinitions ?? []).length !== 13)
    throw new Error("Expected 13 MCP tools and definitions");

  const files = {
    "contracts/openapi.json": `${JSON.stringify(openapi, null, 2)}\n`,
    "contracts/mcp.json": `${JSON.stringify(mcp, null, 2)}\n`,
    "contracts/llms-full.txt": new TextDecoder().decode(fetched.llmsFull.bytes),
    "llms.txt": new TextDecoder().decode(fetched.llms.bytes),
    "src/generated/catalog.ts": catalogSource(operations),
    "docs/operations.md": operationsMarkdown(operations),
    "contracts/source.json": `${JSON.stringify({ origin, sources: Object.fromEntries(Object.entries(fetched).map(([name, value]) => [name, { url: value.url, sha256: value.sha256, bytes: value.bytes.byteLength }])) }, null, 2)}\n`,
  };
  for (const [relative, content] of Object.entries(files)) {
    const staging = join(temporary, relative.replaceAll("/", "__"));
    const destination = resolve(root, relative);
    assertProjectPath(destination);
    await writeFile(staging, content, "utf8");
    await rename(staging, destination);
  }
  const generated = await readFile(resolve(root, "docs/operations.md"), "utf8");
  if ((generated.match(/^\| `[^`]+` \|/gm) ?? []).length !== 61)
    throw new Error("Generated operation documentation is incomplete");
  process.stdout.write(
    `Synchronized ${operations.length} operations and ${uniqueTools.size} MCP tools from ${origin}.\n`,
  );
} finally {
  if (temporary) await rm(temporary, { recursive: true, force: true });
}
