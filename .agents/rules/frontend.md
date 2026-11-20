# Reglas de desarrollo frontend (OBLIGATORIAS)

## R1 — Reutilizar antes de crear
- **Nunca** crear un componente nuevo si existe uno reutilizable. Un solo `Modal`, una sola `Table`, un solo `Input`, un solo `Select`, un solo `Button`, una sola `Card`, etc.
- Variantes por props (`variant`, `size`, `tone`), no componentes duplicados (`PrimaryButton` ❌ → `<Button variant="primary">` ✅).
- Antes de crear: buscar en `src/components/ui/` y `src/features/*/`. Si algo existente casi sirve, **extenderlo**.
- Objetivo: el mínimo de código y archivos posible. Simple y eficiente.

## R2 — Tailwind + colores como variables, SIEMPRE
- Ver `rules/styling.md`. Prohibido hex/rgb/clases de color de Tailwind por defecto (`bg-purple-500`) en componentes.

## R3 — Tests en cada funcionalidad
- Ver `rules/testing.md`. Sin tests no hay PR.

## R4 — Prioridades
1. **Performance** (Server Components, bundle mínimo, imágenes optimizadas, nada de librerías pesadas sin justificar).
2. **Escalabilidad** (capas separadas, servicios intercambiables, tipos estrictos).
3. **Mantenibilidad** (archivos pequeños, nombres claros, sin duplicación).

## R5 — Documentación al día
- Cada cambio relevante actualiza: `.agents/memory/progress.md`, y si aplica `decisions.md`, `architecture.md`, `README.md`.

## R6 — Estado del arte, seguro
- **Nada de `localStorage`/`sessionStorage`** para datos de la app. Preferencias → cookies validadas; estado compartible → URL; datos → servidor.
- Server Components por defecto; `'use client'` solo en hojas interactivas.
- Mutaciones vía Server Actions validadas con zod.

## R7 — Archivos pequeños y separados
- Componente: idealmente < 120 líneas; **máximo 200**. Si crece, dividir.
- Tipos en `src/types/`, esquemas en `src/schemas/`, datos mock en `src/mocks/*.json`, textos de UI en `src/content/*.json`, constantes en `src/config/`.
- Páginas (`page.tsx`) delgadas: obtienen datos y componen features. Sin lógica de presentación compleja.
- Un componente por archivo. Sin barrel files gigantes (`index.ts` que reexporta todo) salvo en `components/ui`.

## R8 — El diseño es la guía visual (no se cambia, no se copia literal)
- El **lenguaje visual** de `design.jpeg` (paletas, formas, tipografía, espaciado, mascota, animaciones, layout) se respeta al máximo. No "mejorarlo" por iniciativa propia; cambios de estilo solo si el usuario pide una **remodelación**.
- El **contenido** de cada vista sale de las funcionalidades de `plan.md`, no de copiar el mockup literalmente. Elementos del diseño sin funcionalidad se omiten o quedan como placeholder liviano; funcionalidades sin mockup se construyen con el mismo lenguaje visual.

## R9 — Animaciones siempre
- Toda vista nueva incluye animaciones de entrada/hover según `design-system.md`, respetando `prefers-reduced-motion`.
- Preferir CSS (utilidades `animate-*` definidas en `@theme`) y View Transitions antes que librerías JS.

## R10 — Accesibilidad
- HTML semántico, `alt` en imágenes, foco visible, navegable con teclado, contraste AA en **todas** las paletas.
- Elementos interactivos: `<button>`/`<Link>`, nunca `div onClick`.

## R11 — Next.js 16
- Leer `node_modules/next/dist/docs/` antes de usar cualquier API de Next. No asumir APIs de versiones anteriores.
- `middleware.ts` ya no existe → `proxy.ts`. `params`/`searchParams` son Promises (`await`).
- Usar `next/image`, `next/font`, `next/link` (con `typedRoutes`).
