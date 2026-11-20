'use server';

import { getCurrentUser } from '@/services/userService';
import { gradeAttempt } from '@/services/exerciseService';
import { submitAttemptSchema } from '@/schemas/exercise';

export async function submitAttemptAction(input: unknown) {
  const result = submitAttemptSchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      error: 'Formato de respuestas inválido o incompleto.',
    };
  }

  try {
    const user = await getCurrentUser();
    const attempt = await gradeAttempt(result.data, user.name, user.id);

    return {
      success: true,
      attemptId: attempt.id,
      quizId: attempt.quizId,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al corregir el cuestionario.',
    };
  }
}
