import type { CourseGrades } from '@/schemas/grades';

export interface GradesSummary {
  evaluatedWeightPercent: number; // e.g. 60.5
  remainingWeightPercent: number; // e.g. 39.5
  currentWeightedAverage: number; // e.g. 6.1
  accumulatedPoints: number; // e.g. 3.71 out of 7.0
  neededScoreForPass: number; // min average required on remaining items to reach 4.0
  isPassingCurrently: boolean;
  statusBadge: {
    label: string;
    tone: 'success' | 'warning' | 'danger' | 'locked';
  };
}

export function calculateGradesSummary(data: CourseGrades): GradesSummary {
  const gradedItems = data.grades.filter((g) => g.status === 'graded' && g.score !== null);
  
  const evaluatedWeightPercent = gradedItems.reduce((acc, g) => acc + g.courseWeightPercent, 0);
  const remainingWeightPercent = Math.max(0, 100 - evaluatedWeightPercent);

  if (gradedItems.length === 0 || evaluatedWeightPercent === 0) {
    return {
      evaluatedWeightPercent: 0,
      remainingWeightPercent: 100,
      currentWeightedAverage: data.baseScore,
      accumulatedPoints: 0,
      neededScoreForPass: data.passScore,
      isPassingCurrently: false,
      statusBadge: { label: 'Sin calificaciones', tone: 'locked' },
    };
  }

  // Accumulated points = sum(score * weight / 100)
  const accumulatedPoints = gradedItems.reduce(
    (acc, g) => acc + ((g.score ?? data.baseScore) * g.courseWeightPercent) / 100,
    0,
  );

  // Normalized average of graded portions
  const currentWeightedAverage = Number(
    ((accumulatedPoints / evaluatedWeightPercent) * 100).toFixed(1),
  );

  // Score needed on the remaining percentage to achieve passScore (4.0)
  let neededScoreForPass = 0;
  if (remainingWeightPercent > 0) {
    const pointsNeeded = data.passScore - accumulatedPoints;
    if (pointsNeeded <= 0) {
      neededScoreForPass = data.baseScore; // Already passed mathematically!
    } else {
      neededScoreForPass = Number(((pointsNeeded / remainingWeightPercent) * 100).toFixed(1));
    }
  } else {
    neededScoreForPass = currentWeightedAverage >= data.passScore ? data.baseScore : data.passScore;
  }

  const isPassingCurrently = currentWeightedAverage >= data.passScore;

  let statusBadge: { label: string; tone: 'success' | 'warning' | 'danger' | 'locked' };
  if (currentWeightedAverage >= 5.5) {
    statusBadge = { label: 'Eximición proyectada', tone: 'success' };
  } else if (currentWeightedAverage >= 4.0) {
    statusBadge = { label: 'Aprobando', tone: 'success' };
  } else {
    statusBadge = { label: 'En riesgo', tone: 'danger' };
  }

  return {
    evaluatedWeightPercent: Number(evaluatedWeightPercent.toFixed(1)),
    remainingWeightPercent: Number(remainingWeightPercent.toFixed(1)),
    currentWeightedAverage,
    accumulatedPoints: Number(accumulatedPoints.toFixed(2)),
    neededScoreForPass: Math.min(data.maxScore, Math.max(data.baseScore, neededScoreForPass)),
    isPassingCurrently,
    statusBadge,
  };
}
