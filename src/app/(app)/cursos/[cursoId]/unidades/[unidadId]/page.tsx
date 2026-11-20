import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Route } from 'next';
import { getUnit, getCourse } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CheckCircle2, Circle, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cursoId: string; unidadId: string }>;
}): Promise<Metadata> {
  const { cursoId, unidadId } = await params;
  const unit = await getUnit(cursoId, unidadId);
  if (!unit) return { title: 'Unidad no encontrada' };
  return {
    title: `Unidad ${unit.number}: ${unit.title} — FisiologIA`,
    description: unit.description,
  };
}

export default async function UnidadDetailPage({
  params,
}: {
  params: Promise<{ cursoId: string; unidadId: string }>;
}) {
  const { cursoId, unidadId } = await params;
  const [course, unit] = await Promise.all([
    getCourse(cursoId),
    getUnit(cursoId, unidadId),
  ]);

  if (!course || !unit) {
    notFound();
  }

  const isLocked = unit.status === 'locked';

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        title={`Unidad ${unit.number}: ${unit.title}`}
        subtitle={unit.description}
        breadcrumbs={[
          { label: 'Mis cursos', href: '/cursos' },
          { label: course.title, href: `/cursos/${course.id}` },
          { label: `Unidad ${unit.number}` },
        ]}
        actions={
          !isLocked && (
            <Button
              variant="solid"
              href="/ejercicios/cuestionarios/quiz-mecanica-1"
              iconRight={<Sparkles className="h-4 w-4" />}
            >
              Practicar esta unidad
            </Button>
          )
        }
      />

      {/* Unit Status Overview */}
      <Card tone="surface" padding="md" className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge tone={isLocked ? 'locked' : 'active'}>
              {isLocked ? 'Bloqueada' : 'En progreso'}
            </Badge>
            <span className="text-xs font-semibold text-muted">
              {unit.completedTopicsCount} de {unit.topicsCount} temas completados
            </span>
          </div>
          <h2 className="text-base font-bold text-text">{unit.title}</h2>
        </div>

        <div className="w-full sm:w-64">
          <ProgressBar value={unit.progress} showLabel />
        </div>
      </Card>

      {/* Topics list */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-text tracking-tight flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary-strong" />
          <span>Temas de la unidad</span>
        </h3>

        <div className="flex flex-col gap-3">
          {unit.topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/cursos/${course.id}/unidades/${unit.id}/temas/${topic.id}` as Route}
              className="block group"
            >
              <Card
                tone="surface"
                interactive
                padding="md"
                className="flex items-center justify-between gap-4 hover:border-primary/50"
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    {topic.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-success fill-success/15" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text group-hover:text-primary-strong transition-colors">
                      {topic.order}. {topic.title}
                    </h4>
                    <p className="text-xs text-muted mt-0.5 line-clamp-1">
                      {topic.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {topic.completed && (
                    <Badge tone="success" className="hidden sm:inline-flex">
                      Completado
                    </Badge>
                  )}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong group-hover:translate-x-0.5 transition-transform">
                    <ChevronRight className="h-4 w-4 stroke-[2]" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
