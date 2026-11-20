import * as React from 'react';
import { Heart } from 'lucide-react';
import homeContent from '@/content/home.json';

export interface GreetingProps {
  name: string;
}

export function Greeting({ name }: GreetingProps) {
  const firstName = name.split(' ')[0] || name;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-text">
          ¡Hola, {firstName}!
        </h1>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-rose text-accent-rose-strong">
          <Heart className="h-4 w-4 fill-current stroke-[2]" />
        </div>
      </div>
      <p className="text-xs md:text-sm font-semibold text-primary-strong">
        {homeContent.greetingSubtitle}
      </p>
    </div>
  );
}
