import * as React from 'react';
import { ArrowRight, ShieldAlert, BookOpenCheck, Target, Users, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, type Column } from '@/components/ui/Table';
import { BarChart } from '@/components/charts/BarChart';
import { getCurrentUser } from '@/services/userService';
import { getTeacherResults } from '@/services/teacherService';
import { getUnitScoreStatus, formatUnitsChartData } from '@/lib/teacher';
import type { UnitStats } from '@/schemas/teacher';

export default async function DocentePanelPage() {
  const user = await getCurrentUser();

  if (user.role !== 'teacher') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Panel docente"
          subtitle="Vista de supervisión pedagógica y analítica del curso"
          breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Panel docente' }]}
        />
        <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-bold text-text">Vista exclusiva para docentes</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Actualmente tienes activo el rol de estudiante. Puedes cambiar al perfil de Docente
            desde el menú de usuario (esquina superior derecha) para explorar este panel.
          </p>
          <div className="mt-6">
            <Button href="/inicio" variant="soft">
              Volver a Inicio
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const results = await getTeacherResults();
  const { unitsStats } = results;
  const chartData = formatUnitsChartData(unitsStats);

  const columns: Column<UnitStats>[] = [
    {
      key: 'unitTitle',
      header: 'Unidad temática',
      render: (u) => (
        <div>
          <p className="font-semibold text-text">{u.unitTitle}</p>
          <p className="text-xs text-muted">{u.courseTitle}</p>
        </div>
      ),
    },
    {
      key: 'contentProgress',
      header: 'Avance de contenidos',
      render: (u) => <span className="font-bold text-text">{u.contentProgress}%</span>,
    },
    {
      key: 'correctAnswerRate',
      header: 'Respuestas correctas',
      render: (u) => <span className="font-medium text-text">{u.correctAnswerRate}%</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      render: (u) => {
        const status = getUnitScoreStatus(u.correctAnswerRate);
        return <Badge variant={status.variant}>{status.label}</Badge>;
      },
    },
    {
      key: 'actions',
      header: '',
      render: (u) => (
        <Button href={`/docente/unidades/${u.unitId}`} variant="ghost" size="sm">
          <span>Ver detalle</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Panel docente"
        subtitle="Analítica y supervisión pedagógica con métricas consolidadas 100% anónimas"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Panel docente' }]}
      />

      {/* Anonymous Cohort Banner */}
      <div className="rounded-2xl border border-primary/30 bg-linear-to-r from-primary-soft/40 via-surface to-accent-soft/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-text">
              {results.teacherName || 'Dr. Carlos Mendoza'} · {results.section || 'Sección 1 (Cátedra A)'}
            </span>
          </div>
          <p className="text-xs text-muted">
            Los estudiantes inscritos en esta sección comparten sus avances y respuestas de forma anónima para resguardar la privacidad.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4" />
            <span>Métricas 100% Anónimas</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <section aria-label="Métricas agregadas por unidad" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Estudiantes anónimos */}
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-strong">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Estudiantes</p>
            <p className="text-xl font-bold text-text sm:text-2xl">{results.anonymousStudentCount ?? 48}</p>
            <p className="text-xs text-muted">Alumnos en sección (anónimos)</p>
          </div>
        </Card>

        {/* Avance de contenidos */}
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
            <BookOpenCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Unidades</p>
            <p className="text-xl font-bold text-text sm:text-2xl">{unitsStats.length}</p>
            <p className="text-xs text-muted">Con avance agregado</p>
          </div>
        </Card>

        {/* Respuestas correctas */}
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Indicador</p>
            <p className="text-xl font-bold text-text sm:text-2xl">Cohorte</p>
            <p className="text-xs text-muted">Tasa de aciertos por sección</p>
          </div>
        </Card>
      </section>

      {/* Main Grid: BarChart + Units Table */}
      <div className="space-y-8">
        {/* Respuestas correctas por unidad */}
        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-text">Respuestas correctas por unidad</h2>
              <p className="text-xs text-muted">
                Porcentaje agregado de aciertos, sin identificar estudiantes
              </p>
            </div>
          </div>
          <div className="pt-2">
            <BarChart data={chartData} height={200} />
          </div>
        </Card>

        {/* Tabla de Unidades */}
        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-text">Rendimiento por unidad</h2>
              <p className="text-xs text-muted">
                Avance de contenidos y porcentaje de respuestas correctas por unidad
              </p>
            </div>
          </div>

          <Table<UnitStats>
            data={unitsStats}
            columns={columns}
            keyExtractor={(u) => u.unitId}
            emptyMessage="No hay estadísticas disponibles."
          />
        </Card>
      </div>
    </div>
  );
}
