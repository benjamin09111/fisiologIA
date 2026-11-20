import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAttempt } from '@/services/exerciseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/charts/ProgressRing';
import { Mascot } from '@/components/brand/Mascot';
import { SpeechBubble } from '@/components/brand/SpeechBubble';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resultado de la evaluación — FisiologIA',
};

export default async function QuizResultPage({
  params,
}: {
  params: Promise<{ quizId: string; intentoId: string }>;
}) {
  const { quizId, intentoId } = await params;
  const attempt = await getAttempt(intentoId);

  if (!attempt) {
    notFound();
  }

  const isApproved = attempt.score >= 70;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        title="Resultado de la evaluación"
        subtitle={attempt.quizTitle}
        breadcrumbs={[
          { label: 'Ejercicios', href: '/ejercicios' },
          { label: attempt.quizTitle },
          { label: 'Resultado' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="soft"
              href={`/ejercicios/cuestionarios/${quizId}`}
              iconLeft={<RotateCcw className="h-4 w-4" />}
            >
              Reintentar
            </Button>
            <Button variant="ghost" href="/ejercicios/historial">
              Ver historial
            </Button>
          </div>
        }
      />

      {/* Score Summary Hero Card */}
      <Card tone="surface" padding="lg" className="flex flex-col md:flex-row items-center justify-between gap-8 shadow-soft border-primary/40">
        <div className="flex items-center gap-6">
          <ProgressRing value={attempt.score} size={110} strokeWidth={10} />
          <div className="space-y-1.5">
            <Badge tone={isApproved ? 'success' : 'danger'}>
              {isApproved ? 'Aprobado' : 'Por reforzar'}
            </Badge>
            <h2 className="text-2xl font-extrabold text-text">
              {attempt.correctCount} de {attempt.totalCount} correctas
            </h2>
            <p className="text-xs text-muted">
              Puntaje obtenido: {attempt.score}% de logro
            </p>
          </div>
        </div>

        {/* Mascot feedback bubble */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <SpeechBubble>
            {isApproved
              ? '¡Excelente trabajo! Has demostrado una comprensión sólida de los mecanismos ♡'
              : '¡Buen intento! Revisa las explicaciones de abajo para reforzar los conceptos clave ♡'}
          </SpeechBubble>
          <Mascot size="md" />
        </div>
      </Card>

      {/* Detailed Feedback per Question */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-text tracking-tight">
          Revisión detallada de preguntas
        </h3>

        <div className="space-y-4">
          {attempt.feedback.map((item, idx) => (
            <Card
              key={item.questionId}
              tone="surface"
              padding="md"
              className="space-y-3 border-border/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {item.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-muted">
                      Pregunta {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-text leading-snug mt-0.5">
                      {item.questionText}
                    </h4>
                  </div>
                </div>

                <Badge tone={item.isCorrect ? 'success' : 'danger'}>
                  {item.isCorrect ? 'Correcta' : 'Incorrecta'}
                </Badge>
              </div>

              {/* Server explanation */}
              <div className="ml-8 p-3.5 rounded-card bg-primary-soft/30 border border-border/40 text-xs space-y-1">
                <span className="font-bold text-primary-strong block">
                  Explicación clínica/fisiológica:
                </span>
                <p className="text-text/90 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
