import * as React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PlanningCalendarView } from '@/features/planning/PlanningCalendarView';
import { getPlanning } from '@/services/planningService';

interface PageProps {
  searchParams: Promise<{ mes?: string; fecha?: string }>;
}

export default async function PlanificacionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const planning = await getPlanning();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Planificación y evaluaciones"
        subtitle="Calendario de certámenes, gynkanas y actividades académicas"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Planificaciones' }]}
      />

      <PlanningCalendarView
        evaluations={planning.evaluations}
        events={planning.events}
        initialMonthStr={params.mes}
        initialDateStr={params.fecha}
      />
    </div>
  );
}
