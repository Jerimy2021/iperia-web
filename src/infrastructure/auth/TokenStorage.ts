import type { Session } from "@core/auth/Session";

type Listener = (session: Session | null) => void;

/**
 * Guarda la sesión solo en memoria (módulo singleton), nunca en
 * localStorage/sessionStorage: evita exponer el JWT a XSS vía storage
 * y fuerza a que un refresh de página vuelva a pedir login, lo cual es
 * aceptable para este sprint (ver README, sección "Sesión y token").
 */
let currentSession: Session | null = null;
const listeners = new Set<Listener>();

export const tokenStorage = {
  get(): Session | null {
    return currentSession;
  },
  set(session: Session): void {
    currentSession = session;
    listeners.forEach((listener) => listener(currentSession));
  },
  clear(): void {
    currentSession = null;
    listeners.forEach((listener) => listener(null));
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
