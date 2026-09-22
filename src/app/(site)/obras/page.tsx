import type { Metadata } from "next";
import { ArtworkGallery } from "@/components/artworks/ArtworkGallery";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
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
    <>
      <PageHero
        eyebrow="Archivo de obra"
        title="Galería"
        intro="Obras únicas y series completas de pintura y escultura. Elige una disciplina y abre una serie para recorrer todas sus piezas."
      />
      <Section>
        <ArtworkGallery series={series} artworks={artworks} />
      </Section>
    </>
  );
}
