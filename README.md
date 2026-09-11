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

## Scripts

Ambos son idempotentes y nunca sobrescriben lo que ya existe. Sin `--write`
solo muestran lo que harían.

```bash
npx tsx scripts/seed-obras.ts --write      # crea series y obras del catálogo
npx tsx scripts/subir-imagenes.ts --write  # asigna las imágenes desde Cloudinary
```
