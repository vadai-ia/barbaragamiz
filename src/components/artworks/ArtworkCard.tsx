import Image from "next/image";
import Link from "next/link";
import { SerieBadge } from "@/components/ui/SerieBadge";
import { frameSize, imageFormat } from "@/lib/imageFormat";
import type { Artwork } from "@/types";

export function ArtworkCard({
  artwork,
  priority = false,
  aspect = "aspect-[3/2]",
  showSerie = false,
}: {
  artwork: Artwork;
  priority?: boolean;
  /** Proporción para obras horizontales; verticales y cuadradas usan la suya. */
  aspect?: string;
  /**
   * Marca con la etiqueta de serie las obras que pertenecen a una. Se omite
   * dentro de la propia página de la serie, donde sería redundante.
   */
  showSerie?: boolean;
}) {
  const serie = showSerie ? artwork.serie : undefined;
  const format = imageFormat(
    artwork.imagenAncho,
    artwork.imagenAlto,
    artwork.categoria
  );

  return (
    <Link
      href={`/obras/${artwork.slug}`}
      className="group flex h-full flex-col justify-between bg-card p-6 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 md:h-[520px]"
    >
      {serie && (
        <div className="mb-5 flex justify-center">
          <SerieBadge className="transition-colors group-hover:bg-accent">
            Serie · {serie.titulo}
          </SerieBadge>
        </div>
      )}

      <div className="flex flex-1 items-center justify-center">
        <div
          className={`relative overflow-hidden border-[3px] border-white shadow-[4px_4px_10px_rgba(0,0,0,0.15)] ${frameSize(
            format,
            aspect
          )}`}
        >
          {artwork.imagen ? (
            <Image
              src={artwork.imagen}
              alt={artwork.titulo}
              fill
              priority={priority}
              sizes="(max-width: 640px) 80vw, 40vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="type-eyebrow flex h-full w-full items-center justify-center bg-line text-muted">
              Sin imagen
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <span className="type-small font-medium text-ink">{artwork.titulo}</span>
        <span className="type-small text-right text-muted">
          {artwork.dimensiones}
        </span>
      </div>
    </Link>
  );
}
