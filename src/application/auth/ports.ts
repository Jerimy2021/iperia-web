import type { Session } from "@core/auth/Session";

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Puerto de salida (out port): lo implementa infrastructure (HTTP real o,
 * en modo mocks, el mismo cliente HTTP apuntando a los handlers de MSW).
 * application nunca sabe cuál de las dos implementaciones está activa.
 */
export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<Session>;
  logout(): Promise<void>;
}
