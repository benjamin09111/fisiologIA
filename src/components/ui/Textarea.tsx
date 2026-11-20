import * as React from 'react';
import { cn } from '@/lib/cn';
import { Field } from './Field';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id: propId, rows = 3, ...props }, ref) => {
    const autoId = React.useId();
    const id = propId || autoId;

    return (
      <Field label={label} error={error} hint={hint} id={id}>
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full resize-y rounded-card border bg-surface p-3.5 text-sm text-text transition-colors placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
            error
              ? 'border-danger focus-visible:ring-danger'
              : 'border-border/60 hover:border-border',
            className,
          )}
          {...props}
        />
      </Field>
    );
  },
);
Textarea.displayName = 'Textarea';
