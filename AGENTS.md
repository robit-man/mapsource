# Mapsource TypeScript SDK

`contracts/openapi.json` is a synchronized projection of the canonical registry in
`../overpass-service/packages/contracts/src/registry.ts`. Do not hand-edit the
OpenAPI snapshot, MCP card, `llms.txt`, generated operation catalog, or generated
TypeScript declarations. Run `npm run sync:contracts` after the platform contract
has been deployed, then review the resulting provenance hashes and operation diff.

Before a push, run `npm run typecheck` for focused compiler diagnostics and
`npm run validate` for the complete lint, format, test, build, smoke, and package
surface gate. Publishing must use `npm run publish:verified -- --token-stdin` or
trusted publishing. Never put an npm token in source, `.npmrc`, shell history,
logs, package metadata, or a durable artifact.

The public package must continue to account for all 59 canonical capabilities and
both additional GET calling conventions (61 OpenAPI method operation IDs total).
Tests and the package checker intentionally fail when the operation count, generated
catalog, documentation table, package exports, or packed file allow-list drift.
