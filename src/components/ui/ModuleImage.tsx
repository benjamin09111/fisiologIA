import * as React from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ModuleImageProps {
  src?: string | null;
  alt: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export function ModuleImage({
  src,
  alt,
  icon,
  size = 'md',
  className,
}: ModuleImageProps) {
  const sizeClasses = {
    sm: 'h-12 w-12 rounded-xl text-lg',
    md: 'h-20 w-20 rounded-2xl text-2xl',
    lg: 'h-28 w-28 rounded-2xl text-3xl',
    hero: 'h-36 w-36 rounded-3xl text-4xl',
  }[size];

  if (src) {
    return (
      <div
        className={cn(
          'relative shrink-0 overflow-hidden border border-border/30 bg-primary-soft/30',
          sizeClasses,
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="150px"
          className="object-contain p-2"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center border border-border/30 bg-primary-soft text-primary-strong shadow-inner',
        sizeClasses,
        className,
      )}
      role="img"
      aria-label={alt}
    >
      {icon || <BookOpen className="h-1/2 w-1/2 stroke-[1.75]" />}
    </div>
  );
}
