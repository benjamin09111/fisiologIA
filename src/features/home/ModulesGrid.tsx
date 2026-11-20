import * as React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CourseCard } from '@/features/courses/CourseCard';
import type { Course } from '@/schemas/course';
import homeContent from '@/content/home.json';
import { BookOpen } from 'lucide-react';

export interface ModulesGridProps {
  courses: Course[];
}

export function ModulesGrid({ courses }: ModulesGridProps) {
  return (
    <section aria-labelledby="modules-section-title">
      <SectionHeader
        icon={<BookOpen className="h-5 w-5" />}
        title={homeContent.modulesSection.title}
        actionText={homeContent.modulesSection.actionText}
        actionHref={homeContent.modulesSection.actionHref}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
