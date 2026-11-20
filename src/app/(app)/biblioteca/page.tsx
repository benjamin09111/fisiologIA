import * as React from 'react';
import { FileText, Download } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  fileType: string;
  fileSize: string;
  course: string;
}

const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Guía Clínica: Ley de Poiseuille y Resistencia Vascular',
    category: 'Guía de Estudio',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    course: 'Fisiología Respiratoria',
  },
  {
    id: 'res-2',
    title: 'Atlas Esquemático: Curvas Presión-Volumen Alveolar',
    category: 'Infografía',
    fileType: 'PDF',
    fileSize: '3.8 MB',
    course: 'Fisiología Respiratoria',
  },
  {
    id: 'res-3',
    title: 'Manual de Laboratorio: Espirometría y Volúmenes Pulmonares',
    category: 'Manual Práctico',
    fileType: 'PDF',
    fileSize: '1.9 MB',
    course: 'Fisiología Respiratoria',
  },
  {
    id: 'res-4',
    title: 'Resumen Integrador: Difusión y Ley de Fick',
    category: 'Resumen',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    course: 'Fisiología Respiratoria',
  },
];

export default function BibliotecaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Biblioteca digital"
        subtitle="Guías, manuales de laboratorio y atlas esquemáticos de consulta rápida"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Biblioteca' }]}
      />

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_RESOURCES.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col justify-between p-5 transition-transform hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong">
                  <FileText className="h-5 w-5" />
                </div>
                <Badge variant="primary">{item.category}</Badge>
              </div>

              <div>
                <h2 className="text-sm font-bold text-text line-clamp-2">{item.title}</h2>
                <p className="mt-1 text-xs text-muted">{item.course}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
              <span>
                {item.fileType} · {item.fileSize}
              </span>
              <Button variant="ghost" size="sm">
                <Download className="h-3.5 w-3.5" />
                <span>Descargar</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
