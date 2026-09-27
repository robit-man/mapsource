# mapsource

Official typed TypeScript client for the complete [Mapsource](https://mapsource.io) REST API: OpenStreetMap/Overpass queries, local place search, routing, matrices, isochrones, map matching, optimization, elevation, contours, raster and vector tiles, semantic basemap styles, spatial analysis, pipelines, rendering, account administration, usage, and service health.

```bash
npm install mapsource
```

## Quick start

```ts
import { createClient } from "mapsource";

const mapsource = createClient({ apiKey: process.env.MAPSOURCE_API_KEY });
const { data, error, response } = await mapsource.POST("/api/route", {
  body: {
    locations: [
      { lat: 47.6062, lon: -122.3321 },
      { lat: 47.6205, lon: -122.3493 },
    ],
    costing: "bicycle",
    elevation: true,
  },
});

if (error)
  throw new Error(`Mapsource ${response.status}: ${JSON.stringify(error)}`);
console.log(data);
```

The path, query, body, and response are inferred from the published OpenAPI contract. `createClient()` also reads `MAPSOURCE_API_KEY` automatically in Node.js. Browser applications should call Mapsource through their own backend so a subscription key is not exposed in shipped JavaScript.

## Every offering, one generated contract

The package contains the complete synchronized machine surface:

- 59 canonical capabilities plus the two documented GET calling conventions—61 typed OpenAPI method operation IDs across discovery, navigation, terrain, cartography, compute, delivery, account, and service metadata.
- `mapsource/openapi.json` and generated `paths`, `operations`, and `components` TypeScript types.
- `mapsource/mcp.json`, `mapsource/llms.txt`, and `mapsource/llms-full.txt` for agent discovery.
- `mapsource/catalog` and `mapsource catalog` for a compact runtime/CLI inventory.
- [Full generated operation table](docs/operations.md), authentication notes, limits, determinism, quota weight, and error schemas from the same platform registry.

```ts
import { operationCatalog, operationsByCategory } from "mapsource/catalog";

console.log(operationCatalog.computeIsochrone.path); // /api/isochrone
console.log(operationsByCategory.navigation);
```

## CLI

```bash
npx mapsource status
npx mapsource catalog
npx mapsource catalog --json
npx mapsource operation discoverPlaces
npx mapsource openapi > openapi.json
npx mapsource llms
```

## Authentication and errors

Use one project-scoped key per environment. The client places it only in the Bearer authorization header. It never appends credentials to a URL, persists them, or logs them.

```ts
import { toMapsourceError } from "mapsource";

const result = await mapsource.GET("/api/elevation", {
  params: { query: { lat: 45.3735, lon: -121.6959 } },
});
if (result.error) throw toMapsourceError(result.response.status, result.error);
```

Check `retryable` and the stable error `code`; do not infer retry behavior from the HTTP status alone. See the [Mapsource errors guide](https://mapsource.io/docs/errors) and [limits](https://mapsource.io/docs/limits).

## Contract provenance

`npm run sync:contracts` reads the deployed projections generated from Mapsource’s canonical capability registry. It validates the expected operation and MCP tool inventory, records SHA-256 source hashes in `contracts/source.json`, and regenerates the catalog and documentation. Generated contract files are never hand-maintained.

## Release verification

```bash
npm ci --ignore-scripts
npm run validate
```

Maintainers can bootstrap a release without placing a token in a file or command line:

```bash
printf '%s' "$NPM_TOKEN" | npm run publish:verified -- --token-stdin
```

A positional token is supported for automation compatibility, but stdin or GitHub trusted publishing is safer. See [SECURITY.md](SECURITY.md).

## Related

- [`mapsource-mcp`](https://www.npmjs.com/package/mapsource-mcp) — a local stdio adapter for the hosted Mapsource MCP server.
- [API documentation](https://mapsource.io/docs)
- [OpenAPI reference](https://mapsource.io/docs/reference)
- [Runnable examples](https://github.com/robit-man/mapsource-examples)

MIT © Mapsource
