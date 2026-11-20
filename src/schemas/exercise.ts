import { z } from 'zod';

export const questionTypeSchema = z.enum(['single', 'multiple', 'true_false']);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export const difficultySchema = z.enum(['facil', 'medio', 'dificil']);
export type Difficulty = z.infer<typeof difficultySchema>;

export const questionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export type QuestionOption = z.infer<typeof questionOptionSchema>;

// Question for student (never contains correct answers)
export const questionSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  unitId: z.string(),
  unitTitle: z.string().optional(),
  text: z.string(),
  type: questionTypeSchema,
  difficulty: difficultySchema,
  options: z.array(questionOptionSchema),
});

export type Question = z.infer<typeof questionSchema>;

// Server-only answer key
export const answerKeySchema = z.object({
  questionId: z.string(),
  correctOptionIds: z.array(z.string()),
  explanation: z.string(),
});

export type AnswerKey = z.infer<typeof answerKeySchema>;

export const quizSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  unitId: z.string(),
  title: z.string(),
  description: z.string(),
  questionsCount: z.number(),
  timeMinutes: z.number().optional(),
  questionIds: z.array(z.string()),
});

export type Quiz = z.infer<typeof quizSchema>;

export const attemptAnswerSchema = z.object({
  questionId: z.string(),
  selectedOptionIds: z.array(z.string()),
});

export type AttemptAnswer = z.infer<typeof attemptAnswerSchema>;

export const submitAttemptSchema = z.object({
  quizId: z.string(),
  answers: z.array(attemptAnswerSchema),
});

export type SubmitAttemptInput = z.infer<typeof submitAttemptSchema>;

export const attemptFeedbackSchema = z.object({
  questionId: z.string(),
  questionText: z.string(),
  isCorrect: z.boolean(),
  userSelectedOptionIds: z.array(z.string()),
  correctOptionIds: z.array(z.string()),
  explanation: z.string(),
});

export type AttemptFeedback = z.infer<typeof attemptFeedbackSchema>;

export const attemptSchema = z.object({
  id: z.string(),
  quizId: z.string(),
  quizTitle: z.string(),
  unitTitle: z.string(),
  studentName: z.string().optional(),
  userId: z.string(),
  score: z.number().min(0).max(100),
  correctCount: z.number(),
  totalCount: z.number(),
  createdAt: z.string(),
  feedback: z.array(attemptFeedbackSchema),
});

export type Attempt = z.infer<typeof attemptSchema>;
