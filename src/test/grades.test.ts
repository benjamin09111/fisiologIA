import { describe, it, expect } from 'vitest';
import { calculateGradesSummary } from '@/lib/grades';
import type { CourseGrades } from '@/schemas/grades';

describe('calculateGradesSummary', () => {
  const sampleGrades: CourseGrades = {
    courseId: 'respiratoria',
    courseName: 'Fisiología Respiratoria',
    baseScore: 1.0,
    passScore: 4.0,
    maxScore: 7.0,
    rulesExplanation: 'Cátedra 70% + Lab 30%',
    categoryRules: [],
    grades: [
      {
        id: '1',
        name: 'Solemne 1',
        category: 'Cátedra',
        categoryWeightPercent: 30,
        courseWeightPercent: 21,
        score: 5.8,
        maxScore: 7.0,
        minPassScore: 4.0,
        date: '2026-10-24',
        status: 'graded',
      },
      {
        id: '2',
        name: 'Quizes Semanales',
        category: 'Cátedra',
        categoryWeightPercent: 35,
        courseWeightPercent: 24.5,
        score: 6.2,
        maxScore: 7.0,
        minPassScore: 4.0,
        date: '2026-11-15',
        status: 'graded',
      },
      {
        id: '3',
        name: 'Lab 1',
        category: 'Laboratorio',
        categoryWeightPercent: 50,
        courseWeightPercent: 15,
        score: 6.5,
        maxScore: 7.0,
        minPassScore: 4.0,
        date: '2026-10-31',
        status: 'graded',
      },
      {
        id: '4',
        name: 'Solemne 2',
        category: 'Cátedra',
        categoryWeightPercent: 35,
        courseWeightPercent: 24.5,
        score: null,
        maxScore: 7.0,
        minPassScore: 4.0,
        date: '2026-12-05',
        status: 'pending',
      },
      {
        id: '5',
        name: 'Lab 2',
        category: 'Laboratorio',
        categoryWeightPercent: 50,
        courseWeightPercent: 15,
        score: null,
        maxScore: 7.0,
        minPassScore: 4.0,
        date: '2026-12-10',
        status: 'pending',
      },
    ],
  };

  it('calculates weighted average and evaluated percentages correctly', () => {
    const summary = calculateGradesSummary(sampleGrades);

    expect(summary.evaluatedWeightPercent).toBe(60.5);
    expect(summary.remainingWeightPercent).toBe(39.5);
    expect(summary.currentWeightedAverage).toBeGreaterThan(6.0);
    expect(summary.isPassingCurrently).toBe(true);
    expect(summary.statusBadge.tone).toBe('success');
  });

  it('calculates minimum score needed to pass on remaining percentage', () => {
    const summary = calculateGradesSummary(sampleGrades);
    // Accumulated points = 5.8*0.21 + 6.2*0.245 + 6.5*0.15 = 1.218 + 1.519 + 0.975 = 3.712
    // Points needed for 4.0 = 4.0 - 3.712 = 0.288
    // On remaining 39.5%: (0.288 / 39.5) * 100 = 0.729 -> clamped to base score 1.0
    expect(summary.neededScoreForPass).toBe(1.0);
  });
});
