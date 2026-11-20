import * as React from 'react';
import { ArrowRight, ShieldAlert, BookOpenCheck, Target } from 'lucide-react';
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
        subtitle="Solo avance de contenidos y respuestas correctas agregadas por unidad"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Panel docente' }]}
      />

      {/* KPI Cards */}
      <section aria-label="Métricas agregadas por unidad" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Avance de contenidos */}
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-strong">
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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Indicador</p>
            <p className="text-xl font-bold text-text sm:text-2xl">Por unidad</p>
            <p className="text-xs text-muted">Porcentaje de aciertos</p>
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
