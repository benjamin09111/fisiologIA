import * as React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { getCurrentUser } from '@/services/userService';
import { getQuizErrorAnalytics } from '@/services/teacherService';
import { TeacherQuizAnalyticsView } from '@/features/teacher/TeacherQuizAnalyticsView';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contenidos a reforzar — Panel Docente FisiologIA',
  description: 'Diagnóstico pedagógico de errores frecuentes en quizes y recomendaciones de cátedra.',
};

export default async function DocenteReforzarPage() {
  const user = await getCurrentUser();

  if (user.role !== 'teacher') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Contenidos a reforzar"
          subtitle="Diagnóstico pedagógico del curso"
          breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Docente' }]}
        />
        <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
          <ShieldAlert className="h-10 w-10 text-amber-500 mb-3" />
          <h2 className="text-lg font-bold text-text">Vista exclusiva para docentes</h2>
          <p className="mt-2 text-sm text-muted max-w-md">
            Debes tener activo el rol de docente en el menú de usuario para ver el análisis de errores.
          </p>
          <Button href="/inicio" variant="soft" className="mt-4">
            Volver a Inicio
          </Button>
        </Card>
      </div>
    );
  }

  const errorTopics = await getQuizErrorAnalytics();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contenidos a reforzar"
        subtitle="Detección de preguntas críticas donde más se equivocan los alumnos y consejos pedagógicos"
        breadcrumbs={[
          { label: 'Panel docente', href: '/docente' },
          { label: 'Contenidos a reforzar' },
        ]}
      />

      <TeacherQuizAnalyticsView errorTopics={errorTopics} />
    </div>
  );
}
