import type { Image } from "sanity";
import { projectId } from "../env";
import { client } from "./client";
import { urlFor } from "./image";
import {
  allArtworksQuery,
  allSeriesQuery,
  artworkBySlugQuery,
  artworkSlugsQuery,
  featuredArtworksQuery,
  serieBySlugQuery,
  serieSlugsQuery,
  standaloneArtworksQuery,
} from "./queries";
import type { Artwork, Serie } from "@/types";
import {
  artworks as staticArtworks,
  featuredArtworks as staticFeatured,
  getArtworkBySlug as getStaticArtworkBySlug,
} from "@/data/artworks";

export const isSanityConfigured = Boolean(projectId);

type SanityArtwork = {
  _id: string;
  titulo: string;
  slug: string;
  categoria: Artwork["categoria"];
  tecnica?: string;
  dimensiones?: string;
  anio?: number;
  imagen?: Image;
  serie?: { _id: string; titulo: string; slug: string } | null;
};

type SanitySerie = {
  _id: string;
  titulo: string;
  slug: string;
  categoria: Artwork["categoria"];
  descripcion?: string;
  portada?: Image;
  obras?: SanityArtwork[];
};

function imageUrl(source?: Image) {
  return source ? urlFor(source).width(1600).quality(90).auto("format").url() : "";
}

function mapArtwork(doc: SanityArtwork): Artwork {
  return {
    id: doc._id,
    slug: doc.slug,
    titulo: doc.titulo,
    categoria: doc.categoria,
    tecnica: doc.tecnica,
    dimensiones: doc.dimensiones,
    año: doc.anio,
    imagen: imageUrl(doc.imagen),
    destacada: true,
    serie: doc.serie
      ? { id: doc.serie._id, slug: doc.serie.slug, titulo: doc.serie.titulo }
      : undefined,
  };
}

function mapSerie(doc: SanitySerie): Serie {
  const obras = (doc.obras ?? []).map(mapArtwork);
  const years = obras
    .map((obra) => obra.año)
    .filter((year): year is number => typeof year === "number");
  const tecnicas = Array.from(
    new Set(obras.map((obra) => obra.tecnica).filter(Boolean))
  );

  return {
    id: doc._id,
    slug: doc.slug,
    titulo: doc.titulo,
    categoria: doc.categoria,
    descripcion: doc.descripcion,
    // Sin portada propia, la primera obra con imagen hace de portada.
    portada: imageUrl(doc.portada) || obras.find((obra) => obra.imagen)?.imagen || "",
    obras,
    totalObras: obras.length,
    anioInicio: years.length ? Math.min(...years) : undefined,
    anioFin: years.length ? Math.max(...years) : undefined,
    tecnica: tecnicas.length === 1 ? tecnicas[0] : undefined,
  };
}

export async function getFeaturedArtworks(): Promise<Artwork[]> {
  if (!isSanityConfigured) return staticFeatured;
  const docs = await client.fetch<SanityArtwork[]>(featuredArtworksQuery);
  return docs.map(mapArtwork);
}

export async function getAllArtworks(): Promise<Artwork[]> {
  if (!isSanityConfigured) return staticArtworks;
  const docs = await client.fetch<SanityArtwork[]>(allArtworksQuery);
  return docs.map(mapArtwork);
}

/** Obras que no pertenecen a ninguna serie. */
export async function getStandaloneArtworks(): Promise<Artwork[]> {
  if (!isSanityConfigured) return staticArtworks;
  const docs = await client.fetch<SanityArtwork[]>(standaloneArtworksQuery);
  return docs.map(mapArtwork);
}

export async function getArtwork(slug: string): Promise<Artwork | null> {
  if (!isSanityConfigured) return getStaticArtworkBySlug(slug) ?? null;
  const doc = await client.fetch<SanityArtwork | null>(artworkBySlugQuery, {
    slug,
  });
  return doc ? mapArtwork(doc) : null;
}

export async function getArtworkSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return staticArtworks.map((artwork) => artwork.slug);
  return client.fetch<string[]>(artworkSlugsQuery);
}

export async function getAllSeries(): Promise<Serie[]> {
  // Los datos estáticos de respaldo no contemplan series.
  if (!isSanityConfigured) return [];
  const docs = await client.fetch<SanitySerie[]>(allSeriesQuery);
  return docs.map(mapSerie);
}

export async function getSerie(slug: string): Promise<Serie | null> {
  if (!isSanityConfigured) return null;
  const doc = await client.fetch<SanitySerie | null>(serieBySlugQuery, { slug });
  return doc ? mapSerie(doc) : null;
}

export async function getSerieSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  return client.fetch<string[]>(serieSlugsQuery);
}
