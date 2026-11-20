import * as React from 'react';
import { cn } from '@/lib/cn';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  children: React.ReactNode;
}

export function Reveal({
  index = 0,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  return (
    <div
      className={cn('animate-fade-up', className)}
      style={{ '--i': index, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
