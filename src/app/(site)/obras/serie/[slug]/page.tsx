import type { Metadata } from "next";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ArtworkCard } from "@/components/artworks/ArtworkCard";
import { getSerie, getSerieSlugs } from "@/sanity/lib/artworks";
import type { Serie } from "@/types";

export const revalidate = 60;
export const dynamicParams = true;

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

  return {
    title: `${serie.titulo} · Serie`,
    description:
      serie.descripcion ??
      `Serie de ${serie.totalObras} obras de Bárbara Gamiz.`,
  };
}

export default async function SeriePage({ params }: SeriePageProps) {
  const { slug } = await params;
  const serie = await getSerie(slug);

  if (!serie) notFound();

  const range = yearRange(serie);
  const meta = [
    `${serie.totalObras} ${serie.totalObras === 1 ? "obra" : "obras"}`,
    range,
    serie.tecnica,
  ].filter(Boolean);

  return (
    <div className="page-shell py-20 md:py-32">
      <Link
        href="/obras"
        className="inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
      >
        <MoveLeft size={18} strokeWidth={1.5} />
        Volver a la galería
      </Link>

      <header className="mt-10 border-b border-line pb-10 md:mt-14 md:pb-14">
        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-muted">
          Serie · {serie.categoria}
        </p>
        <h1 className="mt-5 font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.01em] text-ink md:text-[72px]">
          {serie.titulo}
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-start">
          {serie.descripcion && (
            <p className="max-w-xl text-[15px] leading-7 text-muted">
              {serie.descripcion}
            </p>
          )}
          <p className="text-[14px] leading-[18px] text-ink md:justify-self-end md:text-right">
            {meta.join(" · ")}
          </p>
        </div>
      </header>

      {serie.obras.length ? (
        <div className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {serie.obras.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              priority={index < 3}
            />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-[14px] leading-6 text-muted">
          Esta serie todavía no tiene obras asignadas.
        </p>
      )}
    </div>
  );
}
