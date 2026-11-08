import type { ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  /** lucide glyph id rendered before the label */
  icon?: string;
  block?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border " +
  "font-semibold transition-colors disabled:cursor-not-allowed " +
  "disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-600";

const sizes: Record<Size, string> = {
  sm: "h-[var(--control-height-sm)] px-2.5 text-sm",
  md: "h-[var(--control-height)] px-3.5 text-base",
  lg: "h-[var(--control-height-lg)] px-5 text-md",
};

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
  secondary:
    "border-gray-400 bg-white text-[color:var(--text-primary)] hover:bg-surface active:bg-surface-200",
  ghost:
    "border-transparent bg-transparent text-[color:var(--text-secondary)] hover:bg-surface-200 active:bg-gray-300",
  danger: "border-transparent bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  success: "border-transparent bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
};

const iconSize: Record<Size, number> = { sm: 14, md: 16, lg: 18 };

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  block = false,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${block ? "w-full" : ""} ${className}`}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? (
        <Icon name="loader-circle" size={iconSize[size]} className="animate-spin" />
      ) : (
        icon && <Icon name={icon} size={iconSize[size]} />
      )}
      {children}
    </button>
  );
}
