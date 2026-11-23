import { test, expect } from '@playwright/test';

test.describe('Panel Docente (/docente)', () => {
  test('student role sees access notice on /docente', async ({ page }) => {
    // Default role is student
    await page.goto('/docente');
    await expect(page.getByText('Vista exclusiva para docentes')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Volver a Inicio' })).toBeVisible();
  });

  test('teacher role accesses full dashboard and unit details', async ({ context, page }) => {
    // Set teacher cookie
    await context.addCookies([
      {
        name: 'fisio-role',
        value: 'teacher',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/docente');

    // PageHeader & Anonymous Banner
    await expect(
      page.getByRole('heading', { name: 'Panel docente', level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('Métricas 100% Anónimas')).toBeVisible();

    // KPIs
    await expect(page.getByText('Estudiantes', { exact: true })).toBeVisible();
    await expect(page.getByText('Unidades', { exact: true })).toBeVisible();
    await expect(page.getByText('Cohorte')).toBeVisible();

    // Chart & Table
    await expect(page.getByText('Respuestas correctas por unidad')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Avance y aciertos por unidad' })).toBeVisible();
    await expect(
      page.getByText('Mecánica ventilatoria').filter({ visible: true }).first(),
    ).toBeVisible();

    // Navigate to unit details
    const detailLink = page.getByRole('link', { name: /Ver detalle/ }).filter({ visible: true }).first();
    await expect(detailLink).toBeVisible();
    await detailLink.click();

    await expect(page).toHaveURL(/\/docente\/unidades\/mecanica-ventilatoria/);
    await expect(page.getByRole('heading', { name: 'Preguntas más falladas' })).toBeVisible();
    await expect(
      page.getByText(/Localización del punto de mayor resistencia/),
    ).toBeVisible();

    // Verify FisioIA is guarded for teacher role
    await page.goto('/fisioia');
    await expect(page.getByText('Tutor exclusivo para estudiantes')).toBeVisible();
  });

  test('teacher views and explores Mis Alumnos (/docente/alumnos)', async ({ context, page }) => {
    await context.addCookies([
      { name: 'fisio-role', value: 'teacher', domain: 'localhost', path: '/' },
    ]);

    await page.goto('/docente/alumnos');
    await expect(page.getByRole('heading', { name: 'Mis alumnos', level: 1 })).toBeVisible();

    // Summary KPIs
    await expect(page.getByText('Total alumnos')).toBeVisible();
    await expect(page.getByText('Requieren apoyo')).toBeVisible();
    await expect(page.getByText('Destacados')).toBeVisible();

    // Student card & Open modal
    await expect(page.getByText('Estudiante #1042')).toBeVisible();
    const modalBtn = page.getByRole('button', { name: 'Ver ficha pedagógica' }).first();
    await modalBtn.click();

    // Modal is open
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Ficha Pedagógica')).toBeVisible();
    await page.getByRole('button', { name: 'Cerrar ficha' }).click();
  });

  test('teacher views and answers student questions (/docente/preguntas)', async ({ context, page }) => {
    await context.addCookies([
      { name: 'fisio-role', value: 'teacher', domain: 'localhost', path: '/' },
    ]);

    await page.goto('/docente/preguntas');
    await expect(page.getByRole('heading', { name: 'Consultas de alumnos', level: 1 })).toBeVisible();

    // Check pending tab
    await expect(page.getByText(/Pendientes de respuesta/)).toBeVisible();

    // Type a reply to the first pending question
    const textarea = page.getByRole('textbox', { name: 'Respuesta docente' }).first();
    await textarea.fill('La presión intrapleural se vuelve más negativa porque los músculos inspiratorios vencen el retroceso elástico pulmonar.');

    const sendBtn = page.getByRole('button', { name: 'Enviar respuesta al estudiante' }).first();
    await sendBtn.click();

    // Status message
    await expect(page.getByText('Respuesta enviada exitosamente al estudiante.')).toBeVisible();
  });

  test('teacher inspects quiz error analytics and pedagogical tips (/docente/reforzar)', async ({ context, page }) => {
    await context.addCookies([
      { name: 'fisio-role', value: 'teacher', domain: 'localhost', path: '/' },
    ]);

    await page.goto('/docente/reforzar');
    await expect(page.getByRole('heading', { name: 'Contenidos a reforzar', level: 1 })).toBeVisible();

    // Check KPIs
    await expect(page.getByText('Concepto más crítico')).toBeVisible();
    await expect(page.getByText('Tasa de error promedio')).toBeVisible();

    // Check error card
    await expect(page.getByText(/Resistencia de la vía aérea/)).toBeVisible();
    await expect(page.getByText(/Distractor más común/)).toBeVisible();
    await expect(page.getByText(/Recomendación pedagógica para tu próxima cátedra/)).toBeVisible();

    // Toggle mark review
    const markBtn = page.getByRole('button', { name: 'Marcar para repasar en clase' }).first();
    await markBtn.click();
    await expect(page.getByText('✓ Marcado para repaso en clase')).toBeVisible();
  });
});
