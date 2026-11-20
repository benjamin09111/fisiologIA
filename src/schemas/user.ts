import { z } from 'zod';

export const userRoleSchema = z.enum(['student', 'teacher']);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  initials: z.string(),
  email: z.string().email(),
  career: z.string(),
  role: userRoleSchema,
  avatarUrl: z.string().nullable().optional(),
  currentCourseId: z.string().optional(),
  currentUnitId: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
