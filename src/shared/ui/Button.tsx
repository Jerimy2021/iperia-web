import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
}

const base =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
  "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600",
  secondary:
    "bg-neutral-0 text-neutral-800 border border-neutral-200 hover:bg-neutral-50 focus-visible:outline-neutral-400",
};

export function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {children}
    </button>
  );
}
