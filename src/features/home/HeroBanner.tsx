import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/brand/Mascot';
import { SpeechBubble } from '@/components/brand/SpeechBubble';
import homeContent from '@/content/home.json';
import { Target } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-hero border border-border/40 bg-gradient-to-r from-primary-soft/80 via-primary-soft/50 to-primary/20 p-6 md:p-8 shadow-card">
      {/* Decorative molecular SVG shapes */}
      <div className="pointer-events-none absolute -right-4 -bottom-6 text-primary-strong/10">
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
          <circle cx="50" cy="50" r="16" fill="currentColor" />
          <circle cx="150" cy="80" r="22" fill="currentColor" />
          <circle cx="100" cy="160" r="18" fill="currentColor" />
          <line x1="50" y1="50" x2="150" y2="80" stroke="currentColor" strokeWidth="6" />
          <line x1="150" y1="80" x2="100" y2="160" stroke="currentColor" strokeWidth="6" />
          <line x1="50" y1="50" x2="100" y2="160" stroke="currentColor" strokeWidth="6" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-lg space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1 text-xs font-bold text-primary-strong shadow-xs">
            <Target className="h-3.5 w-3.5" />
            <span>Módulo activo</span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-text leading-tight">
            {homeContent.hero.title}
          </h2>

          <p className="text-xs md:text-sm text-text/80 leading-relaxed">
            {homeContent.hero.description}
          </p>

          <div className="pt-2">
            <Button
              variant="solid"
              size="lg"
              href="/cursos/respiratoria/unidades/mecanica-ventilatoria/temas/presiones-y-gradientes"
              iconRight={<span>→</span>}
            >
              {homeContent.hero.ctaText}
            </Button>
          </div>
        </div>

        {/* Mascot + Speech bubble */}
        <div className="relative flex flex-col items-center md:items-end self-center md:self-auto shrink-0">
          <div className="mb-2 max-w-[220px]">
            <SpeechBubble>{homeContent.hero.botBubble}</SpeechBubble>
          </div>
          <Mascot size="lg" float />
        </div>
      </div>
    </div>
  );
}
