import { Icon } from "./Icon";

interface SpinnerProps {
  label: string;
  /** when true, only the label is visually hidden and the spinner is centered */
  center?: boolean;
}

export function Spinner({ label, center = false }: SpinnerProps) {
  return (
    <div
      role="status"
      className={`flex items-center gap-2 text-base text-[color:var(--text-secondary)] ${
        center ? "justify-center py-10" : ""
      }`}
    >
      <Icon name="loader-circle" size={16} className="animate-spin text-blue-500" />
      <span>{label}</span>
    </div>
  );
}
