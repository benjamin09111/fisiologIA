import * as React from 'react';
import { cn } from '@/lib/cn';

export interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

export function SpeechBubble({ children, className }: SpeechBubbleProps) {
  return (
    <div
      className={cn(
        'relative animate-pop rounded-2xl border border-border/40 bg-surface px-4 py-2.5 text-xs font-medium text-text shadow-card md:text-sm',
        className,
      )}
    >
      {children}
      <div className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-border/40 bg-surface" />
    </div>
  );
}
