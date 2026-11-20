import * as React from 'react';
import { Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { ProgressRing } from '@/components/charts/ProgressRing';
import { Mascot } from '@/components/brand/Mascot';
import { SpeechBubble } from '@/components/brand/SpeechBubble';
import { getProgress } from '@/services/progressService';
import { getPerformanceCategory } from '@/lib/progress';

export default async function ProgresoPage() {
  const data = await getProgress();
  const { kpis, courses, strengths, weaknesses } = data;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Mi progreso"
        subtitle="Avance de contenidos y respuestas correctas"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Mi progreso' }]}
      />

      {/* KPI Cards */}
      <section aria-label="Métricas principales" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Avance Global */}
        <Card className="flex items-center gap-4 p-5">
          <ProgressRing value={kpis.globalProgress} size={64} strokeWidth={6} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Avance global
            </p>
            <p className="text-xl font-bold text-text sm:text-2xl">
              {kpis.globalProgress}%
            </p>
            <p className="text-xs text-muted">Del plan anual</p>
          </div>
        </Card>

        {/* Respuestas correctas */}
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Respuestas correctas
            </p>
            <p className="text-xl font-bold text-text sm:text-2xl">
              {kpis.correctAnswerRate}%
            </p>
            <p className="text-xs text-muted">Porcentaje de aciertos</p>
          </div>
        </Card>
      </section>

      {/* Main Grid: Cursos & Gráficos + Fortalezas & FisioBot */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (7 cols): Cursos y Gráfica */}
        <div className="space-y-8 lg:col-span-7">
          {/* Cursos */}
          <Card className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text">Avance por curso</h2>
                <p className="text-xs text-muted">
                  Progreso en cada módulo del programa de Fisiología
                </p>
              </div>
              <Button href="/cursos" variant="ghost" size="sm">
                Ver cursos →
              </Button>
            </div>

            <div className="space-y-5">
              {courses.map((course) => (
                <div key={course.courseId} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-text">{course.title}</span>
                    <span className="text-xs text-muted">
                      {course.completedUnits}/{course.totalUnits} unidades ({course.progress}%)
                    </span>
                  </div>
                  <ProgressBar value={course.progress} size="md" />
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Column (5 cols): Fortalezas, Debilidades y FisioBot */}
        <div className="space-y-8 lg:col-span-5">
          {/* Fortalezas & Áreas de Mejora */}
          <Card className="space-y-6 p-6">
            <div>
              <h2 className="text-lg font-bold text-text">Diagnóstico de dominio</h2>
              <p className="text-xs text-muted">
                Temas con mejor rendimiento y conceptos a reforzar
              </p>
            </div>

            {/* Fortalezas */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-strong">
                <Award className="h-4 w-4" />
                <span>Fortalezas destacadas</span>
              </div>
              <div className="space-y-2">
                {strengths.map((item) => {
                  const cat = getPerformanceCategory(item.score);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-surface-raised p-3 text-sm"
                    >
                      <div className="pr-2">
                        <p className="font-medium text-text">{item.topicTitle}</p>
                        <p className="text-[11px] text-muted">{item.unitTitle}</p>
                      </div>
                      <Badge variant={cat.variant}>{item.score}%</Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Áreas a Reforzar */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4" />
                <span>Temas a reforzar</span>
              </div>
              <div className="space-y-2">
                {weaknesses.map((item) => {
                  const cat = getPerformanceCategory(item.score);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-surface-raised p-3 text-sm"
                    >
                      <div className="pr-2">
                        <p className="font-medium text-text">{item.topicTitle}</p>
                        <p className="text-[11px] text-muted">{item.unitTitle}</p>
                      </div>
                      <Badge variant={cat.variant}>{item.score}%</Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* FisioBot Coaching Card */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary-soft/40 via-surface to-accent-soft/30 p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 pt-1">
                <Mascot size="md" float />
              </div>
              <div className="space-y-3">
                <SpeechBubble className="text-xs leading-relaxed text-text">
                  ¡Gran trabajo manteniendo tu racha de 5 días! Estás sólido en presiones
                  transmurales. Dale una mirada a la ley de Poiseuille antes del viernes.
                </SpeechBubble>
                <div className="pt-2">
                  <Button href="/ejercicios/banco" size="sm" className="w-full">
                    Practicar temas sugeridos →
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
