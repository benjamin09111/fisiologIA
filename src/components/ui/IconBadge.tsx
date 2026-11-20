import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const iconBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-full select-none shrink-0',
  {
    variants: {
      tone: {
        primary: 'bg-primary-soft text-primary-strong',
        sky: 'bg-accent-sky text-accent-sky-strong',
        lavender: 'bg-accent-lavender text-accent-lavender-strong',
        mint: 'bg-accent-mint text-accent-mint-strong',
        rose: 'bg-accent-rose text-accent-rose-strong',
        surface: 'bg-surface text-primary-strong shadow-sm',
      },
      size: {
        sm: 'h-8 w-8 [&>svg]:h-4 [&>svg]:w-4',
        md: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5',
        lg: 'h-12 w-12 [&>svg]:h-6 [&>svg]:w-6',
        xl: 'h-14 w-14 [&>svg]:h-7 [&>svg]:w-7',
      },
    },
    defaultVariants: {
      tone: 'primary',
      size: 'md',
    },
  },
);

export interface IconBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBadgeVariants> {
  icon: React.ReactNode;
}

export function IconBadge({
  icon,
  tone,
  size,
  className,
  ...props
}: IconBadgeProps) {
  return (
    <div
      className={cn(iconBadgeVariants({ tone, size }), className)}
      {...props}
    >
      {icon}
    </div>
  );
}
