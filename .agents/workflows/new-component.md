# Checklist: nuevo componente

1. [ ] ¿Existe ya algo similar en `src/components/` o `src/features/`? → **extender** con una variante en vez de crear.
2. [ ] ¿Es genérico (sin conocimiento de dominio)? → `components/ui/`. ¿Es de dominio? → `features/<feature>/`.
3. [ ] Server Component salvo que necesite estado/eventos/APIs del navegador.
4. [ ] Variantes con `cva`; clases combinadas con `cn()`; solo tokens de color semánticos.
5. [ ] Props tipadas; extender props nativas del elemento (`ComponentProps<"button">`).
6. [ ] Accesible: rol, label, foco visible, teclado.
7. [ ] < 120 líneas (máx 200).
8. [ ] Test `Componente.test.tsx` cubriendo variantes y a11y básica.
9. [ ] Si es de `ui/`, agregarlo al inventario en `memory/progress.md` → sección "Inventario UI".
