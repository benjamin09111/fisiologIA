import { describe, it, expect } from 'vitest';
import {
  parseYearMonth,
  formatYearMonth,
  formatMonthName,
  formatReadableDate,
  getEventDates,
  getSiblingMonthStrings,
} from '@/lib/date';

describe('Date planning utilities', () => {
  it('parses YYYY-MM correctly or defaults to reference month', () => {
    const res1 = parseYearMonth('2026-11');
    expect(res1.year).toBe(2026);
    expect(res1.month).toBe(10); // 0-indexed November

    const resDefault = parseYearMonth(undefined);
    expect(resDefault.year).toBe(2026);
    expect(resDefault.month).toBe(9); // October
  });

  it('formats Date to YYYY-MM', () => {
    const d = new Date(2026, 9, 1, 12, 0, 0);
    expect(formatYearMonth(d)).toBe('2026-10');
  });

  it('formats month name in es-CL', () => {
    const d = new Date(2026, 9, 1, 12, 0, 0);
    const name = formatMonthName(d);
    expect(name.toLowerCase()).toContain('octubre');
    expect(name).toContain('2026');
  });

  it('formats readable date in Spanish', () => {
    const str = formatReadableDate('2026-10-24');
    expect(str.toLowerCase()).toContain('octubre');
    expect(str).toContain('24');
  });

  it('extracts unique event dates', () => {
    const evals = [
      { id: '1', title: 'T1', course: 'C', date: '2026-10-24', time: '10:00', location: 'L', type: 'solemne' as const },
    ];
    const evts = [
      { id: '2', title: 'T2', date: '2026-10-24', type: 'solemne' as const },
      { id: '3', title: 'T3', date: '2026-10-31', type: 'gynkana' as const },
    ];
    const dates = getEventDates(evals, evts);
    expect(dates).toHaveLength(2);
    expect(dates).toContain('2026-10-24');
    expect(dates).toContain('2026-10-31');
  });

  it('calculates sibling months', () => {
    const { prev, next } = getSiblingMonthStrings(2026, 9); // October
    expect(prev).toBe('2026-09');
    expect(next).toBe('2026-11');
  });
});
