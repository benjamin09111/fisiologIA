'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar } from '@/components/ui/Calendar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EvaluationPill } from '@/features/planning/EvaluationPill';
import type { Planning } from '@/schemas/planning';
import homeContent from '@/content/home.json';
import { Calendar as CalendarIcon } from 'lucide-react';

export interface PlanningWidgetProps {
  planning: Planning;
}

export function PlanningWidget({ planning }: PlanningWidgetProps) {
  // Reference date: October 2026 as per design.jpeg
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 9, 1)); // 9 = October
  const [selectedDate, setSelectedDate] = React.useState('2026-10-24');

  const eventDates = React.useMemo(() => {
    const dates = new Set<string>();
    planning.evaluations.forEach((e) => dates.add(e.date));
    planning.events.forEach((e) => dates.add(e.date));
    return Array.from(dates);
  }, [planning]);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  return (
    <Card tone="surface" padding="md" className="flex flex-col gap-5">
      <SectionHeader
        icon={<CalendarIcon className="h-5 w-5" />}
        title={homeContent.planningSection.title}
        actionText={homeContent.planningSection.actionText}
        actionHref={homeContent.planningSection.actionHref}
        className="mb-0"
      />

      <Calendar
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        eventDates={eventDates}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        size="sm"
      />

      <div className="border-t border-border/30 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
          {homeContent.planningSection.evaluationsTitle}
        </h4>
        <div className="flex flex-col gap-2.5">
          {planning.evaluations.slice(0, 2).map((evalItem) => (
            <EvaluationPill key={evalItem.id} evaluation={evalItem} />
          ))}
        </div>
      </div>
    </Card>
  );
}
