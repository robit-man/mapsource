import { rm } from "node:fs/promises";
import { resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
for (const relative of ["dist", "tsconfig.tsbuildinfo"]) {
  const target = resolve(root, relative);
  if (!target.startsWith(`${root}${sep}`))
    throw new Error(`Refusing to clean outside the repository: ${target}`);
  await rm(target, { recursive: true, force: true });
}
