import { describe, it, expect } from 'vitest';
import { userSchema } from '@/schemas/user';
import { courseSchema } from '@/schemas/course';
import {
  questionSchema,
  answerKeySchema,
  quizSchema,
  attemptSchema,
} from '@/schemas/exercise';
import { planningSchema } from '@/schemas/planning';
import { userProgressSchema } from '@/schemas/progress';
import { teacherDashboardSchema } from '@/schemas/teacher';

import userMock from '@/mocks/user.json';
import teacherMock from '@/mocks/teacher.json';
import coursesMock from '@/mocks/courses.json';
import questionsMock from '@/mocks/questions.json';
import answerKeysMock from '@/mocks/answer-keys.json';
import quizzesMock from '@/mocks/quizzes.json';
import attemptsMock from '@/mocks/attempts.json';
import planningMock from '@/mocks/planning.json';
import progressMock from '@/mocks/progress.json';
import teacherResultsMock from '@/mocks/teacher-results.json';
import { z } from 'zod';

describe('Data Layer - Mock Validation', () => {
  it('validates user.json and teacher.json against userSchema', () => {
    expect(userSchema.safeParse(userMock).success).toBe(true);
    expect(userSchema.safeParse(teacherMock).success).toBe(true);
  });

  it('validates courses.json against courseSchema array', () => {
    const res = z.array(courseSchema).safeParse(coursesMock);
    expect(res.success).toBe(true);
  });

  it('validates questions.json against questionSchema array', () => {
    const res = z.array(questionSchema).safeParse(questionsMock);
    expect(res.success).toBe(true);
  });

  it('validates answer-keys.json against answerKeySchema array', () => {
    const res = z.array(answerKeySchema).safeParse(answerKeysMock);
    expect(res.success).toBe(true);
  });

  it('validates quizzes.json and attempts.json', () => {
    expect(z.array(quizSchema).safeParse(quizzesMock).success).toBe(true);
    expect(z.array(attemptSchema).safeParse(attemptsMock).success).toBe(true);
  });

  it('validates planning.json, progress.json and teacher-results.json', () => {
    expect(planningSchema.safeParse(planningMock).success).toBe(true);
    expect(userProgressSchema.safeParse(progressMock).success).toBe(true);
    expect(
      teacherDashboardSchema.safeParse(teacherResultsMock).success,
    ).toBe(true);
  });

  it('strictly ensures questions.json does not leak correct answers or answer keys', () => {
    for (const q of questionsMock as Array<Record<string, unknown>>) {
      expect(q).not.toHaveProperty('correctOptionIds');
      expect(q).not.toHaveProperty('correct');
      expect(q).not.toHaveProperty('isCorrect');
      expect(q).not.toHaveProperty('answer');
      const options = q.options as Array<Record<string, unknown>>;
      for (const opt of options) {
        expect(opt).not.toHaveProperty('isCorrect');
        expect(opt).not.toHaveProperty('correct');
      }
    }
  });
});
