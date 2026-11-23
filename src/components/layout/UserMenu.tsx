'use client';

import * as React from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { switchRole } from '@/features/auth/actions';
import type { User } from '@/schemas/user';
import { ChevronDown, User as UserIcon, Palette, ArrowLeftRight } from 'lucide-react';

export interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleRole = () => {
    const nextRole = user.role === 'teacher' ? 'student' : 'teacher';
    startTransition(async () => {
      const res = await switchRole(nextRole);
      if (res.success) {
        setIsOpen(false);
        const targetPath = nextRole === 'teacher' ? '/docente' : '/inicio';
        // Forzar navegación dura para que todas las Server Components y layouts
        // recarguen con la cookie fisio-role actualizada de inmediato
        window.location.href = targetPath;
      }
    });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full p-1 transition-colors hover:bg-primary-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Avatar name={user.name} size="sm" imageSrc={user.avatarUrl ?? undefined} />
        <span className="hidden text-xs font-bold text-text md:inline-block">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-64 rounded-card border border-border/40 bg-surface p-3 text-text shadow-soft animate-fade-in z-50"
        >
          <div className="border-b border-border/30 pb-3 mb-2 px-1">
            <p className="text-xs font-bold text-text">{user.name}</p>
            <p className="text-[11px] text-muted truncate">{user.email}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <Badge tone={user.role === 'teacher' ? 'warning' : 'active'}>
                {user.role === 'teacher' ? 'Docente' : 'Estudiante'}
              </Badge>
              <span className="text-[10px] text-muted">{user.career}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              href="/configuracion"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text hover:bg-primary-soft/40 transition-colors"
            >
              <UserIcon className="h-4 w-4 text-primary-strong" />
              <span>Mi perfil</span>
            </Link>

            <Link
              href="/configuracion"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text hover:bg-primary-soft/40 transition-colors"
            >
              <Palette className="h-4 w-4 text-primary-strong" />
              <span>Paleta de colores</span>
            </Link>

            <button
              type="button"
              disabled={isPending}
              onClick={handleToggleRole}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium text-primary-strong transition-colors hover:bg-primary-soft/40"
            >
              <span className="flex items-center gap-2.5">
                <ArrowLeftRight className="h-4 w-4" />
                <span>{user.role === 'teacher' ? 'Ver como estudiante' : 'Ver como docente'}</span>
              </span>
              <span className="rounded bg-primary-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-strong">
                Demo
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
