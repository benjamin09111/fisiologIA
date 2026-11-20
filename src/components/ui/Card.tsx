import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const cardVariants = cva(
  'rounded-card transition-all duration-200 border border-border/40',
  {
    variants: {
      tone: {
        surface: 'bg-surface text-text shadow-card',
        soft: 'bg-primary-soft text-text shadow-card',
        sky: 'bg-accent-sky text-text shadow-card',
        lavender: 'bg-accent-lavender text-text shadow-card',
        mint: 'bg-accent-mint text-text shadow-card',
        rose: 'bg-accent-rose text-text shadow-card',
        gradient:
          'bg-gradient-to-r from-primary-soft to-primary/40 text-text shadow-card',
        glass:
          'bg-surface/85 backdrop-blur-md text-text shadow-card border-border/60',
      },
      interactive: {
        true: 'cursor-pointer hover:-translate-y-1 hover:shadow-soft active:translate-y-0',
        false: '',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      tone: 'surface',
      interactive: false,
      padding: 'md',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({
  className,
  tone,
  interactive,
  padding,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ tone, interactive, padding }), className)}
      {...props}
    />
  );
}
