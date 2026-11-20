import { test, expect } from '@playwright/test';

test.describe('Progreso (/progreso)', () => {
  test('renders KPI cards, course progress, evolution chart, strengths and FisioBot', async ({ page }) => {
    await page.goto('/progreso');

    // PageHeader
    await expect(page.getByRole('heading', { name: 'Mi progreso', level: 1 })).toBeVisible();

    // KPI Cards
    await expect(page.getByText('Avance global')).toBeVisible();
    await expect(page.getByText('Cuestionarios', { exact: true })).toBeVisible();
    await expect(page.getByText('Promedio', { exact: true })).toBeVisible();
    await expect(page.getByText('Racha actual')).toBeVisible();

    // Courses Progress
    await expect(page.getByRole('heading', { name: 'Avance por curso' })).toBeVisible();
    await expect(page.getByText('Fisiología Respiratoria')).toBeVisible();

    // Evolution Chart
    await expect(page.getByRole('heading', { name: 'Evolución de calificaciones' })).toBeVisible();

    // Strengths and Weaknesses
    await expect(page.getByRole('heading', { name: 'Diagnóstico de dominio' })).toBeVisible();
    await expect(page.getByText('Presiones y gradientes transmurales')).toBeVisible();
    await expect(page.getByText('Resistencia de la vía aérea (Poiseuille)')).toBeVisible();

    // FisioBot CTA
    const practiceCta = page.getByRole('link', { name: 'Practicar temas sugeridos →' });
    await expect(practiceCta).toBeVisible();
    await practiceCta.click();
    await expect(page).toHaveURL(/\/ejercicios\/banco/);
  });
});
