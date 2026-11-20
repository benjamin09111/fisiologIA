'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  side?: 'center' | 'left';
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  side = 'center',
}: ModalProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isLeft = side === 'left';

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      className={cn(
        'fixed inset-0 m-auto bg-transparent p-4 outline-none backdrop:bg-black/40 backdrop:backdrop-blur-xs open:animate-fade-in',
        isLeft
          ? 'm-0 h-full max-h-none w-72 max-w-[85vw] rounded-none p-0'
          : 'w-full max-w-lg',
      )}
    >
      <div
        className={cn(
          'relative flex flex-col overflow-hidden border border-border/40 bg-surface text-text shadow-soft',
          isLeft ? 'h-full w-full rounded-r-card p-6' : 'rounded-card p-6',
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-lg font-bold tracking-tight text-text">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-xs text-muted">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-primary-soft/50 hover:text-text"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>

        {footer && (
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-border/40 pt-4">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
