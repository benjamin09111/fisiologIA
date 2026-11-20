import type { CourseProgress, ScoreEvolution } from '@/schemas/progress';
import type { BarData } from '@/components/charts/BarChart';

/**
 * Calculates global completion progress as a rounded integer average of courses.
 */
export function calculateGlobalProgress(courses: CourseProgress[]): number {
  if (courses.length === 0) return 0;
  const total = courses.reduce((acc, curr) => acc + curr.progress, 0);
  return Math.round(total / courses.length);
}

/**
 * Calculates average score across a list of scores.
 */
export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / scores.length);
}

/**
 * Converts score evolution entries into BarChart data items.
 */
export function formatEvolutionChartData(evolution: ScoreEvolution[]): BarData[] {
  return evolution.map((item) => ({
    label: item.date,
    value: item.score,
  }));
}

/**
 * Categorizes a score into performance feedback.
 */
export function getPerformanceCategory(score: number): {
  label: string;
  variant: 'accent' | 'warning' | 'primary' | 'muted';
} {
  if (score >= 85) {
    return { label: 'Excelente', variant: 'accent' };
  }
  if (score >= 70) {
    return { label: 'Bueno', variant: 'primary' };
  }
  if (score >= 50) {
    return { label: 'Por reforzar', variant: 'warning' };
  }
  return { label: 'Crítico', variant: 'muted' };
}
