# Aprendizajes y gotchas

Formato: `- (fecha) **Tema:** qué pasó → qué hacer.` Agregar al descubrir algo que otro agente podría repetir.

## Next.js 16
- (2026-11-20) **Middleware renombrado:** en Next 16 `middleware.ts` → `proxy.ts` (misma funcionalidad). Ver `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.
- (2026-11-20) **`AGENTS.md` autogenerado:** `next dev` reescribe el bloque `nextjs-agent-rules`. Contenido propio va fuera de ese bloque.
- (2026-11-20) **Tema sin flash:** patrón oficial = script inline en `<head>` + `suppressHydrationWarning` en `<html>`. Ver `02-guides/preventing-flash-before-hydration.md`. Nosotros leemos cookie en vez de localStorage.
- (2026-11-20) **Vitest no soporta Server Components `async`:** testearlos con Playwright (E2E). Ver `02-guides/testing/vitest.md`.
- (2026-11-20) **Tailwind por Turbopack:** `next.config.ts` ya usa el loader `@tailwindcss/turbopack` para `*.css`; no agregar PostCSS config.
- (2026-11-20) **`typedRoutes` es estable:** se configura en la raíz del config, no en `experimental`.

## Proyecto
- (2026-11-20) **Archivos del template borrados:** `public/*.svg` de create-next-app fueron eliminados; `src/app/page.tsx` aún referencia `/next.svg` hasta que se reemplace en Fase 0.
