# Plan de implementación — Frontend FisiologIA

> **Objetivo:** dejar el frontend completo en modo mock (JSON), navegable de punta a punta, fiel a `design.jpeg`, con 5 paletas intercambiables, animaciones, tests y documentación.
> **Alcance:** solo frontend. Funcionalidades de `plan.md`. Backend (`src/server`, `src/app/api`, `supabase`) fuera de alcance.
> **Reglas:** `.agents/rules/` (obligatorias). Contexto de diseño: `.agents/context/design-system.md`.
> **Stack:** Next.js 16.4 · React 19.3 · Tailwind 4.3 · TypeScript estricto.

Cada fase = 1 PR (o varios si es grande). Una fase está **terminada** cuando cumple su "Hecho cuando" y `npm run check` pasa.

---

## Mapa de rutas

| Ruta | Vista | Rol |
|---|---|---|
| `/` | redirect → `/inicio` | — |
| `/inicio` | Inicio del estudiante (= `design.jpeg`) | estudiante |
| `/cursos` | Mis cursos / "Nuestros módulos" | estudiante |
| `/cursos/[cursoId]` | Detalle del curso: unidades + avance | estudiante |
| `/cursos/[cursoId]/unidades/[unidadId]` | Temas de la unidad + avance | estudiante |
| `/cursos/[cursoId]/unidades/[unidadId]/temas/[temaId]` | Contenido del tema (mock) | estudiante |
| `/ejercicios` | Hub: banco, cuestionarios, historial (tabs vía URL) | estudiante |
| `/ejercicios/banco` | Banco de preguntas filtrable | estudiante |
| `/ejercicios/cuestionarios/[quizId]` | Resolver cuestionario | estudiante |
| `/ejercicios/cuestionarios/[quizId]/resultado/[intentoId]` | Corrección | estudiante |
| `/ejercicios/historial` | Historial de intentos | estudiante |
| `/progreso` | Mi progreso | estudiante |
| `/planificacion` | Calendario + evaluaciones | estudiante |
| `/biblioteca` | Placeholder (está en el diseño) | ambos |
| `/fisioia` | Placeholder chat FisioBot (está en el diseño) | ambos |
| `/configuracion` | Perfil + paleta de colores | ambos |
| `/docente` | Panel docente: resultados agregados por unidad | docente |
| `/docente/unidades/[unidadId]` | Detalle de resultados de una unidad | docente |
| `/docente/ejercicios` | Banco de preguntas (vista docente) | docente |
| `/docente/historial` | Historial de intentos de todos los estudiantes | docente |

Sidebar estudiante (orden del diseño): **Inicio, Mis cursos, Planificaciones, Biblioteca, FisioIA, Mi progreso, Configuración**.
- **Ejercicios no va en el sidebar.** Se entra desde la tarjeta **"Practicar"** de Inicio (→ `/ejercicios`) y desde el CTA "Practicar esta unidad" de cada unidad. Dentro de `/ejercicios/*` ningún item del sidebar queda activo; la ubicación la indican el título de página + breadcrumbs.
- Biblioteca y FisioIA son **placeholders** por ahora (Fase 12).

Sidebar docente: **Panel, Banco de preguntas, Historial, Biblioteca, FisioIA, Configuración**.

> **Cómo usamos el diseño:** `design.jpeg` es la **guía visual** (colores, formas, tipografía, espaciado, mascota, animaciones, layout). No se copia literal: el contenido y las secciones de cada vista salen de las funcionalidades de `plan.md`. Si un elemento del diseño no corresponde a ninguna funcionalidad, se omite o queda como placeholder liviano; si una funcionalidad no tiene mockup, se construye con el mismo lenguaje visual.

---

## Fase 0 — Fundaciones

**0.1 Dependencias** (todas livianas; justificar cualquier otra en `decisions.md`)
```bash
npm i zod lucide-react class-variance-authority clsx tailwind-merge server-only
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom \
  @testing-library/user-event @testing-library/jest-dom vite-tsconfig-paths \
  @playwright/test @axe-core/playwright prettier prettier-plugin-tailwindcss
npx playwright install chromium
```

