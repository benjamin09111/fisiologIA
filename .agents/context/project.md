# Proyecto: FisiologIA

**Aprende · Comprende y Evoluciona**

Plataforma web para estudiar el ramo de **Fisiología** apoyada en IA y agentes. Incluye una mascota/asistente: **FisioBot** (`public/robot.png`), que acompaña al usuario en toda la app.

## Equipo y roles

- Repo compartido (monorepo): frontend + backend en TypeScript, mismo repositorio Next.js.
- **Nuestro rol: FRONTEND.** No tocamos backend (`src/server/`, `src/app/api/`, `supabase/`) salvo pedido explícito.
- Revisores: ver `.github/CODEOWNERS`. PRs usan `.github/pull_request_template.md`.

## Usuarios

| Rol | Qué hace |
|-----|----------|
| Estudiante | Estudia cursos/unidades/temas, resuelve ejercicios, ve su progreso y planificación, conversa con FisioBot. |
| Docente | Gestiona banco de preguntas, ve historial de ejercicios de sus estudiantes y resultados agregados por unidad. |

## Alcance frontend actual (fuente: `plan.md`)

1. Estructura de la interfaz: menú lateral, barra superior, versión móvil, navegación.
2. Inicio del estudiante.
3. Mis cursos: unidades, temas, avance.
4. Ejercicios: banco de preguntas, cuestionarios, corrección, historial (vista estudiante y docente).
5. Mi progreso.
6. Planificación.
7. Panel docente: resultados agregados por unidad.
8. Configuración de perfil (incluye selector de **paleta de colores** global).

Por ahora **todo consume mocks JSON** (`src/mocks/`). El backend real (Supabase + API TS) se conectará después sin tocar la UI (ver `architecture.md` → capa de servicios).

## Stack (versiones reales instaladas — verificar en package.json)

- Next.js **16.4** (App Router, `src/`, Turbopack). ⚠️ Tiene breaking changes respecto a versiones previas: leer `node_modules/next/dist/docs/` antes de usar una API.
- React **19.3**
- Tailwind CSS **4.3** (config CSS-first con `@theme`, sin `tailwind.config.js`).
- TypeScript estricto.
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`) instalado por backend; frontend aún no lo usa.

## Assets

- `public/logo.png` — logo FisiologIA.
- `public/robot.png` — FisioBot, mascota.
- `design.jpeg` (raíz) — diseño de referencia de la pantalla Inicio. **Fuente de verdad visual.**
