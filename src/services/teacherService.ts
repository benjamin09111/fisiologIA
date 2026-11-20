import 'server-only';
import { cache } from 'react';
import teacherMock from '@/mocks/teacher-results.json';
import {
  teacherDashboardSchema,
  type TeacherDashboard,
} from '@/schemas/teacher';

export const getTeacherResults = cache(async (): Promise<TeacherDashboard> => {
  return teacherDashboardSchema.parse(teacherMock);
});
