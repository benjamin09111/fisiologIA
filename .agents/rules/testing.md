# Reglas de testing / QA

Toda funcionalidad nueva incluye tests y **se corren antes de dar la tarea por terminada**.

## Herramientas
| Tipo | Herramienta | Qué cubre |
|---|---|---|
| Unit / componentes | Vitest + React Testing Library + jsdom | utilidades, schemas, servicios, componentes UI y client components |
| E2E | Playwright | navegación, flujos (quiz completo, cambio de paleta), mobile viewport, componentes `async` |
| Accesibilidad | `@axe-core/playwright` | cada ruta sin violaciones serias/críticas |
| Estático | `tsc --noEmit`, ESLint | tipos y reglas |

## Comandos (definidos en package.json)
- `npm run test` — unit (Vitest)
- `npm run test:e2e` — Playwright
- `npm run typecheck`, `npm run lint`
- `npm run check` — todo lo anterior; **debe pasar antes de cada PR**

## Qué testear siempre
- Componentes UI: render de cada variante, accesibilidad básica (roles/labels), estados disabled/loading.
- Schemas: que los mocks JSON validen; que entradas inválidas fallen.
- Servicios: devuelven datos tipados y manejan "no encontrado".
- Server Actions: rechazan input inválido (cookie de paleta fuera del allowlist, respuestas malformadas).
- Seguridad: las respuestas correctas de ejercicios no aparecen en el HTML/payload del cliente (E2E).
- Rutas: cada ruta responde 200 y rutas inexistentes → 404.

## Reglas
- Tests junto al archivo (`X.test.tsx`); E2E en `e2e/`.
- Testear comportamiento, no implementación (queries por rol/texto, no por clases).
- Un test que falla no se borra ni se salta (`.skip`) sin dejar registro en `learnings/learnings.md`.
