'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FileText, Download, Search, FileCheck2, BookMarked, Filter } from 'lucide-react';

export interface PDFResource {
  id: string;
  title: string;
  section: 'pruebas' | 'material';
  subject: 'FisiologIA' | 'PatologIA';
  year?: string;
  semester?: string;
  fileSize: string;
  pages: number;
  description: string;
  hasAnswerKey?: boolean;
}

const RESOURCES: PDFResource[] = [
  // Pruebas Anteriores
  {
    id: 'pr-2025-1',
    title: 'Solemne 1 Fisiología Respiratoria (2025) + Pauta de Corrección',
    section: 'pruebas',
    subject: 'FisiologIA',
    year: '2025',
    semester: 'Semestre 1',
    fileSize: '3.4 MB',
    pages: 14,
    description: 'Certamen oficial con resolución paso a paso de presiones, compliance y espirometría.',
    hasAnswerKey: true,
  },
  {
    id: 'pr-2025-2',
    title: 'Examen Final Integrado de Fisiología Médica (2025)',
    section: 'pruebas',
    subject: 'FisiologIA',
    year: '2025',
    semester: 'Semestre 2',
    fileSize: '4.8 MB',
    pages: 22,
    description: 'Evaluación semestral completa con preguntas de desarrollo clínico y casos aplicados.',
    hasAnswerKey: true,
  },
  {
    id: 'pr-2024-1',
    title: 'Solemne 1 Fisiopatología: Trastornos Ventilatorios (2024)',
    section: 'pruebas',
    subject: 'PatologIA',
    year: '2024',
    semester: 'Semestre 1',
    fileSize: '2.9 MB',
    pages: 12,
    description: 'Evaluación anterior enfocada en EPOC, asma bronquial y síndrome de distress.',
    hasAnswerKey: true,
  },
  {
    id: 'pr-2024-2',
    title: 'Control Práctico de Espirometría y Curvas Flujo-Volumen (2024)',
    section: 'pruebas',
    subject: 'FisiologIA',
    year: '2024',
    semester: 'Semestre 2',
    fileSize: '1.8 MB',
    pages: 8,
    description: 'Pauta de casos clínicos y ejercicios de interpretación espirométrica.',
    hasAnswerKey: true,
  },
  {
    id: 'pr-2024-pat-2',
    title: 'Examen de Grado Patología y Mecanismos de Enfermedad (2024)',
    section: 'pruebas',
    subject: 'PatologIA',
    year: '2024',
    semester: 'Semestre 2',
    fileSize: '5.1 MB',
    pages: 26,
    description: 'Compilado de certámenes anteriores de patología general y sistémica.',
    hasAnswerKey: true,
  },

  // Material de Estudio en PDF
  {
    id: 'mat-1',
    title: 'Guía Clínica: Ley de Poiseuille y Resistencia Vascular Pulmonar',
    section: 'material',
    subject: 'FisiologIA',
    fileSize: '2.4 MB',
    pages: 18,
    description: 'Manual conciso con deducciones matemáticas y aplicación hemodinámica.',
  },
  {
    id: 'mat-2',
    title: 'Atlas Esquemático: Curvas Presión-Volumen e Histéresis Alveolar',
    section: 'material',
    subject: 'FisiologIA',
    fileSize: '3.8 MB',
    pages: 24,
    description: 'Gráficos vectoriales a todo color sobre compliance pulmonar y surfactante.',
  },
  {
    id: 'mat-3',
    title: 'Fisiopatología del Edema Pulmonar y Ecuación de Starling',
    section: 'material',
    subject: 'PatologIA',
    fileSize: '2.7 MB',
    pages: 16,
    description: 'Revisión de mecanismos cardiogénicos y no cardiogénicos de acumulación de líquido.',
  },
  {
    id: 'mat-4',
    title: 'Manual de Laboratorio: Espirometría y Volúmenes Pulmonares',
    section: 'material',
    subject: 'FisiologIA',
    fileSize: '1.9 MB',
    pages: 15,
    description: 'Protocolo de calibración, maniobra de FVC y criterios de aceptabilidad ATS/ERS.',
  },
  {
    id: 'mat-5',
    title: 'Patogenia de la Insuficiencia Respiratoria Aguda y Crónica',
    section: 'material',
    subject: 'PatologIA',
    fileSize: '3.2 MB',
    pages: 20,
    description: 'Clasificación Tipo I (hipoxémica) y Tipo II (hipercápnica), shunt y desbalance V/Q.',
  },
];

