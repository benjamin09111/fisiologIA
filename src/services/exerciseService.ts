import 'server-only';
import { cache } from 'react';
import questionsMock from '@/mocks/questions.json';
import answerKeysMock from '@/mocks/answer-keys.json';
import quizzesMock from '@/mocks/quizzes.json';
import attemptsMock from '@/mocks/attempts.json';
import {
  questionSchema,
  answerKeySchema,
  quizSchema,
  attemptSchema,
  type Question,
  type Quiz,
  type Attempt,
  type SubmitAttemptInput,
} from '@/schemas/exercise';
import { z } from 'zod';

const questionsListSchema = z.array(questionSchema);
const answerKeysListSchema = z.array(answerKeySchema);
const quizzesListSchema = z.array(quizSchema);
const attemptsListSchema = z.array(attemptSchema);

// In-memory attempts store for dynamic submissions during session
const dynamicAttempts: Attempt[] = [];

export const getQuestions = cache(
  async (filters?: {
    courseId?: string;
    unitId?: string;
    difficulty?: string;
  }): Promise<Question[]> => {
    let questions = questionsListSchema.parse(questionsMock);
    if (filters?.courseId) {
      questions = questions.filter((q) => q.courseId === filters.courseId);
    }
    if (filters?.unitId) {
      questions = questions.filter((q) => q.unitId === filters.unitId);
    }
    if (filters?.difficulty) {
      questions = questions.filter((q) => q.difficulty === filters.difficulty);
    }
    return questions;
  },
);

export const getQuiz = cache(async (id: string): Promise<Quiz | null> => {
  const quizzes = quizzesListSchema.parse(quizzesMock);
  return quizzes.find((q) => q.id === id) ?? null;
});

export const getAttempts = cache(async (): Promise<Attempt[]> => {
  const baseAttempts = attemptsListSchema.parse(attemptsMock);
  return [...dynamicAttempts, ...baseAttempts];
});

export const getAttempt = cache(
  async (id: string): Promise<Attempt | null> => {
    const attempts = await getAttempts();
    return attempts.find((a) => a.id === id) ?? null;
  },
);

// Grading happens strictly on the server using answer-keys.json
export async function gradeAttempt(
  input: SubmitAttemptInput,
  userName = 'Estudiante',
  userId = 'usr-1',
): Promise<Attempt> {
  const quiz = await getQuiz(input.quizId);
  if (!quiz) {
    throw new Error('Cuestionario no encontrado');
  }

  const questions = await getQuestions();
  const answerKeys = answerKeysListSchema.parse(answerKeysMock);

  let correctCount = 0;
  const feedback = input.answers.map((ans) => {
    const question = questions.find((q) => q.id === ans.questionId);
    const key = answerKeys.find((k) => k.questionId === ans.questionId);

    const correctOptionIds = key?.correctOptionIds || [];
    const isCorrect =
      ans.selectedOptionIds.length === correctOptionIds.length &&
      ans.selectedOptionIds.every((id) => correctOptionIds.includes(id));

    if (isCorrect) correctCount++;

    return {
      questionId: ans.questionId,
      questionText: question?.text || '',
      isCorrect,
      userSelectedOptionIds: ans.selectedOptionIds,
      correctOptionIds,
      explanation: key?.explanation || 'Sin explicación disponible',
    };
  });

  const totalCount = input.answers.length;
  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const attempt: Attempt = {
    id: `att-${Date.now()}`,
    quizId: quiz.id,
    quizTitle: quiz.title,
    unitTitle: quiz.description,
    studentName: userName,
    userId,
    score,
    correctCount,
    totalCount,
    createdAt: new Date().toISOString(),
    feedback,
  };

  dynamicAttempts.unshift(attempt);
  return attempt;
}
