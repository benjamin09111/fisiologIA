import 'server-only';
import { cache } from 'react';
import teacherMock from '@/mocks/teacher-results.json';
import teachersListData from '@/mocks/teachers.json';
import teacherStudentsData from '@/mocks/teacher-students.json';
import teacherInquiriesData from '@/mocks/teacher-inquiries.json';
import teacherQuizErrorsData from '@/mocks/teacher-quiz-errors.json';
import teacherQuizzesData from '@/mocks/teacher-quizzes.json';
import teacherQuizTemplatesData from '@/mocks/teacher-quiz-templates.json';
import {
  teacherDashboardSchema,
  teacherProfileSchema,
  studentOverviewSchema,
  studentInquirySchema,
  quizErrorTopicSchema,
  teacherQuizItemSchema,
  quizTemplateSchema,
  type TeacherDashboard,
  type TeacherProfile,
  type StudentOverview,
  type StudentInquiry,
  type QuizErrorTopic,
  type TeacherQuizItem,
  type QuizTemplate,
} from '@/schemas/teacher';
import { z } from 'zod';

export const getTeachersList = cache(async (): Promise<TeacherProfile[]> => {
  return z.array(teacherProfileSchema).parse(teachersListData);
});

export const getTeacherResults = cache(async (teacherId?: string): Promise<TeacherDashboard> => {
  const teachers = await getTeachersList();
  const matched = teachers.find((t) => t.id === teacherId) || teachers[0];

  const parsed = teacherDashboardSchema.parse(teacherMock);
  return {
    ...parsed,
    teacherId: matched.id,
    teacherName: matched.name,
    section: matched.section,
    anonymousStudentCount: 48,
  };
});

export const getTeacherStudents = cache(async (): Promise<StudentOverview[]> => {
  return z.array(studentOverviewSchema).parse(teacherStudentsData);
});

export const getTeacherStudentQuestions = cache(async (): Promise<StudentInquiry[]> => {
  return z.array(studentInquirySchema).parse(teacherInquiriesData);
});

export const getQuizErrorAnalytics = cache(async (): Promise<QuizErrorTopic[]> => {
  return z.array(quizErrorTopicSchema).parse(teacherQuizErrorsData);
});

export const getTeacherQuizzes = cache(async (): Promise<TeacherQuizItem[]> => {
  return z.array(teacherQuizItemSchema).parse(teacherQuizzesData);
});

export const getTeacherQuizTemplates = cache(async (): Promise<QuizTemplate[]> => {
  return z.array(quizTemplateSchema).parse(teacherQuizTemplatesData);
});
