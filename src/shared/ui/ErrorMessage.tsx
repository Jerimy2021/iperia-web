import { Button } from "./Button";
import { Icon } from "./Icon";

interface ErrorMessageProps {
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, retryLabel, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-md border border-[color:var(--risk-critical-border)] bg-[color:var(--risk-critical-bg)] p-4 text-base text-[color:var(--risk-critical-text)]"
    >
      <p className="flex items-start gap-2">
        <Icon name="circle-alert" size={16} className="mt-0.5 shrink-0" />
        <span>{message}</span>
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" icon="refresh-cw" onClick={onRetry}>
          {retryLabel ?? "Reintentar"}
        </Button>
      )}
    </div>
  );
}