**0.2 Scripts en `package.json`**
- `typecheck`: `tsc --noEmit`
- `test`: `vitest run` · `test:watch`: `vitest`
- `test:e2e`: `playwright test`
- `format`: `prettier --write .`
- `check`: `npm run typecheck && npm run lint && npm run test && npm run build`

**0.3 `next.config.ts`** (mantener la regla turbopack existente)
- `typedRoutes: true` (links tipados).
- React Compiler desactivado por decisión del equipo; mantener optimizaciones explícitas solo cuando sean necesarias.
- `images.formats: ['image/avif','image/webp']`.
- `headers()`: CSP básica, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `frame-ancestors 'none'`. Leer `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md` (el script inline de tema necesita hash o nonce).

**0.4 Config de tests**
- `vitest.config.mts` (plugin react, tsconfig paths, `environment: 'jsdom'`, setup `src/test/setup.ts` con jest-dom).
- `playwright.config.ts` (webServer `npm run dev`, proyectos `desktop 1600x900` y `mobile 390x844`).
- Excluir `e2e/` de Vitest.

**0.5 Limpieza del template**
- Reemplazar `src/app/page.tsx` por `redirect('/inicio')`.
- `layout.tsx`: `lang="es"`, metadata real (título "FisiologIA", descripción, icono desde `public/logo.png`).
- Reescribir `README.md` (cómo correr, scripts, estructura, link a `.agents/`).
- `.prettierrc` con plugin tailwind.

**Hecho cuando:** `npm run check` pasa; `/` redirige a `/inicio` (404 temporal está bien).

---

## Fase 1 — Design system y paletas

**1.1 Fuente** — **Plus Jakarta Sans** vía `next/font/google` (pesos 400, 500, 600, 700, 800; `display: swap`; subset `latin`). Es geométrica y algo redondeada, como los títulos y textos del diseño, y legible en tamaños chicos. Variable `--font-sans`. Títulos 700–800, cuerpo 400–500.

**1.2 `src/styles/theme.css`** — `@theme` con tokens semánticos:
- Colores: `--color-background`, `--color-surface`, `--color-primary-soft`, `--color-primary`, `--color-primary-strong`, `--color-text`, `--color-muted`, `--color-border`, `--color-on-primary`.
- Derivados con `color-mix()`: `--color-primary-50` (fondo de página), `--color-primary-100`, `--color-sidebar`.
- Acentos: `--color-accent-sky`, `--color-accent-lavender`, `--color-accent-mint`, `--color-accent-rose` (+ variantes `-strong` para iconos).
- Estado: `--color-success`, `--color-warning`, `--color-danger`, `--color-info`.
- Radios: `--radius-card`, `--radius-hero`. Sombras: `--shadow-card`, `--shadow-soft` (teñidas con primary).
- `@custom-variant dark (&:where([data-theme=oscuro], [data-theme=oscuro] *));`

**1.3 `src/styles/palettes.css`** — un bloque por paleta que reasigna **solo** las 4 variables base (`--base-surface`, `--base-soft`, `--base-mid`, `--base-strong`) + las de texto/fondo en dark. Todo lo demás (`--color-*` en `theme.css`) se deriva de ellas, así una paleta nueva = 1 bloque de ~6 líneas.

| Variable base | Lavanda (default) | Océano | Menta | Rosa | Oscuro (dark mode) |
|---|---|---|---|---|---|
| `--base-surface` (blanco / tarjetas) | `#FFFFFF` Blanco | `#FFFFFF` Blanco | `#FFFFFF` Blanco | `#FFFFFF` Blanco | `#2D3346` Gris Azulado Oscuro |
| `--base-soft` (claro) | `#E1D9FC` Lavanda Clarito | `#CBE6F9` Azul Pastel | `#D7EFEB` Verde Menta Claro | `#F6D7E3` Rosa Pastel | `#2D3346` mezclado con `--base-mid` |
| `--base-mid` (medio) | `#A79AF2` Lavanda Medio | `#70B6E7` Azul Medio | `#8CD0B2` Verde Menta Medio | `#E692B8` Rosa Medio | `#7C72DF` Violeta Eléctrico |
| `--base-strong` (oscuro / acento) | `#6351B8` Lavanda Oscuro | `#2F71AA` Azul Corporativo | `#307555` Verde Oliva/Bosque | `#9E4F76` Rosa Viejo/Malva | `#BDB5FF` Lila Pastel Brillante |
| `--base-bg` (fondo página) | derivado: soft 25% + blanco | ídem | ídem | ídem | `#181926` Fondo Negro Azulado |
| `--base-text` | derivado: strong 30% + navy casi negro | ídem | ídem | ídem | blanco roto (derivado de `#BDB5FF`) |

