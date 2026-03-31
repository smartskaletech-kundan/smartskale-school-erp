import { Button } from "@/components/ui/button";
import type React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div
      data-ocid="empty_state"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {icon && <div className="text-5xl mb-4 opacity-30">{icon}</div>}
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button data-ocid="empty_state.button" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
