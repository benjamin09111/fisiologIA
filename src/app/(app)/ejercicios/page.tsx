import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { getQuiz, getAttempts } from '@/services/exerciseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { ExerciseTabs } from '@/features/exercises/ExerciseTabs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ejercicios y Cuestionarios — FisiologIA',
  description: 'Practica y evalúa tus conocimientos en fisiología humana.',
};

export default async function EjerciciosHubPage() {
  const [activeQuiz, attempts] = await Promise.all([
    getQuiz('quiz-mecanica-1'),
    getAttempts(),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="Ejercicios y evaluaciones"
        subtitle="Entrena con cuestionarios formativos, banco de preguntas y revisa tu historial"
      />

      <ExerciseTabs activeKey="quizzes" />

      {/* Available Quiz Highlight */}
      {activeQuiz && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-text tracking-tight flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary-strong" />
            <span>Cuestionario disponible</span>
          </h2>

          <Card
            tone="surface"
            padding="lg"
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-primary/40 shadow-card"
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <Badge tone="active">Evaluación formativa</Badge>
                <span className="text-xs text-muted">
                  {activeQuiz.questionsCount} preguntas
                </span>
                {activeQuiz.timeMinutes && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted">
                    <Clock className="h-3 w-3" />
                    {activeQuiz.timeMinutes} min
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-text">{activeQuiz.title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {activeQuiz.description}
              </p>
            </div>

            <Button
              variant="solid"
              size="lg"
              href={`/ejercicios/cuestionarios/${activeQuiz.id}`}
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Comenzar cuestionario
            </Button>
          </Card>
        </div>
      )}

      {/* Recent attempts overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text tracking-tight">
            Intentos recientes
          </h2>
          <Link
            href="/ejercicios/historial"
            className="text-xs font-semibold text-primary-strong hover:underline"
          >
            Ver historial completo →
          </Link>
        </div>

        <Table
          data={attempts.slice(0, 3)}
          keyExtractor={(item) => item.id}
          columns={[
            {
              key: 'quizTitle',
              header: 'Cuestionario',
              render: (item) => (
                <div className="flex flex-col">
                  <span className="font-bold text-text">{item.quizTitle}</span>
                  <span className="text-xs text-muted">{item.unitTitle}</span>
                </div>
              ),
            },
            {
              key: 'score',
              header: 'Puntaje',
              render: (item) => (
                <span className="font-bold text-primary-strong">
                  {item.score}%
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Estado',
              render: (item) => (
                <Badge tone={item.score >= 70 ? 'success' : 'danger'}>
                  {item.score >= 70 ? 'Aprobado' : 'Por reforzar'}
                </Badge>
              ),
            },
            {
              key: 'action',
              header: '',
              className: 'text-right',
              render: (item) => (
                <Button
                  variant="ghost"
                  size="sm"
                  href={`/ejercicios/cuestionarios/${item.quizId}/resultado/${item.id}` as Route}
                >
                  Ver corrección →
                </Button>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
