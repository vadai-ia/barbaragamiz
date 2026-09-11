import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/types";

export function ArtworkCard({
  artwork,
  priority = false,
  aspect = "aspect-[3/2]",
  showSerie = false,
}: {
  artwork: Artwork;
  priority?: boolean;
  aspect?: string;
  /** Muestra el nombre de la serie sobre el título (útil fuera de su página). */
  showSerie?: boolean;
}) {
  return (
    <Link
      href={`/obras/${artwork.slug}`}
      className="group flex h-full flex-col justify-between bg-card p-6 sm:p-8 md:h-[416px]"
    >
      <div className="flex flex-1 items-center justify-center">
        <div
          className={`relative w-[80%] overflow-hidden border-[3px] border-white shadow-[4px_4px_10px_rgba(0,0,0,0.15)] ${aspect}`}
        >
          {artwork.imagen ? (
            <Image
              src={artwork.imagen}
              alt={artwork.titulo}
              fill
              priority={priority}
              sizes="(max-width: 768px) 80vw, 33vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-line text-[11px] uppercase tracking-[0.2em] text-muted">
              Sin imagen
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4 text-[14px] leading-[18px]">
        <span className="flex flex-col gap-1">
          {showSerie && artwork.serie && (
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
              {artwork.serie.titulo}
            </span>
          )}
          <span className="font-medium uppercase tracking-[0.02em] text-ink">
            {artwork.titulo}
          </span>
        </span>
        <span className="text-right text-muted">{artwork.dimensiones}</span>
      </div>
    </Link>
  );
}
