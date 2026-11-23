'use client';

import * as React from 'react';
import {
  Plus,
  Copy,
  Check,
  Send,
  Mail,
  Share2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import type { TeacherQuizItem, QuizTemplate } from '@/schemas/teacher';

export interface TeacherQuizzesViewProps {
  initialQuizzes: TeacherQuizItem[];
  templates: QuizTemplate[];
}

export function TeacherQuizzesView({ initialQuizzes, templates }: TeacherQuizzesViewProps) {
  const [activeTab, setActiveTab] = React.useState<'quizzes' | 'results'>('quizzes');
  const [quizzes, setQuizzes] = React.useState<TeacherQuizItem[]>(initialQuizzes);
  const [selectedQuiz, setSelectedQuiz] = React.useState<TeacherQuizItem | null>(null);

  // Modales
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isShareOpen, setIsShareOpen] = React.useState(false);
  const [quizToShare, setQuizToShare] = React.useState<TeacherQuizItem | null>(null);

  // Feedback states
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [sentEmailSuccess, setSentEmailSuccess] = React.useState(false);
  const [sentPanelSuccess, setSentPanelSuccess] = React.useState(false);

  // Formulario creación
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [unitTitle, setUnitTitle] = React.useState('Mecánica Ventilatoria');
  const [questionsCount, setQuestionsCount] = React.useState(5);
  const [timeMinutes, setTimeMinutes] = React.useState(10);

  const handleApplyTemplate = (tpl: QuizTemplate) => {
    setTitle(tpl.title);
    setDescription(tpl.description);
    setUnitTitle(tpl.unitTitle);
    setQuestionsCount(tpl.defaultQuestionsCount);
    setTimeMinutes(tpl.suggestedMinutes);
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newQuiz: TeacherQuizItem = {
      id: `tq-${Date.now()}`,
      title,
      description: description || 'Quiz formativo rápido para verificación de contenidos.',
      courseId: 'fisiologia-respiratoria',
      unitTitle,
      questionsCount,
      timeMinutes,
      createdAt: new Date().toISOString(),
      status: 'published',
      shareUrl: `https://fisiologia.app/ejercicios/cuestionarios/quiz-${Date.now()}`,
      sentToPanel: true,
      sentToEmail: false,
      totalSubmissions: 0,
      averageScore: 0,
      results: [],
    };

    setQuizzes([newQuiz, ...quizzes]);
    setIsCreateOpen(false);
    // Reset
    setTitle('');
    setDescription('');
    setSelectedTemplateId('');
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendToPanel = (quizId: string) => {
    setQuizzes((prev) =>
      prev.map((q) => (q.id === quizId ? { ...q, sentToPanel: true } : q)),
    );
    setSentPanelSuccess(true);
    setTimeout(() => setSentPanelSuccess(false), 2500);
  };

  const handleSendToEmail = (quizId: string) => {
    setQuizzes((prev) =>
      prev.map((q) => (q.id === quizId ? { ...q, sentToEmail: true } : q)),
    );
    setSentEmailSuccess(true);
    setTimeout(() => setSentEmailSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Subnavigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('quizzes');
              setSelectedQuiz(null);
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'quizzes' && !selectedQuiz
                ? 'bg-primary text-text-inverse shadow-xs'
                : 'bg-surface text-muted hover:text-text'
            }`}
          >
            Todos los quizzes ({quizzes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('results')}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'results'
                ? 'bg-primary text-text-inverse shadow-xs'
                : 'bg-surface text-muted hover:text-text'
            }`}
          >
            Resultados de alumnos ({quizzes.reduce((acc, q) => acc + q.totalSubmissions, 0)})
          </button>
        </div>

        <Button
          variant="solid"
          size="sm"
          onClick={() => setIsCreateOpen(true)}
          iconLeft={<Plus className="h-4 w-4" />}
        >
          Crear nuevo quiz
        </Button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'quizzes' && !selectedQuiz && (
        <div className="space-y-6">
          {/* Quick templates row */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary-strong" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
                Plantillas rápidas recomendadas
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {templates.map((tpl) => (
                <Card
                  key={tpl.id}
                  className="group flex flex-col justify-between p-4 border-border/80 transition-all hover:border-primary/50 hover:shadow-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Badge tone="info" size="sm">
                        {tpl.difficulty}
                      </Badge>
                      <span className="text-[11px] text-muted">{tpl.suggestedMinutes} min</span>
                    </div>
                    <h3 className="text-xs font-bold text-text group-hover:text-primary-strong transition-colors line-clamp-1">
                      {tpl.title}
                    </h3>
                    <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-border/30 flex items-center justify-between">
                    <span className="text-[10px] text-muted">{tpl.defaultQuestionsCount} preguntas</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => {
                        handleApplyTemplate(tpl);
                        setIsCreateOpen(true);
                      }}
                    >
                      Usar plantilla
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quizzes List */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
              Quizzes creados en este curso
            </h2>

            <div className="grid gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="p-5 border-border/80 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge tone={quiz.status === 'published' ? 'active' : 'locked'} size="sm">
                          {quiz.status === 'published' ? 'Activo' : 'Borrador'}
                        </Badge>
                        <Badge tone="active" size="sm">
                          {quiz.unitTitle}
                        </Badge>
                        {quiz.sentToPanel && (
                          <span className="inline-flex items-center gap-1 rounded bg-success/15 px-1.5 py-0.5 text-[10px] font-bold text-success">
                            <Check className="h-3 w-3" /> En panel alumnos
                          </span>
                        )}
                        {quiz.sentToEmail && (
                          <span className="inline-flex items-center gap-1 rounded bg-info/15 px-1.5 py-0.5 text-[10px] font-bold text-info">
                            <Mail className="h-3 w-3" /> Enviado por correo
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-text">{quiz.title}</h3>
                      <p className="text-xs text-muted max-w-2xl leading-relaxed">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={() => {
                          setQuizToShare(quiz);
                          setIsShareOpen(true);
                        }}
                        iconLeft={<Share2 className="h-3.5 w-3.5" />}
                      >
                        Compartir
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={() => setSelectedQuiz(quiz)}
                        iconRight={<ChevronRight className="h-3.5 w-3.5" />}
                      >
                        Ver resultados ({quiz.totalSubmissions})
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border/30 text-xs">
                    <div>
                      <p className="text-[10px] text-muted">Preguntas</p>
                      <p className="font-bold text-text">{quiz.questionsCount} ítems</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted">Tiempo asignado</p>
                      <p className="font-bold text-text">{quiz.timeMinutes} min</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted">Respuestas recibidas</p>
                      <p className="font-bold text-text">{quiz.totalSubmissions} estudiantes</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted">Promedio de nota</p>
                      <p className="font-bold text-primary-strong">
                        {quiz.averageScore > 0 ? quiz.averageScore.toFixed(1) : 'Sin datos'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail results of selected quiz */}
      {selectedQuiz && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedQuiz(null)}
            >
              ← Volver al listado de quizzes
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="soft"
                size="sm"
                onClick={() => {
                  setQuizToShare(selectedQuiz);
                  setIsShareOpen(true);
                }}
                iconLeft={<Share2 className="h-3.5 w-3.5" />}
              >
                Compartir quiz
              </Button>
            </div>
          </div>

          <Card className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge tone="active">{selectedQuiz.unitTitle}</Badge>
                  <span className="text-xs text-muted">Creado el {new Date(selectedQuiz.createdAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-lg font-bold text-text">{selectedQuiz.title}</h2>
                <p className="text-xs text-muted mt-1">{selectedQuiz.description}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-muted">Promedio cohorte</span>
                <p className="text-2xl font-black text-primary-strong">
                  {selectedQuiz.averageScore > 0 ? selectedQuiz.averageScore.toFixed(1) : '—'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30">
              <div className="rounded-xl bg-surface-raised p-3 text-center">
                <span className="text-xs text-muted">Total respuestas</span>
                <p className="text-base font-bold text-text">{selectedQuiz.totalSubmissions}</p>
              </div>
              <div className="rounded-xl bg-surface-raised p-3 text-center">
                <span className="text-xs text-muted">Preguntas</span>
                <p className="text-base font-bold text-text">{selectedQuiz.questionsCount}</p>
              </div>
              <div className="rounded-xl bg-surface-raised p-3 text-center">
                <span className="text-xs text-muted">Tiempo sugerido</span>
                <p className="text-base font-bold text-text">{selectedQuiz.timeMinutes} min</p>
              </div>
            </div>
          </Card>

          {/* Results table */}
          <Card className="p-5 space-y-3">
            <h3 className="text-sm font-bold text-text">
              Entregas de alumnos ({selectedQuiz.results.length})
            </h3>
            {selectedQuiz.results.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted">
                Aún no hay respuestas registradas para este quiz. Compártelo con tus alumnos para recibir métricas.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border/40 text-muted">
                      <th className="py-2.5 font-semibold">Alumno (Anónimo)</th>
                      <th className="py-2.5 font-semibold">Fecha de entrega</th>
                      <th className="py-2.5 font-semibold">Aciertos</th>
                      <th className="py-2.5 font-semibold">Tiempo</th>
                      <th className="py-2.5 font-semibold text-right">Nota obtenida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {selectedQuiz.results.map((res) => (
                      <tr key={res.attemptId} className="hover:bg-surface-raised/50">
                        <td className="py-3 font-semibold text-text">{res.studentAlias}</td>
                        <td className="py-3 text-muted">
                          {new Date(res.submittedAt).toLocaleString('es-CL', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </td>
                        <td className="py-3">
                          <span className="font-semibold text-text">
                            {res.correctAnswers}/{res.totalQuestions}
                          </span>{' '}
                          <span className="text-muted text-[10px]">
                            ({Math.round((res.correctAnswers / res.totalQuestions) * 100)}%)
                          </span>
                        </td>
                        <td className="py-3 text-muted">{res.timeSpentMinutes} min</td>
                        <td className="py-3 text-right">
                          <span
                            className={`inline-block font-bold px-2 py-0.5 rounded text-xs ${
                              res.score >= 5.0
                                ? 'bg-success/15 text-success'
                                : res.score >= 4.0
                                ? 'bg-warning/15 text-warning'
                                : 'bg-danger/15 text-danger'
                            }`}
                          >
                            {res.score.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Results Tab Overview */}
      {activeTab === 'results' && !selectedQuiz && (
        <div className="space-y-4">
          <Card className="p-5 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-text">Historial consolidado de evaluaciones</h2>
              <p className="text-xs text-muted">
                Respuestas recopiladas en todos los quizzes compartidos con tu cohorte.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/40 text-muted">
                    <th className="py-2.5 font-semibold">Quiz</th>
                    <th className="py-2.5 font-semibold">Unidad</th>
                    <th className="py-2.5 font-semibold">Respuestas</th>
                    <th className="py-2.5 font-semibold">Promedio</th>
                    <th className="py-2.5 font-semibold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {quizzes.map((q) => (
                    <tr key={q.id} className="hover:bg-surface-raised/50">
                      <td className="py-3 font-semibold text-text max-w-xs truncate">{q.title}</td>
                      <td className="py-3 text-muted">{q.unitTitle}</td>
                      <td className="py-3 font-medium text-text">{q.totalSubmissions} estudiantes</td>
                      <td className="py-3">
                        <span className="font-bold text-primary-strong">
                          {q.averageScore > 0 ? q.averageScore.toFixed(1) : 'Sin notas'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedQuiz(q)}
                          className="h-7 text-xs"
                        >
                          Ver detalle
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Modal: Crear nuevo Quiz */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Crear nuevo quiz interactivo"
      >
        <form onSubmit={handleCreateQuiz} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text">Título del quiz</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Control corto: Surfactante y Compliance"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text">Unidad temática</label>
            <Select
              value={unitTitle}
              onChange={(e) => setUnitTitle(e.target.value)}
              options={[
                { value: 'Mecánica Ventilatoria', label: 'Mecánica Ventilatoria' },
                { value: 'Intercambio de Gases', label: 'Intercambio de Gases' },
                { value: 'Ventilación y Perfusión', label: 'Ventilación y Perfusión' },
                { value: 'Control de la Respiración', label: 'Control de la Respiración' },
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text">Descripción o instrucciones</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instrucciones para los alumnos al abrir este quiz..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text">Cantidad de preguntas</label>
              <Input
                type="number"
                min={1}
                max={20}
                value={questionsCount}
                onChange={(e) => setQuestionsCount(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text">Tiempo límite (minutos)</label>
              <Input
                type="number"
                min={3}
                max={60}
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-border/30">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="solid">
              Publicar quiz
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Compartir Quiz */}
      <Modal
        isOpen={isShareOpen}
        onClose={() => {
          setIsShareOpen(false);
          setQuizToShare(null);
        }}
        title="Compartir quiz con alumnos"
      >
        {quizToShare && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-text">{quizToShare.title}</p>
              <p className="text-xs text-muted mt-0.5">{quizToShare.description}</p>
            </div>

            {/* Link directo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text">Enlace directo al quiz</label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={quizToShare.shareUrl}
                  className="bg-surface-raised font-mono text-xs"
                />
                <Button
                  type="button"
                  variant="soft"
                  size="sm"
                  onClick={() => handleCopyLink(quizToShare.shareUrl)}
                  iconLeft={copiedLink ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                >
                  {copiedLink ? 'Copiado' : 'Copiar'}
                </Button>
              </div>
            </div>

            {/* Acciones de envío directo */}
            <div className="space-y-2 pt-2 border-t border-border/30">
              <label className="text-xs font-bold text-text">Canales de distribución automática</label>
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => handleSendToPanel(quizToShare.id)}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-surface-raised transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Send className="h-4 w-4 text-primary-strong" />
                    <div>
                      <p className="text-xs font-bold text-text">Publicar en el panel de mis estudiantes</p>
                      <p className="text-[11px] text-muted">Aparece en su sección de ejercicios y actividades recomendadas</p>
                    </div>
                  </div>
                  {sentPanelSuccess || quizToShare.sentToPanel ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-success">
                      <Check className="h-3.5 w-3.5" /> Publicado
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-primary-strong">Enviar ahora</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendToEmail(quizToShare.id)}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-surface-raised transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-primary-strong" />
                    <div>
                      <p className="text-xs font-bold text-text">Enviar invitación a correos institucionales</p>
                      <p className="text-[11px] text-muted">Notifica a los 48 alumnos inscritos en tu sección</p>
                    </div>
                  </div>
                  {sentEmailSuccess || quizToShare.sentToEmail ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-success">
                      <Check className="h-3.5 w-3.5" /> Enviado
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-primary-strong">Mandar correos</span>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsShareOpen(false);
                  setQuizToShare(null);
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
