import { z } from 'zod';

export const gradeStatusSchema = z.enum(['graded', 'pending']);
export type GradeStatus = z.infer<typeof gradeStatusSchema>;

export const gradeItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(), // 'Cátedra' | 'Laboratorios'
  categoryWeightPercent: z.number().min(0).max(100), // e.g. 30% dentro de la categoría
  courseWeightPercent: z.number().min(0).max(100), // e.g. 21% del total del curso
  score: z.number().min(1.0).max(7.0).nullable(), // 1.0 a 7.0 con base 1.0
  maxScore: z.number().default(7.0),
  minPassScore: z.number().default(4.0),
  date: z.string(),
  status: gradeStatusSchema,
  feedback: z.string().optional(),
});

export type GradeItem = z.infer<typeof gradeItemSchema>;

export const gradingCategoryRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  weightPercent: z.number().min(0).max(100),
  description: z.string(),
});

export type GradingCategoryRule = z.infer<typeof gradingCategoryRuleSchema>;

export const courseGradesSchema = z.object({
  courseId: z.string(),
  courseName: z.string(),
  baseScore: z.number().default(1.0),
  passScore: z.number().default(4.0),
  maxScore: z.number().default(7.0),
  rulesExplanation: z.string(),
  categoryRules: z.array(gradingCategoryRuleSchema),
  grades: z.array(gradeItemSchema),
});

export type CourseGrades = z.infer<typeof courseGradesSchema>;
