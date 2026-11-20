import { test, expect } from '@playwright/test';

test.describe('Panel Docente (/docente)', () => {
  test('student role sees access notice on /docente', async ({ page }) => {
    // Default role is student
    await page.goto('/docente');
    await expect(page.getByText('Vista exclusiva para docentes')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Volver a Inicio' })).toBeVisible();
  });

  test('teacher role accesses full dashboard and unit details', async ({ context, page }) => {
    // Set teacher cookie
    await context.addCookies([
      {
        name: 'fisio-role',
        value: 'teacher',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/docente');

    // PageHeader
    await expect(
      page.getByRole('heading', { name: 'Panel docente', level: 1 }),
    ).toBeVisible();

    // KPIs
    await expect(page.getByText('Estudiantes', { exact: true })).toBeVisible();
    await expect(page.getByText('142')).toBeVisible();
    await expect(page.getByText('Promedio general')).toBeVisible();
    await expect(page.getByText('Tasa de aprobación')).toBeVisible();
    await expect(page.getByText('88%')).toBeVisible();

    // Chart & Table
    await expect(page.getByText('Promedio por unidad temática')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Rendimiento por unidad' })).toBeVisible();
    await expect(
      page.getByText('Mecánica ventilatoria').filter({ visible: true }).first(),
    ).toBeVisible();

    // Navigate to unit details
    const detailLink = page.getByRole('link', { name: /Ver detalle/ }).filter({ visible: true }).first();
    await expect(detailLink).toBeVisible();
    await detailLink.click();

    await expect(page).toHaveURL(/\/docente\/unidades\/mecanica-ventilatoria/);
    await expect(page.getByRole('heading', { name: 'Preguntas más falladas' })).toBeVisible();
    await expect(
      page.getByText(/Localización del punto de mayor resistencia/),
    ).toBeVisible();
  });
});
