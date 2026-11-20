import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { ChevronRight } from 'lucide-react';
import type { Evaluation } from '@/schemas/planning';
import { cn } from '@/lib/cn';

export interface EvaluationPillProps {
  evaluation: Evaluation;
  href?: Route | string;
  className?: string;
}

export function EvaluationPill({
  evaluation,
  href = '/planificacion',
  className,
}: EvaluationPillProps) {
  // Format date: 'YYYY-MM-DD' -> 'Vie. 24/10'
  const dateObj = new Date(evaluation.date + 'T12:00:00');
  const weekday = new Intl.DateTimeFormat('es-CL', { weekday: 'short' }).format(dateObj);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const formattedDate = `${weekday.charAt(0).toUpperCase() + weekday.slice(1, 3)}. ${day}/${month}`;

  const isSolemne = evaluation.type === 'solemne';

  return (
    <Link
      href={href as Route}
      className={cn(
        'group flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all duration-200 select-none shadow-xs',
        isSolemne
          ? 'bg-accent-rose/60 border-accent-rose text-text hover:bg-accent-rose/90'
          : 'bg-accent-lavender/50 border-accent-lavender text-text hover:bg-accent-lavender/80',
        className,
      )}
    >
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-bold text-text/80 uppercase tracking-wide">
          {formattedDate}
        </span>
        <span className="text-xs font-bold text-text truncate">
          {evaluation.title}
        </span>
      </div>

      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-text shadow-xs group-hover:translate-x-0.5 transition-transform">
        <ChevronRight className="h-3.5 w-3.5 stroke-[2]" />
      </div>
    </Link>
  );
}
