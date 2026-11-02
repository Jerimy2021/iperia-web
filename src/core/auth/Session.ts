import type { User } from "./User";

export interface Session {
  user: User;
  accessToken: string;
  /** Epoch millis en que accessToken deja de ser válido. */
  expiresAt: number;
}

export function isSessionExpired(session: Session, now: number = Date.now()): boolean {
  return now >= session.expiresAt;
}
