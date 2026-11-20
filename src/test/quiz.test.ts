import { describe, it, expect } from 'vitest';
import { gradeAttempt } from '@/services/exerciseService';
import { submitAttemptAction } from '@/features/exercises/actions';

describe('Quiz & Exercises Server Logic', () => {
  it('correctly grades a full score attempt', async () => {
    const payload = {
      quizId: 'quiz-mecanica-1',
      answers: [
        { questionId: 'q-1', selectedOptionIds: ['opt-1c'] },
        { questionId: 'q-2', selectedOptionIds: ['opt-2b'] },
        { questionId: 'q-3', selectedOptionIds: ['opt-3c'] },
        { questionId: 'q-4', selectedOptionIds: ['opt-4c'] },
        { questionId: 'q-5', selectedOptionIds: ['opt-5a', 'opt-5b'] },
      ],
    };

    const attempt = await gradeAttempt(payload, 'Test Student', 'usr-test');
    expect(attempt.score).toBe(100);
    expect(attempt.correctCount).toBe(5);
    expect(attempt.feedback.every((f) => f.isCorrect)).toBe(true);
  });

  it('correctly grades an attempt with partial/incorrect answers', async () => {
    const payload = {
      quizId: 'quiz-mecanica-1',
      answers: [
        { questionId: 'q-1', selectedOptionIds: ['opt-1a'] }, // wrong
        { questionId: 'q-2', selectedOptionIds: ['opt-2b'] }, // right
        { questionId: 'q-3', selectedOptionIds: ['opt-3c'] }, // right
        { questionId: 'q-4', selectedOptionIds: ['opt-4b'] }, // wrong
        { questionId: 'q-5', selectedOptionIds: ['opt-5a', 'opt-5b'] }, // right
      ],
    };

    const attempt = await gradeAttempt(payload, 'Test Student', 'usr-test');
    expect(attempt.score).toBe(60);
    expect(attempt.correctCount).toBe(3);
    expect(attempt.totalCount).toBe(5);
  });

  it('submitAttemptAction rejects invalid input schema', async () => {
    const invalidPayload = { quizId: 123, answers: 'no' };
    const res = await submitAttemptAction(invalidPayload);
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });
});
