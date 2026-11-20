import * as React from 'react';
import type { Metadata } from 'next';
import { getCourses } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseCard } from '@/features/courses/CourseCard';
import { CourseFilters } from '@/features/courses/CourseFilters';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Mis cursos — FisiologIA',
  description: 'Explora los módulos de estudio de fisiología humana.',
};

export default async function CursosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado = 'todos' } = await searchParams;
  const allCourses = await getCourses();

  const filteredCourses = allCourses.filter((course) => {
    if (estado === 'en_curso') return course.status === 'in_progress';
    if (estado === 'bloqueados') return course.status === 'locked';
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Nuestros módulos"
        subtitle="Módulos formativos organizados por sistemas fisiológicos"
        breadcrumbs={[{ label: 'Mis cursos' }]}
        actions={<CourseFilters currentStatus={estado} />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => (
          <Reveal key={course.id} index={idx}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
