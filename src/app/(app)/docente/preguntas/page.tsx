import * as React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { getCurrentUser } from '@/services/userService';
import { getTeacherStudentQuestions } from '@/services/teacherService';
import { TeacherInquiriesView } from '@/features/teacher/TeacherInquiriesView';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Consultas de alumnos — Panel Docente FisiologIA',
  description: 'Buzón de preguntas teóricas y clínicas enviadas por los estudiantes del curso.',
};

export default async function DocentePreguntasPage() {
  const user = await getCurrentUser();

  if (user.role !== 'teacher') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Consultas de alumnos"
          subtitle="Buzón de preguntas del curso"
          breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Docente' }]}
        />
        <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
          <ShieldAlert className="h-10 w-10 text-amber-500 mb-3" />
          <h2 className="text-lg font-bold text-text">Vista exclusiva para docentes</h2>
          <p className="mt-2 text-sm text-muted max-w-md">
            Debes tener activo el rol de docente en el menú de usuario para responder consultas.
          </p>
          <Button href="/inicio" variant="soft" className="mt-4">
            Volver a Inicio
          </Button>
        </Card>
      </div>
    );
  }

  const inquiries = await getTeacherStudentQuestions();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Consultas de alumnos"
        subtitle="Dudas teóricas y clínicas enviadas por tus estudiantes para responder y orientar"
        breadcrumbs={[
          { label: 'Panel docente', href: '/docente' },
          { label: 'Consultas de alumnos' },
        ]}
      />

      <TeacherInquiriesView initialInquiries={inquiries} />
    </div>
  );
}
