/**
 * Single source of truth for backend route paths (auth + IPERC).
 *
 * Both the HTTP repositories and the MSW handlers import from here, so when
 * the backend publishes its OpenAPI/swagger the routes only change in one
 * place. Paths are relative to `VITE_API_URL` (the repositories prefix the
 * base URL; the handlers do the same when registering the mock).
 *
 * `ipercRoutes.item(id)` builds the per-item path. Pass a concrete id in the
 * repositories (e.g. `item("m-1")`) or an MSW path param in the handlers
 * (e.g. `item(":id")`), so the item route is defined in a single place too.
 */
export const authRoutes = {
  login: "/auth/login",
  logout: "/auth/logout",
} as const;

export const ipercRoutes = {
  matriz: "/iperc/matriz",
  calcular: "/iperc/matriz/calcular",
  item: (id: string) => `/iperc/matriz/${id}`,
} as const;
