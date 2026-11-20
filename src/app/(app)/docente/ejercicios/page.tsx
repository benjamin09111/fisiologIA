'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import questionsData from '@/mocks/questions.json';
import { Plus, Check } from 'lucide-react';

export default function DocenteEjerciciosPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [createdSuccess, setCreatedSuccess] = React.useState(false);

  // Form mock state
  const [text, setText] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('medio');
  const [explanation, setExplanation] = React.useState('');

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setCreatedSuccess(false);
      setText('');
      setExplanation('');
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="Gestión del banco de preguntas"
        subtitle="Administra, crea y supervisa las preguntas disponibles para los cuestionarios"
        breadcrumbs={[
          { label: 'Panel docente', href: '/docente' },
          { label: 'Banco de preguntas' },
        ]}
        actions={
          <Button
            variant="solid"
            onClick={() => setIsModalOpen(true)}
            iconLeft={<Plus className="h-4 w-4" />}
          >
            Nueva pregunta
          </Button>
        }
      />

      <div className="space-y-4">
        <h3 className="text-base font-bold text-text">
          Preguntas registradas ({questionsData.length})
        </h3>

        <div className="space-y-3">
          {questionsData.map((q) => (
            <Card
              key={q.id}
              tone="surface"
              padding="md"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge tone="active" className="text-[10px] uppercase">
                    {q.difficulty}
                  </Badge>
                  <span className="text-xs text-muted">
                    {q.unitTitle || 'Mecánica ventilatoria'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-text">{q.text}</h4>
                <p className="text-xs text-muted">
                  {q.options.length} alternativas configuradas
                </p>
              </div>

              <Button variant="ghost" size="sm">
                Editar
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Question Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear nueva pregunta"
        description="Agrega una nueva pregunta al banco formativo de fisiología."
      >
        <form onSubmit={handleCreateQuestion} className="space-y-4 py-2">
          <Textarea
            label="Enunciado de la pregunta"
            placeholder="Escribe el caso clínico o pregunta fisiológica..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <Select
            label="Nivel de dificultad"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={[
              { value: 'facil', label: 'Fácil' },
              { value: 'medio', label: 'Medio' },
              { value: 'dificil', label: 'Difícil' },
            ]}
          />

          <Textarea
            label="Explicación clínica / retroalimentación"
            placeholder="Explica el mecanismo que justifica la respuesta correcta..."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
          />

          {createdSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-success/15 text-success text-xs font-bold animate-fade-in">
              <Check className="h-4 w-4" />
              <span>Pregunta guardada exitosamente en el banco mock.</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="solid">
              Guardar pregunta
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
