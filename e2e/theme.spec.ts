import { test, expect } from '@playwright/test';

test.describe('Theme & Design System', () => {
  test('has default lavanda theme applied', async ({ page }) => {
    await page.goto('/inicio');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'lavanda');
  });

  test('applies theme from cookie before page scripts', async ({ context, page }) => {
    await context.addCookies([
      {
        name: 'fisio-theme',
        value: 'oceano',
        domain: 'localhost',
        path: '/',
      },
    ]);
    await page.goto('/inicio');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'oceano');
  });
});
