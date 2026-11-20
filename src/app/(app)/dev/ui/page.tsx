import * as React from 'react';
import {
  Button,
  Card,
  Badge,
  ProgressBar,
  SectionHeader,
  Avatar,
  IconBadge,
  Table,
  Input,
  Select,
  Textarea,
  Tabs,
  Skeleton,
  EmptyState,
  ModuleImage,
} from '@/components/ui';
import { Logo } from '@/components/brand/Logo';
import { Mascot } from '@/components/brand/Mascot';
import { SpeechBubble } from '@/components/brand/SpeechBubble';
import { BarChart } from '@/components/charts/BarChart';
import { ProgressRing } from '@/components/charts/ProgressRing';
import { BookOpen, Sparkles, Search } from 'lucide-react';

export default function DevUIPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">
          UI Component Showcase
        </h1>
        <p className="text-sm text-muted">
          Página de inspección visual de primitivos y tokens de diseño.
        </p>
      </div>

      {/* Brand */}
      <section className="space-y-4 rounded-card border border-border/40 bg-surface p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Brand
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <Logo />
          <Mascot size="sm" />
          <SpeechBubble>¡Hola! Soy FisioBot ♡</SpeechBubble>
        </div>
      </section>

      {/* Buttons & Badges */}
      <section className="space-y-4 rounded-card border border-border/40 bg-surface p-6 shadow-card">
        <SectionHeader
          title="Buttons & Badges"
          actionText="Ver todos"
          actionHref="/cursos"
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="solid">Continuar estudiando →</Button>
          <Button variant="soft">Retomar →</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="glass">Glass Button</Button>
          <Button variant="icon" aria-label="Icon">
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="active">En curso</Badge>
          <Badge tone="locked">Bloqueado</Badge>
          <Badge tone="success">Completado</Badge>
          <Badge tone="danger">Pendiente</Badge>
          <Badge tone="warning">Por vencer</Badge>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-4 rounded-card border border-border/40 bg-surface p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Form Controls
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Buscar temas"
            placeholder="Escribe para buscar..."
            iconLeft={<Search className="h-4 w-4" />}
          />
          <Select
            label="Filtrar por unidad"
            options={[
              { value: 'all', label: 'Todas las unidades' },
              { value: 'u1', label: 'Unidad 1 · Mecánica' },
            ]}
          />
          <div className="md:col-span-2">
            <Textarea
              label="Comentarios"
              placeholder="Ingresa tus notas..."
            />
          </div>
        </div>
      </section>

      {/* Cards & Tones */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Card Tones
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card tone="sky" interactive>
            <IconBadge icon={<Sparkles className="h-5 w-5" />} tone="sky" />
            <h3 className="mt-3 text-sm font-bold">FisioIA</h3>
            <p className="text-xs text-muted">Pregunta tus dudas</p>
          </Card>
          <Card tone="lavender" interactive>
            <IconBadge
              icon={<BookOpen className="h-5 w-5" />}
              tone="lavender"
            />
            <h3 className="mt-3 text-sm font-bold">Estudiar</h3>
            <p className="text-xs text-muted">Nuestros módulos</p>
          </Card>
          <Card tone="mint" interactive>
            <IconBadge icon={<Sparkles className="h-5 w-5" />} tone="mint" />
            <h3 className="mt-3 text-sm font-bold">Practicar</h3>
            <p className="text-xs text-muted">Banco y quizzes</p>
          </Card>
          <Card tone="rose" interactive>
            <IconBadge icon={<Sparkles className="h-5 w-5" />} tone="rose" />
            <h3 className="mt-3 text-sm font-bold">Progreso</h3>
            <p className="text-xs text-muted">Estadísticas</p>
          </Card>
        </div>
      </section>

      {/* Tabs & Table */}
      <section className="space-y-4 rounded-card border border-border/40 bg-surface p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Tabs & Table
        </h2>
        <Tabs
          activeKey="tab1"
          tabs={[
            { key: 'tab1', label: 'Cuestionarios', href: '/dev/ui' },
            { key: 'tab2', label: 'Banco de preguntas', href: '/dev/ui' },
          ]}
        />
        <Table
          data={[
            { id: 1, quiz: 'Quiz Respiratorio 1', score: '85%' },
            { id: 2, quiz: 'Quiz Cardiovascular 1', score: '90%' },
          ]}
          columns={[
            { key: 'quiz', header: 'Cuestionario' },
            { key: 'score', header: 'Puntaje' },
          ]}
          keyExtractor={(item) => item.id}
        />
      </section>

      {/* Progress & Charts */}
      <section className="space-y-4 rounded-card border border-border/40 bg-surface p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Progress & Charts
        </h2>
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1 space-y-3">
            <ProgressBar value={60} showLabel />
            <ProgressBar value={25} size="sm" />
          </div>
          <div className="flex items-center gap-6">
            <ProgressRing value={75} />
            <BarChart
              data={[
                { label: 'U1', value: 85 },
                { label: 'U2', value: 60 },
                { label: 'U3', value: 92 },
              ]}
              height={120}
              className="w-48"
            />
          </div>
        </div>
      </section>

      {/* Skeletons & EmptyState */}
      <section className="space-y-4 rounded-card border border-border/40 bg-surface p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Skeletons & EmptyState
        </h2>
        <div className="flex items-center gap-4">
          <Skeleton shape="circle" className="h-10 w-10" />
          <Skeleton shape="pill" className="h-6 w-24" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <EmptyState
          icon={<BookOpen className="h-6 w-6" />}
          title="No hay cuestionarios pendientes"
          description="¡Has completado todas tus evaluaciones activas!"
          action={<Button size="sm">Ver historial</Button>}
        />
      </section>

      {/* Avatars & Module Images */}
      <section className="space-y-4 rounded-card border border-border/40 bg-surface p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Avatars & Fallbacks
        </h2>
        <div className="flex items-center gap-4">
          <Avatar name="Angholy Fernandez" size="lg" />
          <Avatar name="Docente Fisiologia" size="md" />
          <ModuleImage alt="Respiratoria" size="md" />
        </div>
      </section>
    </div>
  );
}
