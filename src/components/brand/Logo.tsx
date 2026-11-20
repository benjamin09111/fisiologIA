import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface LogoProps {
  showTagline?: boolean;
  className?: string;
}

export function Logo({ showTagline = true, className }: LogoProps) {
  return (
    <Link
      href="/inicio"
      className={cn(
        'group inline-flex select-none items-center gap-3',
        className,
      )}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/30 bg-primary-soft shadow-xs transition-transform group-hover:scale-105">
        <Image
          src="/logo.png"
          alt="FisiologIA"
          width={32}
          height={32}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold leading-tight tracking-tight text-text transition-colors group-hover:text-primary-strong">
          FisiologIA
        </span>
        {showTagline && (
          <span className="text-[10px] font-bold uppercase tracking-wide text-primary-strong">
            Aprende · Comprende · Evoluciona
          </span>
        )}
      </div>
    </Link>
  );
}
