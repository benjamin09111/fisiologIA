import * as React from 'react';
import { cn } from '@/lib/cn';
import { Field } from './Field';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      id: propId,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const autoId = React.useId();
    const id = propId || autoId;

    return (
      <Field label={label} error={error} hint={hint} id={id}>
        <div className="relative flex w-full items-center">
          {iconLeft && (
            <span className="pointer-events-none absolute left-3.5 flex items-center text-muted">
              {iconLeft}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              'h-10 w-full rounded-card border bg-surface px-3.5 text-sm text-text transition-colors placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
              iconLeft ? 'pl-10' : 'pl-3.5',
              iconRight ? 'pr-10' : 'pr-3.5',
              error
                ? 'border-danger focus-visible:ring-danger'
                : 'border-border/60 hover:border-border',
              className,
            )}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3.5 flex items-center text-muted">
              {iconRight}
            </span>
          )}
        </div>
      </Field>
    );
  },
);
Input.displayName = 'Input';
