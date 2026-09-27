import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sdk = await import(pathToFileURL(resolve(root, "dist/index.js")));
if (typeof sdk.createClient !== "function")
  throw new Error("createClient export is missing");
if (sdk.operationIds.length !== 61)
  throw new Error(
    `Built catalog contains ${sdk.operationIds.length} operations`,
  );
process.stdout.write(
  "Built SDK imports successfully and exposes all 61 method operations.\n",
);
