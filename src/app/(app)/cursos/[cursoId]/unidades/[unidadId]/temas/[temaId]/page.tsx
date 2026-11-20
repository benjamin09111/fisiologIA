import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Route } from 'next';
import { getTopic, getUnit, getCourse } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mascot } from '@/components/brand/Mascot';
import { Check, ArrowLeft, ArrowRight, Bot, BookOpen } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cursoId: string; unidadId: string; temaId: string }>;
}): Promise<Metadata> {
  const { cursoId, unidadId, temaId } = await params;
  const topic = await getTopic(cursoId, unidadId, temaId);
  if (!topic) return { title: 'Tema no encontrado' };
  return {
    title: `${topic.title} — FisiologIA`,
    description: topic.description,
  };
}

export default async function TemaDetailPage({
  params,
}: {
  params: Promise<{ cursoId: string; unidadId: string; temaId: string }>;
}) {
  const { cursoId, unidadId, temaId } = await params;
  const [course, unit, topic] = await Promise.all([
    getCourse(cursoId),
    getUnit(cursoId, unidadId),
    getTopic(cursoId, unidadId, temaId),
  ]);

  if (!course || !unit || !topic) {
    notFound();
  }

  // Find previous and next topics
  const currentIndex = unit.topics.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? unit.topics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < unit.topics.length - 1 ? unit.topics[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        title={topic.title}
        subtitle={topic.description}
        breadcrumbs={[
          { label: 'Mis cursos', href: '/cursos' },
          { label: course.title, href: `/cursos/${course.id}` },
          { label: `Unidad ${unit.number}`, href: `/cursos/${course.id}/unidades/${unit.id}` },
          { label: topic.title },
        ]}
        actions={
          <Badge tone={topic.completed ? 'success' : 'active'}>
            {topic.completed ? 'Completado' : 'En estudio'}
          </Badge>
        }
      />

      {/* Key points box */}
      <Card tone="soft" padding="md" className="space-y-3 border-primary/40">
        <h3 className="text-xs font-bold uppercase tracking-wider text-primary-strong flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>Puntos clave para recordar</span>
        </h3>
        <ul className="space-y-2">
          {topic.keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-text">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-strong text-on-primary">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </div>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Main Theoretical Content */}
      <Card tone="surface" padding="lg" className="space-y-4 shadow-card">
        <h3 className="text-lg font-bold text-text">Fundamentos teóricos</h3>
        <p className="text-sm md:text-base leading-relaxed text-text/90">
          {topic.content}
        </p>
      </Card>

      {/* FisioBot Assistant Banner */}
      <Card tone="lavender" padding="md" className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Mascot size="sm" />
          <div>
            <h4 className="text-sm font-bold text-text">¿Te quedan dudas sobre este tema?</h4>
            <p className="text-xs text-muted">FisioBot puede resolver tus preguntas clínicas y fisiológicas en el chat.</p>
          </div>
        </div>
        <Button
          variant="solid"
          size="sm"
          href="/fisioia"
          iconRight={<Bot className="h-4 w-4" />}
        >
          Preguntar a FisioBot
        </Button>
      </Card>

      {/* Topic Pagination Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/40">
        {prevTopic ? (
          <Button
            variant="ghost"
            href={`/cursos/${course.id}/unidades/${unit.id}/temas/${prevTopic.id}` as Route}
            iconLeft={<ArrowLeft className="h-4 w-4" />}
          >
            {prevTopic.title}
          </Button>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Button
            variant="solid"
            href={`/cursos/${course.id}/unidades/${unit.id}/temas/${nextTopic.id}` as Route}
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            {nextTopic.title}
          </Button>
        ) : (
          <Button
            variant="soft"
            href="/ejercicios/cuestionarios/quiz-mecanica-1"
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            Practicar con cuestionario
          </Button>
        )}
      </div>
    </div>
  );
}
