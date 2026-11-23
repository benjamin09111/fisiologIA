import type { Route } from 'next';

export type NavIconType =
  | 'home'
  | 'courses'
  | 'grades'
  | 'planning'
  | 'library'
  | 'fisioia'
  | 'progress'
  | 'settings'
  | 'dashboard'
  | 'questions'
  | 'history'
  | 'students'
  | 'inquiries'
  | 'analytics';

export interface NavItemConfig {
  label: string;
  href: Route | string;
  icon: NavIconType;
  badge?: string;
}

export const STUDENT_NAV_ITEMS: NavItemConfig[] = [
  { label: 'Inicio', href: '/inicio', icon: 'home' },
  { label: 'Mis cursos', href: '/cursos', icon: 'courses' },
  { label: 'Mis notas', href: '/notas', icon: 'grades' },
  { label: 'Planificaciones', href: '/planificacion', icon: 'planning' },
  { label: 'Biblioteca', href: '/biblioteca', icon: 'library' },
  { label: 'FisioIA', href: '/fisioia', icon: 'fisioia' },
  { label: 'Mi progreso', href: '/progreso', icon: 'progress' },
  { label: 'Configuración', href: '/configuracion', icon: 'settings' },
];

export const TEACHER_NAV_ITEMS: NavItemConfig[] = [
  { label: 'Supervisión del curso', href: '/docente', icon: 'dashboard' },
  { label: 'Mis alumnos', href: '/docente/alumnos', icon: 'students', badge: '48' },
  { label: 'Consultas de alumnos', href: '/docente/preguntas', icon: 'inquiries', badge: '3' },
  { label: 'Contenidos a reforzar', href: '/docente/reforzar', icon: 'analytics' },
  { label: 'Banco de preguntas', href: '/docente/ejercicios', icon: 'questions' },
  { label: 'Biblioteca', href: '/biblioteca', icon: 'library' },
  { label: 'Configuración', href: '/configuracion', icon: 'settings' },
];