export function LibraryBrowser() {
  const [section, setSection] = React.useState<'pruebas' | 'material'>('pruebas');
  const [selectedSubject, setSelectedSubject] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [downloadNotice, setDownloadNotice] = React.useState<string | null>(null);

  const filteredResources = React.useMemo(() => {
    return RESOURCES.filter((res) => {
      if (res.section !== section) return false;
      if (selectedSubject !== 'all' && res.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          res.title.toLowerCase().includes(q) ||
          res.description.toLowerCase().includes(q) ||
          (res.year && res.year.includes(q))
        );
      }
      return true;
    });
  }, [section, selectedSubject, searchQuery]);

  const handleDownload = (res: PDFResource) => {
    setDownloadNotice(`Descargando "${res.title}.pdf" (${res.fileSize})...`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <div className="space-y-6">
      {/* Notice Toast */}
      {downloadNotice && (
        <div
          role="status"
          className="rounded-xl border border-primary-strong/30 bg-primary-soft/80 p-3.5 text-xs font-semibold text-primary-strong shadow-card flex items-center justify-between animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{downloadNotice}</span>
          </div>
          <span className="text-[11px] opacity-75">PDF listo</span>
        </div>
      )}

      {/* Main Section Switcher Pills */}
      <div
        role="tablist"
        aria-label="Secciones de la biblioteca"
        className="inline-flex gap-1 rounded-full border border-border/30 bg-primary-soft/50 p-1 backdrop-blur-xs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={section === 'pruebas'}
          onClick={() => setSection('pruebas')}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 md:text-sm ${
            section === 'pruebas'
              ? 'bg-surface text-primary-strong shadow-xs'
              : 'text-muted hover:bg-surface/50 hover:text-text'
          }`}
        >
          <FileCheck2 className="h-4 w-4" />
          <span>Pruebas anteriores y certámenes</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={section === 'material'}
          onClick={() => setSection('material')}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 md:text-sm ${
            section === 'material'
              ? 'bg-surface text-primary-strong shadow-xs'
              : 'text-muted hover:bg-surface/50 hover:text-text'
          }`}
        >
          <BookMarked className="h-4 w-4" />
          <span>Material de estudio y guías</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtro por asignatura">
          <span className="text-xs font-semibold text-muted flex items-center gap-1 mr-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Materia:</span>
          </span>
          {[
            { id: 'all', label: 'Todas' },
            { id: 'FisiologIA', label: 'FisiologIA' },
            { id: 'PatologIA', label: 'PatologIA' },
          ].map((pill) => {
            const isSelected = selectedSubject === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSelectedSubject(pill.id)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? 'bg-primary text-surface shadow-xs'
                    : 'bg-surface border border-border/80 text-muted hover:text-text hover:bg-surface-raised'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por año o contenido..."
            aria-label="Buscar en la biblioteca"
            iconLeft={<Search className="h-4 w-4 text-muted" />}
          />
        </div>
      </div>

      {/* Results Count & PDF Badge */}
      <div className="flex items-center justify-between text-xs text-muted">
        <span>Mostrando {filteredResources.length} documentos en PDF</span>
        <span className="inline-flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-300">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          Solo formato PDF garantizado
        </span>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <FileText className="h-10 w-10 text-muted mb-2" />
          <h3 className="text-base font-bold text-text">No se encontraron documentos</h3>
          <p className="text-xs text-muted mt-1 max-w-sm">
            Prueba ajustando los filtros de materia o el término de búsqueda.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between p-5 transition-transform hover:-translate-y-1 border border-border/60 hover:border-primary/40"
            >
              <div className="space-y-3">
                {/* Header: PDF Icon + Subject Badge + Year */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-extrabold text-xs">
                    PDF
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 justify-end">
                    <Badge variant={item.subject === 'FisiologIA' ? 'primary' : 'accent'} size="sm">
                      {item.subject}
                    </Badge>
                    {item.year && (
                      <Badge variant="muted" size="sm">
                        {item.year}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-text line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer: Metadata & Download CTA */}
              <div className="mt-5 flex items-center justify-between border-t border-border pt-3.5 text-xs text-muted">
                <span className="font-medium">
                  {item.pages} págs · {item.fileSize}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(item)}
                  iconLeft={<Download className="h-3.5 w-3.5" />}
                >
                  Descargar PDF
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
