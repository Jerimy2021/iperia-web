import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { Icon } from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<SelectOption | string>;
  error?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, error, placeholder, id, className = "", ...rest },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col">
      <label htmlFor={selectId} className="mb-1.5 text-base font-medium text-[color:var(--text-primary)]">
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          id={selectId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`h-[var(--control-height)] w-full appearance-none rounded-md border bg-white pl-2.5 pr-8 text-base text-[color:var(--text-body)] transition-colors disabled:bg-surface-200 ${
            error
              ? "border-red-500"
              : "border-[color:var(--border-subtle)] focus-visible:border-[color:var(--border-focus)]"
          } ${className}`}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            return (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <Icon
          name="chevron-down"
          size={15}
          className="pointer-events-none absolute right-2.5 text-[color:var(--text-secondary)]"
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-base text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});
