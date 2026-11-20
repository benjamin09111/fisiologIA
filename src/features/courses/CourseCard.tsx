import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ModuleImage } from '@/components/ui/ModuleImage';
import type { Course } from '@/schemas/course';
import { ChevronRight, Lock } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CourseCardProps {
  course: Course;
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  const isLocked = course.status === 'locked';

  const content = (
    <Card
      tone="surface"
      interactive={!isLocked}
      padding="sm"
      className={cn(
        'group flex flex-col justify-between h-full min-h-[160px]',
        isLocked ? 'bg-surface/90 border-border/70' : 'hover:border-primary/50',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <ModuleImage
          src={course.imageSrc}
          alt={course.title}
          size="md"
        />
        <Badge tone={isLocked ? 'locked' : 'active'}>
          {isLocked ? 'Bloqueado' : 'En curso'}
        </Badge>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-text group-hover:text-primary-strong transition-colors line-clamp-2">
            {course.title}
          </h3>
          {course.currentUnitTitle && !isLocked && (
            <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
              {course.currentUnitTitle}
            </p>
          )}
        </div>

        <div
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform',
            isLocked
              ? 'bg-muted/15 text-muted'
              : 'bg-primary-soft text-primary-strong group-hover:translate-x-0.5',
          )}
        >
          {isLocked ? (
            <Lock className="h-3.5 w-3.5 stroke-[2]" />
          ) : (
            <ChevronRight className="h-4 w-4 stroke-[2]" />
          )}
        </div>
      </div>
    </Card>
  );

  if (isLocked) {
    return <div className="cursor-not-allowed select-none">{content}</div>;
  }

  return (
    <Link href={`/cursos/${course.id}` as Route} className="block h-full">
      {content}
    </Link>
  );
}
