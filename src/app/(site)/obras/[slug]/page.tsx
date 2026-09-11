import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkCard } from "@/components/artworks/ArtworkCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  getAllArtworks,
  getArtwork,
  getArtworkSlugs,
} from "@/sanity/lib/artworks";

export const revalidate = 60;
export const dynamicParams = true;

interface ArtworkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getArtworkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArtworkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtwork(slug);

  if (!artwork) return {};

  return {
    title: artwork.titulo,
    description: `${artwork.categoria}${
      artwork.serie ? ` · Serie ${artwork.serie.titulo}` : ""
    }${artwork.tecnica ? ` · ${artwork.tecnica}` : ""} · Bárbara Gamiz`,
  };
}

export default async function ArtworkDetailPage({
  params,
}: ArtworkDetailPageProps) {
  const { slug } = await params;
  const artwork = await getArtwork(slug);

  if (!artwork) notFound();

  const others = (await getAllArtworks()).filter(
    (item) => item.id !== artwork.id
  );
  // Dentro de una serie, lo relacionado son sus hermanas; si no, el resto de obra.
  const siblings = artwork.serie
    ? others.filter((item) => item.serie?.slug === artwork.serie?.slug)
    : [];
  const related = (siblings.length ? siblings : others).slice(0, 10);

  return (
    <>
      <section className="page-shell grid gap-12 py-12 md:grid-cols-[1.35fr_0.65fr] md:gap-20 md:py-20">
        <div className="relative min-h-[560px] bg-line md:min-h-[calc(100vh-10rem)]">
          {artwork.imagen ? (
            <Image
              src={artwork.imagen}
              alt={artwork.titulo}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 68vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-[0.2em] text-muted">
              Sin imagen
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center md:sticky md:top-10 md:h-[calc(100vh-5rem)]">
          <p className="text-[0.66rem] uppercase tracking-[0.3em] text-accent">
            {artwork.categoria}
          </p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.85] tracking-[-0.045em] md:text-8xl">
            {artwork.titulo}
          </h1>

          {artwork.serie && (
            <Link
              href={`/obras/serie/${artwork.serie.slug}`}
              className="mt-6 inline-block self-start border-b border-line pb-1 text-[0.68rem] uppercase tracking-[0.2em] text-muted transition-colors hover:border-ink hover:text-ink"
            >
              Serie · {artwork.serie.titulo}
            </Link>
          )}

          <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Técnica</dt>
              <dd className="text-right">{artwork.tecnica}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Dimensiones</dt>
              <dd>{artwork.dimensiones}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Año</dt>
              <dd>{artwork.año}</dd>
            </div>
          </dl>

          <Link
            href={`/contacto?obra=${artwork.slug}`}
            className="mt-10 bg-ink px-8 py-5 text-center text-[0.67rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
          >
            Contactar al artista
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper py-24 md:py-36">
          <div className="page-shell">
            <SectionTitle
              eyebrow={
                siblings.length ? "Misma serie" : "Continúa explorando"
              }
              title={
                siblings.length && artwork.serie
                  ? artwork.serie.titulo
                  : "Obras relacionadas"
              }
            />
            <div className="mt-16 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArtworkCard
                  key={item.id}
                  artwork={item}
                  showSerie={!siblings.length}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
