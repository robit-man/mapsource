# Mapsource operation catalog

This file is generated from the published OpenAPI contract. It contains all 62 stable operation IDs.

| Operation ID              | Category    | Method   | Path                                                | Purpose                                                 |
| ------------------------- | ----------- | -------- | --------------------------------------------------- | ------------------------------------------------------- |
| `readServiceStatus`       | meta        | `GET`    | `/status`                                           | Read per-subsystem availability and dataset freshness   |
| `readMetrics`             | meta        | `GET`    | `/metrics`                                          | Read request rates, latencies and data freshness        |
| `readBasemapCatalog`      | meta        | `GET`    | `/tiles/catalog`                                    | Discover basemap tile sources                           |
| `readBasemapContract`     | cartography | `GET`    | `/basemap/contract`                                 | Read the semantic basemap layer namespace               |
| `queryOverpass`           | discovery   | `POST`   | `/interpreter`                                      | Execute an Overpass QL query                            |
| `queryOverpassGet`        | discovery   | `GET`    | `/interpreter`                                      | Execute an Overpass QL query (GET form)                 |
| `queryOverpassCompat`     | discovery   | `POST`   | `/{key}/interpreter`                                | Execute Overpass QL with the key in the path            |
| `queryOverpassCompatGet`  | discovery   | `GET`    | `/{key}/interpreter`                                | Execute Overpass QL with the key in the path (GET form) |
| `resolveEntity`           | discovery   | `GET`    | `/entities/resolve`                                 | Resolve a name to a geographic entity                   |
| `readEntity`              | discovery   | `GET`    | `/entities/{entityId}`                              | Read an entity by its id                                |
| `searchPlaces`            | discovery   | `GET`    | `/places/search`                                    | Resolve a place name to a coordinate                    |
| `lookupPlaces`            | discovery   | `GET`    | `/places/lookup`                                    | Look up addresses, businesses and places                |
| `discoverPlaces`          | discovery   | `POST`   | `/places/discover`                                  | Find businesses and POIs in a region                    |
| `autocompletePlaces`      | discovery   | `GET`    | `/places/autocomplete`                              | Prefix-match a place name                               |
| `findNearby`              | discovery   | `GET`    | `/places/nearby`                                    | Find features within a radius                           |
| `reverseGeocode`          | discovery   | `GET`    | `/places/reverse`                                   | Reverse geocode a coordinate                            |
| `readPlace`               | discovery   | `GET`    | `/places/{osmType}/{osmId}`                         | Read one feature by its OSM identity                    |
| `forwardGeocode`          | discovery   | `GET`    | `/geocode`                                          | Geocode through the compatibility provider              |
| `computeRoute`            | navigation  | `POST`   | `/route`                                            | Compute a turn-by-turn route                            |
| `computeMatrix`           | navigation  | `POST`   | `/matrix`                                           | Compute a travel-time and distance matrix               |
| `computeIsochrone`        | navigation  | `POST`   | `/isochrone`                                        | Compute reachable-area polygons                         |
| `matchTrace`              | navigation  | `POST`   | `/map-match`                                        | Fit a GPS trace to the road network                     |
| `snapPoints`              | navigation  | `POST`   | `/snap`                                             | Snap points to the road network                         |
| `optimizeOrder`           | navigation  | `POST`   | `/optimize`                                         | Solve the visit order for a set of stops                |
| `analyzeGeometry`         | compute     | `POST`   | `/analyze`                                          | Run a spatial analysis                                  |
| `runPipeline`             | compute     | `POST`   | `/compute`                                          | Run a multi-step spatial pipeline                       |
| `readResult`              | compute     | `GET`    | `/results/{id}`                                     | Retrieve a held result                                  |
| `readAccount`             | account     | `GET`    | `/account`                                          | Read account and credential details                     |
| `createProject`           | account     | `POST`   | `/account/projects`                                 | Create a project                                        |
| `archiveProject`          | account     | `DELETE` | `/account/projects/{project}`                       | Archive a project                                       |
| `listServiceAccounts`     | account     | `GET`    | `/account/projects/{project}/service-accounts`      | List a project's service accounts                       |
| `createServiceAccount`    | account     | `POST`   | `/account/projects/{project}/service-accounts`      | Create a service account                                |
| `disableServiceAccount`   | account     | `DELETE` | `/account/projects/{project}/service-accounts/{id}` | Disable a service account                               |
| `listProjectKeys`         | account     | `GET`    | `/account/projects/{project}/keys`                  | List a project's credentials                            |
| `issueProjectKey`         | account     | `POST`   | `/account/projects/{project}/keys`                  | Issue a scoped credential                               |
| `revokeProjectKey`        | account     | `DELETE` | `/account/projects/{project}/keys/{id}`             | Revoke a credential                                     |
| `setProjectBudget`        | account     | `PUT`    | `/account/projects/{project}/budget`                | Set a project usage budget                              |
| `readAccountUsage`        | account     | `GET`    | `/account/usage`                                    | Read usage attributed by project                        |
| `readAccountAudit`        | account     | `GET`    | `/account/audit`                                    | Read the audit trail                                    |
| `sampleElevation`         | terrain     | `GET`    | `/elevation`                                        | Sample ground elevation                                 |
| `getTerrainTile`          | terrain     | `GET`    | `/terrain/{z}/{x}/{y}.png`                          | Read a terrarium-encoded elevation tile                 |
| `generateContours`        | terrain     | `GET`    | `/contours`                                         | Generate banded topographic contours                    |
| `listStyles`              | cartography | `GET`    | `/styles`                                           | List style presets and saved profiles                   |
| `readCompiledStyle`       | cartography | `GET`    | `/styles/{id}/style.json`                           | Read a compiled MapLibre style                          |
| `readStyleManifest`       | cartography | `GET`    | `/styles/{id}/manifest.json`                        | Read the semantic manifest behind a style               |
| `compileStyle`            | cartography | `POST`   | `/styles/compile`                                   | Compile a style manifest                                |
| `saveStyleProfile`        | cartography | `POST`   | `/styles/profiles`                                  | Save a basemap profile                                  |
| `generateStyleFromIntent` | cartography | `POST`   | `/styles/intent`                                    | Generate a style from a text description                |
| `readStyleSchema`         | cartography | `GET`    | `/styles/schema.json`                               | Read the semantic style JSON Schema                     |
| `listStyleRevisions`      | cartography | `GET`    | `/styles/{id}/revisions`                            | List a profile's immutable revisions                    |
| `diffStyleRevisions`      | cartography | `GET`    | `/styles/{id}/diff`                                 | Compare two revisions at the semantic level             |
| `deleteStyleProfile`      | cartography | `DELETE` | `/styles/profiles/{id}`                             | Delete a saved basemap profile                          |
| `listFontstacks`          | cartography | `GET`    | `/glyphs`                                           | List label fontstacks                                   |
| `uploadFont`              | cartography | `POST`   | `/fonts`                                            | Upload a font                                           |
| `deleteFont`              | cartography | `DELETE` | `/fonts/{name}`                                     | Delete an uploaded font                                 |
| `renderStaticMap`         | delivery    | `POST`   | `/render/static`                                    | Render a static map                                     |
| `getVectorTile`           | delivery    | `GET`    | `/tiles/vector/{z}/{x}/{y}.pbf`                     | Read a vector tile                                      |
| `getRasterTile`           | delivery    | `GET`    | `/tiles/{style}/{z}/{x}/{y}.png`                    | Read a raster basemap tile                              |
| `renderStyleTile`         | delivery    | `GET`    | `/tiles/styles/{style}/{z}/{x}/{y}.png`             | Render a custom style as a raster tile                  |
| `readGlyphRange`          | delivery    | `GET`    | `/glyphs/{fontstack}/{range}.pbf`                   | Read an SDF glyph range                                 |
| `readUsage`               | account     | `GET`    | `/usage`                                            | Read usage for this key                                 |
| `paidOverpassQuery`       | discovery   | `POST`   | `/x402/interpreter`                                 | Execute an Overpass query with x402                     |
