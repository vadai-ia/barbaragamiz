import { groq } from "next-sanity";

const artworkFields = groq`
  _id,
  titulo,
  "slug": slug.current,
  categoria,
  tecnica,
  dimensiones,
  anio,
  imagen,
  "serie": serie->{ _id, titulo, "slug": slug.current }
`;

const serieFields = groq`
  _id,
  titulo,
  "slug": slug.current,
  categoria,
  descripcion,
  portada,
  "obras": *[_type == "artwork" && references(^._id)] | order(orderRank) {
    ${artworkFields}
  }
`;

// Obras destacadas para la página de inicio (máx. 10, en su orden).
export const featuredArtworksQuery = groq`
  *[_type == "artwork" && destacada == true] | order(orderRank) [0...10] {
    ${artworkFields}
  }
`;

// Todas las obras (incluidas las que forman parte de una serie), en su orden.
export const allArtworksQuery = groq`
  *[_type == "artwork"] | order(orderRank) {
    ${artworkFields}
  }
`;

// Solo las obras únicas: las que no pertenecen a ninguna serie.
export const standaloneArtworksQuery = groq`
  *[_type == "artwork" && !defined(serie)] | order(orderRank) {
    ${artworkFields}
  }
`;

// Una obra por su enlace (slug).
export const artworkBySlugQuery = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    ${artworkFields}
  }
`;

// Todos los slugs de obra (para generar las páginas de detalle).
export const artworkSlugsQuery = groq`
  *[_type == "artwork" && defined(slug.current)][].slug.current
`;

// Todas las series con sus obras, en su orden.
export const allSeriesQuery = groq`
  *[_type == "serie"] | order(orderRank) {
    ${serieFields}
  }
`;

// Una serie por su enlace (slug).
export const serieBySlugQuery = groq`
  *[_type == "serie" && slug.current == $slug][0] {
    ${serieFields}
  }
`;

// Todos los slugs de serie (para generar las páginas de serie).
export const serieSlugsQuery = groq`
  *[_type == "serie" && defined(slug.current)][].slug.current
`;
