/* Generated from contracts/openapi.json by scripts/sync-contracts.mjs. Do not edit. */
export const operationCatalog = {
  "readServiceStatus": {
    "id": "readServiceStatus",
    "category": "meta",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/status",
    "summary": "Read per-subsystem availability and dataset freshness",
    "description": "Reports each subsystem independently, the OSM dataset timestamp, minute-diff replication state and lag in seconds, and whether machine payment can settle.\n\nWhen to use: Monitor service availability, dataset freshness, and payment settlement readiness.\n\nWhen not to use: Poll at an appropriate interval; status checks are not required before every API call.",
    "access": "authenticated"
  },
  "readMetrics": {
    "id": "readMetrics",
    "category": "meta",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/metrics",
    "summary": "Read request rates, latencies and data freshness",
    "description": "Request rates, success rates, p50/p95/p99 latency, failure counters, dataset ages, and handle usage for the selected time window.\n\nWhen to use: Monitor performance and identify slow operations or stale datasets.\n\nWhen not to use: Use /api/status for current service availability.",
    "access": "authenticated"
  },
  "readBasemapCatalog": {
    "id": "readBasemapCatalog",
    "category": "meta",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/tiles/catalog",
    "summary": "Discover basemap tile sources",
    "description": "Tile templates, source and layer zoom ranges, tileset versions, snapshot dates, and attribution. nativeMaxZoom identifies the highest generated tile resolution.\n\nWhen to use: Configure tile sources and supported zoom levels before initializing a map.",
    "access": "authenticated"
  },
  "readBasemapContract": {
    "id": "readBasemapContract",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/basemap/contract",
    "summary": "Read the semantic basemap layer namespace",
    "description": "Semantic layer identifiers, supported style properties, and mappings to the tile schema.\n\nWhen to use: Look up layer identifiers and properties when creating or editing a style.\n\nWhen not to use: Use the basemap catalog to retrieve tile URLs.",
    "access": "authenticated"
  },
  "queryOverpass": {
    "id": "queryOverpass",
    "category": "discovery",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/interpreter",
    "summary": "Execute an Overpass QL query",
    "description": "Queries OpenStreetMap nodes, ways, relations, and generated areas. Supports tags, spatial filters, sets, recursion, geometry, metadata, and JSON, XML, or CSV output.\n\nWhen to use: Query arbitrary OSM tags, spatial relationships, or topology using Overpass QL.\n\nWhen not to use: Use lookupPlaces for address and business suggestions, discoverPlaces for regional POI lists, or findNearby for category-based radius searches.",
    "access": "authenticated"
  },
  "queryOverpassGet": {
    "id": "queryOverpassGet",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/interpreter",
    "summary": "Execute an Overpass QL query (GET form)",
    "description": "Queries OpenStreetMap nodes, ways, relations, and generated areas. Supports tags, spatial filters, sets, recursion, geometry, metadata, and JSON, XML, or CSV output.\n\nWhen to use: Query arbitrary OSM tags, spatial relationships, or topology using Overpass QL.\n\nWhen not to use: Use lookupPlaces for address and business suggestions, discoverPlaces for regional POI lists, or findNearby for category-based radius searches.",
    "access": "authenticated"
  },
  "queryOverpassCompat": {
    "id": "queryOverpassCompat",
    "category": "discovery",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/{key}/interpreter",
    "summary": "Execute Overpass QL with the key in the path",
    "description": "Overpass interpreter access with a credential in the URL path. Query behavior, limits, quota, and errors match /api/interpreter.\n\nWhen to use: Connect existing Overpass clients that cannot set request headers.\n\nWhen not to use: Prefer Bearer authentication. URL credentials may appear in logs, browser history, and referrer headers.",
    "access": "authenticated"
  },
  "queryOverpassCompatGet": {
    "id": "queryOverpassCompatGet",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/{key}/interpreter",
    "summary": "Execute Overpass QL with the key in the path (GET form)",
    "description": "Overpass interpreter access with a credential in the URL path. Query behavior, limits, quota, and errors match /api/interpreter.\n\nWhen to use: Connect existing Overpass clients that cannot set request headers.\n\nWhen not to use: Prefer Bearer authentication. URL credentials may appear in logs, browser history, and referrer headers.",
    "access": "authenticated"
  },
  "resolveEntity": {
    "id": "resolveEntity",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/entities/resolve",
    "summary": "Resolve a name to a geographic entity",
    "description": "Resolves a place name to an entity ID, type, display name, center, source ID, and confidence score. Similar-scoring candidates produce an ambiguous result.\n\nWhen to use: Resolve a place once and reference its entity ID in subsequent operations.\n\nWhen not to use: Use nearby search for features around a point, or readEntity for an existing entity ID.",
    "access": "authenticated"
  },
  "readEntity": {
    "id": "readEntity",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/entities/{entityId}",
    "summary": "Read an entity by its id",
    "description": "Retrieves an entity from the current dataset using the source reference encoded in its ID.\n\nWhen to use: Retrieve the name, center, and bounding box associated with an entity ID.",
    "access": "authenticated"
  },
  "searchPlaces": {
    "id": "searchPlaces",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/places/search",
    "summary": "Resolve a place name to a coordinate",
    "description": "Global place-name search over a locally built index, ranked by prominence with an optional bias point.\n\nWhen to use: Look up a populated place by name and retrieve its coordinates.\n\nWhen not to use: Use lookupPlaces for addresses, businesses, brands and mixed destination suggestions. Use discoverPlaces for businesses within a viewport, polygon or travel-time region.",
    "access": "authenticated"
  },
  "lookupPlaces": {
    "id": "lookupPlaces",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/places/lookup",
    "summary": "Look up addresses, businesses and places",
    "description": "Local OSM address/name lookup for map search and routing destination pickers. Supports business categories, partial names, accent normalization and typo matching. Coordinates bias ranking; bounded=true is required to restrict results to bbox. When the global index is unavailable, coverage identifies the regional Overpass and place-name-index fallback. Included in every subscription plan: one successful lookup counts as one request, plus an interpreter request if regional Overpass fallback is used. Search index freshness is independent of the Overpass dataset; read coverage.dataTimestamp.\n\nWhen to use: Find an address, business, brand, landmark, street or populated place. Use a location qualifier such as Starbucks in Portland to search away from the map focus.\n\nWhen not to use: Use discoverPlaces to enumerate businesses in a viewport or travel-time region. Ranking scores are not probabilities; bestMatchId is null for ambiguous matches. House numbers are never substituted.",
    "access": "authenticated"
  },
  "discoverPlaces": {
    "id": "discoverPlaces",
    "category": "discovery",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/places/discover",
    "summary": "Find businesses and POIs in a region",
    "description": "Select OSM shops, offices, amenities and visitor facilities inside a viewport, polygon or travel-time region. Uses the local Overpass database, polygon filtering and, optionally, Valhalla. No geocoder index is required. Each internal Overpass, isochrone or matrix request consumes its normal quota; the composition adds no separate request charge.\n\nWhen to use: Find coffee within a 15-minute drive, list businesses in a map viewport, or filter POIs by an existing isochrone. Paginate bounded results; narrow the area when coverage.truncated is true.\n\nWhen not to use: Use lookupPlaces for ranked address/name suggestions. Discovery uses feature centers, not full-geometry intersections. It does not guarantee a complete real-world business directory: only mapped OSM records are available. Travel-time ranking compares at most the 25 nearest candidates.",
    "access": "authenticated"
  },
  "autocompletePlaces": {
    "id": "autocompletePlaces",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/places/autocomplete",
    "summary": "Prefix-match a place name",
    "description": "Prefix search over the place-name index, matching the final word of a partial query.\n\nWhen to use: Provide place-name suggestions as a user types.\n\nWhen not to use: Use lookupPlaces for address, business and brand suggestions, including partial names. Use searchPlaces for complete populated-place names.",
    "access": "authenticated"
  },
  "findNearby": {
    "id": "findNearby",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/places/nearby",
    "summary": "Find features within a radius",
    "description": "Returns named features or category matches within a radius, sorted by distance.\n\nWhen to use: Find nearby amenities, infrastructure, or named features around a coordinate.\n\nWhen not to use: Use Overpass QL for bounding-box queries or areas beyond the supported radius.",
    "access": "authenticated"
  },
  "reverseGeocode": {
    "id": "reverseGeocode",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/places/reverse",
    "summary": "Reverse geocode a coordinate",
    "description": "Returns the nearest matching place and alternative candidates. Addressed features are preferred at comparable distances.\n\nWhen to use: Retrieve a place name or address associated with a coordinate.",
    "access": "authenticated"
  },
  "readPlace": {
    "id": "readPlace",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/places/{osmType}/{osmId}",
    "summary": "Read one feature by its OSM identity",
    "description": "Returns the tags and geometry center of an OSM node, way, or relation.\n\nWhen to use: Retrieve details for an OSM object identified by type and ID.",
    "access": "authenticated"
  },
  "forwardGeocode": {
    "id": "forwardGeocode",
    "category": "discovery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/geocode",
    "summary": "Geocode through the compatibility provider",
    "description": "Address and place lookup through the separately configured, rate-limited geocoding provider. Retained for clients using this response format; local search is available through lookupPlaces.\n\nWhen to use: Maintain an existing integration that requires the compatibility geocoder's response format.\n\nWhen not to use: Use lookupPlaces for new address, business, brand and place search integrations. This provider-backed endpoint supports interactive requests, not bulk geocoding.",
    "access": "authenticated"
  },
  "computeRoute": {
    "id": "computeRoute",
    "category": "navigation",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/route",
    "summary": "Compute a turn-by-turn route",
    "description": "A route between 2 and 10 waypoints on the global road graph, optionally with a sampled elevation profile.\n\nWhen to use: Retrieve route geometry, directions, distance, and travel time between waypoints.\n\nWhen not to use: Use a matrix for travel-time comparisons across multiple origins and destinations.",
    "access": "authenticated"
  },
  "computeMatrix": {
    "id": "computeMatrix",
    "category": "navigation",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/matrix",
    "summary": "Compute a travel-time and distance matrix",
    "description": "Returns travel times and distances for up to 625 origin-destination pairs per request.\n\nWhen to use: Compare destinations or build a travel-time matrix for analysis.\n\nWhen not to use: Use route when directions or route geometry are required.",
    "access": "authenticated"
  },
  "computeIsochrone": {
    "id": "computeIsochrone",
    "category": "navigation",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/isochrone",
    "summary": "Compute reachable-area polygons",
    "description": "Returns reachable-area polygons for up to four travel-time bands from one origin.\n\nWhen to use: Calculate service areas, catchments, or accessibility within a travel-time limit.",
    "access": "authenticated"
  },
  "matchTrace": {
    "id": "matchTrace",
    "category": "navigation",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/map-match",
    "summary": "Fit a GPS trace to the road network",
    "description": "Returns matched geometry, confidence scores, and OSM way IDs for an ordered GPS trace.\n\nWhen to use: Match recorded travel coordinates to the road network.",
    "access": "authenticated"
  },
  "snapPoints": {
    "id": "snapPoints",
    "category": "navigation",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/snap",
    "summary": "Snap points to the road network",
    "description": "Returns the nearest road-network position for each coordinate, including way ID, street name, and side of street.\n\nWhen to use: Associate coordinates with road segments before routing or analysis.",
    "access": "authenticated"
  },
  "optimizeOrder": {
    "id": "optimizeOrder",
    "category": "navigation",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/optimize",
    "summary": "Solve the visit order for a set of stops",
    "description": "Optimizes the visit order for 3 to 20 stops while keeping the first and last fixed.\n\nWhen to use: Plan stop sequences for delivery, fieldwork, or multi-stop travel.",
    "access": "authenticated"
  },
  "analyzeGeometry": {
    "id": "analyzeGeometry",
    "category": "compute",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/analyze",
    "summary": "Run a spatial analysis",
    "description": "Buffer, centroid, bbox, area, length, distance, intersect, union, difference, contains, intersects, nearest, simplify and convex hull.\n\nWhen to use: Measure or transform GeoJSON, coordinates, query results, and result handles.\n\nWhen not to use: Use a pipeline for several dependent operations in one request.",
    "access": "authenticated"
  },
  "runPipeline": {
    "id": "runPipeline",
    "category": "compute",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/compute",
    "summary": "Run a multi-step spatial pipeline",
    "description": "Executes up to 12 ordered steps with references to earlier results and returns the selected output.\n\nWhen to use: Run dependent search, navigation, and analysis without downloading intermediate results.\n\nWhen not to use: Call the relevant endpoint directly for a single operation.",
    "access": "authenticated"
  },
  "readResult": {
    "id": "readResult",
    "category": "compute",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/results/{id}",
    "summary": "Retrieve a held result",
    "description": "Retrieves a result payload or its metadata: type, version, feature count, size, bounding box, dataset versions, operation hash, and lineage.\n\nWhen to use: Download a result payload or inspect its metadata before further processing.\n\nWhen not to use: Pass the handle directly to supported operations when the client does not need the payload.",
    "access": "authenticated"
  },
  "readAccount": {
    "id": "readAccount",
    "category": "account",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/account",
    "summary": "Read account and credential details",
    "description": "Returns the organization, projects, and authenticated credential's scopes, project, and identity type.\n\nWhen to use: Inspect account membership, project attribution, and credential permissions.",
    "access": "authenticated"
  },
  "createProject": {
    "id": "createProject",
    "category": "account",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/account/projects",
    "summary": "Create a project",
    "description": "Creates a project for organizing credentials, usage, and budgets by workload or environment.\n\nWhen to use: Separate development, staging, production, or other account workloads.",
    "access": "authenticated"
  },
  "archiveProject": {
    "id": "archiveProject",
    "category": "account",
    "method": "DELETE",
    "methods": [
      "DELETE"
    ],
    "path": "/api/account/projects/{project}",
    "summary": "Archive a project",
    "description": "Archives a project while preserving its usage history.\n\nWhen to use: Deactivate a project that is no longer in use.",
    "access": "authenticated"
  },
  "listServiceAccounts": {
    "id": "listServiceAccounts",
    "category": "account",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/account/projects/{project}/service-accounts",
    "summary": "List a project's service accounts",
    "description": "Lists service-account identities associated with a project.\n\nWhen to use: Review service accounts configured for a project's automated workloads.",
    "access": "authenticated"
  },
  "createServiceAccount": {
    "id": "createServiceAccount",
    "category": "account",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/account/projects/{project}/service-accounts",
    "summary": "Create a service account",
    "description": "Creates an identity for automated workloads with independently managed credentials.\n\nWhen to use: Assign a dedicated identity to an application, integration, or agent.",
    "access": "authenticated"
  },
  "disableServiceAccount": {
    "id": "disableServiceAccount",
    "category": "account",
    "method": "DELETE",
    "methods": [
      "DELETE"
    ],
    "path": "/api/account/projects/{project}/service-accounts/{id}",
    "summary": "Disable a service account",
    "description": "Disables a service account and revokes its credentials in one transaction.\n\nWhen to use: Revoke access for a workload or compromised service account.",
    "access": "authenticated"
  },
  "listProjectKeys": {
    "id": "listProjectKeys",
    "category": "account",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/account/projects/{project}/keys",
    "summary": "List a project's credentials",
    "description": "Lists scopes, labels, identities, expiry, and revocation status. Secret key values are excluded.\n\nWhen to use: Review credentials and access permissions for a project.",
    "access": "authenticated"
  },
  "issueProjectKey": {
    "id": "issueProjectKey",
    "category": "account",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/account/projects/{project}/keys",
    "summary": "Issue a scoped credential",
    "description": "Issues a scoped API key with an optional service-account association and expiry. The secret is returned once.\n\nWhen to use: Create a credential with permissions for a specific workload.\n\nWhen not to use: Service-account credentials cannot issue additional credentials.",
    "access": "authenticated"
  },
  "revokeProjectKey": {
    "id": "revokeProjectKey",
    "category": "account",
    "method": "DELETE",
    "methods": [
      "DELETE"
    ],
    "path": "/api/account/projects/{project}/keys/{id}",
    "summary": "Revoke a credential",
    "description": "Immediately revokes a credential while retaining usage records.\n\nWhen to use: Revoke a compromised credential or remove access for a retired workload.",
    "access": "authenticated"
  },
  "setProjectBudget": {
    "id": "setProjectBudget",
    "category": "account",
    "method": "PUT",
    "methods": [
      "PUT"
    ],
    "path": "/api/account/projects/{project}/budget",
    "summary": "Set a project usage budget",
    "description": "Configures request budgets. A soft limit adds a warning header; a hard limit rejects requests with BUDGET_EXCEEDED.\n\nWhen to use: Set project usage thresholds before automated or high-volume work.",
    "access": "authenticated"
  },
  "readAccountUsage": {
    "id": "readAccountUsage",
    "category": "account",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/account/usage",
    "summary": "Read usage attributed by project",
    "description": "Returns accepted requests, response bytes, and budgets for each project in the current period.\n\nWhen to use: Monitor project-level consumption and allocate usage across workloads.",
    "access": "authenticated"
  },
  "readAccountAudit": {
    "id": "readAccountAudit",
    "category": "account",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/account/audit",
    "summary": "Read the audit trail",
    "description": "Lists organization changes to credentials, projects, service accounts, and budgets in reverse chronological order, with actor information.\n\nWhen to use: Review account changes and the identity responsible for each action.",
    "access": "authenticated"
  },
  "sampleElevation": {
    "id": "sampleElevation",
    "category": "terrain",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/elevation",
    "summary": "Sample ground elevation",
    "description": "Surface height at a coordinate, floored at sea level, with the raw model reading alongside.\n\nWhen to use: Retrieve terrain height and the raw model elevation at one coordinate.\n\nWhen not to use: Use route with elevation enabled for a profile along a route.",
    "access": "authenticated"
  },
  "getTerrainTile": {
    "id": "getTerrainTile",
    "category": "terrain",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/terrain/{z}/{x}/{y}.png",
    "summary": "Read a terrarium-encoded elevation tile",
    "description": "Returns a Terrarium-encoded Mapzen Terrain PNG for MapLibre raster-dem sources.\n\nWhen to use: Display hillshading or 3D terrain using the catalog's tile template and zoom range.\n\nWhen not to use: Use sampleElevation for a single coordinate without decoding a tile.",
    "access": "authenticated"
  },
  "generateContours": {
    "id": "generateContours",
    "category": "terrain",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/contours",
    "summary": "Generate banded topographic contours",
    "description": "Vector contour bands with elevations, index flags and along-band label paths.\n\nWhen to use: Display elevation contours or analyze terrain relief around a coordinate.",
    "access": "authenticated"
  },
  "listStyles": {
    "id": "listStyles",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/styles",
    "summary": "List style presets and saved profiles",
    "description": "Lists available presets and profiles associated with the authenticated key.\n\nWhen to use: Select a preset or retrieve saved basemap profiles.",
    "access": "authenticated"
  },
  "readCompiledStyle": {
    "id": "readCompiledStyle",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/styles/{id}/style.json",
    "summary": "Read a compiled MapLibre style",
    "description": "The compiled style document for a preset or one of your saved profiles. metadata['mapsource:ui'] contains the resolved colors and font stacks for browser attribution and result labels; install the public Map UI helper to apply them to HTML controls.\n\nWhen to use: Load a preset or saved profile into a MapLibre-compatible client.",
    "access": "authenticated"
  },
  "readStyleManifest": {
    "id": "readStyleManifest",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/styles/{id}/manifest.json",
    "summary": "Read the semantic manifest behind a style",
    "description": "Returns the semantic manifest used to compile a style.\n\nWhen to use: Retrieve an existing style's editable semantic properties.",
    "access": "authenticated"
  },
  "compileStyle": {
    "id": "compileStyle",
    "category": "cartography",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/styles/compile",
    "summary": "Compile a style manifest",
    "description": "Compiles a semantic manifest into a validated MapLibre style, returning a bundle hash and an optional diff against a base preset.\n\nWhen to use: Validate and preview style changes before saving a profile.\n\nWhen not to use: Submit a semantic manifest or preset patch; raw MapLibre JSON is not accepted.",
    "access": "authenticated"
  },
  "saveStyleProfile": {
    "id": "saveStyleProfile",
    "category": "cartography",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/styles/profiles",
    "summary": "Save a basemap profile",
    "description": "Saves a semantic manifest as a named profile associated with the authenticated key.\n\nWhen to use: Store a style for subsequent retrieval, editing, and rendering.",
    "access": "authenticated"
  },
  "generateStyleFromIntent": {
    "id": "generateStyleFromIntent",
    "category": "cartography",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/styles/intent",
    "summary": "Generate a style from a text description",
    "description": "Converts text into a semantic manifest and compiled style. Returns matched vocabulary, applied changes, the bundle hash, and validation results.\n\nWhen to use: Create an initial basemap style from a description, then review the proposed manifest.\n\nWhen not to use: Use compileStyle for an existing manifest or explicit property changes.",
    "access": "authenticated"
  },
  "readStyleSchema": {
    "id": "readStyleSchema",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/styles/schema.json",
    "summary": "Read the semantic style JSON Schema",
    "description": "Returns the JSON Schema for semantic manifests, including schema and compiler versions.\n\nWhen to use: Validate manifests locally or generate editor controls from the schema.\n\nWhen not to use: Use /api/basemap/contract for layer definitions and supported properties.",
    "access": "authenticated"
  },
  "listStyleRevisions": {
    "id": "listStyleRevisions",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/styles/{id}/revisions",
    "summary": "List a profile's immutable revisions",
    "description": "Lists saved profile revisions, newest first, with manifest hashes and revision-specific style URLs.\n\nWhen to use: Select a fixed revision for rendering or retrieve an earlier manifest.",
    "access": "authenticated"
  },
  "diffStyleRevisions": {
    "id": "diffStyleRevisions",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/styles/{id}/diff",
    "summary": "Compare two revisions at the semantic level",
    "description": "Compares profile revisions and returns changed semantic properties with previous and updated values.\n\nWhen to use: Review property changes before applying a style revision.\n\nWhen not to use: This endpoint compares semantic manifests, not compiled MapLibre documents.",
    "access": "authenticated"
  },
  "deleteStyleProfile": {
    "id": "deleteStyleProfile",
    "category": "cartography",
    "method": "DELETE",
    "methods": [
      "DELETE"
    ],
    "path": "/api/styles/profiles/{id}",
    "summary": "Delete a saved basemap profile",
    "description": "Remove a profile from this key.\n\nWhen to use: Remove an unused profile or release capacity for a new profile.",
    "access": "authenticated"
  },
  "listFontstacks": {
    "id": "listFontstacks",
    "category": "cartography",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/glyphs",
    "summary": "List label fontstacks",
    "description": "Lists hosted fontstacks and fonts uploaded with the authenticated key.\n\nWhen to use: Check available font names before configuring label typography.",
    "access": "authenticated"
  },
  "uploadFont": {
    "id": "uploadFont",
    "category": "cartography",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/fonts",
    "summary": "Upload a font",
    "description": "Convert a TTF, OTF or WOFF to SDF glyph ranges and report the Unicode blocks it covers.\n\nWhen to use: Add a custom label font and inspect its supported Unicode ranges.",
    "access": "authenticated"
  },
  "deleteFont": {
    "id": "deleteFont",
    "category": "cartography",
    "method": "DELETE",
    "methods": [
      "DELETE"
    ],
    "path": "/api/fonts/{name}",
    "summary": "Delete an uploaded font",
    "description": "Remove a font from this key.\n\nWhen to use: Remove an unused custom font and release its storage allocation.",
    "access": "authenticated"
  },
  "renderStaticMap": {
    "id": "renderStaticMap",
    "category": "delivery",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/render/static",
    "summary": "Render a static map",
    "description": "Renders a viewport and overlays as a PNG. Dark and light styles use raster tiles; other style names use vector rendering. The x-mapsource-render header includes style, dataset, result-handle, render-engine, and request metadata.\n\nWhen to use: Generate static maps for reports, previews, and geographic visualizations.\n\nWhen not to use: Use data endpoints for feature attributes or editable geometry.",
    "access": "authenticated"
  },
  "getVectorTile": {
    "id": "getVectorTile",
    "category": "delivery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/tiles/vector/{z}/{x}/{y}.pbf",
    "summary": "Read a vector tile",
    "description": "OpenMapTiles-schema Mapbox Vector Tile.\n\nWhen to use: Render or inspect vector features in a map client. Configure source zoom using nativeMaxZoom.",
    "access": "authenticated"
  },
  "getRasterTile": {
    "id": "getRasterTile",
    "category": "delivery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/tiles/{style}/{z}/{x}/{y}.png",
    "summary": "Read a raster basemap tile",
    "description": "A rendered 256-pixel CARTO basemap tile.\n\nWhen to use: Display a pre-rendered dark or light basemap without style compilation.",
    "access": "authenticated"
  },
  "readGlyphRange": {
    "id": "readGlyphRange",
    "category": "delivery",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/glyphs/{fontstack}/{range}.pbf",
    "summary": "Read an SDF glyph range",
    "description": "Returns SDF glyphs for a fontstack. For multi-face stacks, the first face containing the requested range is used.\n\nWhen to use: Supply label glyphs to a MapLibre client rendering a compiled style.",
    "access": "authenticated"
  },
  "readUsage": {
    "id": "readUsage",
    "category": "account",
    "method": "GET",
    "methods": [
      "GET"
    ],
    "path": "/api/usage",
    "summary": "Read usage for this key",
    "description": "Returns accepted-request totals, plan limits, and the quota reset time for the authenticated key.\n\nWhen to use: Monitor consumption and remaining allowance before additional requests.",
    "access": "authenticated"
  },
  "paidOverpassQuery": {
    "id": "paidOverpassQuery",
    "category": "discovery",
    "method": "POST",
    "methods": [
      "POST"
    ],
    "path": "/api/x402/interpreter",
    "summary": "Execute an Overpass query with x402",
    "description": "Executes a bounded JSON-output Overpass QL query using per-request x402 payment.\n\nWhen to use: Submit a query using an authorized compatible wallet without a subscription key.\n\nWhen not to use: Use the subscription interpreter when an API key is available. Query payments do not include tiles or elevation.",
    "access": "authenticated"
  }
} as const;

export type OperationId = keyof typeof operationCatalog;
export type MapsourceOperation = (typeof operationCatalog)[OperationId];
export type OperationCategory = MapsourceOperation["category"];
export const operationIds = Object.freeze(Object.keys(operationCatalog) as OperationId[]);
export const allOperations = Object.freeze(Object.values(operationCatalog)) as readonly MapsourceOperation[];
const grouped: Partial<Record<OperationCategory, MapsourceOperation[]>> = {};
for (const operation of allOperations) (grouped[operation.category] ??= []).push(operation);
export const operationsByCategory = Object.freeze(grouped);
