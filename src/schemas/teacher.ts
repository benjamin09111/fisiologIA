import { z } from 'zod';

export const failedQuestionSchema = z.object({
  questionId: z.string(),
  text: z.string(),
  failureRate: z.number().min(0).max(100),
});

export type FailedQuestion = z.infer<typeof failedQuestionSchema>;

export const unitStatsSchema = z.object({
  unitId: z.string(),
  unitTitle: z.string(),
  courseTitle: z.string(),
  contentProgress: z.number().min(0).max(100),
  correctAnswerRate: z.number().min(0).max(100),
  mostFailedQuestions: z.array(failedQuestionSchema),
});

export type UnitStats = z.infer<typeof unitStatsSchema>;

export const teacherDashboardSchema = z.object({
  unitsStats: z.array(unitStatsSchema),
});

export type TeacherDashboard = z.infer<typeof teacherDashboardSchema>;
