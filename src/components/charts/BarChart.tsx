import * as React from 'react';
import { cn } from '@/lib/cn';

export interface BarData {
  label: string;
  value: number; // 0 to 100
  secondaryValue?: number;
}

export interface BarChartProps {
  data: BarData[];
  height?: number;
  className?: string;
}

export function BarChart({ data, height = 180, className }: BarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 100);

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div
        className="flex items-end justify-between gap-3 px-2 pt-6"
        style={{ height }}
      >
        {data.map((item, idx) => {
          const heightPct = Math.round((item.value / maxVal) * 100);
          return (
            <div
              key={idx}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[11px] font-bold text-muted transition-colors group-hover:text-primary-strong">
                {item.value}%
              </span>
              <div className="relative flex h-full w-full max-w-[40px] items-end overflow-hidden rounded-t-xl bg-primary-soft/40">
                <div
                  className="w-full rounded-t-xl bg-primary-strong transition-all duration-500 ease-out group-hover:opacity-90"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="max-w-[60px] truncate text-center text-[11px] font-semibold text-muted">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
