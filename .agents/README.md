# .agents — Base de conocimiento compartida para agentes de IA

Esta carpeta es **agnóstica de herramienta**: la usan Claude Code, Codex, Cursor, Gemini, Copilot o cualquier otro agente que trabaje en el repo. Nada aquí es específico de un proveedor.

> Punto de entrada para todos los agentes: `AGENTS.md` (raíz) → apunta aquí.
> `CLAUDE.md` solo importa `AGENTS.md`; no dupliques reglas en archivos específicos de un agente.

## Orden de lectura obligatorio (antes de escribir código)

1. `context/project.md` — qué es FisiologIA, equipo, alcance de nuestro rol (FRONTEND).
2. `rules/` — **todas** las reglas. Son obligatorias, no sugerencias.
3. `context/architecture.md` — estructura de carpetas y flujo de datos.
4. `context/design-system.md` — diseño a respetar (fuente: `design.jpeg`).
5. `memory/progress.md` — en qué fase vamos y qué está en curso.
6. `memory/decisions.md` — decisiones ya tomadas (no re-discutirlas sin motivo).
7. `learnings/learnings.md` — errores y aprendizajes previos (no repetirlos).
8. `PLAN_IMPLEMENTACION.md` (raíz) — plan paso a paso.

## Estructura

```
.agents/
├── README.md                 ← este archivo
├── context/                  ← QUÉ es el proyecto (cambia poco)
│   ├── project.md
│   ├── architecture.md
│   └── design-system.md
├── rules/                    ← CÓMO trabajamos (obligatorio)
│   ├── frontend.md
│   ├── styling.md
│   ├── testing.md
│   ├── security.md
│   └── git-workflow.md
├── workflows/                ← checklists repetibles
│   ├── new-feature.md
│   └── new-component.md
├── memory/                   ← estado vivo del proyecto
│   ├── progress.md
│   ├── decisions.md
│   └── glossary.md
└── learnings/
    └── learnings.md          ← errores, gotchas, lecciones
```

## Cómo mantener esta carpeta (todo agente debe hacerlo)

- **Al terminar una tarea**: actualizar `memory/progress.md` (marcar checkbox, fecha).
- **Al tomar una decisión técnica**: agregar entrada en `memory/decisions.md` (formato ADR corto).
- **Al descubrir un error/gotcha**: agregar a `learnings/learnings.md`.
- **Si una regla queda obsoleta**: editarla, no dejar reglas contradictorias.
- Fechas siempre absolutas (`2026-11-20`), nunca "ayer" o "la semana pasada".
- Archivos cortos y concretos. Si un archivo supera ~200 líneas, dividirlo.
- Varios agentes pueden trabajar en paralelo: antes de tomar una tarea, marcarla en `memory/progress.md` como `[~] en curso (agente/rama)` para evitar trabajo duplicado.
