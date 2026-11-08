import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Padding = "none" | "sm" | "md" | "lg";
type Tone = "default" | "sunken";

interface CardProps {
  title?: string;
  subtitle?: string;
  /** lucide glyph id shown in the header */
  icon?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  padding?: Padding;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}

const paddings: Record<Padding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

const tones: Record<Tone, string> = {
  default: "bg-[color:var(--surface-card)] border-[color:var(--border-subtle)] shadow-sm",
  sunken: "bg-[color:var(--surface-sunken)] border-transparent",
};

export function Card({
  title,
  subtitle,
  icon,
  actions,
  footer,
  padding = "md",
  tone = "default",
  className = "",
  children,
}: CardProps) {
  const hasHeader = Boolean(title || actions);
  return (
    <section
      className={`flex min-w-0 flex-col rounded-lg border ${tones[tone]} ${className}`}
    >
      {hasHeader && (
        <header className="flex items-center gap-2.5 border-b border-[color:var(--border-subtle)] px-4 py-3">
          {icon && <Icon name={icon} size={16} className="text-blue-500" />}
          <div className="min-w-0 flex-1">
            {title && <h3 className="truncate">{title}</h3>}
            {subtitle && (
              <p className="mt-0.5 text-base text-[color:var(--text-secondary)]">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-1.5">{actions}</div>}
        </header>
      )}
      <div className={`min-w-0 flex-1 ${paddings[padding]}`}>{children}</div>
      {footer && (
        <footer className="flex items-center gap-2 rounded-b-lg border-t border-[color:var(--border-subtle)] bg-surface px-4 py-2.5">
          {footer}
        </footer>
      )}
    </section>
  );
}
