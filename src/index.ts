import createOpenApiClient, {
  type Client,
  type Middleware,
} from "openapi-fetch";
import { operationCatalog, type OperationId } from "./generated/catalog.js";
import type { paths } from "./generated/openapi.js";

export type {
  components,
  operations,
  paths,
  webhooks,
} from "./generated/openapi.js";
export * from "./catalog.js";

export const DEFAULT_BASE_URL = "https://api.mapsource.io";

export interface MapsourceClientOptions {
  /** Mapsource subscription key. Defaults to MAPSOURCE_API_KEY in Node.js. */
  apiKey?: string;
  /** Override only for an explicitly trusted Mapsource-compatible deployment. */
  baseUrl?: string;
  fetch?: (request: Request) => Promise<Response>;
  headers?: HeadersInit;
}

export type MapsourceApiClient = Client<paths>;

export class MapsourceError extends Error {
  readonly status: number;
  readonly requestId: string | undefined;
  readonly code: string | undefined;
  readonly retryable: boolean | undefined;
  readonly details: unknown;

  constructor(
    message: string,
    options: {
      status: number;
      requestId?: string;
      code?: string;
      retryable?: boolean;
      details?: unknown;
    },
  ) {
    super(message);
    this.name = "MapsourceError";
    this.status = options.status;
    this.requestId = options.requestId;
    this.code = options.code;
    this.retryable = options.retryable;
    this.details = options.details;
  }
}

function environmentKey(): string | undefined {
  return typeof process === "undefined"
    ? undefined
    : process.env.MAPSOURCE_API_KEY;
}

function authMiddleware(apiKey: string | undefined): Middleware {
  return {
    onRequest({ request }) {
      if (apiKey && !request.headers.has("authorization"))
        request.headers.set("authorization", `Bearer ${apiKey}`);
      return request;
    },
  };
}

/**
 * Create a path- and schema-typed client for every endpoint in the published
 * Mapsource OpenAPI contract. No credential is stored outside this instance.
 */
export function createClient(
  options: MapsourceClientOptions = {},
): MapsourceApiClient {
  const client = createOpenApiClient<paths>({
    baseUrl: (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, ""),
    ...(options.fetch ? { fetch: options.fetch } : {}),
    ...(options.headers ? { headers: options.headers } : {}),
  });
  client.use(authMiddleware(options.apiKey ?? environmentKey()));
  return client;
}

/** Resolve stable operation metadata without keeping a second API inventory. */
export function getOperation(id: OperationId) {
  return operationCatalog[id];
}

export function isOperationId(value: string): value is OperationId {
  return Object.prototype.hasOwnProperty.call(operationCatalog, value);
}

/** Convert a non-2xx error payload from openapi-fetch into a stable Error. */
export function toMapsourceError(
  status: number,
  payload: unknown,
): MapsourceError {
  const envelope =
    payload && typeof payload === "object" && "error" in payload
      ? (payload as { error?: Record<string, unknown> }).error
      : undefined;
  const message =
    typeof envelope?.message === "string"
      ? envelope.message
      : `Mapsource request failed with HTTP ${status}`;
  return new MapsourceError(message, {
    status,
    ...(typeof envelope?.requestId === "string"
      ? { requestId: envelope.requestId }
      : {}),
    ...(typeof envelope?.code === "string" ? { code: envelope.code } : {}),
    ...(typeof envelope?.retryable === "boolean"
      ? { retryable: envelope.retryable }
      : {}),
    ...(envelope?.details === undefined ? {} : { details: envelope.details }),
  });
}
