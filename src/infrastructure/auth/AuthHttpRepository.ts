import type { AuthRepository, LoginCredentials } from "@application/auth/ports";
import type { Session } from "@core/auth/Session";
import { apiRequest } from "@infrastructure/http/apiClient";

/**
 * DTOs de la respuesta cruda del backend. Reemplazar por los tipos de
 * `src/infrastructure/http/generated/api-types.ts` en cuanto `npm run
 * api:gen` corra contra el swagger real; mientras tanto este es el
 * contrato asumido (ver postman/IperIA-Auth.postman_collection.json
 * del backend).
 */
interface LoginResponseDto {
  user: { id: string; name: string; email: string; role: string };
  accessToken: string;
  expiresInSeconds: number;
}

export class AuthHttpRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<Session> {
    const dto = await apiRequest<LoginResponseDto>("/auth/login", {
      method: "POST",
      body: credentials,
    });

    return {
      user: dto.user as Session["user"],
      accessToken: dto.accessToken,
      expiresAt: Date.now() + dto.expiresInSeconds * 1000,
    };
  }

  async logout(): Promise<void> {
    await apiRequest<void>("/auth/logout", { method: "POST" });
  }
}
