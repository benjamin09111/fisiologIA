import { describe, it, expect } from 'vitest';
import {
  getUnitScoreStatus,
  formatUnitsChartData,
  aggregateUnitsSummary,
} from '@/lib/teacher';

describe('Teacher calculations and formatters', () => {
  it('categorizes unit score statuses correctly', () => {
    expect(getUnitScoreStatus(85)).toEqual({ label: 'Óptimo', variant: 'accent' });
    expect(getUnitScoreStatus(75)).toEqual({ label: 'Satisfactorio', variant: 'primary' });
    expect(getUnitScoreStatus(65)).toEqual({ label: 'Atención requerida', variant: 'warning' });
  });

  it('formats units for bar chart', () => {
    const data = [
      {
        unitId: 'u1',
        unitTitle: 'Mecánica ventilatoria',
        courseTitle: 'Respiratoria',
        contentProgress: 64,
        correctAnswerRate: 78,
        mostFailedQuestions: [],
      },
    ];
    const chart = formatUnitsChartData(data);
    expect(chart[0].value).toBe(78);
    expect(chart[0].label).toContain('...');
  });

  it('aggregates unit summary numbers', () => {
    const empty = aggregateUnitsSummary([]);
    expect(empty).toEqual({ avgCorrectAnswerRate: 0, avgContentProgress: 0 });

    const units = [
      {
        unitId: 'u1',
        unitTitle: 'U1',
        courseTitle: 'C1',
        contentProgress: 80,
        correctAnswerRate: 90,
        mostFailedQuestions: [],
      },
      {
        unitId: 'u2',
        unitTitle: 'U2',
        courseTitle: 'C2',
        contentProgress: 70,
        correctAnswerRate: 80,
        mostFailedQuestions: [],
      },
    ];
    const summary = aggregateUnitsSummary(units);
    expect(summary.avgCorrectAnswerRate).toBe(85);
    expect(summary.avgContentProgress).toBe(75);
  });
});
