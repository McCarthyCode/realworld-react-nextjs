import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError, apiFetch, getToken, setToken } from "@/lib/http";

function jsonResponse(body: unknown, init: { status?: number } = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

describe("token storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("stores and retrieves a token", () => {
    expect(getToken()).toBeNull();
    setToken("abc.def.ghi");
    expect(getToken()).toBe("abc.def.ghi");
  });

  it("removes the token when set to null", () => {
    setToken("abc.def.ghi");
    setToken(null);
    expect(getToken()).toBeNull();
  });
});

describe("apiFetch", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends an Authorization header when a token is present", async () => {
    setToken("my-token");
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ ok: true }));

    await apiFetch("/user");

    const [, options] = vi.mocked(fetch).mock.calls[0];
    expect((options?.headers as Record<string, string>).Authorization).toBe("Token my-token");
  });

  it("omits the Authorization header when unauthenticated is requested", async () => {
    setToken("my-token");
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ ok: true }));

    await apiFetch("/tags", { authenticated: false });

    const [, options] = vi.mocked(fetch).mock.calls[0];
    expect((options?.headers as Record<string, string>).Authorization).toBeUndefined();
  });

  it("throws an ApiError with normalized field errors on failure", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({ errors: { body: ["can't be empty"] } }, { status: 422 }),
    );

    await expect(apiFetch("/articles")).rejects.toMatchObject({
      status: 422,
      errors: { body: ["can't be empty"] },
    });
  });

  it("normalizes non-array error values into string arrays", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({ errors: { message: "User not found" } }, { status: 401 }),
    );

    let caught: unknown;
    try {
      await apiFetch("/users/login");
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).errors).toEqual({ message: ["User not found"] });
  });

  it("returns undefined for empty 204 responses", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 204 }));

    await expect(apiFetch("/articles/some-slug")).resolves.toBeUndefined();
  });
});
