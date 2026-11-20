import type { Route } from 'next';

export * from '@/schemas/user';
export * from '@/schemas/course';
export * from '@/schemas/exercise';
export * from '@/schemas/planning';
export * from '@/schemas/progress';
export * from '@/schemas/teacher';
export * from '@/schemas/theme';

export interface NavItem {
  label: string;
  href: Route | string;
  iconName: string;
  badge?: string;
  teacherOnly?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: Route | string;
}
