import * as React from 'react';
import { cn } from '@/lib/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'rect' | 'circle' | 'pill';
}

export function Skeleton({
  shape = 'rect',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted/15',
        shape === 'circle' && 'aspect-square rounded-full',
        shape === 'pill' && 'rounded-full',
        shape === 'rect' && 'rounded-card',
        className,
      )}
      {...props}
    />
  );
}
