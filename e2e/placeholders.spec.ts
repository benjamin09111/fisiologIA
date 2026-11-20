import { test, expect } from '@playwright/test';

test.describe('Placeholders: Biblioteca y FisioIA', () => {
  test('Biblioteca renders resource cards and download buttons', async ({ page }) => {
    await page.goto('/biblioteca');
    await expect(
      page.getByRole('heading', { name: 'Biblioteca digital', level: 1 }),
    ).toBeVisible();
    await expect(page.getByText(/Guía Clínica: Ley de Poiseuille/)).toBeVisible();
    await expect(page.getByText(/Atlas Esquemático: Curvas Presión-Volumen/)).toBeVisible();
  });

  test('FisioIA renders chat mock with FisioBot bubbles and disabled input', async ({
    page,
  }) => {
    await page.goto('/fisioia');
    await expect(
      page.getByRole('heading', { name: 'FisioIA', level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('FisioBot').first()).toBeVisible();
    await expect(page.getByText(/Durante la inspiración tranquila, el diafragma/)).toBeVisible();
    await expect(page.getByPlaceholder(/El chat con IA estará activo/)).toBeDisabled();
  });
});
