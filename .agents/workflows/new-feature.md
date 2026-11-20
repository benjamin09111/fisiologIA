# Checklist: nueva funcionalidad / vista

1. [ ] Leer reglas (`.agents/rules/`) y la fase correspondiente en `PLAN_IMPLEMENTACION.md`.
2. [ ] Marcar tarea `[~]` en `.agents/memory/progress.md`.
3. [ ] Revisar `design.jpeg` / `design-system.md`. Si la vista no tiene diseño, derivarla del lenguaje visual existente (no inventar estilos).
4. [ ] Datos: ¿existe el schema/tipo/mock/servicio? Si no → `schemas/` → `types/` → `mocks/*.json` → `services/`.
5. [ ] Inventario de componentes: listar los de `components/ui` que se reutilizan. Crear nuevos solo si nada sirve (R1).
6. [ ] Ruta en `app/(app)/...` con `page.tsx` delgado + `loading.tsx` (skeleton) si carga datos.
7. [ ] Componentes de dominio en `features/<feature>/`. `'use client'` solo donde haya interacción.
8. [ ] Animaciones de entrada/hover + reduced motion.
9. [ ] Responsive: probar 375px, 768px, 1280px, 1600px.
10. [ ] Probar con las 5 paletas (lavanda, océano, menta, rosa, oscuro).
11. [ ] Tests unit + E2E de la ruta + axe.
12. [ ] `npm run check` en verde.
13. [ ] Actualizar `progress.md`, y `decisions.md`/`learnings.md` si aplica.
