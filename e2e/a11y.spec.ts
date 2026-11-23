import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/inicio',
  '/cursos',
  '/ejercicios',
  '/progreso',
  '/planificacion',
  '/configuracion',
  '/biblioteca',
  '/fisioia',
  '/notas',
];

test.describe('Accessibility (WCAG 2.1 AA via Axe)', () => {
  for (const route of ROUTES) {
    test(`route ${route} has no critical/serious a11y violations`, async ({ page }) => {
      await page.goto(route);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      expect(criticalViolations).toEqual([]);
    });
  }

  const TEACHER_ROUTES = [
    '/docente',
    '/docente/alumnos',
    '/docente/preguntas',
    '/docente/reforzar',
  ];

  for (const route of TEACHER_ROUTES) {
    test(`teacher route ${route} has no critical/serious a11y violations`, async ({ context, page }) => {
      await context.addCookies([
        { name: 'fisio-role', value: 'teacher', domain: 'localhost', path: '/' },
      ]);
      await page.goto(route);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      expect(criticalViolations).toEqual([]);
    });
  }
});