Selectores: `:root, [data-theme=lavanda]` · `[data-theme=oceano]` · `[data-theme=menta]` · `[data-theme=rosa]` · `[data-theme=oscuro]`.
Reglas de mapeo:
- Botón sólido = `--base-strong` con texto `--color-on-primary` (blanco en claras; `#181926` en oscuro, porque ahí strong es claro).
- Barras de progreso / día seleccionado / iconos = `--base-strong`; pistas y pills = `--base-soft`.
- Acentos de las 4 tarjetas de acciones rápidas (sky/lavender/mint/rose) son **fijos** en las paletas claras (vienen del diseño) y en oscuro se oscurecen con `color-mix` sobre `#2D3346`.
- Verificar contraste AA de texto sobre `--base-soft` y botones en las 5 paletas (Menta y Rosa son las más riesgosas → ajustar con tokens derivados, nunca con hex sueltos).

**1.4 `src/styles/animations.css`** — keyframes + `--animate-*`: `fade-up`, `fade-in`, `float` (robot), `pop` (burbuja), `progress-fill`, `stagger` vía `animation-delay` con variable CSS `--i`. Bloque `@media (prefers-reduced-motion: reduce)` que las desactiva. Estilos de View Transition (`::view-transition-old/new`).

**1.5 `src/app/globals.css`** — `@import "tailwindcss"` + los 3 archivos. `body` usa `bg-background text-text font-sans`.

**1.6 Paleta: config + persistencia**
- `src/config/palettes.ts`: lista `THEMES = ['lavanda','oceano','menta','rosa','oscuro'] as const`, nombre visible y swatches (para el selector).
- `src/schemas/theme.ts`: `z.enum(THEMES)`.
- `src/lib/theme-script.ts`: string **estático** que lee la cookie `fisio-theme`, valida contra la lista y aplica `data-theme` en `<html>` antes del paint.
- `layout.tsx`: `<html data-theme="lavanda" suppressHydrationWarning>` + `<script>` en `<head>`.
- `src/features/settings/actions.ts`: Server Action `setTheme(theme)` → valida zod → `cookies().set('fisio-theme', …, { sameSite:'lax', secure, path:'/', maxAge: 1 año })`.

**1.7 `src/lib/cn.ts`** — `cn(...inputs) = twMerge(clsx(inputs))`.

**Tests:** schema de tema (válidos/ inválidos); `theme-script` aplica solo valores permitidos (jsdom); Server Action rechaza valores fuera del enum.
**Hecho cuando:** cambiar manualmente `data-theme` en DevTools recolorea todo; no hay hex fuera de `palettes.css`/`theme.css` (agregar regla ESLint `no-restricted-syntax` o test que haga grep de `#[0-9a-f]{3,6}` en `src/components` y `src/features`).

---

## Fase 2 — Componentes UI base (`src/components/ui/`)

Un único componente por concepto, variantes con `cva`. Cada uno con su test.

