import { API_BASE_URL, TOKEN_STORAGE_KEY } from "./config";

export class ApiError extends Error {
  status: number;
  errors: Record<string, string[]>;

  constructor(status: number, errors: Record<string, string[]>) {
    const message = flattenErrors(errors);
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

function flattenErrors(errors: Record<string, string[]>): string {
  return Object.entries(errors)
    .map(([field, messages]) => `${field} ${messages.join(", ")}`)
    .join("; ");
}

/**
 * Some backend error responses don't strictly follow the `{ field: string[] }`
 * shape (e.g. `{ message: "User not found" }`). Normalize everything to
 * arrays of strings so downstream code can rely on a single shape.
 */
function normalizeErrors(raw: unknown): Record<string, string[]> {
  if (!raw || typeof raw !== "object") {
    return { body: ["Request failed"] };
  }

  return Object.fromEntries(
    Object.entries(raw as Record<string, unknown>).map(([field, value]) => [
      field,
      Array.isArray(value) ? value.map(String) : [String(value)],
    ]),
  );
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** Send the auth token even if one might not be set. Defaults to true. */
  authenticated?: boolean;
}

/**
 * Thin fetch wrapper implementing the RealWorld API conventions:
 * - JSON request/response bodies
 * - `Authorization: Token <jwt>` header when a token is present
 * - 422 responses are parsed into an `ApiError` with field-level messages
 */
export async function apiFetch<TResponse>(
  path: string,
  { method = "GET", body, authenticated = true }: RequestOptions = {},
): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authenticated) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const errors = data?.errors
      ? normalizeErrors(data.errors)
      : { body: [response.statusText || "Request failed"] };
    throw new ApiError(response.status, errors);
  }

  return data as TResponse;
}
