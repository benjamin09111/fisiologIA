import * as React from 'react';
import { getCurrentUser } from '@/services/userService';
import { AppShell } from '@/components/layout/AppShell';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return <AppShell user={user}>{children}</AppShell>;
}
