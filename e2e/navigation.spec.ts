import { test, expect } from '@playwright/test';

test.describe('Navigation and App Shell', () => {
  test('renders sidebar with student nav items and navigates', async ({ page }) => {
    await page.goto('/inicio');

    // On desktop, sidebar should be visible
    const aside = page.locator('aside');
    if (await aside.isVisible()) {
      const inicioLink = aside.getByRole('link', { name: 'Inicio', exact: true });
      await expect(inicioLink).toHaveAttribute('aria-current', 'page');

      // Click Mis cursos
      await aside.getByRole('link', { name: 'Mis cursos', exact: true }).click();
      await expect(page).toHaveURL(/\/cursos/);

      const cursosLink = aside.getByRole('link', { name: 'Mis cursos', exact: true });
      await expect(cursosLink).toHaveAttribute('aria-current', 'page');
    }
  });

  test('/ejercicios leaves sidebar inactive per design rule ADR-009', async ({ page }) => {
    await page.goto('/ejercicios');
    const aside = page.locator('aside');
    if (await aside.isVisible()) {
      const activeLinks = aside.locator('[aria-current="page"]');
      await expect(activeLinks).toHaveCount(0);
    }
  });

  test('mobile navigation drawer opens and closes', async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.goto('/inicio');
    const menuBtn = page.getByRole('button', { name: 'Abrir menú' });
    await expect(menuBtn).toBeVisible();

    await menuBtn.click();
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    // Close button
    const closeBtn = dialog.getByRole('button', { name: 'Cerrar' });
    await closeBtn.click();
    await expect(dialog).toBeHidden();
  });
});
