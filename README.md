# FisiologIA

> **Aprende · Comprende y Evoluciona**
> Plataforma interactiva para el estudio de fisiología humana asistida por IA y agentes.

## Stack

- **Next.js 16.4** (App Router, Turbopack)
- **React 19.3**
- **Tailwind CSS 4.3** (CSS-first, `@theme`)
- **TypeScript** (estricto)
- **Vitest** + React Testing Library (unit & component tests)
- **Playwright** + Axe Core (E2E & a11y tests)

## Desarrollo

```bash
# Instalar dependencias
npm install

# Correr servidor local
npm run dev

# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Typecheck y lint
npm run typecheck
npm run lint

# Chequeo integral antes de PR
npm run check
```

## Reglas y arquitectura

Todas las pautas de arquitectura, reglas de diseño, sistema de componentes y progreso se encuentran documentadas en la carpeta `.agents/`:
- `.agents/README.md` — Guía de inicio y orden de lectura
- `.agents/rules/` — Reglas obligatorias de frontend, estilos, testing y seguridad
- `.agents/context/` — Contexto del proyecto y design system
- `PLAN_IMPLEMENTACION.md` — Plan de trabajo paso a paso
