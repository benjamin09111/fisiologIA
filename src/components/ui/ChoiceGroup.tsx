'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

export interface ChoiceOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface ChoiceGroupProps {
  name: string;
  options: ChoiceOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  type?: 'radio' | 'checkbox';
  variant?: 'list' | 'card';
  className?: string;
}

export function ChoiceGroup({
  name,
  options,
  value,
  onChange,
  type = 'radio',
  variant = 'card',
  className,
}: ChoiceGroupProps) {
  const isChecked = (val: string) => {
    if (Array.isArray(value)) {
      return value.includes(val);
    }
    return value === val;
  };

  const handleToggle = (val: string) => {
    if (type === 'radio') {
      onChange(val);
    } else {
      const arr = Array.isArray(value) ? [...value] : [];
      const idx = arr.indexOf(val);
      if (idx > -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(val);
      }
      onChange(arr);
    }
  };

  return (
    <div
      role={type === 'radio' ? 'radiogroup' : 'group'}
      className={cn(
        variant === 'list'
          ? 'flex flex-col divide-y divide-border/20 rounded-card border border-border/40 bg-surface'
          : 'grid grid-cols-1 gap-3 sm:grid-cols-2',
        className,
      )}
    >
      {options.map((opt) => {
        const checked = isChecked(opt.value);
        return (
          <label
            key={opt.value}
            className={cn(
              'group relative flex cursor-pointer select-none items-start gap-3 transition-all',
              variant === 'list'
                ? 'p-3.5 hover:bg-primary-soft/15'
                : 'rounded-card border p-4 text-sm',
              variant === 'card' &&
                (checked
                  ? 'border-primary bg-primary-soft/30 shadow-sm'
                  : 'border-border/60 bg-surface hover:border-border hover:bg-primary-soft/10'),
              opt.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <input
              type={type}
              name={name}
              value={opt.value}
              checked={checked}
              disabled={opt.disabled}
              onChange={() => handleToggle(opt.value)}
              className="sr-only"
            />
            <div
              className={cn(
                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-all',
                type === 'radio' ? 'rounded-full' : 'rounded-md',
                checked
                  ? 'border-primary-strong bg-primary-strong text-on-primary'
                  : 'border-border bg-surface group-hover:border-primary',
              )}
            >
              {checked &&
                (type === 'radio' ? (
                  <div className="h-1.5 w-1.5 rounded-full bg-on-primary" />
                ) : (
                  <Check className="h-3 w-3 stroke-[3]" />
                ))}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-text">{opt.label}</div>
              {opt.description && (
                <div className="mt-0.5 text-xs text-muted">
                  {opt.description}
                </div>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
