'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Table, type Column } from '@/components/ui/Table';
import { calculateGradesSummary } from '@/lib/grades';
import type { CourseGrades, GradeItem } from '@/schemas/grades';
import {
  Calculator,
  Award,
  CheckCircle2,
  Info,
  Layers,
} from 'lucide-react';

export interface GradesDashboardProps {
  courseGrades: CourseGrades;
}

export function GradesDashboard({ courseGrades }: GradesDashboardProps) {
  const summary = calculateGradesSummary(courseGrades);

  const columns: Column<GradeItem>[] = [
    {
      key: 'name',
      header: 'Evaluación',
      render: (item) => (
        <div className="space-y-0.5">
          <p className="font-bold text-text">{item.name}</p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>{item.category}</span>
            <span>·</span>
            <span>{item.date}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'courseWeightPercent',
      header: 'Ponderación curso',
      render: (item) => (
        <span className="font-semibold text-text">
          {item.courseWeightPercent}%
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (item) => (
        <Badge
          variant={item.status === 'graded' ? 'primary' : 'muted'}
          size="sm"
        >
          {item.status === 'graded' ? 'Calificada' : 'Pendiente'}
        </Badge>
      ),
    },
    {
      key: 'score',
      header: 'Calificación (1.0 - 7.0)',
      render: (item) => {
        if (item.score === null) {
          return <span className="text-muted font-medium italic">— Por rendir —</span>;
        }
        const isPass = item.score >= item.minPassScore;
        const isExempt = item.score >= 5.5;

        return (
          <div className="flex items-center gap-2">
            <span
              className={`text-base font-extrabold ${
                isExempt
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : isPass
                    ? 'text-primary-strong'
                    : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {item.score.toFixed(1)}
            </span>
            <span className="text-[11px] text-muted">/ {item.maxScore.toFixed(1)}</span>
          </div>
        );
      },
    },
    {
      key: 'feedback',
      header: 'Retroalimentación docente',
      render: (item) => (
        <p className="text-xs text-muted max-w-xs line-clamp-2">
          {item.feedback || 'Sin observaciones adicionales.'}
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* 4 Summary KPI Cards */}
      <section
        aria-label="Resumen de calificaciones"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Promedio Ponderado Actual */}
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Promedio ponderado
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
              <Calculator className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-text">
              {summary.currentWeightedAverage.toFixed(1)}
            </span>
            <span className="text-xs text-muted">/ 7.0</span>
          </div>
          <Badge tone={summary.statusBadge.tone} size="sm">
            {summary.statusBadge.label}
          </Badge>
        </Card>

        {/* Avance Evaluativo */}
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Porcentaje evaluado
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-text">
              {summary.evaluatedWeightPercent}%
            </span>
            <span className="text-xs text-muted">de 100%</span>
          </div>
          <ProgressBar value={summary.evaluatedWeightPercent} size="sm" ariaLabel="Avance evaluado" />
        </Card>

        {/* Nota Requerida para Aprobar */}
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Para aprobar (4.0)
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-text">
              {summary.neededScoreForPass.toFixed(1)}
            </span>
            <span className="text-xs text-muted">en restante ({summary.remainingWeightPercent}%)</span>
          </div>
          <p className="text-[11px] text-muted">
            {summary.neededScoreForPass <= 1.0
              ? '¡Aprobación asegurada con asistencia!'
              : 'Promedio necesario en pruebas pendientes'}
          </p>
        </Card>

        {/* Escala Universitaria */}
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Escala de notas
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised text-muted">
              <Info className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Punto base:</span>
              <span className="font-bold text-text">1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Aprobación (60%):</span>
              <span className="font-bold text-text">4.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Eximición examen:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-300">5.5</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Course Evaluation Rules & Weights Explanation */}
      <Card tone="surface" padding="lg" className="space-y-4 border-border/80">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong">
            <Layers className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-text">
              Reglamento de evaluación y cálculo de notas
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              {courseGrades.rulesExplanation}
            </p>
          </div>
        </div>

        {/* Category breakdown blocks */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2 border-t border-border/60">
          {courseGrades.categoryRules.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-border/50 bg-surface-raised p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-text">{cat.name}</span>
                <Badge variant="primary" size="sm">
                  {cat.weightPercent}% del curso
                </Badge>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Grades Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text">Desglose de evaluaciones</h2>
            <p className="text-xs text-muted">
              Calificaciones parciales, ponderaciones y comentarios de cátedra
            </p>
          </div>
        </div>

        <Table
          columns={columns}
          data={courseGrades.grades}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
}
