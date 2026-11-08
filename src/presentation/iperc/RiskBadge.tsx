import type { CSSProperties } from "react";
import type { RiskLevel } from "@core/iperc/RiskLevel";
import { useTranslation } from "@shared/i18n/useTranslation";

/**
 * Risk-level pill for the matriz, colored from the DS `--nivel-*` tokens. The
 * DS spells the top band "intolerante"; the domain keeps "intolerable" — only
 * the color is mapped. `resultado` is whatever R = P × S the backend returned.
 */
const nivelKey: Record<RiskLevel, string> = {
  aceptable: "aceptable",
  moderado: "moderado",
  importante: "importante",
  intolerable: "intolerante",
};

interface RiskBadgeProps {
  nivelRiesgo: RiskLevel;
  resultado: number;
}

export function RiskBadge({ nivelRiesgo, resultado }: RiskBadgeProps) {
  const t = useTranslation();
  const key = nivelKey[nivelRiesgo];
  const style: CSSProperties = {
    background: `var(--nivel-${key}-bg)`,
    color: `var(--nivel-${key}-text)`,
    borderColor: `var(--nivel-${key})`,
  };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-base font-semibold"
      style={style}
    >
      <span
        className="h-2 w-2 flex-none rounded-full"
        style={{ background: `var(--nivel-${key})` }}
        aria-hidden
      />
      {t.iperc.matriz.riskLevels[nivelRiesgo]} ({resultado})
    </span>
  );
}
