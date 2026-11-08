import { icons, type LucideProps } from "lucide-react";

/**
 * Thin wrapper over lucide-react that accepts the same kebab-case glyph ids the
 * Design System uses ("shield-check", "circle-alert", "chevron-down"). Icons
 * inherit `color` through `currentColor`, so callers style them with text color.
 */
export interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
  size?: number;
}

function toPascalCase(name: string): string {
  return name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function Icon({ name, size = 18, strokeWidth = 2, ...rest }: IconProps) {
  const LucideIcon = icons[toPascalCase(name) as keyof typeof icons];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} strokeWidth={strokeWidth} aria-hidden {...rest} />;
}
