import * as React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { LibraryBrowser } from '@/features/library/LibraryBrowser';

export const metadata: Metadata = {
  title: 'Biblioteca digital — FisiologIA',
  description: 'Pruebas anteriores, certámenes resueltos y material de estudio exclusivo en formato PDF.',
};

export default function BibliotecaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Biblioteca digital"
        subtitle="Pruebas anteriores, certámenes resueltos y guías de estudio exclusivamente en formato PDF"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Biblioteca' }]}
      />

      <LibraryBrowser />
    </div>
  );
}
