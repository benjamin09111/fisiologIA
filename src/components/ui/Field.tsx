import * as React from 'react';
import { cn } from '@/lib/cn';

export interface FieldProps {
  label?: string;
  error?: string;
  hint?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  error,
  hint,
  id,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold tracking-wide text-text"
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-[11px] text-muted">{hint}</p>}
      {error && <p className="text-[11px] font-medium text-danger">{error}</p>}
    </div>
  );
}
