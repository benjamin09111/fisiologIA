# Registro de decisiones (ADR corto)

Formato: `## ADR-NNN — Título (fecha)` · Contexto · Decisión · Consecuencias.

## ADR-001 — Conocimiento de agentes agnóstico (2026-11-20)
- **Contexto:** se usarán varios agentes de IA en paralelo.
- **Decisión:** todo el contexto vive en `.agents/`; `AGENTS.md` es el punto de entrada; `CLAUDE.md` solo importa `AGENTS.md`.
- **Consecuencias:** no duplicar reglas en archivos por proveedor.

## ADR-002 — Paletas por atributo `data-theme` + tokens CSS (2026-11-20)
- **Contexto:** el usuario elige entre 5 paletas (lavanda, océano, menta, rosa, oscuro) para toda la app.
- **Decisión:** tokens semánticos en `@theme` (Tailwind 4) reasignados bajo `[data-theme=...]`. Cambiar paleta = cambiar atributo en `<html>`.
- **Consecuencias:** cero JS extra por componente, cero re-render; prohibidos colores hardcodeados.

## ADR-003 — Persistencia de paleta en cookie, no localStorage (2026-11-20)
- **Contexto:** regla de no usar localStorage; evitar flash de tema; mantener rutas estáticas.
- **Decisión:** cookie `fisio-theme` (allowlist zod) escrita por Server Action; un script inline **estático** en `<head>` la lee y aplica `data-theme` antes del primer paint (patrón oficial "preventing flash before hydration" de Next 16). No se lee la cookie en el root layout para no volver dinámicas todas las rutas.
- **Consecuencias:** sin FOUC, rutas pueden seguir siendo estáticas. Cuando exista backend, la preferencia también se guardará en el perfil del usuario.

## ADR-004 — Capa `services/` entre UI y datos (2026-11-20)
- **Decisión:** las páginas solo consumen `services/*` (server-only), que hoy leen `mocks/*.json` validados con zod.
- **Consecuencias:** conectar Supabase/API = reemplazar implementación de servicios sin tocar UI.

## ADR-005 — Tipos derivados de zod (2026-11-20)
- **Decisión:** `schemas/` es la fuente de verdad; `types/` exporta `z.infer<>` + tipos de UI.
- **Consecuencias:** mocks validados en tests; sin divergencia entre tipos y validación.

## ADR-006 — Sin librerías pesadas de UI/gráficos (2026-11-20)
- **Decisión:** iconos `lucide-react` (tree-shaking); gráficos SVG propios; animaciones CSS + View Transitions; variantes con `cva` + `tailwind-merge`. Sin librería de componentes ni de charts por ahora.
- **Consecuencias:** bundle mínimo; más control del diseño.

## ADR-007 — Corrección de ejercicios en servidor (2026-11-20)
- **Decisión:** el cliente recibe preguntas sin respuestas correctas; la corrección es una Server Action.
- **Consecuencias:** imposible "hacer trampa" leyendo el payload; mismo contrato que tendrá el backend.

## ADR-008 — Tipografía Plus Jakarta Sans (2026-11-20)
- **Contexto:** la fuente exacta del diseño no está definida; el usuario pidió la más parecida.
- **Decisión:** Plus Jakarta Sans vía `next/font/google` (400–800).
- **Consecuencias:** se carga sin bloquear el render; un solo `--font-sans` para toda la app.

## ADR-009 — Ejercicios fuera del sidebar (2026-11-20)
- **Contexto:** el diseño no tiene item "Ejercicios".
- **Decisión:** se entra desde la tarjeta "Practicar" de Inicio y desde cada unidad. En `/ejercicios/*` ningún item del sidebar queda activo; la ubicación la dan el título de página y los breadcrumbs.

## ADR-010 — El diseño como guía visual, no copia literal (2026-11-20)
- **Decisión:** se respeta el estilo y la estructura de `design.jpeg`; el contenido sale de las funcionalidades de `plan.md`. Biblioteca y FisioIA quedan como placeholders.

## ADR-011 — Paletas con 4 variables base (2026-11-20)
- **Decisión:** cada paleta define solo `--base-surface/soft/mid/strong` (+ bg/text en oscuro); los tokens `--color-*` se derivan con `color-mix()`. Tabla completa en `PLAN_IMPLEMENTACION.md` Fase 1.3.
- **Consecuencias:** agregar una paleta = un bloque CSS pequeño; contraste AA verificado por paleta.

## ADR-012 — Calibración de tokens para accesibilidad WCAG 2.1 AA (2026-11-20)
- **Contexto:** las auditorías automáticas de Axe Core detectaron puntos con contraste inferior a 4.5:1 en textos de 12px y estados tenues.
- **Decisión:**
  1. Token `--color-muted` calibrado a `color-mix(in srgb, var(--base-text) 75%, transparent)` para garantizar legibilidad en subtítulos y metadata.
  2. `--base-strong` en paleta `lavanda` profundizado sutilmente a `#5945b0` (de `#6351b8`), asegurando 4.85:1 sobre `--base-soft`.
  3. Badge `tone="success"` utiliza `text-emerald-800 dark:text-emerald-200` y `locked` utiliza `text-text/90` sobre fondo elevado.
  4. Atributos de accesibilidad: `role="img"` en placeholders de `ModuleImage` y `aria-label` en `ProgressBar`.
- **Consecuencias:** cero violaciones críticas o serias de accesibilidad WCAG 2.1 AA en todas las rutas tanto en desktop como en mobile.

## ADR-013 — Métricas educativas restringidas (2026-11-20)
- **Contexto:** RF-14 y RF-26 prohíben calificaciones/promedios visibles y la identificación de estudiantes en vistas docentes.
- **Decisión:** estudiante y docente muestran únicamente avance de contenidos y porcentaje de respuestas correctas; el docente consulta datos agregados por unidad, sin nombres.
- **Consecuencias:** el historial docente deja de listar intentos individuales y usa el resumen agregado de unidades.

## ADR-014 — Rol mock y React Compiler (2026-11-20)
- **Decisión:** `switchRole` queda disponible solo en desarrollo como mecanismo temporal hasta integrar login; React Compiler permanece desactivado y se elimina su plugin.
