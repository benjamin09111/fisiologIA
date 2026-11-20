import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/brand/Mascot';
import homeContent from '@/content/home.json';
import { Sparkles, MessageSquare } from 'lucide-react';

export function FisioIACard() {
  return (
    <div className="relative overflow-hidden rounded-card border border-border/40 bg-gradient-to-br from-primary via-primary-strong to-primary-strong p-6 text-on-primary shadow-soft">
      <div className="relative z-10 max-w-[220px] space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>FisioBot IA</span>
        </div>

        <h3 className="text-lg font-bold leading-tight text-white">
          {homeContent.fisioIACard.title}
        </h3>

        <p className="text-xs text-white/80 leading-relaxed">
          {homeContent.fisioIACard.description}
        </p>

        <div className="pt-1">
          <Button
            variant="solid"
            size="sm"
            href="/fisioia"
            iconRight={<MessageSquare className="h-3.5 w-3.5" />}
            className="bg-surface text-text hover:bg-surface/90 font-bold border-none"
          >
            {homeContent.fisioIACard.ctaText}
          </Button>
        </div>
      </div>

      {/* Mascot peeking on the right */}
      <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-90 drop-shadow-lg">
        <Mascot size="lg" />
      </div>
    </div>
  );
}
