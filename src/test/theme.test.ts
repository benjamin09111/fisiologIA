import { describe, it, expect } from 'vitest';
import { themeSchema } from '@/schemas/theme';
import { THEMES } from '@/config/palettes';
import { THEME_SCRIPT } from '@/lib/theme-script';

describe('Theme Schema & Script', () => {
  it('validates all allowed themes', () => {
    for (const theme of THEMES) {
      const parsed = themeSchema.safeParse(theme);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data).toBe(theme);
      }
    }
  });

  it('rejects invalid themes', () => {
    const invalidThemes = ['neon', 'solarized', 'dark', 'light', '', 123, null];
    for (const inv of invalidThemes) {
      expect(themeSchema.safeParse(inv).success).toBe(false);
    }
  });

  it('evaluates theme script in DOM correctly', () => {
    // Test with no cookie
    document.cookie = 'fisio-theme=; Max-Age=0';
    eval(THEME_SCRIPT);
    expect(document.documentElement.getAttribute('data-theme')).toBe('lavanda');

    // Test with valid cookie
    document.cookie = 'fisio-theme=menta; path=/';
    eval(THEME_SCRIPT);
    expect(document.documentElement.getAttribute('data-theme')).toBe('menta');

    // Test with invalid cookie (fallback to lavanda)
    document.cookie = 'fisio-theme=invalido; path=/';
    eval(THEME_SCRIPT);
    expect(document.documentElement.getAttribute('data-theme')).toBe('lavanda');
  });
});
