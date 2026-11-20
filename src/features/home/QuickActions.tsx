import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';
import homeContent from '@/content/home.json';
import { ArrowRight, Bot, BookOpen, Sparkles, LineChart } from 'lucide-react';

const ACTION_ICONS: Record<string, React.ReactNode> = {
  fisioia: <Bot className="h-5 w-5" />,
  estudiar: <BookOpen className="h-5 w-5" />,
  practicar: <Sparkles className="h-5 w-5" />,
  progreso: <LineChart className="h-5 w-5" />,
};

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {homeContent.quickActions.map((action) => {
        const tone = action.tone as 'sky' | 'lavender' | 'mint' | 'rose';
        return (
          <Link
            key={action.id}
            href={action.href as Route}
            className="group block"
          >
            <Card
              tone={tone}
              interactive
              padding="sm"
              className="flex flex-col justify-between h-36"
            >
              <div className="flex items-start justify-between">
                <IconBadge icon={ACTION_ICONS[action.id]} tone={tone} size="md" />
              </div>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-text group-hover:text-primary-strong transition-colors leading-tight">
                    {action.title}
                  </h3>
                  <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
                    {action.description}
                  </p>
                </div>

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-text shadow-xs group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2]" />
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
