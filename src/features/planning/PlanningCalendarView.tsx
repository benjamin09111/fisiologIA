'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, MapPin, CalendarDays, BookOpen, CalendarPlus } from 'lucide-react';
import { Calendar } from '@/components/ui/Calendar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EvaluationPill } from '@/features/planning/EvaluationPill';
import { GoogleCalendarSyncModal } from '@/features/planning/GoogleCalendarSyncModal';
import type { Evaluation, StudyEvent, EventType } from '@/schemas/planning';
import {
  parseYearMonth,
  formatReadableDate,
  getEventDates,
  getSiblingMonthStrings,
} from '@/lib/date';

export interface PlanningCalendarViewProps {
  evaluations: Evaluation[];
  events: StudyEvent[];
  initialMonthStr?: string;
  initialDateStr?: string;
}

const TYPE_CONFIG: Record<
  EventType,
  { label: string; badgeVariant: 'accent' | 'warning' | 'primary'; dotClass: string }
> = {
  solemne: {
    label: 'Certamen Solemne',
    badgeVariant: 'warning',
    dotClass: 'bg-accent-rose',
  },
  gynkana: {
    label: 'Gynkana Práctica',
    badgeVariant: 'primary',
    dotClass: 'bg-accent-lavender',
  },
  estudio: {
    label: 'Estudio / Taller',
    badgeVariant: 'accent',
    dotClass: 'bg-accent-mint',
  },
};

export function PlanningCalendarView({
  evaluations,
  events,
  initialMonthStr,
  initialDateStr,
}: PlanningCalendarViewProps) {
  const router = useRouter();
  const { year, month, date: currentMonthDate } = parseYearMonth(initialMonthStr);
  const [selectedDate, setSelectedDate] = React.useState<string>(
    initialDateStr || `${year}-${String(month + 1).padStart(2, '0')}-24`,
  );
  const [modalEvent, setModalEvent] = React.useState<{
    title: string;
    date: string;
    time?: string;
    location?: string;
  } | null>(null);

  const eventDates = React.useMemo(
    () => getEventDates(evaluations, events),
    [evaluations, events],
  );

  const { prev, next } = getSiblingMonthStrings(year, month);

  const handlePrevMonth = () => {
    router.push(`/planificacion?mes=${prev}`);
  };

  const handleNextMonth = () => {
    router.push(`/planificacion?mes=${next}`);
  };

  // Find evaluations and events matching selectedDate
  const dayEvaluations = evaluations.filter((e) => e.date === selectedDate);
  const dayEvents = events.filter((e) => e.date === selectedDate);
  const totalDayItems = dayEvaluations.length + dayEvents.length;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column (7 cols): Large Calendar + Legend */}
      <div className="space-y-6 lg:col-span-7">
        <Card className="p-6 md:p-8">
          <Calendar
            size="lg"
            currentMonth={currentMonthDate}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            eventDates={eventDates}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

          {/* Legend */}
          <div className="mt-8 border-t border-border pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
              Tipos de evaluación
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-text">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent-rose" />
                <span>Solemne</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent-lavender" />
                <span>Gynkana</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent-mint" />
                <span>Estudio / Taller</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column (5 cols): Events on selected day + Upcoming evals */}
      <div className="space-y-6 lg:col-span-5">
        {/* Selected Day Details */}
        <Card className="space-y-4 p-6">
          <div className="border-b border-border pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Actividades del día
            </span>
            <h2 className="text-base font-bold text-text">
              {formatReadableDate(selectedDate)}
            </h2>
          </div>

          {totalDayItems === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted">
              <CalendarDays className="mb-2 h-8 w-8 text-muted/60" />
              <p className="text-sm font-medium">No hay evaluaciones para este día</p>
              <p className="text-xs">¡Aprovecha de repasar tus temas pendientes!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayEvaluations.map((evalItem) => {
                const conf = TYPE_CONFIG[evalItem.type];
                return (
                  <div
                    key={evalItem.id}
                    className="space-y-2 rounded-2xl border border-border bg-surface-raised p-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-text">
                        {evalItem.title}
                      </span>
                      <Badge variant={conf.badgeVariant}>{conf.label}</Badge>
                    </div>

                    <p className="text-xs font-medium text-muted">
                      {evalItem.course}
                    </p>

                    <div className="flex flex-col gap-1 pt-1 text-xs text-muted">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-primary-strong" />
                        <span>{evalItem.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-primary-strong" />
                        <span>{evalItem.location}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setModalEvent({
                            title: evalItem.title,
                            date: evalItem.date,
                            time: evalItem.time,
                            location: evalItem.location,
                          })
                        }
                        iconLeft={<CalendarPlus className="h-3.5 w-3.5" />}
                      >
                        Añadir a Google Calendar (Mock)
                      </Button>
                    </div>
                  </div>
                );
              })}

              {dayEvents.map((evt) => {
                const conf = TYPE_CONFIG[evt.type];
                return (
                  <div
                    key={evt.id}
                    className="space-y-2 rounded-2xl border border-border bg-surface-raised p-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-text">
                        {evt.title}
                      </span>
                      <Badge variant={conf.badgeVariant}>{conf.label}</Badge>
                    </div>

                    {evt.description && (
                      <p className="text-xs text-muted">{evt.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Upcoming Evaluations list */}
        <Card className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary-strong" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
              Próximas evaluaciones del semestre
            </h2>
          </div>

          <div className="space-y-2.5">
            {evaluations.map((evaluation) => (
              <EvaluationPill
                key={evaluation.id}
                evaluation={evaluation}
                href={`/planificacion?mes=${evaluation.date.slice(0, 7)}`}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Google Calendar Sync Modal */}
      {modalEvent && (
        <GoogleCalendarSyncModal
          isOpen={!!modalEvent}
          onClose={() => setModalEvent(null)}
          eventTitle={modalEvent.title}
          eventDate={modalEvent.date}
          eventTime={modalEvent.time}
          eventLocation={modalEvent.location}
        />
      )}
    </div>
  );
}
