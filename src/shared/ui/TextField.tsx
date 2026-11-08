import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

/**
 * Uncontrolled input (spreads `...rest`, so react-hook-form's `register` works),
 * styled per the DS form controls. The DS Input wraps icon + input in one span;
 * here we keep a single native input to stay register-compatible.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, hint, id, className = "", ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="mb-1.5 text-base font-medium text-[color:var(--text-primary)]">
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`h-[var(--control-height)] w-full rounded-md border bg-white px-2.5 text-base text-[color:var(--text-body)] transition-colors placeholder:text-[color:var(--text-placeholder)] disabled:bg-surface-200 ${
          error
            ? "border-red-500 focus-visible:border-red-500"
            : "border-[color:var(--border-subtle)] focus-visible:border-[color:var(--border-focus)]"
        } ${className}`}
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 flex items-center gap-1 text-base text-red-600">
          <Icon name="circle-alert" size={13} />
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-base text-[color:var(--text-secondary)]">{hint}</p>
      )}
    </div>
  );
});
