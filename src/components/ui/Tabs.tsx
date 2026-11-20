import * as React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/cn';

export interface TabItem {
  key: string;
  label: string;
  href: Route | string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeKey: string;
  className?: string;
}

export function Tabs({ tabs, activeKey, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex gap-1 rounded-full border border-border/30 bg-primary-soft/50 p-1 backdrop-blur-xs',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <Link
            key={tab.key}
            href={tab.href as Route}
            role="tab"
            aria-selected={isActive}
            className={cn(
              'inline-flex select-none items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 md:text-sm',
              isActive
                ? 'bg-surface text-primary-strong shadow-sm'
                : 'text-muted hover:bg-surface/50 hover:text-text',
            )}
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
