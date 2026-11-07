import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Session } from "@core/auth/Session";
import type { LoginCredentials } from "@application/auth/ports";
import { loginUseCase, logoutUseCase } from "@application/auth/useCases";
import { AuthHttpRepository } from "@infrastructure/auth/AuthHttpRepository";
import { tokenStorage } from "@infrastructure/auth/TokenStorage";
import { setUnauthorizedHandler } from "@infrastructure/http/apiClient";
import { AuthContext, type AuthContextValue, type SessionEndReason } from "./context";

const authRepository = new AuthHttpRepository();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => tokenStorage.get());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [sessionEndReason, setSessionEndReason] = useState<SessionEndReason | null>(null);
  const expiryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearExpiryTimer = useCallback(() => {
    if (expiryTimer.current) {
      clearTimeout(expiryTimer.current);
      expiryTimer.current = null;
    }
  }, []);

  const forceEndSession = useCallback(
    (reason: SessionEndReason) => {
      clearExpiryTimer();
      tokenStorage.clear();
      setSessionEndReason(reason);
    },
    [clearExpiryTimer],
  );

  useEffect(() => {
    return tokenStorage.subscribe(setSession);
  }, []);

  useEffect(() => {
    clearExpiryTimer();
    if (!session) {
      return;
    }
    const msUntilExpiry = session.expiresAt - Date.now();
    if (msUntilExpiry <= 0) {
      forceEndSession("expired");
      return;
    }
    expiryTimer.current = setTimeout(() => forceEndSession("expired"), msUntilExpiry);
    return clearExpiryTimer;
  }, [session, clearExpiryTimer, forceEndSession]);

  useEffect(() => {
    setUnauthorizedHandler(() => forceEndSession("expired"));
  }, [forceEndSession]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsAuthenticating(true);
    try {
      const newSession = await loginUseCase(authRepository, credentials);
      tokenStorage.set(newSession);
      setSessionEndReason(null);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUseCase(authRepository);
    } finally {
      forceEndSession("logged-out");
    }
  }, [forceEndSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isAuthenticating,
      sessionEndReason,
      login,
      logout,
    }),
    [session, isAuthenticating, sessionEndReason, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
