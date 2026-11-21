import 'server-only';
import { cache } from 'react';
import teacherMock from '@/mocks/teacher-results.json';
import teachersListData from '@/mocks/teachers.json';
import {
  teacherDashboardSchema,
  teacherProfileSchema,
  type TeacherDashboard,
  type TeacherProfile,
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
    anonymousStudentCount: 46,
  };
});
