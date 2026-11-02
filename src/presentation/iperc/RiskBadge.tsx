import type { RiskLevel } from "@core/iperc/RiskLevel";
import { useTranslation } from "@shared/i18n/useTranslation";

const badgeClasses: Record<RiskLevel, string> = {
  aceptable: "bg-risk-aceptable/10 text-risk-aceptable border-risk-aceptable/30",
  moderado: "bg-risk-moderado/10 text-risk-moderado border-risk-moderado/30",
  importante: "bg-risk-importante/10 text-risk-importante border-risk-importante/30",
  intolerable: "bg-risk-intolerable/10 text-risk-intolerable border-risk-intolerable/30",
};

interface RiskBadgeProps {
  nivelRiesgo: RiskLevel;
  resultado: number;
}

export function RiskBadge({ nivelRiesgo, resultado }: RiskBadgeProps) {
  const t = useTranslation();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${badgeClasses[nivelRiesgo]}`}
    >
      {t.iperc.matriz.riskLevels[nivelRiesgo]} ({resultado})
    </span>
  );
}
