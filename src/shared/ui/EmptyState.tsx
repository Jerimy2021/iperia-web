interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-md border border-dashed border-neutral-200 p-8 text-center text-neutral-600">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}
