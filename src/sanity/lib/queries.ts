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
  "imagenDimensiones": imagen.asset->metadata.dimensions{ width, height },
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

const postFields = groq`
  _id,
  titulo,
  "slug": slug.current,
  fecha,
  lugar,
  extracto,
  imagen,
  contenido
`;

// Entradas marcadas "Mostrar en inicio" (las tres más recientes).
export const featuredPostsQuery = groq`
  *[_type == "post" && destacada == true] | order(fecha desc) [0...3] {
    ${postFields}
  }
`;

// Todas las entradas, de la más reciente a la más antigua.
export const allPostsQuery = groq`
  *[_type == "post"] | order(fecha desc) {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// Todos los slugs de serie (para generar las páginas de serie).
export const serieSlugsQuery = groq`
  *[_type == "serie" && defined(slug.current)][].slug.current
`;
