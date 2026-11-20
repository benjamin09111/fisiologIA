'use client';

import * as React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { NavList } from './NavList';
import { Logo } from '@/components/brand/Logo';
import { Menu } from 'lucide-react';
import type { UserRole } from '@/schemas/user';

export interface MobileNavProps {
  role?: UserRole;
}

export function MobileNav({ role = 'student' }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-soft/50 hover:text-text"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5 stroke-[2]" />
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={<Logo showTagline={false} />}
      >
        <div className="mt-4">
          <NavList role={role} onItemClick={() => setIsOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
