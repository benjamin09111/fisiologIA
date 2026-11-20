import * as React from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Target, BookOpenCheck } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getTeacherResults } from '@/services/teacherService';

interface PageProps {
  params: Promise<{ unidadId: string }>;
}

export default async function DocenteUnidadDetailPage({ params }: PageProps) {
  const { unidadId } = await params;
  const results = await getTeacherResults();
  const unit = results.unitsStats.find((u) => u.unitId === unidadId);

  if (!unit) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button href="/docente" variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al panel docente</span>
        </Button>
      </div>

      <PageHeader
        title={unit.unitTitle}
        subtitle={`${unit.courseTitle} · Análisis pedagógico y áreas críticas`}
        breadcrumbs={[
          { label: 'Inicio', href: '/inicio' },
          { label: 'Panel docente', href: '/docente' },
          { label: unit.unitTitle },
        ]}
      />

      {/* Unit KPI Row */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-strong">
             <BookOpenCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Avance de contenidos
            </p>
            <p className="text-xl font-bold text-text sm:text-2xl">{unit.contentProgress}%</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
             <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Respuestas correctas
            </p>
            <p className="text-xl font-bold text-text sm:text-2xl">{unit.correctAnswerRate}%</p>
            <p className="text-xs text-muted">Porcentaje agregado de aciertos</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
             <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Visibilidad
            </p>
            <p className="text-xl font-bold text-text sm:text-2xl">Agregada</p>
            <p className="text-xs text-muted">Sin datos individuales</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
             <BookOpenCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Indicador
            </p>
            <p className="text-xl font-bold text-text sm:text-2xl">Aciertos</p>
            <p className="text-xs text-muted">Métrica de la unidad</p>
          </div>
        </Card>
      </section>

      {/* Main Grid: Most Failed Questions + Remedial Recommendations */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Preguntas más falladas (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <Card className="space-y-6 p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <h2 className="text-lg font-bold text-text">Preguntas más falladas</h2>
                <p className="text-xs text-muted">
                  Conceptos que presentaron mayor tasa de error en la cohorte
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {unit.mostFailedQuestions.map((q) => (
                <div
                  key={q.questionId}
                  className="space-y-2 rounded-2xl border border-border bg-surface-raised p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-text">{q.text}</p>
                    <Badge variant="warning">{q.failureRate}% error</Badge>
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Tasa de fallo</span>
                      <span>{q.failureRate}% de la cohorte</span>
                    </div>
                    <ProgressBar value={q.failureRate} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sugerencias pedagógicas (5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          <Card className="space-y-4 p-6">
            <h2 className="text-base font-bold text-text">Acciones pedagógicas recomendadas</h2>
            <div className="space-y-3 text-xs leading-relaxed text-muted">
              <p>
                • <strong>Taller sincrónico:</strong> Dedicar 20 minutos de la próxima sesión
                a resolver ejercicios de gradiente de presiones y resistencia al flujo.
              </p>
              <p>
                • <strong>FisioBot Refuerzo:</strong> Promover en los estudiantes el uso de la
                tarjeta de práctica para la ley de Poiseuille.
              </p>
              <p>
                • <strong>Material de apoyo:</strong> Compartir en Biblioteca el esquema
                interactivo de ramificaciones bronquiales.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
