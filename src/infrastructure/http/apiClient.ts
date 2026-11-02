import { tokenStorage } from "@infrastructure/auth/TokenStorage";
import { ApiError } from "./ApiError";

type UnauthorizedHandler = () => void;

let onUnauthorized: UnauthorizedHandler | null = null;

/** La composition root (AuthProvider) se registra para reaccionar a un 401. */
export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
  onUnauthorized = handler;
}

const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const session = tokenStorage.get();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (session) {
    headers.Authorization = `Bearer ${session.accessToken}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401) {
    onUnauthorized?.();
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => undefined);

  if (!response.ok) {
    throw ApiError.fromResponseBody(response.status, payload);
  }

  return payload as T;
}
