'use client';

import * as React from 'react';
import { THEMES, THEME_CONFIGS, type ThemeName } from '@/config/palettes';
import { setTheme } from '@/features/settings/actions';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ThemeSelectorProps {
  currentTheme?: ThemeName;
}

export function ThemeSelector({ currentTheme = 'lavanda' }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeName>(currentTheme);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSelect = async (newTheme: ThemeName) => {
    if (!THEMES.includes(newTheme)) return;

    // 1. Optimistic DOM update
    setSelectedTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    // 2. Persist via server action
    const res = await setTheme(newTheme);
    if (res.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-text">Paleta de colores</h2>
          <p className="text-xs text-muted">
            Personaliza el tema visual de la aplicación. Tu elección se guarda automáticamente.
          </p>
        </div>
        {isSaved && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Guardado</span>
          </span>
        )}
      </div>

      <div
        role="radiogroup"
        aria-label="Selector de paleta"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {THEMES.map((themeKey) => {
          const conf = THEME_CONFIGS[themeKey];
          const isSelected = selectedTheme === themeKey;
          return (
            <button
              key={themeKey}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(themeKey)}
              className={cn(
                'group relative flex flex-col justify-between rounded-card border p-4 text-left transition-all cursor-pointer',
                isSelected
                  ? 'border-primary-strong bg-primary-soft/30 shadow-sm ring-2 ring-primary/40'
                  : 'border-border/60 bg-surface hover:border-border hover:bg-primary-soft/10',
              )}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-bold text-text capitalize">{conf.name}</span>
                <div
                  data-theme={themeKey}
                  className="flex items-center gap-1.5 rounded-full border border-border/60 bg-surface px-2 py-1 shadow-2xs"
                  aria-hidden="true"
                >
                  <span className="h-3.5 w-3.5 rounded-full bg-primary-soft border border-border/40" />
                  <span className="h-3.5 w-3.5 rounded-full bg-primary-mid border border-border/40" />
                  <span className="h-3.5 w-3.5 rounded-full bg-primary-strong" />
                </div>
              </div>
              <p className="text-xs text-muted">{conf.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
