import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/cn';

export interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  actionText?: string;
  actionHref?: Route | string;
  className?: string;
}

export function SectionHeader({
  icon,
  title,
  actionText,
  actionHref,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn('mb-4 flex items-center justify-between gap-4', className)}
    >
      <div className="flex items-center gap-2.5">
        {icon && <span className="text-primary-strong">{icon}</span>}
        <h2 className="text-lg font-bold tracking-tight text-text md:text-xl">
          {title}
        </h2>
      </div>
      {actionText && actionHref && (
        <Link
          href={actionHref as Route}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-primary-strong hover:underline md:text-sm"
        >
          {actionText}
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
