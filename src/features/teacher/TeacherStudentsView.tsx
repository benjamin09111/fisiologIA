'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import type { StudentOverview, StudentStatus } from '@/schemas/teacher';
import {
  Users,
  Search,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Clock,
  Filter,
  Eye,
  GraduationCap,
} from 'lucide-react';

export interface TeacherStudentsViewProps {
  students: StudentOverview[];
}

const STATUS_CONFIG: Record<
  StudentStatus,
  { label: string; tone: 'danger' | 'active' | 'success'; icon: React.ComponentType<{ className?: string }> }
> = {
  support_needed: { label: 'Requiere apoyo', tone: 'danger', icon: AlertTriangle },
  good: { label: 'En buen ritmo', tone: 'active', icon: CheckCircle2 },
  excellent: { label: 'Destacado', tone: 'success', icon: Sparkles },
};

export function TeacherStudentsView({ students }: TeacherStudentsViewProps) {
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedStudent, setSelectedStudent] = React.useState<StudentOverview | null>(null);

  const filteredStudents = React.useMemo(() => {
    return students.filter((s) => {
      if (filterStatus !== 'all' && s.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.alias.toLowerCase().includes(q) ||
          s.weakTopics.some((t) => t.toLowerCase().includes(q)) ||
          s.strongTopics.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [students, filterStatus, searchQuery]);

  const supportCount = students.filter((s) => s.status === 'support_needed').length;
  const goodCount = students.filter((s) => s.status === 'good').length;
  const excellentCount = students.filter((s) => s.status === 'excellent').length;

  return (
    <div className="space-y-6">
      {/* KPI Cards Summary */}
      <section
        aria-label="Resumen de cohorte"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Total alumnos
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text">{students.length}</p>
          <p className="text-xs text-muted">Inscritos en la sección</p>
        </Card>

        <Card className="p-5 space-y-1 border-rose-500/20 bg-rose-500/5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Requieren apoyo
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text">{supportCount}</p>
          <p className="text-xs text-muted">Aciertos &lt; 60% en quizes</p>
        </Card>

        <Card className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              En buen ritmo
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text">{goodCount}</p>
          <p className="text-xs text-muted">Avance y aciertos adecuados</p>
        </Card>

        <Card className="p-5 space-y-1 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Destacados
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text">{excellentCount}</p>
          <p className="text-xs text-muted">Aciertos &ge; 90% en quizes</p>
        </Card>
      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtro por estado">
          <span className="text-xs font-semibold text-muted flex items-center gap-1 mr-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Estado:</span>
          </span>
          {[
            { id: 'all', label: `Todos (${students.length})` },
            { id: 'support_needed', label: `Requiere apoyo (${supportCount})` },
            { id: 'good', label: `En ritmo (${goodCount})` },
            { id: 'excellent', label: `Destacados (${excellentCount})` },
          ].map((pill) => {
            const isSelected = filterStatus === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setFilterStatus(pill.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? 'bg-primary text-surface shadow-xs'
                    : 'bg-surface border border-border/80 text-muted hover:text-text hover:bg-surface-raised'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por alias o concepto..."
            aria-label="Buscar estudiante"
            iconLeft={<Search className="h-4 w-4 text-muted" />}
          />
        </div>
      </div>

      {/* Students Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((std) => {
          const conf = STATUS_CONFIG[std.status];
          const Icon = conf.icon;

          return (
            <Card
              key={std.id}
              className="flex flex-col justify-between p-5 border border-border/70 hover:border-primary/40 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Header: Avatar, Alias, Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar name={std.alias} size="md" />
                    <div>
                      <h3 className="text-sm font-bold text-text">{std.alias}</h3>
                      <p className="text-[11px] text-muted flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {std.lastActive}
                      </p>
                    </div>
                  </div>
                  <Badge tone={conf.tone} size="sm">
                    <Icon className="h-3 w-3 mr-1 inline" />
                    {conf.label}
                  </Badge>
                </div>

                {/* Progress & Quiz Metrics */}
                <div className="space-y-2 rounded-xl bg-surface-raised p-3 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-text mb-1">
                      <span>Avance de contenidos</span>
                      <span>{std.contentProgress}%</span>
                    </div>
                    <ProgressBar value={std.contentProgress} size="sm" ariaLabel="Avance de contenidos" />
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-border/40">
                    <span className="text-muted">Aciertos en quizes:</span>
                    <span className="font-extrabold text-text text-sm">{std.quizAccuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Quizes completados:</span>
                    <span className="font-semibold text-text">{std.quizzesTaken} evaluaciones</span>
                  </div>
                </div>

                {/* Critical weak topic if any */}
                {std.weakTopics.length > 0 && (
                  <div className="text-xs">
                    <p className="font-bold text-rose-800 dark:text-rose-300 text-[11px] uppercase tracking-wider mb-1">
                      Concepto a reforzar:
                    </p>
                    <p className="text-muted line-clamp-1 bg-rose-500/5 border border-rose-500/20 rounded-md p-1.5 text-[11px]">
                      {std.weakTopics[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-border/60 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStudent(std)}
                  iconLeft={<Eye className="h-3.5 w-3.5" />}
                >
                  Ver ficha pedagógica
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Ficha Pedagógica · ${selectedStudent.alias}`}
        >
          <div className="space-y-5">
            {/* Header info */}
            <div className="flex items-center justify-between rounded-2xl bg-primary-soft/30 p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <Avatar name={selectedStudent.alias} size="lg" />
                <div>
                  <h4 className="text-base font-bold text-text">{selectedStudent.alias}</h4>
                  <p className="text-xs text-muted">{selectedStudent.section}</p>
                </div>
              </div>
              <Badge tone={STATUS_CONFIG[selectedStudent.status].tone}>
                {STATUS_CONFIG[selectedStudent.status].label}
              </Badge>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface-raised p-3 space-y-1">
                <p className="text-[11px] text-muted uppercase font-bold">Avance del programa</p>
                <p className="text-xl font-bold text-text">{selectedStudent.contentProgress}%</p>
                <ProgressBar value={selectedStudent.contentProgress} size="sm" ariaLabel="Avance" />
              </div>
              <div className="rounded-xl border border-border bg-surface-raised p-3 space-y-1">
                <p className="text-[11px] text-muted uppercase font-bold">Aciertos en quizes</p>
                <p className="text-xl font-bold text-text">{selectedStudent.quizAccuracy}%</p>
                <p className="text-xs text-muted">{selectedStudent.quizzesTaken} quizes realizados</p>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Temas con alto dominio</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.strongTopics.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedStudent.weakTopics.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Conceptos a reforzar</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStudent.weakTopics.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 text-xs font-medium text-rose-800 dark:text-rose-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Quizzes */}
            <div className="space-y-2 border-t border-border pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" />
                <span>Últimos quizes rendidos</span>
              </p>
              <div className="space-y-2">
                {selectedStudent.recentQuizAttempts.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-surface-raised p-2.5 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-text">{q.quizTitle}</p>
                      <p className="text-[11px] text-muted">{q.date}</p>
                    </div>
                    <Badge tone={q.score >= 70 ? 'success' : q.score >= 50 ? 'warning' : 'danger'}>
                      {q.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end pt-2 border-t border-border">
              <Button variant="solid" onClick={() => setSelectedStudent(null)}>
                Cerrar ficha
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
