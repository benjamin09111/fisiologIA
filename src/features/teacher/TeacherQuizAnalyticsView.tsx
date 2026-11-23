'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { QuizErrorTopic } from '@/schemas/teacher';
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  TrendingDown,
  Target,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export interface TeacherQuizAnalyticsViewProps {
  errorTopics: QuizErrorTopic[];
}

export function TeacherQuizAnalyticsView({ errorTopics }: TeacherQuizAnalyticsViewProps) {
  const [markedForReview, setMarkedForReview] = React.useState<Record<string, boolean>>({});

  const toggleReview = (id: string) => {
    setMarkedForReview((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const highestError = errorTopics.reduce(
    (max, t) => (t.failureRate > max.failureRate ? t : max),
    errorTopics[0],
  );

  const averageFailure = Math.round(
    errorTopics.reduce((sum, t) => sum + t.failureRate, 0) / errorTopics.length,
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards Summary */}
      <section
        aria-label="Resumen de errores frecuentes"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <Card className="p-5 space-y-1 border-rose-500/20 bg-rose-500/5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Concepto más crítico
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text">{highestError?.failureRate}% de fallo</p>
          <p className="text-xs text-muted truncate">{highestError?.topicTitle}</p>
        </Card>

        <Card className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Tasa de error promedio
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text">{averageFailure}%</p>
          <p className="text-xs text-muted">En preguntas complejas del banco</p>
        </Card>

        <Card className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Preguntas diagnosticadas
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text">{errorTopics.length}</p>
          <p className="text-xs text-muted">Con alta dispersión de respuestas</p>
        </Card>
      </section>

      {/* Topics Breakdown List */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-text">Diagnóstico de errores en quizes y evaluaciones</h3>
          <p className="text-xs text-muted">
            Análisis de las preguntas donde los alumnos más se equivocan y recomendaciones didácticas para la clase
          </p>
        </div>

        <div className="space-y-4">
          {errorTopics.map((topic, index) => {
            const isMarked = !!markedForReview[topic.id];

            return (
              <Card
                key={topic.id}
                className={`p-6 border transition-all duration-200 space-y-4 ${
                  isMarked
                    ? 'border-primary/50 bg-primary-soft/10 shadow-sm'
                    : 'border-border/70 hover:border-primary/30'
                }`}
              >
                {/* Header: Title, Unit, Failure Rate */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted">#{index + 1}</span>
                      <Badge
                        tone={topic.difficultyLevel === 'alta' ? 'danger' : 'warning'}
                        size="sm"
                      >
                        Dificultad {topic.difficultyLevel}
                      </Badge>
                      <span className="text-xs text-muted">· {topic.unitTitle}</span>
                    </div>
                    <h4 className="text-base font-bold text-text">{topic.topicTitle}</h4>
                  </div>

                  {/* Failure badge & metric */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0">
                    <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-extrabold text-sm sm:text-base">
                      <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      <span>{topic.failureRate}% error</span>
                    </div>
                    <span className="text-[11px] text-muted">
                      {topic.wrongAttemptsCount} de {topic.totalAttempts} intentos fallidos
                    </span>
                  </div>
                </div>

                {/* Progress bar of failure rate */}
                <div>
                  <div className="flex justify-between text-xs text-muted mb-1 font-semibold">
                    <span>Índice de fallo en la cohorte</span>
                    <span className="text-rose-700 dark:text-rose-300">{topic.failureRate}%</span>
                  </div>
                  <ProgressBar value={topic.failureRate} size="sm" ariaLabel="Tasa de error" />
                </div>

                {/* Question Text */}
                <div className="rounded-xl bg-surface-raised p-4 border border-border/50 text-xs">
                  <p className="font-bold uppercase tracking-wider text-muted mb-1">
                    Pregunta formulada en el quiz:
                  </p>
                  <p className="text-sm font-semibold text-text leading-relaxed">
                    &ldquo;{topic.questionText}&rdquo;
                  </p>
                </div>

                {/* Wrong Distractor vs Correct Answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Common mistake / distractor */}
                  <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-bold">
                      <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      <span>Distractor más común ({topic.distractorPercentage}% lo eligió):</span>
                    </div>
                    <p className="text-text leading-relaxed font-medium">
                      {topic.mostChosenDistractor}
                    </p>
                  </div>

                  {/* Correct answer */}
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Respuesta correcta esperada:</span>
                    </div>
                    <p className="text-text leading-relaxed font-medium">
                      {topic.correctAnswer}
                    </p>
                  </div>
                </div>

                {/* Pedagogical Recommendation */}
                <div className="rounded-xl bg-linear-to-r from-primary-soft/30 to-accent-soft/20 border border-primary/25 p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-primary-strong">
                    <Lightbulb className="h-4 w-4" />
                    <span>Recomendación pedagógica para tu próxima cátedra:</span>
                  </div>
                  <p className="text-text leading-relaxed">
                    {topic.pedagogicalRecommendation}
                  </p>
                </div>

                {/* Card actions */}
                <div className="pt-2 flex items-center justify-between border-t border-border/40">
                  <span className="text-xs text-muted">
                    {isMarked ? '✓ Marcado para repaso en clase' : 'No marcado aún'}
                  </span>
                  <Button
                    variant={isMarked ? 'soft' : 'ghost'}
                    size="sm"
                    onClick={() => toggleReview(topic.id)}
                    iconLeft={<Sparkles className="h-3.5 w-3.5" />}
                  >
                    {isMarked ? 'Desmarcar de repaso' : 'Marcar para repasar en clase'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
