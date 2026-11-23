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

export const studentStatusSchema = z.enum(['support_needed', 'good', 'excellent']);
export type StudentStatus = z.infer<typeof studentStatusSchema>;

export const studentOverviewSchema = z.object({
  id: z.string(),
  alias: z.string(), // e.g. "Estudiante #1042"
  section: z.string(),
  contentProgress: z.number().min(0).max(100),
  quizAccuracy: z.number().min(0).max(100),
  quizzesTaken: z.number(),
  lastActive: z.string(),
  status: studentStatusSchema,
  strongTopics: z.array(z.string()),
  weakTopics: z.array(z.string()),
  recentQuizAttempts: z.array(
    z.object({
      quizTitle: z.string(),
      score: z.number(),
      date: z.string(),
    }),
  ),
});

export type StudentOverview = z.infer<typeof studentOverviewSchema>;

export const inquiryStatusSchema = z.enum(['pending', 'answered']);
export type InquiryStatus = z.infer<typeof inquiryStatusSchema>;

export const studentInquirySchema = z.object({
  id: z.string(),
  studentAlias: z.string(),
  unitTitle: z.string(),
  topicTitle: z.string(),
  questionText: z.string(),
  createdAt: z.string(),
  status: inquiryStatusSchema,
  teacherAnswer: z.string().optional(),
  answeredAt: z.string().optional(),
});

export type StudentInquiry = z.infer<typeof studentInquirySchema>;

export const quizErrorTopicSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  unitTitle: z.string(),
  topicTitle: z.string(),
  questionText: z.string(),
  failureRate: z.number().min(0).max(100),
  totalAttempts: z.number(),
  wrongAttemptsCount: z.number(),
  mostChosenDistractor: z.string(),
  distractorPercentage: z.number(),
  correctAnswer: z.string(),
  pedagogicalRecommendation: z.string(),
  difficultyLevel: z.enum(['alta', 'media', 'baja']),
});

export type QuizErrorTopic = z.infer<typeof quizErrorTopicSchema>;
