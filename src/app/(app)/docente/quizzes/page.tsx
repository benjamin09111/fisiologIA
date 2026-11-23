import * as React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { getCurrentUser } from '@/services/userService';
import { getTeacherQuizzes, getTeacherQuizTemplates } from '@/services/teacherService';
import { TeacherQuizzesView } from '@/features/teacher/TeacherQuizzesView';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quizzes — Panel Docente FisiologIA',
  description: 'Crea cuestionarios rápidos, usa plantillas y supervisa resultados de tus estudiantes.',
};

export default async function DocenteQuizzesPage() {
  const user = await getCurrentUser();

  if (user.role !== 'teacher') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Quizzes del docente"
          subtitle="Creación y distribución de evaluaciones interactivas"
          breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Docente' }]}
        />
        <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
          <ShieldAlert className="h-10 w-10 text-amber-500 mb-3" />
          <h2 className="text-lg font-bold text-text">Vista exclusiva para docentes</h2>
          <p className="mt-2 text-sm text-muted max-w-md">
            Debes tener activo el rol de docente en el menú de usuario para gestionar quizzes.
          </p>
          <Button href="/inicio" variant="soft" className="mt-4">
            Volver a Inicio
          </Button>
        </Card>
      </div>
    );
  }

  const [quizzes, templates] = await Promise.all([
    getTeacherQuizzes(),
    getTeacherQuizTemplates(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quizzes"
        subtitle="Crea cuestionarios rápidamente con plantillas, compártelos a tu cohorte y analiza resultados en tiempo real."
        breadcrumbs={[
          { label: 'Panel docente', href: '/docente' },
          { label: 'Quizzes' },
        ]}
      />

      <TeacherQuizzesView initialQuizzes={quizzes} templates={templates} />
    </div>
  );
}
