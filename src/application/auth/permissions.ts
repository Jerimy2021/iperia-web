import type { Role } from "@core/auth/Role";

/**
 * Política de acceso a pantallas por rol para este panel (iperia-web).
 * Alcance del Sprint 1: solo existe la matriz IPERC, y es de
 * supervisión/gerencia. OPERARIO y BRIGADISTA sí existen como roles de
 * la plataforma, pero sus pantallas (captura de evidencia, etc.) viven
 * en iperia-mobile, no aquí — por eso no tienen pantallas asignadas en
 * este panel todavía.
 */
const MATRIZ_IPERC_ROLES: readonly Role[] = ["SUPERVISOR", "GERENCIA_EHS"];

export function canAccessMatrizIperc(role: Role): boolean {
  return MATRIZ_IPERC_ROLES.includes(role);
}
