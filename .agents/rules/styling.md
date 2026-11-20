# Reglas de estilos (Tailwind 4)

## Tokens = única fuente de color
- Todos los colores salen de tokens semánticos definidos en `src/styles/theme.css` con `@theme`.
- Las paletas (`src/styles/palettes.css`) solo **reasignan variables** bajo `[data-theme="<paleta>"]`. Cambiar de paleta = cambiar un atributo en `<html>`; cero re-render de React.
- En componentes se usan clases semánticas: `bg-surface`, `bg-primary-soft`, `text-primary-strong`, `text-muted`, `border-border`, `bg-accent-mint`…
- ❌ Prohibido: `#hex`, `rgb()`, `bg-purple-500`, `text-gray-700`, `style={{ color }}`.
  ✅ Excepción: `currentColor` y `transparent`.
- Opacidades con modificador: `bg-primary/20`. Tonos intermedios: token nuevo con `color-mix()` en `theme.css`, no valores arbitrarios.

## Buenas prácticas Tailwind
- Config CSS-first: nada de `tailwind.config.js`.
- Variantes de componentes con `cva` + `cn()` (`clsx` + `tailwind-merge`) en `src/lib/cn.ts`.
- Evitar valores arbitrarios (`w-[437px]`). Si se repite, crear token en `@theme` (spacing, radius, shadow).
- Clases ordenadas (prettier-plugin-tailwindcss).
- Dark mode: es una paleta más (`data-theme="oscuro"`); variante `dark:` definida con `@custom-variant` sobre ese atributo, solo para casos excepcionales.
- Animaciones: keyframes y `--animate-*` en `src/styles/animations.css`. Siempre con `motion-safe:` o bloque `prefers-reduced-motion`.
- Sombras teñidas: tokens `--shadow-card`, `--shadow-soft` usando `color-mix` con primary.

## Tipografía
- Fuente vía `next/font` (variable CSS) registrada en `@theme` como `--font-sans`.
- Escala tipográfica con utilidades estándar (`text-sm`…`text-4xl`); sin tamaños arbitrarios.
