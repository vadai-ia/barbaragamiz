import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkCard } from "@/components/artworks/ArtworkCard";
import { ArtworkGrid } from "@/components/artworks/ArtworkGrid";
import { PhotoGallery } from "@/components/photos/PhotoGallery";
import { ActionLink } from "@/components/ui/ActionLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getSerie, getSerieSlugs } from "@/sanity/lib/artworks";
import type { Serie } from "@/types";

export const revalidate = 60;
// Export estático: solo existen las páginas generadas en el build. Una obra
// publicada después no tendrá página hasta la siguiente reconstrucción.
export const dynamicParams = false;

interface SeriePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getSerieSlugs();
  return slugs.map((slug) => ({ slug }));
}

function yearRange(serie: Serie) {
  if (!serie.anioInicio) return null;
  return serie.anioFin && serie.anioFin !== serie.anioInicio
    ? `${serie.anioInicio}–${serie.anioFin}`
    : String(serie.anioInicio);
}

export async function generateMetadata({
  params,
}: SeriePageProps): Promise<Metadata> {
  const { slug } = await params;
  const serie = await getSerie(slug);

  if (!serie) return {};

  const esProyecto = serie.categoria === "Fotografía";

  return {
    title: `${serie.titulo} · ${esProyecto ? "Proyecto" : "Serie"}`,
    description:
      serie.descripcion ??
      serie.subtitulo ??
      `Serie de ${serie.totalObras} obras de Bárbara Gamiz.`,
  };
}

export default async function SeriePage({ params }: SeriePageProps) {
  const { slug } = await params;
  const serie = await getSerie(slug);

  if (!serie) notFound();

  // Un proyecto de fotografía se presenta solo: la imagen manda y el texto
  // introductorio va antes de la retícula, no en la columna de datos.
  const esProyecto = serie.categoria === "Fotografía";

  if (esProyecto) {
    return (
      <>
        <PageHero
          back={
            <ActionLink href="/obras?disciplina=fotografia" back>
              Volver a fotografía
            </ActionLink>
          }
          eyebrow="Proyecto"
          title={serie.titulo}
          intro={serie.subtitulo}
        />

        <Section>
          {(serie.tituloObra || serie.descripcion) && (
            <div className="mb-14 max-w-2xl md:mb-20">
              {serie.tituloObra && (
                <h2 className="type-heading text-ink">{serie.tituloObra}</h2>
              )}
              {serie.descripcion && (
                <p className="type-body-lg mt-5 text-muted">
                  {serie.descripcion}
                </p>
              )}
            </div>
          )}

          <PhotoGallery photos={serie.obras} mostrarTitulo={false} />
        </Section>
      </>
    );
  }

  const meta = [
    `${serie.totalObras} ${serie.totalObras === 1 ? "obra" : "obras"}`,
    yearRange(serie),
    serie.tecnica,
  ].filter(Boolean);

  return (
    <>
      <PageHero
        back={
          <ActionLink href="/obras" back>
            Volver a la galería
          </ActionLink>
        }
        eyebrow={`Serie · ${serie.categoria}`}
        title={serie.titulo}
        intro={serie.descripcion}
        aside={<p className="type-small text-ink">{meta.join(" · ")}</p>}
      />

      <Section>
        {serie.obras.length ? (
          <ArtworkGrid>
            {serie.obras.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                priority={index < 2}
              />
            ))}
          </ArtworkGrid>
        ) : (
          <p className="type-body text-center text-muted">
            Esta serie todavía no tiene obras asignadas.
          </p>
        )}
      </Section>
    </>
  );
}
