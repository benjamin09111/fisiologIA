'use client';

import * as React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ChoiceGroup } from '@/components/ui/ChoiceGroup';
import type { Question } from '@/schemas/exercise';

export interface QuestionPracticeModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuestionPracticeModal({
  question,
  isOpen,
  onClose,
}: QuestionPracticeModalProps) {
  const [selected, setSelected] = React.useState<string | string[]>([]);
  const [hasChecked, setHasChecked] = React.useState(false);

  const handleClose = () => {
    setSelected([]);
    setHasChecked(false);
    onClose();
  };

  if (!question) return null;

  const isMultiple = question.type === 'multiple';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Práctica individual"
      description={`Unidad: ${question.unitTitle || 'Fisiología'} · Dificultad: ${question.difficulty}`}
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cerrar
          </Button>
          {!hasChecked ? (
            <Button
              variant="solid"
              disabled={
                Array.isArray(selected) ? selected.length === 0 : !selected
              }
              onClick={() => setHasChecked(true)}
            >
              Comprobar respuesta
            </Button>
          ) : (
            <Button variant="soft" onClick={() => setHasChecked(false)}>
              Intentar de nuevo
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-4 py-2">
        <h3 className="text-sm font-bold leading-snug text-text">
          {question.text}
        </h3>

        <ChoiceGroup
          name={`practice-${question.id}`}
          type={isMultiple ? 'checkbox' : 'radio'}
          variant="card"
          options={question.options.map((opt) => ({
            value: opt.id,
            label: opt.text,
          }))}
          value={selected}
          onChange={setSelected}
        />

        {hasChecked && (
          <div className="animate-fade-in space-y-1 rounded-card border border-primary/30 bg-primary-soft/40 p-3.5">
            <h4 className="text-xs font-bold text-primary-strong">
              Explicación formativa
            </h4>
            <p className="text-xs leading-relaxed text-text">
              Respuesta registrada para práctica individual. En las evaluaciones
              oficiales la corrección completa se procesa en el servidor con
              desglose paso a paso.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
