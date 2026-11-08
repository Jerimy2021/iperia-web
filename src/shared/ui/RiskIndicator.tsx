import type { CSSProperties } from "react";
import type { RiskLevel } from "@core/iperc/RiskLevel";

interface RiskIndicatorProps {
  nivel: RiskLevel;
  /** already-translated level label (texts live in i18n, not here) */
  label: string;
  resultado?: number;
  className?: string;
}

/**
 * Risk level pill colored from the DS `--nivel-*` tokens. Note the DS spells the
 * top band "intolerante" while the domain keeps "intolerable" — only the color
 * is mapped; the R = P × S value shown is whatever the backend returned.
 */
const nivelVar: Record<RiskLevel, string> = {
  aceptable: "aceptable",
  moderado: "moderado",
  importante: "importante",
  intolerable: "intolerante",
};

export function RiskIndicator({ nivel, label, resultado, className = "" }: RiskIndicatorProps) {
  const key = nivelVar[nivel];
  const style: CSSProperties = {
    background: `var(--nivel-${key}-bg)`,
    color: `var(--nivel-${key}-text)`,
    borderColor: `var(--nivel-${key})`,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-base font-semibold ${className}`}
      style={style}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: `var(--nivel-${key})` }}
        aria-hidden
      />
      {label}
      {resultado != null && <span className="font-bold">({resultado})</span>}
    </span>
  );
}
