'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Avatar } from '@/components/ui/Avatar';
import type { StudentInquiry } from '@/schemas/teacher';
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  Send,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

export interface TeacherInquiriesViewProps {
  initialInquiries: StudentInquiry[];
}

export function TeacherInquiriesView({ initialInquiries }: TeacherInquiriesViewProps) {
  const [inquiries, setInquiries] = React.useState<StudentInquiry[]>(initialInquiries);
  const [activeTab, setActiveTab] = React.useState<'pending' | 'answered'>('pending');
  const [replyDrafts, setReplyDrafts] = React.useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const pendingList = inquiries.filter((inq) => inq.status === 'pending');
  const answeredList = inquiries.filter((inq) => inq.status === 'answered');

  const displayedList = activeTab === 'pending' ? pendingList : answeredList;

  const handleDraftChange = (id: string, text: string) => {
    setReplyDrafts((prev) => ({ ...prev, [id]: text }));
  };

  const handleSendReply = (id: string) => {
    const text = replyDrafts[id]?.trim();
    if (!text) return;

    setInquiries((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          status: 'answered',
          teacherAnswer: text,
          answeredAt: 'Hoy, hace un momento',
        };
      }),
    );

    setReplyDrafts((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    setToastMessage('Respuesta enviada exitosamente al estudiante.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200 shadow-card flex items-center justify-between animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[11px] opacity-75">Notificado</span>
        </div>
      )}

      {/* Tabs Switcher */}
      <div
        role="tablist"
        aria-label="Estado de las preguntas"
        className="inline-flex gap-1 rounded-full border border-border/40 bg-primary-soft/50 p-1 backdrop-blur-xs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pending'}
          onClick={() => setActiveTab('pending')}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 md:text-sm ${
            activeTab === 'pending'
              ? 'bg-surface text-primary-strong shadow-xs'
              : 'text-muted hover:bg-surface/50 hover:text-text'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Pendientes de respuesta ({pendingList.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'answered'}
          onClick={() => setActiveTab('answered')}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 md:text-sm ${
            activeTab === 'answered'
              ? 'bg-surface text-primary-strong shadow-xs'
              : 'text-muted hover:bg-surface/50 hover:text-text'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Respondidas ({answeredList.length})</span>
        </button>
      </div>

      {/* List of Inquiries */}
      {displayedList.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <MessageSquare className="h-10 w-10 text-muted mb-2" />
          <h3 className="text-base font-bold text-text">No hay consultas en esta sección</h3>
          <p className="text-xs text-muted mt-1 max-w-sm">
            {activeTab === 'pending'
              ? '¡Excelente! Estás al día con todas las preguntas de tus alumnos.'
              : 'Aún no has respondido preguntas en este período.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayedList.map((inq) => {
            const draft = replyDrafts[inq.id] || '';

            return (
              <Card
                key={inq.id}
                className="p-5 border border-border/70 hover:border-primary/40 transition-all duration-200 space-y-4"
              >
                {/* Inquiry Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={inq.studentAlias} size="sm" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text">{inq.studentAlias}</h4>
                        <span className="text-xs text-muted">· {inq.createdAt}</span>
                      </div>
                      <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                        <BookOpen className="h-3 w-3 text-primary-strong" />
                        <span>
                          {inq.unitTitle} &gt; <strong className="text-text">{inq.topicTitle}</strong>
                        </span>
                      </p>
                    </div>
                  </div>

                  <Badge tone={inq.status === 'pending' ? 'warning' : 'success'} size="sm">
                    {inq.status === 'pending' ? 'Pendiente' : 'Respondida'}
                  </Badge>
                </div>

                {/* Inquiry Question Text */}
                <div className="rounded-xl bg-surface-raised p-4 border border-border/50">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1 flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-primary-strong" />
                    <span>Consulta del estudiante:</span>
                  </p>
                  <p className="text-sm text-text leading-relaxed font-medium">
                    &ldquo;{inq.questionText}&rdquo;
                  </p>
                </div>

                {/* Answer Section: Reply form or Answered display */}
                {inq.status === 'pending' ? (
                  <div className="space-y-3 pt-1">
                    <label
                      htmlFor={`reply-${inq.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-primary-strong block"
                    >
                      Redactar respuesta docente:
                    </label>
                    <Textarea
                      id={`reply-${inq.id}`}
                      value={draft}
                      onChange={(e) => handleDraftChange(inq.id, e.target.value)}
                      placeholder="Escribe una explicación pedagógica, referencia a la cátedra o retroalimentación..."
                      rows={3}
                      aria-label="Respuesta docente"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="solid"
                        size="sm"
                        disabled={!draft.trim()}
                        onClick={() => handleSendReply(inq.id)}
                        iconRight={<Send className="h-3.5 w-3.5" />}
                      >
                        Enviar respuesta al estudiante
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-primary-soft/30 border border-primary/25 p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary-strong flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Tu respuesta pedagógica:</span>
                      </span>
                      <span className="text-muted">{inq.answeredAt}</span>
                    </div>
                    <p className="text-xs text-text leading-relaxed pt-1">
                      {inq.teacherAnswer}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
