'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ExerciseTabs } from '@/features/exercises/ExerciseTabs';
import { QuestionPracticeModal } from '@/features/exercises/QuestionPracticeModal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import questionsData from '@/mocks/questions.json';
import type { Question } from '@/schemas/exercise';
import { Search, Sparkles } from 'lucide-react';

export default function BancoPreguntasPage() {
  const [search, setSearch] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('all');
  const [selectedQuestion, setSelectedQuestion] =
    React.useState<Question | null>(null);

  const filteredQuestions = (questionsData as Question[]).filter((q) => {
    if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
    if (search && !q.text.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="Banco de preguntas"
        subtitle="Explora y practica preguntas de fisiología por unidad y nivel de dificultad"
      />

      <ExerciseTabs activeKey="bank" />

      {/* Filter bar */}
      <Card tone="surface" padding="sm" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <Input
            placeholder="Buscar por palabra clave o concepto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft={<Search className="h-4 w-4" />}
          />
        </div>
        <div>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={[
              { value: 'all', label: 'Todas las dificultades' },
              { value: 'facil', label: 'Fácil' },
              { value: 'medio', label: 'Medio' },
              { value: 'dificil', label: 'Difícil' },
            ]}
          />
        </div>
      </Card>

      {/* Questions List */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted">
          Mostrando {filteredQuestions.length} preguntas
        </p>

        {filteredQuestions.map((q) => (
          <Card
            key={q.id}
            tone="surface"
            padding="md"
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-colors"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge tone="active" className="text-[10px] uppercase">
                  {q.difficulty}
                </Badge>
                <span className="text-xs text-muted font-medium">
                  {q.unitTitle || 'Mecánica ventilatoria'}
                </span>
                {q.type === 'multiple' && (
                  <Badge tone="warning" className="text-[10px]">
                    Múltiple
                  </Badge>
                )}
              </div>
              <h3 className="text-sm font-bold text-text leading-snug">
                {q.text}
              </h3>
              <p className="text-xs text-muted">
                {q.options.length} alternativas
              </p>
            </div>

            <Button
              variant="soft"
              size="sm"
              onClick={() => setSelectedQuestion(q)}
              iconRight={<Sparkles className="h-3.5 w-3.5" />}
            >
              Practicar
            </Button>
          </Card>
        ))}
      </div>

      <QuestionPracticeModal
        question={selectedQuestion}
        isOpen={!!selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
      />
    </div>
  );
}
