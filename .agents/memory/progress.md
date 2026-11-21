# Progreso

Leyenda: `[ ]` pendiente · `[~]` en curso (agente/rama) · `[x]` hecho (fecha)

Plan detallado: `PLAN_IMPLEMENTACION.md`.

## Fases

- [x] Carpeta `.agents/` y plan de implementación (2026-11-20)
- [x] Fase 0 — Fundaciones (deps, config, scripts, limpieza) (2026-11-20)
- [x] Fase 1 — Design system y paletas (tokens, 5 paletas, cookies, theme-script) (2026-11-20)
- [x] Fase 2 — Componentes UI base (2026-11-20)
- [x] Fase 3 — Capa de datos (schemas, types, mocks, services) (2026-11-20)
- [x] Fase 4 — App shell (sidebar, topbar, mobile, navegación) (2026-11-20)
- [x] Fase 5 — Inicio del estudiante (fiel a `design.jpeg`) (2026-11-20)
- [x] Fase 6 — Mis cursos (cursos, unidades, temas, filtros, 404) (2026-11-20)
- [x] Fase 7 — Ejercicios (QuizRunner, corrección server-only, banco, historial) (2026-11-20)
- [x] Fase 8 — Mi progreso (KPIs, gráficas SVG, fortalezas, coaching FisioBot) (2026-11-20)
- [x] Fase 9 — Planificación (calendario interactivo, eventos del día, pills de evaluación) (2026-11-20)
- [x] Fase 10 — Panel docente (KPIs cohorte, promedio por unidad, preguntas más falladas) (2026-11-20)
- [x] Fase 11 — Configuración de perfil (formulario de perfil, selector de 5 paletas con cookie) (2026-11-20)
- [x] Fase 12 — Biblioteca y FisioIA (placeholders de diseño con mock interactivo) (2026-11-20)
- [x] Fase 13 — QA final y documentación (auditoría Axe WCAG 2.1 AA, 60 tests E2E verdes) (2026-11-20)
- [x] Correcciones RF-14/RF-26: progreso limitado a avance y aciertos; docente agregado sin nombres (2026-11-20)
- [x] CSP Supabase, rol mock solo desarrollo y React Compiler desactivado (2026-11-20)
- [x] Mejoras de feedback de usuario (2026-11-20):
  - [x] 1. Cursos estilo online interactivo: actividades secuenciales y quizes de cierre por unidad (`UnitActivitiesChecklist`).
  - [x] 2. Checklist interactivo con tickets de completitud y registro automático de fecha/hora en unidades y `/progreso`.
  - [x] 3. Biblioteca digital exclusiva PDF: secciones ("Pruebas anteriores", "Material de estudio") y categorías (FisiologIA, PatologIA).
  - [x] 4. Nuevo módulo "Mis notas" (`/notas`): escala estándar universitaria chilena (base 1.0 a 7.0, aprobación 4.0), promedio ponderado automático, notas requeridas y reglamento.
  - [x] 5. Vínculo anónimo Alumno-Docente: selección de docente/sección en `/configuracion` y panel docente consolidado 100% anónimo (`/docente`). FisioIA retirado de la vista docente.
  - [x] 6. Opción Google Calendar Mock: acción y modal de sincronización en `/planificacion` y widget de `/inicio`.

## Inventario UI (`src/components/ui/`)

- `Button` — variants: `solid`, `soft`, `ghost`, `glass`, `icon`; sizes: `sm`, `md`, `lg`; soporta `href` para `Link` Next.js, `loading`, iconos.
- `Card` — tones: `surface`, `soft`, `sky`, `lavender`, `mint`, `rose`, `gradient`, `glass`; `interactive` (hover lift).
- `Badge` — tones: `active`, `locked`, `success`, `danger`, `warning`, `info`; sizes: `sm`, `md`.
- `ProgressBar` — `value` (0-100), `showLabel`, `ariaLabel`, sizes: `sm`, `md`, `lg`.
- `SectionHeader` — `icon`, `title`, link de acción `actionText` + `actionHref`.
- `Avatar` — iniciales automáticas o imagen, sizes: `sm`, `md`, `lg`, `xl`.
- `IconBadge` — círculo tintado con icono: `primary`, `sky`, `lavender`, `mint`, `rose`, `surface`.
- `Modal` — diálogo accesible nativo `<dialog>`, backdrop, cierre con Escape/botón.
- `Drawer` — extensión de `Modal` con `side="left"`, reusable para menú móvil.
- `Table` — tabla genérica tipada `Table<T>`, cabeceras, responsive con vista apilada en pantallas chicas.
- `Field` — contenedor accesible para inputs con label, hint de ayuda y error.
- `Input` — entrada de texto con soporte de iconos izquierdo/derecho y estado de error.
- `Select` — selector estilizado con flecha chevron y estado de error.
- `Textarea` — área de texto multilínea estilizada con auto-rows.
- `ChoiceGroup` — opciones múltiples/únicas tipo `radio` o `checkbox`, variantes `list` o `card`.
- `Tabs` — navegación accesible por pestañas basadas en enlaces URL.
- `Calendar` — vista de mes Lunes-Domingo, selección de día, marcas de eventos y navegación.
- `Skeleton` — cargador animado tipo `rect`, `circle` o `pill`.
- `EmptyState` — estado vacío con icono/mascota, título, descripción y botón de acción.
- `Reveal` — wrapper animado con retardo escalonado CSS (`--i`).
- `ModuleImage` — renderizado de imagen de módulo con placeholder tintado de respaldo y `role="img"`.
- `Logo`, `Mascot`, `SpeechBubble` — elementos de identidad y mascota FisioBot.
- `BarChart`, `ProgressRing` — visualizaciones estadísticas en SVG puro teñidas con tokens.

## Bloqueos / preguntas abiertas

Ninguno. La suite completa está 100% en verde:
- `npm run check`: TypeScript estricto OK, ESLint (0 errores, 0 warnings), 43 unit tests Vitest pasando, Next.js build Turbopack OK.
- Playwright E2E: 60 tests pasando (desktop 1600x900 y mobile 390x844), incluyendo auditoría completa de accesibilidad Axe Core WCAG 2.1 AA en todas las rutas.
