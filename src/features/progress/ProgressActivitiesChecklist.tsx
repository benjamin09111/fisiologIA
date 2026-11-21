import * as React from 'react';
import type { Route } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatActivityDateTime } from '@/lib/date';
import type { Course } from '@/schemas/course';
import {
  CheckCircle2,
  Circle,
  TicketCheck,
  ArrowRight,
} from 'lucide-react';

export interface ProgressActivitiesChecklistProps {
  courses: Course[];
}

export function ProgressActivitiesChecklist({ courses }: ProgressActivitiesChecklistProps) {
  // Extract all activities from the courses
  const allActivities = courses.flatMap((course) =>
    course.units.flatMap((unit) =>
      (unit.activities || []).map((act) => ({
        ...act,
        courseTitle: course.title,
        courseId: course.id,
        unitTitle: unit.title,
        unitId: unit.id,
      })),
    ),
  );

  const completedActivities = allActivities.filter((a) => a.completed);
  const pendingActivities = allActivities.filter((a) => !a.completed);

  return (
    <Card className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <TicketCheck className="h-5 w-5 text-primary-strong" />
            <h2 className="text-lg font-bold text-text">Checklist de actividades y tickets</h2>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Registro automático de tickets completados en tus cursos
          </p>
        </div>
        <Badge variant="accent" size="sm">
          {completedActivities.length} de {allActivities.length} realizadas
        </Badge>
      </div>

      {/* Completed Tickets List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
          Tickets completados recientemente
        </h3>
        <div className="space-y-2.5">
          {completedActivities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-success/30 bg-success/5 p-3.5"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success fill-success/20 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-text">{act.title}</p>
                  <p className="text-xs text-muted">
                    {act.courseTitle} · {act.unitTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  <TicketCheck className="h-3.5 w-3.5" />
                  <span>Validado {formatActivityDateTime(act.completedAt)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Activities Next */}
      {pendingActivities.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-border/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
            Próximas actividades pendientes
          </h3>
          <div className="space-y-2.5">
            {pendingActivities.slice(0, 3).map((act) => (
              <div
                key={act.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border/60 bg-surface-raised p-3.5"
              >
                <div className="flex items-start gap-3">
                  <Circle className="h-5 w-5 text-muted shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-text">{act.title}</p>
                    <p className="text-xs text-muted">
                      {act.courseTitle} · Estimado {act.durationMinutes} min
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  href={`/cursos/${act.courseId}/unidades/${act.unitId}` as Route}
                  iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Ir a unidad
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