| Componente | Variantes / props | Uso en diseño |
|---|---|---|
| `Button` | `variant: solid · soft · ghost · glass · icon` · `size` · `asChild`-like vía prop `href` (renderiza `Link`) · `iconRight` | "Continuar estudiando", "Retomar", "Abrir chat", flechas circulares |
| `Card` | `tone: surface · soft · sky · lavender · mint · rose · gradient` · `interactive` (hover lift) | todas las tarjetas |
| `Badge` | `tone: active · locked · success · danger` | "En curso", "Bloqueado" |
| `ProgressBar` | `value`, `showLabel`, animado | 60% |
| `SectionHeader` | `icon`, `title`, `action` (link "Ver todos →") | encabezados de sección |
| `Avatar` | iniciales / imagen, `size` | "AF" |
| `IconBadge` | icono en círculo/cuadrado tintado | iconos de tarjetas |
| `Modal` | `<dialog>` nativo, título, acciones, cierre con Esc / foco atrapado | confirmaciones, detalle |
| `Drawer` | reutiliza la lógica de `Modal` con `side="left"` (misma base, no duplicar) | menú móvil |
| `Table` | columnas tipadas genéricas `Table<T>` + vista apilada en mobile | historial, panel docente |
| `Input`, `Select`, `Textarea` | label, error, hint; mismo wrapper `Field` | filtros, perfil |
| `ChoiceGroup` | radio/checkbox accesible, `variant: list · card` | opciones de preguntas, selector de paleta |
| `Tabs` | basadas en links + `searchParams` (sin estado cliente) | hub ejercicios |
| `Calendar` | mes, día seleccionado, puntos de eventos, navegación | Mi planificación |
| `Skeleton` | forma, tamaño | `loading.tsx` |
| `EmptyState` | icono/mascota + texto + acción | listas vacías |
| `Reveal` | wrapper que aplica `animate-fade-up` con índice para escalonar | animaciones de entrada |
| `ModuleImage` | `src` opcional, `icon` fallback, `size` → `next/image` o placeholder tintado | imágenes de órganos (mientras no existan) |

Además: `src/components/brand/Logo.tsx`, `Mascot.tsx` (next/image de `robot.png`, `size`, `float`), `SpeechBubble.tsx`. `src/components/charts/BarChart.tsx`, `ProgressRing.tsx` (SVG puro).

**Hecho cuando:** todos los componentes con test y registrados en `.agents/memory/progress.md` → "Inventario UI". Página interna temporal `/dev/ui` (solo en desarrollo) para revisarlos con cada paleta — eliminar o proteger antes de producción.

---

## Fase 3 — Capa de datos (mocks)

**3.1 Schemas (`src/schemas/`)** — un archivo por entidad: `user.ts` (id, nombre, iniciales, rol `student|teacher`, avatar), `course.ts` (Course → Unit → Topic, estado `in_progress|locked|completed`, imagen, avance), `exercise.ts` (Question: enunciado, tipo `single|multiple|true_false`, opciones, dificultad, unidad; Quiz; Attempt; Answer), `planning.ts` (Evaluation, StudyEvent), `progress.ts`, `teacher.ts` (resultados agregados por unidad).
Las respuestas correctas viven en un schema separado `QuestionKey` que **solo** usa el servidor.

**3.2 Tipos (`src/types/`)** — `z.infer` de cada schema + tipos de UI (`NavItem`, `ThemeName`…).

**3.3 Mocks (`src/mocks/*.json`)** — datos realistas en español que reproduzcan el diseño:
- `user.json`: Angholy (AF), estudiante; `teacher.json`: un docente.
- `courses.json`: Respiratoria (en curso, 60%, Unidad 1 · Mecánica ventilatoria), Cardiovascular, Renal, Nerviosa (bloqueados), con 3–4 unidades y 3–5 temas cada uno.
- `questions.json` (sin respuestas) + `answer-keys.json` (respuestas, server-only), `quizzes.json`, `attempts.json`.
- `planning.json`: eventos de octubre/noviembre 2026 incluyendo "Vie. 24/10 · Solemne Fisiología" y "Vie. 31/10 · Gynkana Cabeza y Cuello".
- `teacher-results.json`: promedios, tasa de aprobación, preguntas más falladas por unidad.

**3.4 Textos de UI (`src/content/*.json`)** — copy de cada vista (saludos, tarjetas de acciones rápidas, frase "¡Tú puedes!", burbuja de FisioBot). Componentes sin strings hardcodeados largos.

**3.5 Servicios (`src/services/`)** — `import 'server-only'`, funciones `async` que parsean con zod y devuelven datos tipados: `getCurrentUser()`, `getCourses()`, `getCourse(id)`, `getUnit(courseId, unitId)`, `getTopic(...)`, `getQuestions(filters)`, `getQuiz(id)`, `gradeAttempt(quizId, answers)`, `getAttempts(scope)`, `getPlanning(month)`, `getProgress()`, `getTeacherResults()`. Usar `React.cache` para deduplicar por request. "No encontrado" → `notFound()` en la página.

