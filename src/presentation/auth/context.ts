import { createContext } from "react";
import type { User } from "@core/auth/User";
import type { LoginCredentials } from "@application/auth/ports";

export type SessionEndReason = "expired" | "logged-out";

export interface AuthContextValue {
  user: User | null;
  isAuthenticating: boolean;
  sessionEndReason: SessionEndReason | null;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
