#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { allOperations, createClient, operationCatalog } from "./index.js";

const command = process.argv[2] ?? "help";

function usage(): never {
  process.stdout.write(
    `Mapsource CLI\n\nUsage:\n  mapsource status\n  mapsource catalog [--json]\n  mapsource operation <operationId>\n  mapsource openapi\n  mapsource llms\n\nAuthentication: set MAPSOURCE_API_KEY for subscription operations.\n`,
  );
  process.exit(0);
}

async function asset(relativePath: string): Promise<string> {
  return readFile(
    fileURLToPath(new URL(relativePath, import.meta.url)),
    "utf8",
  );
}

async function main() {
  if (command === "help" || command === "--help" || command === "-h") usage();
  if (command === "status") {
    const response = await createClient().GET("/api/status");
    if (response.error) throw new Error(JSON.stringify(response.error));
    process.stdout.write(`${JSON.stringify(response.data, null, 2)}\n`);
    return;
  }
  if (command === "catalog") {
    if (process.argv.includes("--json"))
      process.stdout.write(`${JSON.stringify(operationCatalog, null, 2)}\n`);
    else {
      const categories = [
        ...new Set(allOperations.map((operation) => operation.category)),
      ];
      for (const category of categories) {
        process.stdout.write(`\n${category}\n`);
        for (const operation of allOperations.filter(
          (item) => item.category === category,
        ))
          process.stdout.write(
            `  ${operation.id.padEnd(28)} ${operation.method.padEnd(6)} ${operation.path}\n`,
          );
      }
    }
    return;
  }
  if (command === "operation") {
    const id = process.argv[3];
    if (!id || !(id in operationCatalog))
      throw new Error(
        "Provide a valid operation id. Run `mapsource catalog` to list them.",
      );
    process.stdout.write(
      `${JSON.stringify(operationCatalog[id as keyof typeof operationCatalog], null, 2)}\n`,
    );
    return;
  }
  if (command === "openapi") {
    process.stdout.write(await asset("../contracts/openapi.json"));
    return;
  }
  if (command === "llms") {
    process.stdout.write(await asset("../llms.txt"));
    return;
  }
  throw new Error(`Unknown command: ${command}`);
}

main().catch((error: unknown) => {
  process.stderr.write(
    `mapsource: ${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
});
