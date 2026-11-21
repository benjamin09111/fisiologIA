'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { cn } from '@/lib/cn';
import type { NavIconType } from '@/config/navigation';
import {
  Home,
  BookOpen,
  Calendar,
  Library,
  Bot,
  LineChart,
  Settings,
  LayoutDashboard,
  HelpCircle,
  History,
  GraduationCap,
} from 'lucide-react';

const ICON_MAP: Record<NavIconType, React.ComponentType<{ className?: string }>> = {
  home: Home,
  courses: BookOpen,
  grades: GraduationCap,
  planning: Calendar,
  library: Library,
  fisioia: Bot,
  progress: LineChart,
  settings: Settings,
  dashboard: LayoutDashboard,
  questions: HelpCircle,
  history: History,
};

export interface NavItemProps {
  label: string;
  href: Route | string;
  icon: NavIconType;
  badge?: string;
  onClick?: () => void;
}

export function NavItem({ label, href, icon, badge, onClick }: NavItemProps) {
  const pathname = usePathname();
  const IconComponent = ICON_MAP[icon] || Home;

  // Active state: exact match or child route match (except /ejercicios which leaves sidebar inactive)
  const isEjercicios = pathname.startsWith('/ejercicios');
  const isActive =
    !isEjercicios &&
    (pathname === href || (href !== '/inicio' && href !== '/docente' && pathname.startsWith(String(href))));

  return (
    <Link
      href={href as Route}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-3.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 select-none',
        isActive
          ? 'bg-primary-soft text-text shadow-xs'
          : 'text-muted hover:text-text hover:bg-primary-soft/40',
      )}
    >
      <IconComponent
        className={cn(
          'h-5 w-5 stroke-[2] transition-colors',
          isActive
            ? 'text-primary-strong'
            : 'text-muted group-hover:text-primary-strong',
        )}
      />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="rounded-full bg-primary-strong/15 px-2 py-0.5 text-[10px] font-bold text-primary-strong">
          {badge}
        </span>
      )}
    </Link>
  );
}
