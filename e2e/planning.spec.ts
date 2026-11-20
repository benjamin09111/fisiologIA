import { test, expect } from '@playwright/test';

test.describe('Planificación (/planificacion)', () => {
  test('renders large calendar, legend, selected date events and upcoming evaluations', async ({
    page,
  }) => {
    await page.goto('/planificacion?mes=2026-10');

    // PageHeader
    await expect(
      page.getByRole('heading', { name: 'Planificación y evaluaciones', level: 1 }),
    ).toBeVisible();

    // Calendar
    await expect(page.getByText('Octubre de 2026', { exact: false })).toBeVisible();
    await expect(page.getByText('Tipos de evaluación')).toBeVisible();
    await expect(page.getByText('Solemne', { exact: true })).toBeVisible();
    await expect(page.getByText('Gynkana', { exact: true })).toBeVisible();

    // Default selected date (24/10) shows Solemne in day details
    await expect(page.getByText('Solemne Fisiología').first()).toBeVisible();
    await expect(page.getByText('Auditorio Central de Medicina')).toBeVisible();

    // Upcoming evaluations
    await expect(page.getByText('Próximas evaluaciones del semestre')).toBeVisible();

    // Month navigation
    const nextBtn = page.getByRole('button', { name: 'Mes siguiente' });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await expect(page).toHaveURL(/mes=2026-11/);
    await expect(page.getByText('Noviembre de 2026', { exact: false })).toBeVisible();
  });
});
