import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import userMock from '@/mocks/user.json';
import teacherMock from '@/mocks/teacher.json';
import { userSchema, type User, userRoleSchema } from '@/schemas/user';

export const ROLE_COOKIE_NAME = 'fisio-role';

export const getCurrentUser = cache(async (): Promise<User> => {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(ROLE_COOKIE_NAME)?.value;
  const roleResult = userRoleSchema.safeParse(roleCookie);
  const activeRole = roleResult.success ? roleResult.data : 'student';

  if (activeRole === 'teacher') {
    return userSchema.parse(teacherMock);
  }
  return userSchema.parse(userMock);
});
