import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const openapi = JSON.parse(
  await readFile(resolve(root, "contracts/openapi.json"), "utf8"),
);
const mcp = JSON.parse(
  await readFile(resolve(root, "contracts/mcp.json"), "utf8"),
);
const catalog = await readFile(
  resolve(root, "src/generated/catalog.ts"),
  "utf8",
);
const docs = await readFile(resolve(root, "docs/operations.md"), "utf8");
const cli = await readFile(resolve(root, "dist/cli.js"), "utf8");

const ids = new Set();
for (const item of Object.values(openapi.paths))
  for (const definition of Object.values(item)) {
    if (
      definition &&
      typeof definition === "object" &&
      "operationId" in definition
    )
      ids.add(definition.operationId);
  }
if (pkg.name !== "mapsource" || pkg.private)
  throw new Error("Package identity is not publishable as mapsource");
if (
  pkg.bin?.mapsource !== "dist/cli.js" ||
  !cli.startsWith("#!/usr/bin/env node\n")
)
  throw new Error(
    "The mapsource CLI must use a normalized bin path and retain its shebang",
  );
if (ids.size !== 62)
  throw new Error(
    `OpenAPI contains ${ids.size} method operations, expected 62`,
  );
if (
  (mcp.tools ?? []).length !== 13 ||
  (mcp.toolDefinitions ?? []).length !== 13
)
  throw new Error("MCP contract is incomplete");
for (const id of ids) {
  if (!catalog.includes(`"${id}"`))
    throw new Error(`Generated catalog omits ${id}`);
  if (!docs.includes(`\`${id}\``))
    throw new Error(`Operation documentation omits ${id}`);
}

const manifestText = JSON.stringify({
  dependencies: pkg.dependencies,
  devDependencies: pkg.devDependencies,
  optionalDependencies: pkg.optionalDependencies,
  peerDependencies: pkg.peerDependencies,
});
if (
  /(?:git\+|git:\/\/|github:|file:|link:|https?:\/\/[^"]+\.(?:tgz|tar\.gz))/.test(
    manifestText,
  )
)
  throw new Error("Exotic dependency source found in package.json");
for (const forbidden of ["preinstall", "install", "postinstall", "prepare"])
  if (pkg.scripts?.[forbidden])
    throw new Error(`Forbidden install lifecycle script: ${forbidden}`);

const packed = spawnSync(
  "npm",
  ["pack", "--dry-run", "--json", "--ignore-scripts"],
  { cwd: root, encoding: "utf8" },
);
if (packed.status !== 0)
  throw new Error(packed.stderr || "npm pack --dry-run failed");
const [result] = JSON.parse(packed.stdout);
if (!result || result.unpackedSize > 4 * 1024 * 1024 || result.entryCount > 100)
  throw new Error(
    "Packed artifact exceeds the 4 MiB / 100-file release bounds",
  );
const allowed =
  /^(?:package\/(?:dist\/|contracts\/|docs\/|README\.md$|SECURITY\.md$|LICENSE$|llms\.txt$|package\.json$))/u;
for (const file of result.files)
  if (!allowed.test(`package/${file.path}`))
    throw new Error(`Unexpected packed file: ${file.path}`);
process.stdout.write(
  `Package contract complete: ${ids.size} operations, ${mcp.tools.length} MCP tools, ${result.entryCount} files, ${result.unpackedSize} bytes.\n`,
);
