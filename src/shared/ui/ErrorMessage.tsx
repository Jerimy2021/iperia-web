import { Button } from "./Button";

interface ErrorMessageProps {
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, retryLabel, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-md border border-risk-intolerable/30 bg-risk-intolerable/10 p-4 text-sm text-risk-intolerable"
    >
      <p>{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          {retryLabel ?? "Reintentar"}
        </Button>
      )}
    </div>
  );
}
