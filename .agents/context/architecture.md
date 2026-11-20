# Arquitectura frontend

> Estado: **objetivo** (se construye según `PLAN_IMPLEMENTACION.md`). Actualizar si cambia.

## Estructura de carpetas

```
src/
├── app/                         # SOLO routing: page/layout/loading/error. Páginas delgadas.
│   ├── layout.tsx               # <html>, fuentes, ThemeScript (paleta antes del paint)
│   ├── globals.css              # importa src/styles/*
│   ├── page.tsx                 # redirect → /inicio
│   ├── not-found.tsx
│   ├── (app)/                   # route group con AppShell (sidebar + topbar)
│   │   ├── layout.tsx
│   │   ├── inicio/
│   │   ├── cursos/[cursoId]/unidades/[unidadId]/temas/[temaId]/
│   │   ├── ejercicios/ (banco, cuestionarios/[id], cuestionarios/[id]/resultado, historial)
│   │   ├── progreso/
│   │   ├── planificacion/
│   │   ├── biblioteca/
│   │   ├── fisioia/
│   │   ├── configuracion/
│   │   └── docente/ (panel, unidades/[unidadId], ejercicios, historial)
│   └── api/                     # ⛔ BACKEND — no tocar
├── components/
│   ├── ui/                      # primitivos ÚNICOS (Button, Card, Modal, Table, Input, Select…)
│   ├── layout/                  # AppShell, Sidebar, Topbar, MobileNav, NavItem
│   ├── brand/                   # Logo, Mascot, SpeechBubble
│   └── charts/                  # BarChart, ProgressRing (SVG, sin librerías pesadas)
├── features/                    # componentes de dominio, por funcionalidad
│   ├── home/ courses/ exercises/ progress/ planning/ teacher/ settings/
│   └── <feature>/actions.ts     # Server Actions de la feature (si aplica)
├── config/                      # navigation.ts, palettes.ts, routes.ts (constantes tipadas)
├── content/                     # textos de UI en JSON (copy), ej. home.json
├── mocks/                       # datos mock JSON (users, courses, exercises…)
├── schemas/                     # esquemas zod (fuente de verdad de los tipos)
├── types/                       # tipos TS (z.infer + tipos de UI). Solo tipos.
├── services/                    # acceso a datos ("server-only"). Hoy lee mocks, mañana API.
├── lib/                         # utilidades puras (cn, format, dates, cookies)
├── styles/                      # theme.css (tokens), palettes.css, animations.css
├── test/                        # setup de Vitest, helpers, fixtures
├── server/                      # ⛔ BACKEND — no tocar
└── proxy.ts                     # (futuro) chequeos optimistas de rol/auth. En Next 16 "middleware" = "proxy"
e2e/                             # tests Playwright
```

## Flujo de datos

```
mocks/*.json ──► services/*.ts (valida con schemas/ zod, server-only)
                     │
                     ▼
     app/**/page.tsx (Server Component, async) ──props──► features/* ──► components/ui/*
                                                              │
                                     interactividad mínima ──► 'use client' (hojas del árbol)
```

- **Server Components por defecto.** `'use client'` solo en hojas interactivas (quiz, menú móvil, calendario, selector de paleta).
- Las páginas **no importan JSON directamente**: siempre vía `services/`. Así, conectar el backend = cambiar solo `services/`.
- Respuestas correctas de ejercicios **nunca** viajan al cliente: la corrección ocurre en una Server Action.
- Estado de UI compartible (filtros, tabs, mes del calendario) → **URL (`searchParams`)**, no stores globales.
- Preferencias persistentes (paleta) → **cookie** validada (nunca localStorage). Ver `memory/decisions.md`.

## Convenciones de nombres

- Archivos de componentes: `PascalCase.tsx`. Utilidades/servicios: `camelCase.ts`.
- Rutas y textos visibles: español. Código (variables, funciones, tipos): inglés.
- Segmentos dinámicos en español: `[cursoId]`, `[unidadId]`.
- Tests junto al archivo: `Button.test.tsx`. E2E en `e2e/*.spec.ts`.
- Alias de import: `@/` → `src/`.
