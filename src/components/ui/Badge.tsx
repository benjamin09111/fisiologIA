import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold select-none',
  {
    variants: {
      tone: {
        active: 'bg-primary-soft text-primary-strong',
        locked: 'bg-surface-raised border border-border/80 text-text/90',
        success: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
        danger: 'bg-rose-500/15 text-rose-800 dark:text-rose-200',
        warning: 'bg-amber-500/15 text-amber-900 dark:text-amber-200',
        info: 'bg-sky-500/15 text-sky-800 dark:text-sky-200',
      },
      variant: {
        primary: 'bg-primary-soft text-primary-strong',
        accent: 'bg-accent-mint text-accent-mint-strong',
        warning: 'bg-amber-500/15 text-amber-900 dark:text-amber-200',
        muted: 'bg-surface-raised border border-border/80 text-text/90',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
      },
    },
    defaultVariants: {
      tone: 'active',
      size: 'md',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ tone, variant, size }), className)}
      {...props}
    />
  );
}
