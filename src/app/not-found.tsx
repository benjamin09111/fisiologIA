import { Mascot } from '@/components/brand/Mascot';
import { SpeechBubble } from '@/components/brand/SpeechBubble';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <div className="relative mb-6">
        <Mascot size="lg" float />
        <div className="absolute -right-16 -top-12 hidden sm:block">
          <SpeechBubble>¡Rayos! No encuentro esta página ♡</SpeechBubble>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-text">404</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        La ruta que intentas explorar no existe o ha sido reubicada.
      </p>
      <div className="mt-6">
        <Button href="/inicio">Volver al inicio</Button>
      </div>
    </div>
  );
}
