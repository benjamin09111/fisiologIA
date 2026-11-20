import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { ModuleImage } from '@/components/ui/ModuleImage';
import type { Course } from '@/schemas/course';
import homeContent from '@/content/home.json';
import { ArrowRight } from 'lucide-react';

export interface ContinueCardProps {
  course: Course;
}

export function ContinueCard({ course }: ContinueCardProps) {
  return (
    <Card tone="surface" padding="md" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted">
          Continúa donde quedaste
        </span>
        <Badge tone="active">{homeContent.continueSection.badge}</Badge>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ModuleImage
            src={course.imageSrc}
            alt={course.title}
            size="md"
          />
          <div>
            <h3 className="text-base font-bold text-text">
              {course.title}
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">
              Unidad {course.currentUnitNumber} · {course.currentUnitTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:min-w-[200px]">
          <div className="flex-1">
            <ProgressBar value={course.progress} showLabel />
          </div>
          <Button
            variant="soft"
            size="sm"
            href={`/cursos/${course.id}/unidades/${course.units[0]?.id || 'mecanica-ventilatoria'}`}
            iconRight={<ArrowRight className="h-3.5 w-3.5" />}
          >
            {homeContent.continueSection.ctaText}
          </Button>
        </div>
      </div>
    </Card>
  );
}
