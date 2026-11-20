import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface MascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  float?: boolean;
  className?: string;
}

export function Mascot({
  size = 'md',
  float = false,
  className,
}: MascotProps) {
  const dimensions = {
    sm: { width: 60, height: 60 },
    md: { width: 100, height: 100 },
    lg: { width: 150, height: 150 },
    xl: { width: 200, height: 200 },
  }[size];

  return (
    <div
      className={cn(
        'pointer-events-none relative shrink-0 select-none',
        float && 'animate-float',
        className,
      )}
    >
      <Image
        src="/robot.png"
        alt="FisioBot"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain drop-shadow-md"
        priority
      />
    </div>
  );
}
