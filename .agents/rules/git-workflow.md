# Flujo Git y colaboración

- Nunca commitear directo a `main`. Rama por tarea: `feat/front-<tema>`, `fix/front-<tema>`, `chore/front-<tema>`.
- Commits en español, convención: `feat: ...`, `fix: ...`, `chore: ...`, `test: ...`, `docs: ...`.
- PR con `.github/pull_request_template.md` completo. Revisores según `.github/CODEOWNERS`.
- PR pequeños: una fase o sub-fase del plan por PR.
- Antes del PR: `npm run check` en verde + `memory/progress.md` actualizado.
- ⛔ No modificar archivos de backend (`src/server/`, `src/app/api/`, `supabase/`) ni dependencias de backend sin coordinar.
- El bloque `<!-- BEGIN:nextjs-agent-rules -->` de `AGENTS.md` lo regenera `next dev`: no editarlo; agregar contenido fuera del bloque.
- Varios agentes en paralelo: tomar tareas marcándolas en `memory/progress.md`; no editar el mismo archivo que otra rama activa sin coordinar.
