import rawTokens from "./design-tokens.json";

/**
 * Fuente única de verdad para colores/tipografía/espaciado.
 * tailwind.config.cjs lee el mismo design-tokens.json, así que un cambio
 * aquí se refleja en Tailwind y en el código que use estas constantes
 * directamente (ej. estilos inline, canvas, charts) sin tocar nada más.
 */
export const tokens = rawTokens;

export type RiskLevel = keyof typeof rawTokens.colors.risk;

export const RISK_LEVELS: readonly RiskLevel[] = [
  "aceptable",
  "moderado",
  "importante",
  "intolerable",
] as const;

export function riskColor(level: RiskLevel): string {
  return rawTokens.colors.risk[level];
}

export function isRiskLevel(value: string): value is RiskLevel {
  return (RISK_LEVELS as readonly string[]).includes(value);
}
