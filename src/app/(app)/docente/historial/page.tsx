import * as React from 'react';
import type { Metadata } from 'next';
import { getTeacherResults } from '@/services/teacherService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Table } from '@/components/ui/Table';

export const metadata: Metadata = {
  title: 'Historial Docente — FisiologIA',
};

export default async function DocenteHistorialPage() {
  const { unitsStats } = await getTeacherResults();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="Historial agregado por unidad"
        subtitle="Seguimiento pedagógico sin nombres ni datos individuales"
        breadcrumbs={[
          { label: 'Panel docente', href: '/docente' },
          { label: 'Historial' },
        ]}
      />

      <Table
        data={unitsStats}
        keyExtractor={(item) => item.unitId}
        columns={[
          {
            key: 'unitTitle',
            header: 'Unidad',
            render: (item) => <span className="font-medium text-text">{item.unitTitle}</span>,
          },
          {
            key: 'courseTitle',
            header: 'Curso',
            render: (item) => <span className="text-sm text-muted">{item.courseTitle}</span>,
          },
          {
            key: 'contentProgress',
            header: 'Avance de contenidos',
            render: (item) => <span className="font-bold text-text">{item.contentProgress}%</span>,
          },
          {
            key: 'correctAnswerRate',
            header: 'Respuestas correctas',
            render: (item) => <span className="font-bold text-primary-strong">{item.correctAnswerRate}%</span>,
          },
        ]}
      />
    </div>
  );
}