**3.6 Rol mock** — cookie `fisio-role` (`student|teacher`, allowlist) con Server Action `switchRole` desde el menú del avatar ("Ver como docente" — etiquetado como demo). Base para el futuro `proxy.ts`.

**Tests:** cada mock valida contra su schema; servicios devuelven lo esperado y fallan con ids inexistentes; `questions.json` no contiene campos de respuesta.

---

## Fase 4 — App shell (estructura de la interfaz)

**4.1 `src/config/navigation.ts`** — items por rol (label, href tipado, icono Lucide). Única fuente para sidebar desktop y drawer móvil.

**4.2 `src/app/(app)/layout.tsx`** — `AppShell`: grid `[sidebar 230px | contenido]` en `lg+`; fondo `bg-background`.

**4.3 `components/layout/`**
- `Sidebar` (server): Logo + tagline, `NavList`, tarjeta "¡Tú puedes!" al fondo. Fiel al diseño.
- `NavItem` (client mínimo, usa `usePathname` para estado activo; pill `primary-soft`, icono `primary-strong`, `aria-current="page"`).
- `Topbar`: slot izquierdo (saludo/título de página), derecha campana con punto `danger` + `Avatar` con chevron → menú (Perfil, Paleta, Ver como docente, Salir mock). En mobile: hamburguesa + logo.
- `MobileNav`: `Drawer` que reutiliza `NavList`. Se cierra al navegar.
- `PageHeader`: título + subtítulo + acciones (para vistas internas).

**4.4 Estados globales** — `loading.tsx` (skeletons) por segmento, `error.tsx` con FisioBot ("Algo salió mal"), `not-found.tsx` con FisioBot.

**4.5 Transiciones** — envolver contenido con `<ViewTransition>` de React para crossfade entre rutas (leer `02-guides/view-transitions.md`); sidebar anclado (no anima).

**Tests:** E2E: cada item del sidebar navega y queda activo; drawer móvil abre/cierra con teclado y al navegar; axe sin violaciones; 404 renderiza.

---

## Fase 5 — Inicio del estudiante (`/inicio`), guiado por `design.jpeg`

El diseño es la guía de estructura y estilo. Cada bloque se conecta a una funcionalidad real del plan (cursos, ejercicios, progreso, planificación). Ningún bloque queda solo como decoración sin destino.

Componentes en `src/features/home/`:
1. `Greeting` — "¡Hola, {nombre}!" + corazón; subtítulo.
2. `HeroBanner` — card gradiente, icono diana, título, texto, botón "Continuar estudiando →" (link al último tema), `Mascot` superpuesto con `float`, moléculas decorativas (SVG con `currentColor` y tokens), `SpeechBubble` "¡Hola! Soy FisioBot ♡ ¿En qué puedo ayudarte hoy?".
3. `ContinueCard` — imagen del módulo, curso, unidad, `ProgressBar` 60%, botón soft "Retomar →".
4. `QuickActions` — 4 `Card` tintadas (sky/lavender/mint/rose): Preguntar a FisioBot → `/fisioia` (placeholder), Estudiar → `/cursos`, **Practicar → `/ejercicios` (entrada principal a Ejercicios)**, Mi progreso → `/progreso`. Las tarjetas se definen en `src/content/home.json`.
5. `ModulesGrid` — 4 cards de módulos con `Badge` "En curso"/"Bloqueado", chevron o candado; "Ver todos los módulos →" → `/cursos`.
6. Columna derecha: `PlanningWidget` (`Calendar` + "Próximas evaluaciones" + "Ver calendario →") y `FisioIACard` (gradiente, "Abrir chat →", robot asomado).
7. Animación: entrada escalonada (`Reveal`), hover lift en cards, llenado de barra.

**Responsive:** `xl`: 2 columnas como diseño · `lg`: columna derecha debajo · `md/sm`: grids 2 col · `base`: 1 col (acciones rápidas 2 col).

**Hecho cuando:** a 1600×900 la vista tiene el mismo lenguaje visual y la misma distribución que `design.jpeg` (revisión manual contra un screenshot de Playwright, que queda guardado como snapshot de regresión); todos los bloques navegan a su funcionalidad; se ve bien en las 5 paletas y en mobile.

