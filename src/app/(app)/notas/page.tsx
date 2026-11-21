import * as React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { getCourseGrades } from '@/services/gradeService';
import { GradesDashboard } from '@/features/grades/GradesDashboard';

export const metadata: Metadata = {
  title: 'Mis notas — FisiologIA',
  description: 'Libro de calificaciones, promedio ponderado y reglas de evaluación del curso.',
};

export default async function NotasPage() {
  const courseGrades = await getCourseGrades();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Mis notas"
        subtitle="Registro de calificaciones, promedio ponderado automático y ponderaciones del curso"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Mis notas' }]}
      />

      <GradesDashboard courseGrades={courseGrades} />
    </div>
  );
}
