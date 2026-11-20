import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/cn';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6 flex flex-col gap-2', className)}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs md:text-sm text-muted">{subtitle}</p>
          )}
        </div>
        {actions && <div className="mt-2 sm:mt-0">{actions}</div>}
      </div>
    </div>
  );
}