> **Imágenes pendientes:** órganos (pulmones, corazón, riñón, cerebro) e ilustraciones (cerebro del sidebar, moléculas). El equipo las subirá a `public/modules/` y `public/illustrations/`. Mientras tanto: componente único `ModuleImage` que muestra la imagen si existe o un placeholder (fondo `--base-soft` + icono Lucide). Así reemplazarlas solo requiere agregar el archivo y su ruta en `courses.json`.

---

## Fase 6 — Mis cursos

1. `/cursos`: grid de módulos (reutiliza la card de `ModulesGrid` → mover a `features/courses/CourseCard.tsx` y usarla también en Inicio), filtro por estado vía `searchParams`.
2. `/cursos/[cursoId]`: cabecera con imagen + `ProgressRing` del curso; lista de unidades (`Card` + `ProgressBar` + `Badge`); unidades bloqueadas no clicables.
3. `/cursos/[cursoId]/unidades/[unidadId]`: lista de temas con check de completado, avance de la unidad, botón "Practicar esta unidad" → cuestionario de la unidad.
4. `/…/temas/[temaId]`: contenido mock (texto + puntos clave), navegación anterior/siguiente, CTA "Preguntar a FisioBot".
5. Breadcrumbs (componente único `Breadcrumbs` en `ui/`).
6. `generateMetadata` por curso/unidad/tema.

**Tests:** E2E de navegación curso → unidad → tema; curso bloqueado no navegable; ids inválidos → 404.

---

## Fase 7 — Ejercicios

**Estudiante**
1. `/ejercicios`: hub con `Tabs` (Cuestionarios · Banco · Historial) por URL; resumen de intentos recientes.
2. `/ejercicios/banco`: lista de preguntas con filtros (curso, unidad, dificultad, tipo) en `searchParams`; `Select` + `Input` de búsqueda; práctica individual en `Modal`.
3. `/ejercicios/cuestionarios/[quizId]`: client component `QuizRunner` — una pregunta por pantalla, `ChoiceGroup`, barra de avance, anterior/siguiente, confirmación de envío en `Modal`. Estado en memoria (no localStorage).
4. Envío → Server Action `submitAttempt` (valida con zod, corrige con `answer-keys.json`, devuelve id de intento mock) → redirect a resultado.
5. `/…/resultado/[intentoId]`: puntaje (`ProgressRing`), feedback por pregunta (correcta/incorrecta + explicación), FisioBot con mensaje según puntaje, CTA reintentar.
6. `/ejercicios/historial`: `Table` (fecha, cuestionario, unidad, puntaje, estado) con vista apilada en mobile.

**Docente**
7. `/docente/ejercicios`: mismo listado del banco (reutiliza componentes) + acciones mock "Nueva pregunta"/"Editar" en `Modal` con formulario (`Input`, `Select`, `Textarea`, validación zod; sin persistencia real o en memoria del servidor mock).
8. `/docente/historial`: misma `Table` con columna estudiante y filtros por unidad/estudiante.

**Tests:** unit de `QuizRunner`; Server Action corrige bien y rechaza payload inválido; E2E flujo completo resolver → resultado; E2E asegura que el HTML/RSC del cuestionario **no** contiene las respuestas correctas.

---

## Fase 8 — Mi progreso (`/progreso`)

1. KPIs (cards): avance global, cuestionarios realizados, promedio, racha de estudio.
2. Avance por curso/unidad (`ProgressBar` por fila).
3. `BarChart` de puntajes por unidad + evolución de intentos recientes (SVG propio, animado).
4. Fortalezas / temas a reforzar (lista con `Badge`) + mensaje de FisioBot.
**Tests:** cálculos de agregación (unit, funciones puras en `src/lib/progress.ts`); E2E render.

---

## Fase 9 — Planificación (`/planificacion`)

