# Mapsource operation catalog

This file is generated from the published OpenAPI contract. It contains all 61 stable operation IDs.

| Operation ID              | Category    | Method   | Path                                                    | Purpose                                                 |
| ------------------------- | ----------- | -------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `readServiceStatus`       | meta        | `GET`    | `/api/status`                                           | Read per-subsystem availability and dataset freshness   |
| `readMetrics`             | meta        | `GET`    | `/api/metrics`                                          | Read request rates, latencies and data freshness        |
| `readBasemapCatalog`      | meta        | `GET`    | `/api/tiles/catalog`                                    | Discover basemap tile sources                           |
| `readBasemapContract`     | cartography | `GET`    | `/api/basemap/contract`                                 | Read the semantic basemap layer namespace               |
| `queryOverpass`           | discovery   | `POST`   | `/api/interpreter`                                      | Execute an Overpass QL query                            |
| `queryOverpassGet`        | discovery   | `GET`    | `/api/interpreter`                                      | Execute an Overpass QL query (GET form)                 |
| `queryOverpassCompat`     | discovery   | `POST`   | `/api/{key}/interpreter`                                | Execute Overpass QL with the key in the path            |
| `queryOverpassCompatGet`  | discovery   | `GET`    | `/api/{key}/interpreter`                                | Execute Overpass QL with the key in the path (GET form) |
| `resolveEntity`           | discovery   | `GET`    | `/api/entities/resolve`                                 | Resolve a name to a geographic entity                   |
| `readEntity`              | discovery   | `GET`    | `/api/entities/{entityId}`                              | Read an entity by its id                                |
| `searchPlaces`            | discovery   | `GET`    | `/api/places/search`                                    | Resolve a place name to a coordinate                    |
| `lookupPlaces`            | discovery   | `GET`    | `/api/places/lookup`                                    | Look up addresses, businesses and places                |
| `discoverPlaces`          | discovery   | `POST`   | `/api/places/discover`                                  | Find businesses and POIs in a region                    |
| `autocompletePlaces`      | discovery   | `GET`    | `/api/places/autocomplete`                              | Prefix-match a place name                               |
| `findNearby`              | discovery   | `GET`    | `/api/places/nearby`                                    | Find features within a radius                           |
| `reverseGeocode`          | discovery   | `GET`    | `/api/places/reverse`                                   | Reverse geocode a coordinate                            |
| `readPlace`               | discovery   | `GET`    | `/api/places/{osmType}/{osmId}`                         | Read one feature by its OSM identity                    |
| `forwardGeocode`          | discovery   | `GET`    | `/api/geocode`                                          | Geocode through the compatibility provider              |
| `computeRoute`            | navigation  | `POST`   | `/api/route`                                            | Compute a turn-by-turn route                            |
| `computeMatrix`           | navigation  | `POST`   | `/api/matrix`                                           | Compute a travel-time and distance matrix               |
| `computeIsochrone`        | navigation  | `POST`   | `/api/isochrone`                                        | Compute reachable-area polygons                         |
| `matchTrace`              | navigation  | `POST`   | `/api/map-match`                                        | Fit a GPS trace to the road network                     |
| `snapPoints`              | navigation  | `POST`   | `/api/snap`                                             | Snap points to the road network                         |
| `optimizeOrder`           | navigation  | `POST`   | `/api/optimize`                                         | Solve the visit order for a set of stops                |
| `analyzeGeometry`         | compute     | `POST`   | `/api/analyze`                                          | Run a spatial analysis                                  |
| `runPipeline`             | compute     | `POST`   | `/api/compute`                                          | Run a multi-step spatial pipeline                       |
| `readResult`              | compute     | `GET`    | `/api/results/{id}`                                     | Retrieve a held result                                  |
| `readAccount`             | account     | `GET`    | `/api/account`                                          | Read account and credential details                     |
| `createProject`           | account     | `POST`   | `/api/account/projects`                                 | Create a project                                        |
| `archiveProject`          | account     | `DELETE` | `/api/account/projects/{project}`                       | Archive a project                                       |
| `listServiceAccounts`     | account     | `GET`    | `/api/account/projects/{project}/service-accounts`      | List a project's service accounts                       |
| `createServiceAccount`    | account     | `POST`   | `/api/account/projects/{project}/service-accounts`      | Create a service account                                |
| `disableServiceAccount`   | account     | `DELETE` | `/api/account/projects/{project}/service-accounts/{id}` | Disable a service account                               |
| `listProjectKeys`         | account     | `GET`    | `/api/account/projects/{project}/keys`                  | List a project's credentials                            |
| `issueProjectKey`         | account     | `POST`   | `/api/account/projects/{project}/keys`                  | Issue a scoped credential                               |
| `revokeProjectKey`        | account     | `DELETE` | `/api/account/projects/{project}/keys/{id}`             | Revoke a credential                                     |
| `setProjectBudget`        | account     | `PUT`    | `/api/account/projects/{project}/budget`                | Set a project usage budget                              |
| `readAccountUsage`        | account     | `GET`    | `/api/account/usage`                                    | Read usage attributed by project                        |
| `readAccountAudit`        | account     | `GET`    | `/api/account/audit`                                    | Read the audit trail                                    |
| `sampleElevation`         | terrain     | `GET`    | `/api/elevation`                                        | Sample ground elevation                                 |
| `getTerrainTile`          | terrain     | `GET`    | `/api/terrain/{z}/{x}/{y}.png`                          | Read a terrarium-encoded elevation tile                 |
| `generateContours`        | terrain     | `GET`    | `/api/contours`                                         | Generate banded topographic contours                    |
| `listStyles`              | cartography | `GET`    | `/api/styles`                                           | List style presets and saved profiles                   |
| `readCompiledStyle`       | cartography | `GET`    | `/api/styles/{id}/style.json`                           | Read a compiled MapLibre style                          |
| `readStyleManifest`       | cartography | `GET`    | `/api/styles/{id}/manifest.json`                        | Read the semantic manifest behind a style               |
| `compileStyle`            | cartography | `POST`   | `/api/styles/compile`                                   | Compile a style manifest                                |
| `saveStyleProfile`        | cartography | `POST`   | `/api/styles/profiles`                                  | Save a basemap profile                                  |
| `generateStyleFromIntent` | cartography | `POST`   | `/api/styles/intent`                                    | Generate a style from a text description                |
| `readStyleSchema`         | cartography | `GET`    | `/api/styles/schema.json`                               | Read the semantic style JSON Schema                     |
| `listStyleRevisions`      | cartography | `GET`    | `/api/styles/{id}/revisions`                            | List a profile's immutable revisions                    |
| `diffStyleRevisions`      | cartography | `GET`    | `/api/styles/{id}/diff`                                 | Compare two revisions at the semantic level             |
| `deleteStyleProfile`      | cartography | `DELETE` | `/api/styles/profiles/{id}`                             | Delete a saved basemap profile                          |
| `listFontstacks`          | cartography | `GET`    | `/api/glyphs`                                           | List label fontstacks                                   |
| `uploadFont`              | cartography | `POST`   | `/api/fonts`                                            | Upload a font                                           |
| `deleteFont`              | cartography | `DELETE` | `/api/fonts/{name}`                                     | Delete an uploaded font                                 |
| `renderStaticMap`         | delivery    | `POST`   | `/api/render/static`                                    | Render a static map                                     |
| `getVectorTile`           | delivery    | `GET`    | `/api/tiles/vector/{z}/{x}/{y}.pbf`                     | Read a vector tile                                      |
| `getRasterTile`           | delivery    | `GET`    | `/api/tiles/{style}/{z}/{x}/{y}.png`                    | Read a raster basemap tile                              |
| `readGlyphRange`          | delivery    | `GET`    | `/api/glyphs/{fontstack}/{range}.pbf`                   | Read an SDF glyph range                                 |
| `readUsage`               | account     | `GET`    | `/api/usage`                                            | Read usage for this key                                 |
| `paidOverpassQuery`       | discovery   | `POST`   | `/api/x402/interpreter`                                 | Execute an Overpass query with x402                     |
