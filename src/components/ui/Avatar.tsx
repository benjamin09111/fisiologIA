import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  imageSrc?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({
  name,
  imageSrc,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const sizeClass = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }[size];

  return (
    <div
      className={cn(
        'relative inline-flex select-none items-center justify-center overflow-hidden rounded-full border border-border/30 bg-primary-soft font-bold text-primary-strong',
        sizeClass,
        className,
      )}
      {...props}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="64px"
          className="object-cover"
        />
      ) : (
        <span>{initials || 'U'}</span>
      )}
    </div>
  );
}
