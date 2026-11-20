import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuiz, getQuestions } from '@/services/exerciseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizRunner } from '@/features/exercises/QuizRunner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ quizId: string }>;
}): Promise<Metadata> {
  const { quizId } = await params;
  const quiz = await getQuiz(quizId);
  if (!quiz) return { title: 'Cuestionario no encontrado' };
  return {
    title: `${quiz.title} — FisiologIA`,
    description: quiz.description,
  };
}

export default async function QuizResolverPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const [quiz, allQuestions] = await Promise.all([
    getQuiz(quizId),
    getQuestions(),
  ]);

  if (!quiz) {
    notFound();
  }

  // Filter questions matching this quiz
  const quizQuestions = allQuestions.filter((q) =>
    quiz.questionIds.includes(q.id),
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title={quiz.title}
        subtitle={quiz.description}
        breadcrumbs={[
          { label: 'Ejercicios', href: '/ejercicios' },
          { label: quiz.title },
        ]}
      />

      <QuizRunner quiz={quiz} questions={quizQuestions} />
    </div>
  );
}
