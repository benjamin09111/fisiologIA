import type { UnitStats } from '@/schemas/teacher';
import type { BarData } from '@/components/charts/BarChart';

/**
 * Returns semaphore status for a unit based on correct answers.
 */
export function getUnitScoreStatus(score: number): {
  label: string;
  variant: 'accent' | 'warning' | 'primary' | 'muted';
} {
  if (score >= 80) {
    return { label: 'Óptimo', variant: 'accent' };
  }
  if (score >= 70) {
    return { label: 'Satisfactorio', variant: 'primary' };
  }
  return { label: 'Atención requerida', variant: 'warning' };
}

/**
 * Formats units stats for BarChart visualization.
 */
export function formatUnitsChartData(units: UnitStats[]): BarData[] {
  return units.map((u) => ({
    label: u.unitTitle.length > 12 ? `${u.unitTitle.slice(0, 10)}...` : u.unitTitle,
    value: u.correctAnswerRate,
  }));
}

/**
 * Aggregates summary KPIs from individual units.
 */
export function aggregateUnitsSummary(units: UnitStats[]): {
  avgCorrectAnswerRate: number;
  avgContentProgress: number;
} {
  if (units.length === 0) {
    return { avgCorrectAnswerRate: 0, avgContentProgress: 0 };
  }
  const sumCorrect = units.reduce((acc, u) => acc + u.correctAnswerRate, 0);
  const sumProgress = units.reduce((acc, u) => acc + u.contentProgress, 0);

  return {
    avgCorrectAnswerRate: Math.round(sumCorrect / units.length),
    avgContentProgress: Math.round(sumProgress / units.length),
  };
}
