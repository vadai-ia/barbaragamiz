import type { Metadata } from "next";
import { ArtworkGallery } from "@/components/artworks/ArtworkGallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getAllSeries, getStandaloneArtworks } from "@/sanity/lib/artworks";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galería de obras",
  description: "Galería de pintura y escultura de Bárbara Gamiz.",
};

export default async function ArtworksPage() {
  const [series, artworks] = await Promise.all([
    getAllSeries(),
    getStandaloneArtworks(),
  ]);

  return (
    <div className="page-shell py-20 md:py-32">
      <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-[1fr_0.7fr] md:items-end">
        <SectionTitle
          eyebrow="Archivo de obra"
          title="Galería"
          description="Una colección de pinturas y esculturas creadas entre la observación, la intuición y el diálogo con la materia."
        />
        <p className="max-w-md text-sm font-light leading-7 text-muted md:justify-self-end">
          Obras únicas y series completas. Abre una serie para recorrer todas
          sus piezas, o filtra por disciplina.
        </p>
      </div>
      <ArtworkGallery series={series} artworks={artworks} />
    </div>
  );
}
