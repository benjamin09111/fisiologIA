'use server';

import { cookies } from 'next/headers';
import { themeSchema } from '@/schemas/theme';
import { THEME_COOKIE_NAME } from '@/lib/theme-script';

export async function setTheme(
  theme: unknown,
): Promise<{ success: boolean; error?: string }> {
  const result = themeSchema.safeParse(theme);
  if (!result.success) {
    return { success: false, error: 'Paleta inválida' };
  }

  const cookieStore = await cookies();
  cookieStore.set(THEME_COOKIE_NAME, result.data, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 año
  });

  return { success: true };
}
