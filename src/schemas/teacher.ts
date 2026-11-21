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

export const teacherProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  section: z.string(),
  title: z.string(),
  courseName: z.string(),
});

export type TeacherProfile = z.infer<typeof teacherProfileSchema>;

export const teacherDashboardSchema = z.object({
  teacherId: z.string().optional(),
  teacherName: z.string().optional(),
  section: z.string().optional(),
  anonymousStudentCount: z.number().default(48),
  unitsStats: z.array(unitStatsSchema),
});

export type TeacherDashboard = z.infer<typeof teacherDashboardSchema>;
