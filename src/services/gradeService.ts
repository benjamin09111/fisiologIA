import 'server-only';
import { cache } from 'react';
import gradesData from '@/mocks/grades.json';
import { courseGradesSchema, type CourseGrades } from '@/schemas/grades';

export const getCourseGrades = cache(async (): Promise<CourseGrades> => {
  return courseGradesSchema.parse(gradesData);
});
