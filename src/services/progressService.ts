import 'server-only';
import { cache } from 'react';
import progressMock from '@/mocks/progress.json';
import { userProgressSchema, type UserProgress } from '@/schemas/progress';

export const getProgress = cache(async (): Promise<UserProgress> => {
  return userProgressSchema.parse(progressMock);
});
