import { test, expect } from '@playwright/test';

test.describe('Inicio / Home View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inicio');
  });

  test('displays greeting, hero banner and mascot', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /¡Hola, Angholy!/i })).toBeVisible();
    await expect(page.getByText('Aprende Fisiología con FisioBot')).toBeVisible();
    await expect(page.getByRole('link', { name: /continuar estudiando/i })).toBeVisible();
    await expect(page.getByText(/¡Hola! Soy FisioBot/i)).toBeVisible();
  });

  test('displays continue card with progress and action', async ({ page }) => {
    await expect(page.getByText('Continúa donde quedaste')).toBeVisible();
    await expect(page.getByText('60%')).toBeVisible();
    const retomarBtn = page.getByRole('link', { name: /retomar/i });
    await expect(retomarBtn).toBeVisible();
  });

  test('quick actions are rendered and Practicar navigates to /ejercicios', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Preguntar a FisioBot' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Estudiar' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Practicar' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mi progreso' })).toBeVisible();

    // Click on Practicar
    await page.getByRole('heading', { name: 'Practicar' }).click();
    await expect(page).toHaveURL(/\/ejercicios/);
  });

  test('renders modules grid and locked status', async ({ page }) => {
    const modulesSection = page.locator('section').filter({ hasText: 'Nuestros módulos' });
    await expect(modulesSection).toBeVisible();
    await expect(modulesSection.getByRole('link', { name: 'Ver todos los módulos' })).toBeVisible();

    // Respiratoria should be in progress and inside modules grid
    await expect(modulesSection.getByRole('heading', { name: 'Fisiología Respiratoria' })).toBeVisible();
    await expect(modulesSection.getByText('En curso')).toBeVisible();

    // Other modules should be locked
    await expect(modulesSection.getByRole('heading', { name: 'Fisiología Cardiovascular' })).toBeVisible();
    await expect(modulesSection.getByText('Bloqueado').first()).toBeVisible();
  });

  test('renders planning widget and upcoming evaluations', async ({ page }) => {
    await expect(page.getByText('Mi planificación')).toBeVisible();
    await expect(page.getByText('Próximas evaluaciones')).toBeVisible();
    await expect(page.getByText('Solemne Fisiología')).toBeVisible();
    await expect(page.getByText('Gynkana Cabeza y Cuello')).toBeVisible();
  });
});
