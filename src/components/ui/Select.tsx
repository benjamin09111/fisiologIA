import * as React from 'react';
import { cn } from '@/lib/cn';
import { Field } from './Field';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id: propId, options, ...props }, ref) => {
    const autoId = React.useId();
    const id = propId || autoId;

    return (
      <Field label={label} error={error} hint={hint} id={id}>
        <div className="relative flex w-full items-center">
          <select
            id={id}
            ref={ref}
            className={cn(
              'h-10 w-full appearance-none rounded-card border bg-surface pl-3.5 pr-10 text-sm text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
              error
                ? 'border-danger focus-visible:ring-danger'
                : 'border-border/60 hover:border-border',
              className,
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 h-4 w-4 text-muted" />
        </div>
      </Field>
    );
  },
);
Select.displayName = 'Select';
