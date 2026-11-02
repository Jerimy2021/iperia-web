export type Role = "OPERARIO" | "SUPERVISOR" | "GERENCIA_EHS" | "BRIGADISTA";

export const ROLES: readonly Role[] = ["OPERARIO", "SUPERVISOR", "GERENCIA_EHS", "BRIGADISTA"];

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}
