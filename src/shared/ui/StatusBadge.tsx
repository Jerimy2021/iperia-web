import type { CSSProperties } from "react";

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

/** Small pill with a status dot, colored from the DS semantic risk/info tokens. */
const tones: Record<StatusTone, { bg: string; fg: string; bd: string; dot: string }> = {
  success: {
    bg: "var(--risk-low-bg)",
    fg: "var(--risk-low-text)",
    bd: "var(--risk-low-border)",
    dot: "var(--green-500)",
  },
  warning: {
    bg: "var(--risk-moderate-bg)",
    fg: "var(--risk-moderate-text)",
    bd: "var(--risk-moderate-border)",
    dot: "var(--amber-500)",
  },
  danger: {
    bg: "var(--risk-critical-bg)",
    fg: "var(--risk-critical-text)",
    bd: "var(--risk-critical-border)",
    dot: "var(--red-500)",
  },
  info: {
    bg: "var(--info-bg)",
    fg: "var(--info-text)",
    bd: "var(--info-border)",
    dot: "var(--blue-500)",
  },
  neutral: {
    bg: "var(--risk-none-bg)",
    fg: "var(--risk-none-text)",
    bd: "var(--risk-none-border)",
    dot: "var(--gray-500)",
  },
};

export function StatusBadge({ label, tone = "neutral", className = "" }: StatusBadgeProps) {
  const t = tones[tone];
  const style: CSSProperties = {
    background: t.bg,
    color: t.fg,
    borderColor: t.bd,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-semibold ${className}`}
      style={style}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: t.dot }}
        aria-hidden
      />
      {label}
    </span>
  );
}
