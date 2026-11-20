import { test, expect } from '@playwright/test';

test.describe('Mis Cursos Workflow', () => {
  test('navigates from /cursos down to specific topic content', async ({ page }) => {
    // 1. Visit /cursos
    await page.goto('/cursos');
    await expect(page.getByRole('heading', { level: 1, name: 'Nuestros módulos' })).toBeVisible();

    // Filter courses with exact name
    await page.getByRole('link', { name: 'En curso', exact: true }).click();
    await expect(page).toHaveURL(/estado=en_curso/);
    await expect(page.getByRole('heading', { name: 'Fisiología Respiratoria' })).toBeVisible();

    // 2. Open Fisiología Respiratoria
    await page.getByRole('heading', { name: 'Fisiología Respiratoria' }).click();
    await expect(page).toHaveURL(/\/cursos\/respiratoria/, { timeout: 15000 });
    await expect(page.getByText('Unidades temáticas')).toBeVisible();

    // 3. Open Unidad 1
    await page.getByRole('link', { name: /mecánica ventilatoria/i }).click();
    await expect(page).toHaveURL(/\/cursos\/respiratoria\/unidades\/mecanica-ventilatoria/, { timeout: 15000 });
    await expect(page.getByText('Temas de la unidad')).toBeVisible();
    await expect(page.getByRole('link', { name: /practicar esta unidad/i })).toBeVisible();

    // 4. Open Topic 1
    await page.getByText('Presiones y gradientes transmurales').click();
    await expect(page).toHaveURL(
      /\/cursos\/respiratoria\/unidades\/mecanica-ventilatoria\/temas\/presiones-y-gradientes/,
      { timeout: 15000 },
    );
    await expect(page.getByText('Puntos clave para recordar')).toBeVisible();
    await expect(page.getByText('Fundamentos teóricos')).toBeVisible();
    await expect(page.getByRole('link', { name: /preguntar a fisiobot/i })).toBeVisible();
  });

  test('displays 404 page for non-existent course id', async ({ page }) => {
    await page.goto('/cursos/modulo-inexistente');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByText(/la ruta que intentas explorar no existe/i)).toBeVisible();
  });
});
