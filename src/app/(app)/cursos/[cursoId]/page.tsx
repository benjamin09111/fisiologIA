import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Route } from 'next';
import { getCourse } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressRing } from '@/components/charts/ProgressRing';
import { ModuleImage } from '@/components/ui/ModuleImage';
import { ChevronRight, Lock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/cn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cursoId: string }>;
}): Promise<Metadata> {
  const { cursoId } = await params;
  const course = await getCourse(cursoId);
  if (!course) return { title: 'Curso no encontrado' };
  return {
    title: `${course.title} — FisiologIA`,
    description: course.description,
  };
}

export default async function CursoDetailPage({
  params,
}: {
  params: Promise<{ cursoId: string }>;
}) {
  const { cursoId } = await params;
  const course = await getCourse(cursoId);

  if (!course) {
    notFound();
  }

  const isLocked = course.status === 'locked';

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        title={course.title}
        subtitle={course.description}
        breadcrumbs={[
          { label: 'Mis cursos', href: '/cursos' },
          { label: course.title },
        ]}
      />

      {/* Course Hero Stats Card */}
      <Card tone="surface" padding="lg" className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <ModuleImage src={course.imageSrc} alt={course.title} size="lg" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge tone={isLocked ? 'locked' : 'active'}>
                {isLocked ? 'Bloqueado' : 'En curso'}
              </Badge>
              <span className="text-xs text-muted">
                {course.units.length} {course.units.length === 1 ? 'unidad' : 'unidades'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-text">{course.title}</h2>
            <p className="text-xs text-muted max-w-md">{course.description}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <ProgressRing value={course.progress} size={84} />
          <span className="mt-1 text-xs font-semibold text-muted">Avance del módulo</span>
        </div>
      </Card>

      {/* Units List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-text tracking-tight flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary-strong" />
          <span>Unidades temáticas</span>
        </h3>

        <div className="flex flex-col gap-3">
          {course.units.map((unit) => {
            const unitLocked = unit.status === 'locked';
            const unitCard = (
              <Card
                tone="surface"
                interactive={!unitLocked}
                padding="md"
                className={cn(
                  'group flex flex-col sm:flex-row sm:items-center justify-between gap-4',
                  unitLocked ? 'opacity-65 bg-surface/60' : 'hover:border-primary/50',
                )}
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary-strong uppercase tracking-wider">
                      Unidad {unit.number}
                    </span>
                    <Badge tone={unitLocked ? 'locked' : 'active'}>
                      {unitLocked ? 'Bloqueada' : 'En progreso'}
                    </Badge>
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-text group-hover:text-primary-strong transition-colors">
                    {unit.title}
                  </h4>
                  <p className="text-xs text-muted line-clamp-1">{unit.description}</p>
                </div>

                <div className="flex items-center gap-5 sm:min-w-[220px]">
                  <div className="flex-1">
                    <ProgressBar value={unit.progress} showLabel size="sm" />
                  </div>
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform',
                      unitLocked
                        ? 'bg-muted/15 text-muted'
                        : 'bg-primary-soft text-primary-strong group-hover:translate-x-0.5',
                    )}
                  >
                    {unitLocked ? <Lock className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </div>
              </Card>
            );

            if (unitLocked) {
              return (
                <div key={unit.id} className="cursor-not-allowed select-none">
                  {unitCard}
                </div>
              );
            }

            return (
              <Link
                key={unit.id}
                href={`/cursos/${course.id}/unidades/${unit.id}` as Route}
                className="block"
              >
                {unitCard}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
