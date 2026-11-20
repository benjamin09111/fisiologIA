import 'server-only';
import { cache } from 'react';
import planningMock from '@/mocks/planning.json';
import { planningSchema, type Planning } from '@/schemas/planning';

export const getPlanning = cache(async (): Promise<Planning> => {
  return planningSchema.parse(planningMock);
});
