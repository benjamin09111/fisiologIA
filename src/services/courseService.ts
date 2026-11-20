import 'server-only';
import { cache } from 'react';
import coursesMock from '@/mocks/courses.json';
import {
  courseSchema,
  type Course,
  type Unit,
  type Topic,
} from '@/schemas/course';
import { z } from 'zod';

const coursesListSchema = z.array(courseSchema);

export const getCourses = cache(async (): Promise<Course[]> => {
  return coursesListSchema.parse(coursesMock);
});

export const getCourse = cache(
  async (id: string): Promise<Course | null> => {
    const courses = await getCourses();
    return courses.find((c) => c.id === id) ?? null;
  },
);

export const getUnit = cache(
  async (courseId: string, unitId: string): Promise<Unit | null> => {
    const course = await getCourse(courseId);
    if (!course) return null;
    return course.units.find((u) => u.id === unitId) ?? null;
  },
);

export const getTopic = cache(
  async (
    courseId: string,
    unitId: string,
    topicId: string,
  ): Promise<Topic | null> => {
    const unit = await getUnit(courseId, unitId);
    if (!unit) return null;
    return unit.topics.find((t) => t.id === topicId) ?? null;
  },
);
