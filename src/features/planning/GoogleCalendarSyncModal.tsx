'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CalendarPlus, CheckCircle2, ExternalLink } from 'lucide-react';

export interface GoogleCalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventTime?: string;
  eventLocation?: string;
}

export function GoogleCalendarSyncModal({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  eventTime = '08:30 - 10:30',
  eventLocation = 'Campus Medicina / Aula Virtual',
}: GoogleCalendarSyncModalProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleSimulateSync = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      onClose();
    }, 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sincronizar con Google Calendar"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-primary/30 bg-primary-soft/20 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-primary-strong" />
            <h4 className="text-sm font-bold text-text">{eventTitle}</h4>
          </div>
          <div className="text-xs text-muted space-y-1">
            <p>
              <strong className="text-text">Fecha:</strong> {eventDate}
            </p>
            <p>
              <strong className="text-text">Horario:</strong> {eventTime}
            </p>
            <p>
              <strong className="text-text">Ubicación:</strong> {eventLocation}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-surface-raised p-3 text-xs text-muted leading-relaxed">
          <p>
            <strong className="text-text">Recordatorio de desarrollo (Mock):</strong> Esta funcionalidad
            generará automáticamente la URL con formato{' '}
            <code className="text-primary-strong font-mono">https://calendar.google.com/calendar/render?action=TEMPLATE</code>{' '}
            para agendar el certamen en tu calendario personal con alerta previa de 24 horas.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="solid"
            onClick={handleSimulateSync}
            iconRight={isCopied ? <CheckCircle2 className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
          >
            {isCopied ? '¡Evento preparado!' : 'Guardar en Google Calendar (Mock)'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
