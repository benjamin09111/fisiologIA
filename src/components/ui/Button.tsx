import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        solid: 'bg-primary-strong text-on-primary hover:opacity-90 shadow-sm',
        soft: 'bg-primary-soft text-primary-strong hover:bg-primary-soft/80',
        ghost: 'text-text hover:bg-primary-soft/40',
        glass:
          'bg-surface/80 backdrop-blur-md text-text hover:bg-surface border border-border shadow-sm',
        icon: 'text-primary-strong hover:bg-primary-soft/50 rounded-full p-2 aspect-square',
      },
      size: {
        sm: 'text-xs h-8 px-3 rounded-full',
        md: 'text-sm h-10 px-5 rounded-full',
        lg: 'text-base h-12 px-7 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: Route | string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      href,
      iconLeft,
      iconRight,
      loading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          href={href as Route}
          className={cn(buttonVariants({ variant, size }), className)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = 'Button';
