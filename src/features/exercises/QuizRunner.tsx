'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ChoiceGroup } from '@/components/ui/ChoiceGroup';
import { Modal } from '@/components/ui/Modal';
import { submitAttemptAction } from './actions';
import type { Quiz, Question } from '@/schemas/exercise';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export interface QuizRunnerProps {
  quiz: Quiz;
  questions: Question[];
}

export function QuizRunner({ quiz, questions }: QuizRunnerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string[]>>({});
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).filter(
    (k) => (answers[k]?.length ?? 0) > 0,
  ).length;

  const currentSelection = currentQuestion
    ? answers[currentQuestion.id] || []
    : [];

  const handleSelectionChange = (val: string | string[]) => {
    if (!currentQuestion) return;
    const selected = Array.isArray(val) ? val : [val];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selected,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      quizId: quiz.id,
      answers: questions.map((q) => ({
        questionId: q.id,
        selectedOptionIds: answers[q.id] || [],
      })),
    };

    const res = await submitAttemptAction(payload);
    if (res.success && res.attemptId) {
      router.push(
        `/ejercicios/cuestionarios/${quiz.id}/resultado/${res.attemptId}`,
      );
    } else {
      setIsSubmitting(false);
      setSubmitError(res.error || 'Error al enviar el cuestionario.');
    }
  };

  if (!currentQuestion) {
    return <div>No hay preguntas disponibles en este cuestionario.</div>;
  }

  const progressPercent = Math.round(
    ((currentIndex + 1) / totalQuestions) * 100,
  );
  const isMultiple = currentQuestion.type === 'multiple';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top progress header */}
      <Card tone="surface" padding="sm" className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-muted">
          <span>
            Pregunta {currentIndex + 1} de {totalQuestions}
          </span>
          <span className="text-primary-strong">{answeredCount} respondidas</span>
        </div>
        <ProgressBar value={progressPercent} size="sm" />
      </Card>

      {/* Question Card */}
      <Card tone="surface" padding="lg" className="space-y-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge tone="active" className="uppercase text-[10px]">
                {currentQuestion.difficulty}
              </Badge>
              {isMultiple && (
                <Badge tone="warning" className="text-[10px]">
                  Selección múltiple
                </Badge>
              )}
            </div>
            <h2 className="text-base md:text-lg font-bold text-text leading-snug">
              {currentQuestion.text}
            </h2>
          </div>
        </div>

        {/* Options */}
        <ChoiceGroup
          name={`question-${currentQuestion.id}`}
          type={isMultiple ? 'checkbox' : 'radio'}
          variant="card"
          options={currentQuestion.options.map((opt) => ({
            value: opt.id,
            label: opt.text,
          }))}
          value={isMultiple ? currentSelection : currentSelection[0] || ''}
          onChange={handleSelectionChange}
        />

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/30">
          <Button
            variant="ghost"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            iconLeft={<ArrowLeft className="h-4 w-4" />}
          >
            Anterior
          </Button>

          {currentIndex < totalQuestions - 1 ? (
            <Button
              variant="solid"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Siguiente
            </Button>
          ) : (
            <Button
              variant="solid"
              onClick={() => setIsConfirmOpen(true)}
              iconRight={<CheckCircle className="h-4 w-4" />}
            >
              Finalizar y enviar
            </Button>
          )}
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => !isSubmitting && setIsConfirmOpen(false)}
        title="¿Enviar cuestionario?"
        description="Una vez enviado, tus respuestas serán corregidas automáticamente en el servidor."
        footer={
          <>
            <Button
              variant="ghost"
              disabled={isSubmitting}
              onClick={() => setIsConfirmOpen(false)}
            >
              Revisar respuestas
            </Button>
            <Button
              variant="solid"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Confirmar envío
            </Button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <p className="text-sm text-text">
            Has respondido <strong>{answeredCount}</strong> de{' '}
            <strong>{totalQuestions}</strong> preguntas.
          </p>
          {answeredCount < totalQuestions && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-warning/15 text-warning text-xs font-semibold">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                Tienes preguntas sin responder. Puedes volver atrás a revisarlas
                o enviar el intento ahora.
              </span>
            </div>
          )}
          {submitError && (
            <p className="text-xs font-semibold text-danger">{submitError}</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
