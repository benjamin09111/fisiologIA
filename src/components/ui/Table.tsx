import * as React from 'react';
import { cn } from '@/lib/cn';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  keyExtractor,
  emptyMessage = 'No hay registros',
  className,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-card border border-border/40 bg-surface p-8 text-center text-sm text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto rounded-card border border-border/40 bg-surface shadow-card md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border/40 bg-primary-soft/30 text-xs font-semibold uppercase tracking-wider text-muted">
              {columns.map((col) => (
                <th key={col.key} className={cn('px-5 py-3.5', col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="transition-colors hover:bg-primary-soft/20"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('px-5 py-4 text-text', col.className)}
                  >
                    {col.render
                      ? col.render(item)
                      : String(item[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="flex flex-col gap-3 md:hidden">
        {data.map((item) => (
          <div
            key={keyExtractor(item)}
            className="flex flex-col gap-2 rounded-card border border-border/40 bg-surface p-4 shadow-card"
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex items-center justify-between border-b border-border/20 py-1 text-xs last:border-0"
              >
                <span className="font-semibold text-muted">{col.header}</span>
                <span className="text-right font-medium text-text">
                  {col.render
                    ? col.render(item)
                    : String(item[col.key] ?? '')}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
