import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "empty" | "error" | "offline";

interface EmptyStateProps {
  title: string;
  description?: string;
  /** lucide glyph id; falls back to the variant default */
  icon?: string;
  variant?: Variant;
  action?: ReactNode;
}

const variants: Record<Variant, { icon: string; color: string; wash: string }> = {
  empty: { icon: "inbox", color: "var(--gray-500)", wash: "var(--surface-200)" },
  error: { icon: "wifi-off", color: "var(--red-500)", wash: "var(--red-050)" },
  offline: { icon: "cloud-off", color: "var(--amber-500)", wash: "var(--amber-050)" },
};

export function EmptyState({ title, description, icon, variant = "empty", action }: EmptyStateProps) {
  const v = variants[variant];
  const washStyle: CSSProperties = { background: v.wash, color: v.color };
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <span
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full"
        style={washStyle}
      >
        <Icon name={icon ?? v.icon} size={26} />
      </span>
      <div className="max-w-sm">
        <h3>{title}</h3>
        {description && (
          <p className="mt-1 text-base text-[color:var(--text-secondary)]">{description}</p>
        )}
      </div>
      {action && <div className="mt-1 flex gap-2">{action}</div>}
    </div>
  );
}
