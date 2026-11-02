import { http, HttpResponse } from "msw";
import { mockUsers } from "../data";

const apiUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const authHandlers = [
  http.post(`${apiUrl}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };
    const match = mockUsers.find(
      (user) => user.email === body.email && user.password === body.password,
    );

    if (!match) {
      return HttpResponse.json(
        { error: { code: "INVALID_CREDENTIALS", message: "Correo o contraseña incorrectos" } },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      user: { id: match.id, name: match.name, email: match.email, role: match.role },
      accessToken: `mock-token-${match.id}`,
      expiresInSeconds: 60 * 30,
    });
  }),

  http.post(`${apiUrl}/auth/logout`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
