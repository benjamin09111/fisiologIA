# Design system (fuente: `design.jpeg`)

> **RULE:** el diseño es la **guía visual** (estilo y estructura); el contenido de cada vista sale de `plan.md`. El estilo solo se modifica si el usuario lo pide explícitamente como "remodelación". Ver `rules/frontend.md` R8.
> Tabla completa de paletas con su mapeo a variables: `PLAN_IMPLEMENTACION.md` → Fase 1.3.
> Este documento traduce el diseño a tokens. Si algo no está aquí, mirar `design.jpeg` (pantalla Inicio, 1600×900).

## Paletas (de `plan.md`)

Cada paleta define 4 colores base; el resto de tonos se derivan con `color-mix()` en tokens.

| Token semántico | Lavanda (default) | Océano | Menta | Rosa | Dark |
|---|---|---|---|---|---|
| `surface` (blanco) | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #2D3346 |
| `primary-soft` (claro) | #E1D9FC | #CBE6F9 | #D7EFEB | #F6D7E3 | #2D3346 (mezcla) |
| `primary` (medio) | #A79AF2 | #70B6E7 | #8CD0B2 | #E692B8 | #7C72DF |
| `primary-strong` (oscuro) | #6351B8 | #2F71AA | #307555 | #9E4F76 | #BDB5FF |
| `background` | mezcla soft+blanco | ídem | ídem | ídem | #181926 |

Nombres de paleta en código: `lavanda | oceano | menta | rosa | oscuro` (atributo `data-theme` en `<html>`).

## Tokens adicionales (independientes de la paleta)

- `text` (navy oscuro ~#1E1B4B en claro), `text-muted` (~#4B4F6B), `border` (primary-soft más suave).
- Acentos categóricos de las tarjetas "¿Qué quieres hacer hoy?": `accent-sky` (azul pastel), `accent-lavender`, `accent-mint`, `accent-rose`. Se ajustan en dark.
- Estado: `success`, `warning`, `danger` (el punto rojo de notificaciones), `info`.
- Evaluaciones en calendario: pill rosada (solemne) / pill lavanda (otras).

## Layout desktop (1600px de referencia)

- **Sidebar** ~230px, fondo primary-soft degradado suave. Logo (cerebro) + "FisiologIA" bold navy + tagline "Aprende · Comprende y Evoluciona".
- Items: icono outline + label. Activo = pill `primary-soft` intenso, texto bold, icono `primary-strong`.
- Orden de items: Inicio, Mis cursos, Planificaciones, Biblioteca, FisioIA, Mi progreso, Configuración.
- Tarjeta inferior "¡Tú puedes!" (corazón, texto motivacional, ilustración cerebro line-art).
- **Contenido** en 2 columnas: principal (~60%) + lateral derecha (~25%, Mi planificación + tarjeta FisioIA).
- **Topbar** sin barra visible: saludo grande a la izquierda; campana (punto rojo) + avatar circular con iniciales + chevron a la derecha.

## Componentes del diseño

| Elemento | Detalle |
|---|---|
| Saludo | "¡Hola, {nombre}!" ~40px bold navy + icono corazón outline primary. Subtítulo "¿Qué aprenderemos hoy?" primary-strong. |
| Hero | Card rounded-3xl degradado primary-soft, icono diana, título bold, texto, botón pill sólido primary-strong "Continuar estudiando →". FisioBot sobresale por arriba con moléculas decorativas y burbuja de diálogo blanca. |
| Continúa donde quedaste | Card blanca: imagen del módulo, título, "Unidad 1 · Mecánica ventilatoria", barra de progreso (primary-strong sobre primary-soft) + "%" bold, botón pill soft "Retomar →". |
| Acciones rápidas | 4 tarjetas con tinte (sky, lavender, mint, rose): icono outline arriba, título bold, descripción, flecha en círculo abajo a la derecha. |
| Nuestros módulos | Cards blancas: imagen órgano, título 2 líneas, chip estado ("En curso" soft / "Bloqueado" gris-lavanda) + chevron o candado. Link "Ver todos los módulos →". |
| Mi planificación | Card: header con icono + "Ver calendario →". Mes con chevrons, días L–D, día seleccionado círculo relleno primary-strong, puntos bajo días con eventos. "Próximas evaluaciones" como pills con chevron. |
| Tarjeta FisioIA | Degradado primary→primary-strong, texto blanco, icono sparkles, botón translúcido "Abrir chat →", FisioBot asomado a la derecha. |
| Encabezados de sección | Icono outline primary-strong + título bold ~20px navy. |

## Forma y profundidad

- Radios: tarjetas `rounded-2xl`/`rounded-3xl`, botones y chips `rounded-full`.
- Sombras muy suaves y teñidas de primary (no grises duras). Bordes 1px casi invisibles.
- Iconografía: outline, trazo ~1.75–2px (Lucide encaja).
- Tipografía: **Plus Jakarta Sans** (`next/font`), títulos 700–800, cuerpo 400–500.

## Navegación

- Ejercicios **no** está en el sidebar: se entra desde la tarjeta "Practicar" de Inicio y desde cada unidad.
- Biblioteca y FisioIA: placeholders por ahora.
- Imágenes de órganos/ilustraciones aún no existen → `ModuleImage` con placeholder tintado.

## Animaciones (siempre presentes, siempre sutiles)

- Entrada de secciones: fade + slide-up escalonado.
- Hover de tarjetas: elevación leve + flecha que se desplaza.
- FisioBot: flotación lenta (idle), parpadeo de la burbuja al entrar.
- Barras de progreso: llenado animado.
- Cambios de ruta: View Transitions (React `<ViewTransition>`).
- **Obligatorio** respetar `prefers-reduced-motion`.

## Mobile (no hay diseño: se deriva respetando el lenguaje visual)

- `< lg`: sidebar → drawer (mismo componente de navegación) abierto desde topbar con hamburguesa.
- Columna lateral (planificación, FisioIA) pasa debajo del contenido principal.
- Grids de 4 → 2 columnas (`sm`) → 1/2 (`base`). Robot del hero reducido.
