import { z } from 'zod';

export const eventTypeSchema = z.enum(['solemne', 'gynkana', 'estudio']);
export type EventType = z.infer<typeof eventTypeSchema>;

export const evaluationSchema = z.object({
  id: z.string(),
  title: z.string(),
  course: z.string(),
  date: z.string(), // 'YYYY-MM-DD'
  time: z.string(),
  location: z.string(),
  type: eventTypeSchema,
});

export type Evaluation = z.infer<typeof evaluationSchema>;

export const studyEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(), // 'YYYY-MM-DD'
  type: eventTypeSchema,
  description: z.string().optional(),
});

export type StudyEvent = z.infer<typeof studyEventSchema>;

export const planningSchema = z.object({
  evaluations: z.array(evaluationSchema),
  events: z.array(studyEventSchema),
});

export type Planning = z.infer<typeof planningSchema>;
