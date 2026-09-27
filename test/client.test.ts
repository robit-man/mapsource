import { describe, expect, it, vi } from "vitest";
import {
  createClient,
  getOperation,
  isOperationId,
  toMapsourceError,
} from "../src/index.js";

describe("Mapsource client", () => {
  it("attaches a bearer key without putting it in the URL", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>((input, init) => {
      const request =
        input instanceof Request ? input : new Request(input, init);
      expect(request.url).toBe("https://mapsource.io/api/status");
      expect(request.headers.get("authorization")).toBe("Bearer test_key");
      return Promise.resolve(
        new Response(JSON.stringify({ status: "operational" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      );
    });
    const response = await createClient({ apiKey: "test_key", fetch }).GET(
      "/api/status",
    );
    expect(response.data).toEqual({ status: "operational" });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("exposes every generated operation through a stable catalog", () => {
    expect(isOperationId("computeRoute")).toBe(true);
    expect(getOperation("computeRoute")).toMatchObject({
      method: "POST",
      path: "/api/route",
      category: "navigation",
    });
  });

  it("normalizes the public error envelope", () => {
    const error = toMapsourceError(429, {
      error: {
        code: "RATE_LIMITED",
        message: "Slow down",
        requestId: "req_1",
        retryable: true,
      },
    });
    expect(error).toMatchObject({
      status: 429,
      code: "RATE_LIMITED",
      requestId: "req_1",
      retryable: true,
      message: "Slow down",
    });
  });
});
