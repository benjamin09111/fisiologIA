import { describe, it, expect } from 'vitest';
import { getTeacherQuizzes, getTeacherQuizTemplates } from '@/services/teacherService';
import { teacherQuizItemSchema, quizTemplateSchema } from '@/schemas/teacher';

describe('Teacher Quizzes Service & Schemas', () => {
  it('loads valid teacher quizzes list', async () => {
    const quizzes = await getTeacherQuizzes();
    expect(quizzes.length).toBeGreaterThan(0);

    for (const quiz of quizzes) {
      const parsed = teacherQuizItemSchema.safeParse(quiz);
      expect(parsed.success).toBe(true);
      expect(quiz.shareUrl).toContain('https://');
      expect(typeof quiz.questionsCount).toBe('number');
    }
  });

  it('loads quiz templates successfully', async () => {
    const templates = await getTeacherQuizTemplates();
    expect(templates.length).toBeGreaterThan(0);

    for (const tpl of templates) {
      const parsed = quizTemplateSchema.safeParse(tpl);
      expect(parsed.success).toBe(true);
      expect(tpl.defaultQuestionsCount).toBeGreaterThan(0);
      expect(tpl.suggestedMinutes).toBeGreaterThan(0);
    }
  });

  it('contains quiz results with scores and student alias', async () => {
    const quizzes = await getTeacherQuizzes();
    const published = quizzes.find((q) => q.status === 'published' && q.results.length > 0);
    expect(published).toBeDefined();

    if (published) {
      const firstResult = published.results[0];
      expect(firstResult.studentAlias).toMatch(/^Estudiante #/);
      expect(firstResult.score).toBeGreaterThanOrEqual(1.0);
      expect(firstResult.score).toBeLessThanOrEqual(7.0);
    }
  });
});
