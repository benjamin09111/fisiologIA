import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import type { User } from '@/schemas/user';

export interface AppShellProps {
  user: User;
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <main className="flex-1 px-4 pb-12 md:px-8">{children}</main>
      </div>
    </div>
  );
}
