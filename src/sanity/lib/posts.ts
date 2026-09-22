import type { Image, PortableTextBlock } from "sanity";
import { projectId } from "../env";
import { client } from "./client";
import { urlFor } from "./image";
import {
  allPostsQuery,
  featuredPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
} from "./queries";
import type { Post } from "@/types";

const isSanityConfigured = Boolean(projectId);

type SanityPost = {
  _id: string;
  titulo: string;
  slug: string;
  fecha: string;
  lugar?: string;
  extracto?: string;
  imagen?: Image;
  contenido?: PortableTextBlock[];
};

function mapPost(doc: SanityPost): Post {
  return {
    id: doc._id,
    slug: doc.slug,
    titulo: doc.titulo,
    fecha: doc.fecha,
    lugar: doc.lugar,
    extracto: doc.extracto,
    imagen: doc.imagen
      ? urlFor(doc.imagen).width(1600).quality(90).auto("format").url()
      : "",
    contenido: doc.contenido,
  };
}

/** Las marcadas "Mostrar en inicio", como máximo tres. */
export async function getFeaturedPosts(): Promise<Post[]> {
  if (!isSanityConfigured) return [];
  const docs = await client.fetch<SanityPost[]>(featuredPostsQuery);
  return docs.map(mapPost);
}

export async function getAllPosts(): Promise<Post[]> {
  if (!isSanityConfigured) return [];
  const docs = await client.fetch<SanityPost[]>(allPostsQuery);
  return docs.map(mapPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) return null;
  const doc = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  return doc ? mapPost(doc) : null;
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  return client.fetch<string[]>(postSlugsQuery);
}
