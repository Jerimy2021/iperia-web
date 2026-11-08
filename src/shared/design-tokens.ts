import type { RiskLevel } from "@core/iperc/RiskLevel";

/**
 * Risk-level color helpers. The design tokens themselves live as CSS variables
 * in `src/shared/tokens/*.css` (mirrored by tailwind.config.cjs); this module
 * just maps the core `RiskLevel` to its DS color token for places that need a
 * raw color string (inline styles, canvas, charts).
 *
 * Note the DS spells the band "intolerante"; core keeps "intolerable". We only
 * map the color — the R = P × S thresholds are owned by the backend and never
 * reproduced here.
 */
const riskVar: Record<RiskLevel, string> = {
  aceptable: "var(--nivel-aceptable)",
  moderado: "var(--nivel-moderado)",
  importante: "var(--nivel-importante)",
  intolerable: "var(--nivel-intolerante)",
};

export const RISK_LEVELS: readonly RiskLevel[] = [
  "aceptable",
  "moderado",
  "importante",
  "intolerable",
] as const;

export function riskColor(level: RiskLevel): string {
  return riskVar[level];
}

export function isRiskLevel(value: string): value is RiskLevel {
  return (RISK_LEVELS as readonly string[]).includes(value);
}
