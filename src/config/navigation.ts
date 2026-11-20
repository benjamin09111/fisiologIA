import type { Route } from 'next';

export type NavIconType =
  | 'home'
  | 'courses'
  | 'planning'
  | 'library'
  | 'fisioia'
  | 'progress'
  | 'settings'
  | 'dashboard'
  | 'questions'
  | 'history';

export interface NavItemConfig {
  label: string;
  href: Route | string;
  icon: NavIconType;
  badge?: string;
}

export const STUDENT_NAV_ITEMS: NavItemConfig[] = [
  { label: 'Inicio', href: '/inicio', icon: 'home' },
  { label: 'Mis cursos', href: '/cursos', icon: 'courses' },
  { label: 'Planificaciones', href: '/planificacion', icon: 'planning' },
  { label: 'Biblioteca', href: '/biblioteca', icon: 'library' },
  { label: 'FisioIA', href: '/fisioia', icon: 'fisioia' },
  { label: 'Mi progreso', href: '/progreso', icon: 'progress' },
  { label: 'Configuración', href: '/configuracion', icon: 'settings' },
];

export const TEACHER_NAV_ITEMS: NavItemConfig[] = [
  { label: 'Panel', href: '/docente', icon: 'dashboard' },
  {
    label: 'Banco de preguntas',
    href: '/docente/ejercicios',
    icon: 'questions',
  },
  { label: 'Historial', href: '/docente/historial', icon: 'history' },
  { label: 'Biblioteca', href: '/biblioteca', icon: 'library' },
  { label: 'FisioIA', href: '/fisioia', icon: 'fisioia' },
  { label: 'Configuración', href: '/configuracion', icon: 'settings' },
];
