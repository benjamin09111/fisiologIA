'use client';

import * as React from 'react';
import { NavItem } from './NavItem';
import {
  STUDENT_NAV_ITEMS,
  TEACHER_NAV_ITEMS,
  type NavItemConfig,
} from '@/config/navigation';
import type { UserRole } from '@/schemas/user';

export interface NavListProps {
  role?: UserRole;
  onItemClick?: () => void;
  className?: string;
}

export function NavList({
  role = 'student',
  onItemClick,
  className,
}: NavListProps) {
  const items: NavItemConfig[] =
    role === 'teacher' ? TEACHER_NAV_ITEMS : STUDENT_NAV_ITEMS;

  return (
    <nav className={className} aria-label="Navegación principal">
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.label}>
            <NavItem
              label={item.label}
              href={item.href}
              icon={item.icon}
              badge={item.badge}
              onClick={onItemClick}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
