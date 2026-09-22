# Barbara Gámiz · The Art of Being You

Portafolio de obra de Barbara Gámiz: pintura, escultura y fotografía.
Next.js 16 (App Router) + Sanity como CMS.

## Puesta en marcha

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- Panel de contenidos (Sanity Studio): http://localhost:3000/studio

## Variables de entorno

Crea un `.env.local` en la raíz (no se versiona):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-06
SANITY_API_WRITE_TOKEN=
```

El token de escritura solo lo usan los scripts de carga; la web funciona con
las tres primeras.

## Modelo de contenido

| Tipo | Descripción |
|---|---|
| `artwork` | Una obra. Categoría `Pintura` o `Escultura`. El campo **Pertenece a la serie** es opcional: sin serie es una obra única. |
| `serie` | Agrupa obras. Portada opcional; si falta, se usa la imagen de la primera obra. |

Dos series pueden compartir título (por ejemplo *Lunas* existe en pintura y en
escultura), por eso la tarjeta muestra la disciplina junto al nombre.

## Cómo se ve en la web

- `/obras` — las series aparecen como una sola tarjeta; las obras únicas, sueltas.
- `/obras/serie/[slug]` — todas las piezas de una serie.
- `/obras/[slug]` — ficha de obra, con enlace a su serie si pertenece a una.

Marcar una obra como **Destacada** la lleva al carrusel y a la selección de la
portada.

## Sistema editorial

Todo el sitio usa una sola escala, definida en `src/app/globals.css`. No se
escriben tamaños sueltos (`text-[15px]`, `text-3xl`…): se elige un rol y el
color va aparte (`text-ink`, `text-muted`, `text-accent`).

| Rol | Uso |
|---|---|
| `type-hero` | Título de la portada, sobre la obra a pantalla completa. Solo ahí. |
| `type-display` | Título de página (h1) del resto de páginas, dentro de `PageHero`. |
| `type-title` | Título de sección (h2), dentro de `SectionHeader`. |
| `type-heading` | Título de bloque: disciplinas, filas de lista, exposiciones. |
| `type-lead` | Entradilla en serif. |
| `type-body` | Prosa corrida. |
| `type-small` | Columnas estrechas, pies de tarjeta, fichas técnicas. |
| `type-eyebrow` | Etiquetas, enlaces de acción y botones. |
| `type-label` | Etiquetas pequeñas sobre fondo sólido, como la de serie. |

Ritmo vertical: `section-y` entre secciones, `hero-top` / `hero-bottom` en la
cabecera de página y `stack-header` entre una cabecera y su contenido.

**Componentes** (`src/components/ui`):

- `PageHero` — cabecera común de las páginas interiores. Dos excepciones deliberadas: la portada (obra a pantalla completa con `type-hero`) y la ficha de obra (la obra arriba en grande, datos debajo).
- Hero de portada (`ArtworkSlider`): ocupa toda la pantalla y el menú flota transparente encima, volviéndose sólido al hacer scroll. Zoom lento por obra, entrada del título y línea de progreso decorativa; todo se desactiva con "reducir movimiento". Usa `imagenBase` con un loader propio que pide a Sanity el ancho exacto a calidad 90 (una sola compresión, sin ampliar por encima del original). Una película oscura (arriba, izquierda y abajo) garantiza que el menú y el título en blanco se lean sobre cualquier obra.
- `SectionHeader` — cabecera de sección; `split` comparte columnas con `PageHero`, así títulos y textos caen en las mismas guías.
- `Section` — ancho y separación estándar; `tone="paper"` alterna banda clara.
- `Eyebrow`, `ActionLink` (→ / ← volver / externo), `ButtonLink` y `buttonStyles` (único botón sólido).
- `EditorialList` / `EditorialRow` — listas con filete: trayectoria, publicaciones.
- `SerieBadge` — etiqueta negra que marca lo que pertenece a una serie: tarjetas de serie, obras de serie fuera de su página y ficha de obra (ahí como enlace).
- `ArtworkGrid` (`src/components/artworks`) — única cuadrícula de obra, de dos columnas.

## Scripts

Ambos son idempotentes y nunca sobrescriben lo que ya existe. Sin `--write`
solo muestran lo que harían.

```bash
npx tsx scripts/seed-obras.ts --write      # crea series y obras del catálogo
npx tsx scripts/subir-imagenes.ts --write  # asigna las imágenes desde Cloudinary
```
