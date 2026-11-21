import * as React from 'react';
import { Send, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/brand/Mascot';
import { SpeechBubble } from '@/components/brand/SpeechBubble';
import { getCurrentUser } from '@/services/userService';

export default async function FisioIAPage() {
  const user = await getCurrentUser();

  if (user.role === 'teacher') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="FisioIA"
          subtitle="Tutor virtual para estudiantes"
          breadcrumbs={[{ label: 'Panel', href: '/docente' }, { label: 'FisioIA' }]}
        />
        <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-bold text-text">Tutor exclusivo para estudiantes</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            FisioIA está diseñado exclusivamente como tutor inteligente y asistente de estudio interactivo para alumnos.
          </p>
          <div className="mt-6">
            <Button href="/docente" variant="soft">
              Volver al Panel docente
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="FisioIA"
        subtitle="Tu tutor virtual inteligente para resolver dudas clínicas y fisiológicas"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'FisioIA' }]}
      />

      {/* Chat Container */}
      <Card className="flex flex-col h-[650px] overflow-hidden p-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-raised px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft/60">
              <Mascot size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-text">FisioBot</h2>
                <Badge variant="accent" size="sm">
                  En línea
                </Badge>
              </div>
              <p className="text-[11px] text-muted">Tutor pedagógico inteligente</p>
            </div>
          </div>
          <Badge variant="muted" size="sm">
            Próximamente
          </Badge>
        </div>

        {/* Messages Stream */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Historial de conversación"
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* FisioBot greeting */}
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="shrink-0 mt-1">
              <Mascot size="sm" />
            </div>
            <SpeechBubble className="text-sm leading-relaxed text-text">
              ¡Hola! Soy <strong>FisioBot</strong>. Puedo ayudarte a razonar casos clínicos,
              comprender gradientes de presión y preparar tus solemnes de fisiología.
            </SpeechBubble>
          </div>

          {/* User message */}
          <div className="flex items-start justify-end gap-3 max-w-2xl ml-auto">
            <div className="rounded-2xl rounded-tr-xs bg-primary-strong px-4 py-3 text-sm text-on-primary shadow-xs">
              ¿Por qué la presión intrapleural se vuelve más negativa durante la inspiración normal?
            </div>
          </div>

          {/* FisioBot response */}
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="shrink-0 mt-1">
              <Mascot size="sm" />
            </div>
            <SpeechBubble className="text-sm leading-relaxed text-text">
              Durante la inspiración tranquila, el diafragma se contrae y desciende,
              ampliando la cavidad torácica. Por la <strong>Ley de Boyle</strong>, al aumentar el
              volumen de la cavidad pleural sin entrada de aire exterior, su presión disminuye
              de aproximadamente -5 cmH₂O a -8 cmH₂O.
            </SpeechBubble>
          </div>
        </div>

        {/* Input Footer */}
        <div className="border-t border-border bg-surface p-4 space-y-3">
          {/* Quick chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-muted">Sugerencias:</span>
            <span className="rounded-full bg-surface-raised border border-border px-3 py-1 text-xs text-muted select-none">
              Ley de Laplace
            </span>
            <span className="rounded-full bg-surface-raised border border-border px-3 py-1 text-xs text-muted select-none">
              Resistencia de Poiseuille
            </span>
            <span className="rounded-full bg-surface-raised border border-border px-3 py-1 text-xs text-muted select-none">
              Efecto shunt pulmonar
            </span>
          </div>

          {/* Disabled input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              disabled
              placeholder="El chat con IA estará activo en la siguiente versión..."
              className="flex-1 rounded-card border border-border bg-surface-raised px-4 py-2.5 text-sm text-muted cursor-not-allowed"
            />
            <Button disabled variant="solid" size="md" aria-label="Enviar consulta">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
