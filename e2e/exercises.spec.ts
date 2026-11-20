import { test, expect } from '@playwright/test';

test.describe('Ejercicios and Quiz Runner Workflow', () => {
  test('solves a quiz from start to finish and views graded result', async ({ page }) => {
    // 1. Visit /ejercicios
    await page.goto('/ejercicios');
    await expect(page.getByRole('heading', { level: 1, name: 'Ejercicios y evaluaciones' })).toBeVisible();

    // 2. Click Comenzar cuestionario
    await page.getByRole('link', { name: /comenzar cuestionario/i }).click();
    await expect(page).toHaveURL(/\/ejercicios\/cuestionarios\/quiz-mecanica-1/, { timeout: 15000 });

    // Verify security: HTML does not contain answer keys or explanations
    const pageHtml = await page.content();
    expect(pageHtml).not.toContain('correctOptionIds');
    expect(pageHtml).not.toContain('Al final de la espiración normal (en CRF)');

    // 3. Question 1: select -5 cmH2O (option opt-1c)
    await page.getByText('-5 cmH2O (subatmosférica)').click();
    await page.getByRole('button', { name: /siguiente/i }).click();

    // 4. Question 2: select surfactante function
    await page.getByText(/disminuir la tensión superficial/i).click();
    await page.getByRole('button', { name: /siguiente/i }).click();

    // 5. Question 3: select Volumen residual
    await page.getByText('Volumen residual (VR)').click();
    await page.getByRole('button', { name: /siguiente/i }).click();

    // 6. Question 4: select bronquios de mediano calibre
    await page.getByText(/bronquios de mediano calibre/i).click();
    await page.getByRole('button', { name: /siguiente/i }).click();

    // 7. Question 5 (multiple): select diaphragm & intrapleural
    await page.getByText('El diafragma se contrae y desciende').click();
    await page.getByText(/la presión intrapleural se vuelve más negativa/i).click();

    // 8. Submit
    await page.getByRole('button', { name: /finalizar y enviar/i }).click();

    // Confirm in modal
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: /confirmar envío/i }).click();

    // 9. Redirects to result (allow sufficient time for server action and compilation)
    await expect(page).toHaveURL(/\/resultado\/att-/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Resultado de la evaluación' })).toBeVisible();
    await expect(page.getByText('100%', { exact: true })).toBeVisible();
    await expect(page.getByText('5 de 5 correctas')).toBeVisible();
    await expect(page.getByText('Aprobado')).toBeVisible();
  });

  test('bank view allows interactive practice in modal', async ({ page }) => {
    await page.goto('/ejercicios/banco');
    await expect(page.getByRole('heading', { level: 1, name: 'Banco de preguntas' })).toBeVisible();

    const practiceBtns = page.getByRole('button', { name: /practicar/i });
    await expect(practiceBtns.first()).toBeVisible();
    await practiceBtns.first().click();

    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Práctica individual')).toBeVisible();

    // Close using the explicit label button
    await dialog.getByLabel('Cerrar').click();
    await expect(dialog).toBeHidden();
  });
});
