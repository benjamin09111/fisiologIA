import { describe, it, expect } from 'vitest';
import {
  calculateGlobalProgress,
  calculateAverageScore,
  formatEvolutionChartData,
  getPerformanceCategory,
} from '@/lib/progress';

describe('Progress utilities', () => {
  it('calculates global progress correctly', () => {
    expect(calculateGlobalProgress([])).toBe(0);
    expect(
      calculateGlobalProgress([
        { courseId: '1', title: 'A', progress: 60, completedUnits: 1, totalUnits: 2 },
        { courseId: '2', title: 'B', progress: 40, completedUnits: 1, totalUnits: 2 },
      ])
    ).toBe(50);
  });

  it('calculates average score correctly', () => {
    expect(calculateAverageScore([])).toBe(0);
    expect(calculateAverageScore([80, 90, 100])).toBe(90);
    expect(calculateAverageScore([75, 80])).toBe(78);
  });

  it('formats evolution chart data for BarChart', () => {
    const raw = [
      { date: '10/10', quizTitle: 'Quiz 1', score: 85 },
      { date: '17/10', quizTitle: 'Quiz 2', score: 90 },
    ];
    const chartData = formatEvolutionChartData(raw);
    expect(chartData).toEqual([
      { label: '10/10', value: 85 },
      { label: '17/10', value: 90 },
    ]);
  });

  it('categorizes scores accurately', () => {
    expect(getPerformanceCategory(95).label).toBe('Excelente');
    expect(getPerformanceCategory(95).variant).toBe('accent');

    expect(getPerformanceCategory(75).label).toBe('Bueno');
    expect(getPerformanceCategory(75).variant).toBe('primary');

    expect(getPerformanceCategory(60).label).toBe('Por reforzar');
    expect(getPerformanceCategory(60).variant).toBe('warning');

    expect(getPerformanceCategory(40).label).toBe('Crítico');
    expect(getPerformanceCategory(40).variant).toBe('muted');
  });
});
