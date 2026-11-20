import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/cn';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Migas de pan" className={cn('mb-2 flex items-center gap-1.5 text-xs text-muted', className)}>
      <Link href="/inicio" className="hover:text-primary-strong transition-colors">
        Inicio
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="h-3 w-3 stroke-[2] opacity-60" />
            {item.href && !isLast ? (
              <Link href={item.href as Route} className="hover:text-primary-strong transition-colors truncate max-w-[150px]">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-text truncate max-w-[200px]" aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
