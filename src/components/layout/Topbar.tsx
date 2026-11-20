import * as React from 'react';
import { Bell } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { MobileNav } from './MobileNav';
import { Logo } from '@/components/brand/Logo';
import type { User } from '@/schemas/user';

export interface TopbarProps {
  user: User;
  leftSlot?: React.ReactNode;
}

export function Topbar({ user, leftSlot }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between gap-4 px-6 md:px-10 backdrop-blur-xs">
      <div className="flex items-center gap-3">
        <MobileNav role={user.role} />
        <div className="lg:hidden">
          <Logo showTagline={false} />
        </div>
        <div className="hidden lg:block">{leftSlot}</div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications bell with danger dot */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-soft/50 hover:text-text"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5 stroke-[2]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
        </button>

        {/* User avatar menu */}
        <UserMenu user={user} />
      </div>
    </header>
  );
}
