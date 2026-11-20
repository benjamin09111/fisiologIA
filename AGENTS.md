<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FisiologIA — Instrucciones para agentes de IA

Este archivo es el punto de entrada para **cualquier** agente (Claude, Codex, Cursor, Gemini, Copilot…).

1. Lee `.agents/README.md` y sigue su orden de lectura **antes de escribir código**.
2. Las reglas en `.agents/rules/` son obligatorias.
3. Plan de trabajo: `PLAN_IMPLEMENTACION.md`. Estado actual: `.agents/memory/progress.md`.
4. Nuestro rol es **FRONTEND**: no modificar `src/server/`, `src/app/api/` ni `supabase/`.
5. Al terminar una tarea, actualiza `.agents/memory/` y `.agents/learnings/`.
