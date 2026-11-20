'use server';

import { cookies } from 'next/headers';
import { userRoleSchema, type UserRole } from '@/schemas/user';
import { ROLE_COOKIE_NAME } from '@/services/userService';

export async function switchRole(
  role: unknown,
): Promise<{ success: boolean; role?: UserRole; error?: string }> {
  if (process.env.NODE_ENV !== 'development') {
    return { success: false, error: 'El cambio de rol mock solo está disponible en desarrollo' };
  }

  const result = userRoleSchema.safeParse(role);
  if (!result.success) {
    return { success: false, error: 'Rol inválido' };
  }

  const cookieStore = await cookies();
  cookieStore.set(ROLE_COOKIE_NAME, result.data, {
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  return { success: true, role: result.data };
}
