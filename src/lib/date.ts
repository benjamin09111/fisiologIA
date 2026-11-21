import type { Evaluation, StudyEvent } from '@/schemas/planning';

/**
 * Parses a 'YYYY-MM' string or defaults to October 2026 (the semester's reference month).
 * Uses midday (12:00:00) so local timezone variations (+/- 4 hours) never change the month.
 */
export function parseYearMonth(mesParam?: string): { year: number; month: number; date: Date } {
  if (mesParam && /^\d{4}-\d{2}$/.test(mesParam)) {
    const [y, m] = mesParam.split('-').map(Number);
    if (m >= 1 && m <= 12) {
      return { year: y, month: m - 1, date: new Date(y, m - 1, 1, 12, 0, 0) };
    }
  }
  return { year: 2026, month: 9, date: new Date(2026, 9, 1, 12, 0, 0) }; // 2026-10
}

/**
 * Formats a Date object into 'YYYY-MM'.
 */
export function formatYearMonth(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/**
 * Formats the month and year with Intl in es-CL.
 */
export function formatMonthName(date: Date): string {
  return new Intl.DateTimeFormat('es-CL', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats a date string 'YYYY-MM-DD' into readable Spanish format.
 * E.g., '2026-10-24' -> 'Viernes, 24 de octubre'
 */
export function formatReadableDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d, 12, 0, 0);
  const formatted = new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Extracts unique date strings from evaluations and study events.
 */
export function getEventDates(evaluations: Evaluation[], events: StudyEvent[]): string[] {
  const dates = new Set<string>();
  evaluations.forEach((e) => dates.add(e.date));
  events.forEach((e) => dates.add(e.date));
  return Array.from(dates);
}

/**
 * Computes the next and previous month strings ('YYYY-MM').
 */
export function getSiblingMonthStrings(year: number, month: number): { prev: string; next: string } {
  const prevDate = new Date(year, month - 1, 1, 12, 0, 0);
  const nextDate = new Date(year, month + 1, 1, 12, 0, 0);
  return {
    prev: formatYearMonth(prevDate),
    next: formatYearMonth(nextDate),
  };
}

/**
 * Formats an ISO date string into a friendly activity completion timestamp.
 * E.g., '2026-11-20T14:32:00Z' -> '20 nov, 14:32'
 */
export function formatActivityDateTime(isoDate?: string | null): string {
  if (!isoDate) return '';
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    return new Intl.DateTimeFormat('es-CL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return isoDate;
  }
}
