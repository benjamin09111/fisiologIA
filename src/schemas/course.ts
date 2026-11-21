import { z } from 'zod';

export const contentStatusSchema = z.enum(['in_progress', 'locked', 'completed']);
export type ContentStatus = z.infer<typeof contentStatusSchema>;

export const topicSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  order: z.number(),
  keyPoints: z.array(z.string()),
  content: z.string(),
});

export type Topic = z.infer<typeof topicSchema>;

export const activityTypeSchema = z.enum(['reading', 'video', 'interactive', 'quiz']);
export type ActivityType = z.infer<typeof activityTypeSchema>;

export const activitySchema = z.object({
  id: z.string(),
  title: z.string(),
  type: activityTypeSchema,
  durationMinutes: z.number(),
  completed: z.boolean(),
  completedAt: z.string().nullable().optional(),
  order: z.number(),
  quizId: z.string().optional(),
});

export type Activity = z.infer<typeof activitySchema>;

export const unitSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  topicsCount: z.number(),
  completedTopicsCount: z.number(),
  progress: z.number().min(0).max(100),
  status: contentStatusSchema,
  topics: z.array(topicSchema),
  activities: z.array(activitySchema).default([]),
});

export type Unit = z.infer<typeof unitSchema>;

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageSrc: z.string().nullable().optional(),
  status: contentStatusSchema,
  progress: z.number().min(0).max(100),
  currentUnitNumber: z.number().optional(),
  currentUnitTitle: z.string().optional(),
  units: z.array(unitSchema),
});

export type Course = z.infer<typeof courseSchema>;
