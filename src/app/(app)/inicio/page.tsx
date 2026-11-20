import * as React from 'react';
import { getCurrentUser } from '@/services/userService';
import { getCourses } from '@/services/courseService';
import { getPlanning } from '@/services/planningService';
import { Greeting } from '@/features/home/Greeting';
import { HeroBanner } from '@/features/home/HeroBanner';
import { ContinueCard } from '@/features/home/ContinueCard';
import { QuickActions } from '@/features/home/QuickActions';
import { ModulesGrid } from '@/features/home/ModulesGrid';
import { PlanningWidget } from '@/features/home/PlanningWidget';
import { FisioIACard } from '@/features/home/FisioIACard';
import { Reveal } from '@/components/ui/Reveal';

export default async function InicioPage() {
  const [user, courses, planning] = await Promise.all([
    getCurrentUser(),
    getCourses(),
    getPlanning(),
  ]);

  const activeCourse = courses.find((c) => c.status === 'in_progress') || courses[0];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Top greeting with heart */}
      <Reveal index={0}>
        <Greeting name={user.name} />
      </Reveal>

      {/* Main 2-column grid layout as in design.jpeg */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left main column (~65%) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <Reveal index={1}>
            <HeroBanner />
          </Reveal>

          {activeCourse && (
            <Reveal index={2}>
              <ContinueCard course={activeCourse} />
            </Reveal>
          )}

          <Reveal index={3}>
            <QuickActions />
          </Reveal>

          <Reveal index={4}>
            <ModulesGrid courses={courses} />
          </Reveal>
        </div>

        {/* Right lateral column (~35%) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <Reveal index={5}>
            <PlanningWidget planning={planning} />
          </Reveal>

          <Reveal index={6}>
            <FisioIACard />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
