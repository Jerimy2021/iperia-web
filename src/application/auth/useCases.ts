import type { Session } from "@core/auth/Session";
import type { AuthRepository, LoginCredentials } from "./ports";

export async function loginUseCase(
  repository: AuthRepository,
  credentials: LoginCredentials,
): Promise<Session> {
  return repository.login(credentials);
}

export async function logoutUseCase(repository: AuthRepository): Promise<void> {
  return repository.logout();
}
