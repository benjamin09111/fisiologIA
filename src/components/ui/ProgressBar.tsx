import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export function ProgressBar({
  value,
  showLabel = false,
  size = 'md',
  ariaLabel,
  className,
  ...props
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  return (
    <div
      className={cn('flex w-full items-center gap-3', className)}
      {...props}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-primary-soft',
          heightClass,
        )}
        role="progressbar"
        aria-label={ariaLabel || 'Progreso'}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary-strong transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="whitespace-nowrap text-xs font-bold text-primary-strong">
          {clamped}%
        </span>
      )}
    </div>
  );
}