1. `Calendar` en tamaño grande (mismo componente del widget, prop `size="lg"`), mes en `searchParams` (`?mes=2026-10`).
2. Lista de eventos del día seleccionado + "Próximas evaluaciones" (mismas pills que Inicio, componente compartido `EvaluationPill`).
3. Leyenda de tipos (solemne, gynkana, estudio).
4. Fechas formateadas con `Intl` en `es-CL` y zona horaria fija para evitar mismatch de hidratación.
**Tests:** utilidades de fechas (grilla del mes, lunes como primer día); navegación de mes por URL.

---

## Fase 10 — Panel docente (`/docente`)

1. Layout docente (misma `AppShell`, nav docente por rol).
2. KPIs del curso: estudiantes, promedio general, tasa de aprobación, cuestionarios rendidos.
3. Resultados **agregados por unidad**: `Table` + `BarChart` (promedio por unidad), semáforo con `Badge`.
4. `/docente/unidades/[unidadId]`: distribución de puntajes, preguntas más falladas, estudiantes con bajo rendimiento.
**Tests:** agregaciones puras (unit); E2E con rol docente (cookie mock); estudiante que entra a `/docente` ve aviso/redirect (chequeo de UI, no seguridad real).

---

## Fase 11 — Configuración de perfil (`/configuracion`)

1. Datos de perfil (avatar/iniciales, nombre, correo, carrera) con `Input` (guardado mock vía Server Action + validación).
2. **Selector de paleta**: `ChoiceGroup variant="card"` con preview de swatches de las 5 paletas. Al elegir: aplica `data-theme` al instante (optimista) + Server Action `setTheme` persiste cookie. Animación de transición de color (`transition-colors` en tokens / View Transition).
3. Preferencias (notificaciones mock, reducir animaciones opcional → cookie).
**Tests:** E2E: elegir "Menta", recargar → sigue en Menta, sin flash (comprobar `data-theme` antes de hidratación); unit del selector.

---

## Fase 12 — Biblioteca y FisioIA (placeholders del diseño)

- `/biblioteca`: grid de recursos mock (PDF/apuntes) reutilizando `Card` + `EmptyState`.
- `/fisioia`: UI de chat estática (burbujas con `SpeechBubble`, input deshabilitado "Próximamente") con FisioBot. Sin integración de IA aún.

---

## Fase 13 — QA final y documentación

1. E2E de todas las rutas × (desktop, mobile) × (lavanda, oscuro).
2. axe en todas las rutas; contraste AA en las 5 paletas (ajustar tokens si falla, documentar en `decisions.md`).
3. Lighthouse (performance ≥ 90, a11y ≥ 95, best practices ≥ 95) en `/inicio`, `/cursos`, `/ejercicios`.
4. Revisar bundle (`next build` output): ninguna ruta con JS cliente innecesario.
5. `npm audit` sin altas/críticas.
6. Grep final de colores hardcodeados y `localStorage`.
7. Actualizar `README.md`, `.agents/context/architecture.md`, `.agents/memory/progress.md`, inventario UI.

---

## Definición de "Hecho" (toda tarea)

- [ ] Sigue el diseño (o el lenguaje visual del diseño si la vista no tiene mockup).
- [ ] Reutiliza componentes existentes; sin duplicados.
- [ ] Solo tokens de color; funciona en las 5 paletas.
- [ ] Responsive (375 / 768 / 1280 / 1600).
- [ ] Animaciones + `prefers-reduced-motion`.
- [ ] Tests unit/E2E escritos y en verde; `npm run check` OK.
- [ ] Archivos < 200 líneas; tipos/datos/textos en sus carpetas.
- [ ] Documentación y `.agents/memory/` actualizados.

---

## Decisiones tomadas (2026-11-20)

1. **Ejercicios** no va en el sidebar; se entra desde la tarjeta "Practicar" (y desde cada unidad).
2. **Imágenes** de órganos e ilustraciones: el equipo las subirá a `public/`; mientras tanto, placeholder con `ModuleImage`.
3. **Fuente:** Plus Jakarta Sans.
4. **Biblioteca y FisioIA:** placeholders por ahora.
5. **El diseño es guía, no copia literal:** se sigue su estilo y estructura, pero el contenido sale de las funcionalidades de `plan.md`.

## Pendiente

- **Monorepo:** hoy frontend y backend comparten `src/`. Si se migra a `apps/web` + `apps/api`, esta estructura se mueve intacta a `apps/web/src`.
