import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/cn';

export interface CourseFiltersProps {
  currentStatus: string;
}

export function CourseFilters({ currentStatus }: CourseFiltersProps) {
  const filters = [
    { key: 'todos', label: 'Todos los módulos' },
    { key: 'en_curso', label: 'En curso' },
    { key: 'bloqueados', label: 'Bloqueados' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => {
        const isActive = currentStatus === f.key;
        const href = f.key === 'todos' ? '/cursos' : `/cursos?estado=${f.key}`;
        return (
          <Link
            key={f.key}
            href={href as Route}
            className={cn(
              'select-none rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
              isActive
                ? 'bg-primary-strong text-on-primary shadow-xs'
                : 'bg-primary-soft/50 text-text hover:bg-primary-soft',
            )}
          >
            {f.label}
          </Link>
        );
      })}
    </div>
  );
}
