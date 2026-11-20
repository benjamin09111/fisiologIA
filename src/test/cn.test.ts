import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn utility', () => {
  it('merges class names properly', () => {
    expect(cn('px-2 py-1', 'bg-surface')).toBe('px-2 py-1 bg-surface');
  });

  it('handles conditional classes and tailwind collisions', () => {
    expect(cn('p-4', false && 'hidden', 'p-2')).toBe('p-2');
  });
});
