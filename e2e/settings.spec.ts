import { test, expect } from '@playwright/test';

test.describe('Configuración (/configuracion)', () => {
  test('profile form updates and theme switcher changes and persists data-theme', async ({
    page,
  }) => {
    await page.goto('/configuracion');

    // Heading
    await expect(
      page.getByRole('heading', { name: 'Configuración', level: 1 }),
    ).toBeVisible();

    // Profile form
    await expect(page.getByLabel('Nombre completo')).toHaveValue(/Angholy/);
    await expect(page.getByRole('button', { name: 'Guardar cambios' })).toBeVisible();
    await page.getByRole('button', { name: 'Guardar cambios' }).click();
    await expect(page.getByText('Perfil actualizado exitosamente')).toBeVisible();

    // Theme selector options
    await expect(page.getByRole('radio', { name: /Menta/i })).toBeVisible();
    await expect(page.getByRole('radio', { name: /Océano/i })).toBeVisible();

    // Select "Menta"
    await page.getByRole('radio', { name: /Menta/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'menta');

    // Reload page and check that data-theme is still "menta"
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'menta');

    // Switch back to "Lavanda"
    await page.getByRole('radio', { name: /Lavanda/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'lavanda');
  });
});
