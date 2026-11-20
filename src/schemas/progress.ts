import { z } from 'zod';

export const progressKPISchema = z.object({
  globalProgress: z.number().min(0).max(100),
  correctAnswerRate: z.number().min(0).max(100),
});

export type ProgressKPI = z.infer<typeof progressKPISchema>;

export const courseProgressSchema = z.object({
  courseId: z.string(),
  title: z.string(),
  progress: z.number().min(0).max(100),
  completedUnits: z.number(),
  totalUnits: z.number(),
});

export type CourseProgress = z.infer<typeof courseProgressSchema>;

export const topicStrengthSchema = z.object({
  id: z.string(),
  topicTitle: z.string(),
  unitTitle: z.string(),
  score: z.number().min(0).max(100),
  status: z.enum(['strength', 'weakness']),
});

export type TopicStrength = z.infer<typeof topicStrengthSchema>;

export const scoreEvolutionSchema = z.object({
  date: z.string(),
  quizTitle: z.string(),
  score: z.number().min(0).max(100),
});

export type ScoreEvolution = z.infer<typeof scoreEvolutionSchema>;

export const userProgressSchema = z.object({
  kpis: progressKPISchema,
  courses: z.array(courseProgressSchema),
  strengths: z.array(topicStrengthSchema),
  weaknesses: z.array(topicStrengthSchema),
  evolution: z.array(scoreEvolutionSchema),
});

export type UserProgress = z.infer<typeof userProgressSchema>;
