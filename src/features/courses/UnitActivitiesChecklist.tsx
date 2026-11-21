'use client';

import * as React from 'react';
import type { Route } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatActivityDateTime } from '@/lib/date';
import type { Activity } from '@/schemas/course';
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  TicketCheck,
} from 'lucide-react';

export interface UnitActivitiesChecklistProps {
  initialActivities: Activity[];
}

const TYPE_CONFIG = {
  video: { label: 'Video', icon: PlayCircle, tone: 'active' as const },
  reading: { label: 'Lectura', icon: FileText, tone: 'info' as const },
  interactive: { label: 'Interactivo', icon: Sparkles, tone: 'warning' as const },
  quiz: { label: 'Quiz evaluativo', icon: HelpCircle, tone: 'danger' as const },
};

export function UnitActivitiesChecklist({
  initialActivities,
}: UnitActivitiesChecklistProps) {
  const [activities, setActivities] = React.useState<Activity[]>(initialActivities);

  const completedCount = activities.filter((a) => a.completed).length;
  const totalCount = activities.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (id: string) => {
    setActivities((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const willBeCompleted = !item.completed;
        return {
          ...item,
          completed: willBeCompleted,
          completedAt: willBeCompleted ? new Date().toISOString() : null,
        };
      }),
    );
  };

  const finalQuiz = activities.find((a) => a.type === 'quiz');

  return (
    <div className="space-y-6">
      {/* Checklist Summary Card */}
      <Card tone="surface" padding="md" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TicketCheck className="h-4 w-4 text-primary-strong" />
              <h3 className="text-sm font-bold text-text">Checklist de actividades y tickets</h3>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Marca las actividades realizadas para registrar automáticamente tu fecha y ticket de completitud.
            </p>
          </div>
          <span className="text-xs font-bold text-text shrink-0 bg-primary-soft/60 px-3 py-1 rounded-full text-primary-strong">
            {completedCount} de {totalCount} completadas ({progressPercent}%)
          </span>
        </div>
        <ProgressBar value={progressPercent} ariaLabel="Progreso de actividades" />
      </Card>

      {/* Online Course Sequence List */}
      <div className="space-y-3">
        {activities.map((act, index) => {
          const config = TYPE_CONFIG[act.type] || TYPE_CONFIG.reading;
          const Icon = config.icon;
          const isQuiz = act.type === 'quiz';

          return (
            <Card
              key={act.id}
              tone="surface"
              className={`p-4 transition-all duration-200 border ${
                act.completed ? 'border-success/30 bg-success/5' : 'border-border/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Step number + Checkbox ticket + Details */}
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggle(act.id)}
                    className="mt-0.5 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left"
                    aria-label={
                      act.completed
                        ? `Marcar ${act.title} como no realizada`
                        : `Marcar ${act.title} como realizada`
                    }
                  >
                    {act.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-success fill-success/20 transition-transform active:scale-90" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted transition-transform active:scale-90 hover:text-text" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-muted">Paso {index + 1}</span>
                      <Badge tone={config.tone} size="sm">
                        <Icon className="h-3 w-3 mr-1 inline" />
                        {config.label}
                      </Badge>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                        <Clock className="h-3 w-3" />
                        {act.durationMinutes} min
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold ${
                        act.completed ? 'text-text line-through opacity-85' : 'text-text'
                      }`}
                    >
                      {act.title}
                    </h4>

                    {/* Automatic Date & Ticket Badge */}
                    <div className="pt-1">
                      {act.completed && act.completedAt ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          <TicketCheck className="h-3.5 w-3.5" />
                          <span>Ticket validado: {formatActivityDateTime(act.completedAt)}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted">
                          Pendiente · Haz clic en el círculo para registrar ticket
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: CTA depending on type */}
                <div className="flex sm:flex-col items-center sm:items-end justify-end gap-2 shrink-0">
                  {isQuiz ? (
                    <Button
                      variant="solid"
                      size="sm"
                      href={`/ejercicios/cuestionarios/${act.quizId || 'quiz-mecanica-1'}` as Route}
                      iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                    >
                      Iniciar Quiz
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggle(act.id)}
                    >
                      {act.completed ? 'Desmarcar' : 'Completar ticket'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Special Final Quiz Card at bottom of unit */}
      {finalQuiz && (
        <Card
          tone="surface"
          className="border-primary/40 bg-linear-to-r from-primary-soft/30 to-accent-soft/30 p-5 shadow-card"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  Evaluación final de unidad
                </Badge>
                <span className="text-xs text-muted">Obligatorio para aprobar</span>
              </div>
              <h4 className="text-base font-bold text-text">{finalQuiz.title}</h4>
              <p className="text-xs text-muted">
                Valida tus conocimientos adquiridos en las actividades previas.
              </p>
            </div>
            <Button
              variant="solid"
              size="md"
              href={`/ejercicios/cuestionarios/${finalQuiz.quizId || 'quiz-mecanica-1'}` as Route}
              iconRight={<Sparkles className="h-4 w-4" />}
            >
              Rendir evaluación
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
