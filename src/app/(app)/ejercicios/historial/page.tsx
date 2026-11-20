import * as React from 'react';
import type { Metadata } from 'next';
import type { Route } from 'next';
import { getAttempts } from '@/services/exerciseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { ExerciseTabs } from '@/features/exercises/ExerciseTabs';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Historial de Intentos — FisiologIA',
};

export default async function HistorialEjerciciosPage() {
  const attempts = await getAttempts();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="Historial de evaluaciones"
        subtitle="Registro histórico de cuestionarios rendidos, puntajes y correcciones"
      />

      <ExerciseTabs activeKey="history" />

      <Table
        data={attempts}
        keyExtractor={(item) => item.id}
        emptyMessage="No has rendido cuestionarios aún. ¡Prueba uno en la pestaña Cuestionarios!"
        columns={[
          {
            key: 'createdAt',
            header: 'Fecha',
            render: (item) => {
              const d = new Date(item.createdAt);
              return (
                <span className="text-xs text-muted">
                  {d.toLocaleDateString('es-CL')}
                </span>
              );
            },
          },
          {
            key: 'quizTitle',
            header: 'Evaluación',
            render: (item) => (
              <div className="flex flex-col">
                <span className="font-bold text-text">{item.quizTitle}</span>
                <span className="text-xs text-muted">{item.unitTitle}</span>
              </div>
            ),
          },
          {
            key: 'correctCount',
            header: 'Aciertos',
            render: (item) => (
              <span className="text-xs font-semibold text-text">
                {item.correctCount} / {item.totalCount}
              </span>
            ),
          },
          {
            key: 'score',
            header: 'Puntaje',
            render: (item) => (
              <span className="font-bold text-primary-strong">
                {item.score}%
              </span>
            ),
          },
          {
            key: 'status',
            header: 'Estado',
            render: (item) => (
              <Badge tone={item.score >= 70 ? 'success' : 'danger'}>
                {item.score >= 70 ? 'Aprobado' : 'Por reforzar'}
              </Badge>
            ),
          },
          {
            key: 'action',
            header: '',
            className: 'text-right',
            render: (item) => (
              <Button
                variant="ghost"
                size="sm"
                href={`/ejercicios/cuestionarios/${item.quizId}/resultado/${item.id}` as Route}
              >
                Ver detalle →
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
