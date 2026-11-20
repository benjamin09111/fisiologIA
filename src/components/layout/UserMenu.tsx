'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { switchRole } from '@/features/auth/actions';
import type { User } from '@/schemas/user';
import { ChevronDown, User as UserIcon, Palette, ArrowLeftRight, Lock } from 'lucide-react';

export interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
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
      await switchRole(nextRole);
      setIsOpen(false);
      router.refresh();
      if (nextRole === 'teacher') {
        router.push('/docente');
      } else {
        router.push('/inicio');
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

            {process.env.NODE_ENV === 'development' && user.role === 'teacher' ? (
              <button
                type="button"
                disabled={isPending}
                onClick={handleToggleRole}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium text-primary-strong hover:bg-primary-soft/40 transition-colors text-left"
              >
                <span className="flex items-center gap-2.5">
                  <ArrowLeftRight className="h-4 w-4" />
                  <span>Ver como estudiante (temporal)</span>
                </span>
              </button>
            ) : process.env.NODE_ENV === 'development' ? (
              <button
                type="button"
                disabled={isPending}
                onClick={handleToggleRole}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium text-primary-strong transition-colors hover:bg-primary-soft/40"
              >
                <span className="flex items-center gap-2.5">
                  <ArrowLeftRight className="h-4 w-4" />
                  <span>Ver como docente (temporal)</span>
                </span>
                <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-warning">
                  Solo desarrollo
                </span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Panel docente en preparación"
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium text-muted cursor-not-allowed opacity-60 select-none"
              >
                <span className="flex items-center gap-2.5">
                  <Lock className="h-4 w-4" />
                  <span>Ver como docente (solo desarrollo)</span>
                </span>
                <span className="flex items-center gap-1 rounded bg-muted/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                  Bloqueado
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
