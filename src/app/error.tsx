'use client';

import * as React from 'react';
import { Mascot } from '@/components/brand/Mascot';
import { SpeechBubble } from '@/components/brand/SpeechBubble';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background">
      <div className="relative mb-6">
        <Mascot size="lg" />
        <div className="absolute -top-12 -right-16 hidden sm:block">
          <SpeechBubble>Ups... Ocurrió un error inesperado ♡</SpeechBubble>
        </div>
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-text">
        Algo no salió como esperábamos
      </h1>
      <p className="mt-2 text-sm text-muted max-w-sm">
        FisioBot está revisando qué ocurrió. Por favor intenta recargar.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Reintentar</Button>
        <Button variant="soft" href="/inicio">
          Ir al inicio
        </Button>
      </div>
    </div>
  );
}
