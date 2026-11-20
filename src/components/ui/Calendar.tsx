'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CalendarProps {
  currentMonth: Date;
  selectedDate?: string; // 'YYYY-MM-DD'
  onSelectDate?: (dateStr: string) => void;
  eventDates?: string[]; // array of 'YYYY-MM-DD'
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  size?: 'sm' | 'lg';
  className?: string;
}

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function Calendar({
  currentMonth,
  selectedDate,
  onSelectDate,
  eventDates = [],
  onPrevMonth,
  onNextMonth,
  size = 'sm',
  className,
}: CalendarProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = new Intl.DateTimeFormat('es-CL', {
    month: 'long',
    year: 'numeric',
  }).format(currentMonth);

  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: Array<{ day: number; dateStr: string } | null> = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    days.push({ day: d, dateStr: `${year}-${mm}-${dd}` });
  }

  const isLg = size === 'lg';

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-sm font-bold capitalize tracking-tight text-text md:text-base">
          {monthName}
        </span>
        <div className="flex items-center gap-1">
          {onPrevMonth && (
            <button
              type="button"
              onClick={onPrevMonth}
              className="rounded-full p-1 text-muted transition-colors hover:bg-primary-soft/50 hover:text-text"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {onNextMonth && (
            <button
              type="button"
              onClick={onNextMonth}
              className="rounded-full p-1 text-muted transition-colors hover:bg-primary-soft/50 hover:text-text"
              aria-label="Mes siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-semibold text-muted">
        {WEEKDAYS.map((w, idx) => (
          <div key={idx} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((item, idx) => {
          if (!item) {
            return <div key={`empty-${idx}`} className="h-8 md:h-9" />;
          }

          const isSelected = selectedDate === item.dateStr;
          const hasEvent = eventDates.includes(item.dateStr);

          return (
            <button
              key={item.dateStr}
              type="button"
              onClick={() => onSelectDate?.(item.dateStr)}
              className={cn(
                'relative mx-auto flex select-none flex-col items-center justify-center rounded-full text-xs font-semibold transition-all',
                isLg
                  ? 'h-10 w-10 text-sm md:h-12 md:w-12'
                  : 'h-8 w-8',
                isSelected
                  ? 'scale-105 bg-primary-strong font-bold text-on-primary shadow-sm'
                  : 'text-text hover:bg-primary-soft/40',
              )}
            >
              <span>{item.day}</span>
              {hasEvent && (
                <span
                  className={cn(
                    'absolute bottom-1 h-1 w-1 rounded-full',
                    isSelected ? 'bg-on-primary' : 'bg-primary-strong',
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
