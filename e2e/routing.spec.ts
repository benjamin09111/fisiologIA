import { test, expect } from '@playwright/test';

test.describe('Root redirect', () => {
  test('redirects from / to /inicio', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/inicio/);
  });
});
