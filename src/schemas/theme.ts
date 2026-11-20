import { z } from 'zod';
import { THEMES } from '@/config/palettes';

export const themeSchema = z.enum(THEMES);
export type ThemeSchemaType = z.infer<typeof themeSchema>;
