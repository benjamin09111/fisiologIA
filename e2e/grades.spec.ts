import { test, expect } from '@playwright/test';

test.describe('Mis Notas (/notas)', () => {
  test('renders grades summary, rule explanations, and evaluations table', async ({ page }) => {
    await page.goto('/notas');

    // PageHeader
    await expect(page.getByRole('heading', { name: 'Mis notas', level: 1 })).toBeVisible();

    // Summary KPIs
    await expect(page.getByText('Promedio ponderado')).toBeVisible();
    await expect(page.getByText('Porcentaje evaluado')).toBeVisible();
    await expect(page.getByText('Para aprobar (4.0)')).toBeVisible();
    await expect(page.getByText('Escala de notas')).toBeVisible();

    // Base point and passing score
    await expect(page.getByText('Punto base:')).toBeVisible();
    await expect(page.getByText('1.0', { exact: true })).toBeVisible();
    await expect(page.getByText('4.0', { exact: true })).toBeVisible();

    // Rules Explanation
    await expect(page.getByRole('heading', { name: 'Reglamento de evaluación y cálculo de notas' })).toBeVisible();
    await expect(page.getByText('Cátedra Teórica')).toBeVisible();
    await expect(page.getByText('Laboratorios y Talleres')).toBeVisible();

    // Table of Evaluations
    await expect(page.getByRole('heading', { name: 'Desglose de evaluaciones' })).toBeVisible();
    await expect(page.getByText('Solemne 1 · Mecánica y Dinámica Ventilatoria')).toBeVisible();
    await expect(page.getByText('Quizes Semanales (Promedio acumulado)')).toBeVisible();
    await expect(page.getByText('Paso Práctico 1 · Espirometría y Volúmenes')).toBeVisible();
  });
});
