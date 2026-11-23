import * as React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { getCurrentUser } from '@/services/userService';
import { getTeacherStudents } from '@/services/teacherService';
import { TeacherStudentsView } from '@/features/teacher/TeacherStudentsView';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mis alumnos — Panel Docente FisiologIA',
  description: 'Seguimiento de la cohorte de alumnos, avance pedagógico y áreas de apoyo.',
};

export default async function DocenteAlumnosPage() {
  const user = await getCurrentUser();

  if (user.role !== 'teacher') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Mis alumnos"
          subtitle="Vista de supervisión de cohorte"
          breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Docente' }]}
        />
        <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
          <ShieldAlert className="h-10 w-10 text-amber-500 mb-3" />
          <h2 className="text-lg font-bold text-text">Vista exclusiva para docentes</h2>
          <p className="mt-2 text-sm text-muted max-w-md">
            Debes tener activo el rol de docente en el menú de usuario para supervisar alumnos.
          </p>
          <Button href="/inicio" variant="soft" className="mt-4">
            Volver a Inicio
          </Button>
        </Card>
      </div>
    );
  }

  const students = await getTeacherStudents();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Mis alumnos"
        subtitle="Supervisión pedagógica individual y métricas de avance de la cohorte"
        breadcrumbs={[
          { label: 'Panel docente', href: '/docente' },
          { label: 'Mis alumnos' },
        ]}
      />

      <TeacherStudentsView students={students} />
    </div>
  );
}
