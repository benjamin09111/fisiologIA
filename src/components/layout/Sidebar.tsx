import * as React from 'react';
import { Logo } from '@/components/brand/Logo';
import { NavList } from './NavList';
import commonContent from '@/content/common.json';
import { Heart } from 'lucide-react';
import type { UserRole } from '@/schemas/user';

export interface SidebarProps {
  role?: UserRole;
}

export function Sidebar({ role = 'student' }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between border-r border-border/40 bg-sidebar/50 p-5 backdrop-blur-md lg:flex">
      <div className="flex flex-col gap-8">
        <Logo />
        <NavList role={role} />
      </div>

      {/* Motivational Card at bottom */}
      <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/90 p-4 shadow-card">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-rose text-accent-rose-strong">
            <Heart className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="text-xs font-bold text-text">
            {commonContent.sidebar.motivationCard.title}
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-muted">
          {commonContent.sidebar.motivationCard.message}
        </p>
      </div>
    </aside>
  );
}
