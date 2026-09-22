import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArtworkCard } from "@/components/artworks/ArtworkCard";
import { ArtworkGrid } from "@/components/artworks/ArtworkGrid";
import { ActionLink } from "@/components/ui/ActionLink";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SerieBadge } from "@/components/ui/SerieBadge";
import { whatsappUrl } from "@/lib/constants";
import {
  getAllArtworks,
  getArtwork,
  getArtworkSlugs,
} from "@/sanity/lib/artworks";
import type { Artwork } from "@/types";

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

const frame =
  "border-[6px] border-white shadow-[6px_6px_18px_rgba(0,0,0,0.18)]";

/** La obra enmarcada a su proporción real, lo más grande que quepa. */
function ArtworkImage({ artwork }: { artwork: Artwork }) {
  if (!artwork.imagen) {
    return (
      <div className="type-eyebrow flex aspect-[4/3] w-full max-w-2xl items-center justify-center bg-line text-muted">
        Sin imagen
      </div>
    );
  }

  if (artwork.imagenAncho && artwork.imagenAlto) {
    return (
      <Image
        src={artwork.imagen}
        alt={artwork.titulo}
        width={artwork.imagenAncho}
        height={artwork.imagenAlto}
        priority
        sizes="(max-width: 768px) 90vw, 900px"
        className={`h-auto max-h-[min(70vh,44rem)] w-auto max-w-full ${frame}`}
      />
    );
  }

  // Sin proporciones conocidas (datos de respaldo): caja fija sin recorte.
  return (
    <div className="relative aspect-[4/3] w-full">
      <Image
        src={artwork.imagen}
        alt={artwork.titulo}
        fill
        priority
        sizes="(max-width: 768px) 90vw, 900px"
        className="object-contain"
      />
    </div>
  );
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
  // Número par: la cuadrícula es de dos columnas.
  const related = (siblings.length ? siblings : others).slice(0, 8);

  // El mensaje se arma con lo que haya en Sanity: las obras nuevas lo tienen
  // sin tocar nada, y lo que falte simplemente no se menciona.
  const detalles = [
    artwork.serie ? `de la serie ${artwork.serie.titulo}` : null,
    artwork.dimensiones ? `(${artwork.dimensiones})` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const mensajeWhatsapp = `Hola, me interesa la obra "${artwork.titulo}"${
    detalles ? ` ${detalles}` : ""
  }. ¿Me puedes dar más información?`;

  const specs = [
    ["Técnica", artwork.tecnica],
    ["Dimensiones", artwork.dimensiones],
    ["Año", artwork.año],
  ].filter(([, value]) => value);

  return (
    <>
      <article className="page-shell pt-8 pb-10 md:pt-12 md:pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {artwork.serie ? (
            <ActionLink href={`/obras/serie/${artwork.serie.slug}`} back>
              Serie {artwork.serie.titulo}
            </ActionLink>
          ) : (
            <ActionLink href="/obras" back>
              Volver a la galería
            </ActionLink>
          )}
          <Eyebrow>
            {artwork.categoria} · {artwork.serie ? "Obra de serie" : "Obra única"}
          </Eyebrow>
        </div>

        {/* La obra, arriba y en grande. */}
        <div className="mt-6 flex items-center justify-center bg-card px-6 py-12 sm:px-10 md:mt-8 md:px-16 md:py-20">
          <ArtworkImage artwork={artwork} />
        </div>

        {/* Ficha: título, datos y contacto en una fila. */}
        <div className="flex flex-col gap-8 border-b border-line py-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-14">
            <div className="flex flex-col items-start gap-4 md:max-w-[16rem]">
              <h1 className="type-heading uppercase text-ink">
                {artwork.titulo}
              </h1>
              {artwork.serie && (
                <SerieBadge href={`/obras/serie/${artwork.serie.slug}`}>
                  Serie · {artwork.serie.titulo}
                </SerieBadge>
              )}
            </div>
            {specs.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:flex md:gap-14">
                {specs.map(([label, value]) => (
                  <div key={label as string}>
                    <dt className="type-small font-medium text-ink">{label}</dt>
                    <dd className="type-small mt-1 text-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <ButtonLink
            href={whatsappUrl(mensajeWhatsapp)}
            external
            className="shrink-0 self-start"
          >
            Contactar a la artista
          </ButtonLink>
        </div>
      </article>

      {related.length > 0 && (
        <Section tone="paper">
          <SectionHeader
            eyebrow={siblings.length ? "Misma serie" : "Continúa explorando"}
            title={
              siblings.length && artwork.serie
                ? artwork.serie.titulo
                : "Obras relacionadas"
            }
          />
          <ArtworkGrid className="stack-header">
            {related.map((item) => (
              <ArtworkCard
                key={item.id}
                artwork={item}
                showSerie={!siblings.length}
              />
            ))}
          </ArtworkGrid>
        </Section>
      )}
    </>
  );
}
