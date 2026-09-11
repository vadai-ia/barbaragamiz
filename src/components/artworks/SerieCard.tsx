import Image from "next/image";
import Link from "next/link";
import type { Serie } from "@/types";

function years(serie: Serie) {
  if (!serie.anioInicio) return null;
  return serie.anioFin && serie.anioFin !== serie.anioInicio
    ? `${serie.anioInicio}–${serie.anioFin}`
    : String(serie.anioInicio);
}

export function SerieCard({
  serie,
  priority = false,
}: {
  serie: Serie;
  priority?: boolean;
}) {
  const range = years(serie);

  return (
    <Link
      href={`/obras/serie/${serie.slug}`}
      className="group flex h-full flex-col justify-between bg-card p-6 sm:p-8 md:h-[416px]"
    >
      <div className="flex flex-1 items-center justify-center">
        {/* Las capas apiladas anuncian que la tarjeta contiene varias obras. */}
        <div className="relative aspect-[3/2] w-[80%]">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-[10px] -translate-y-[10px] border-[3px] border-white bg-line transition-transform duration-700 ease-out group-hover:translate-x-[14px] group-hover:-translate-y-[14px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 translate-x-[5px] -translate-y-[5px] border-[3px] border-white bg-canvas transition-transform duration-700 ease-out group-hover:translate-x-[7px] group-hover:-translate-y-[7px]"
          />
          <div className="absolute inset-0 overflow-hidden border-[3px] border-white shadow-[4px_4px_10px_rgba(0,0,0,0.15)]">
            {serie.portada ? (
              <Image
                src={serie.portada}
                alt={serie.titulo}
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
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 text-[14px] leading-[18px]">
        <span className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
            Serie · {serie.categoria}
          </span>
          <span className="font-medium uppercase tracking-[0.02em] text-ink">
            {serie.titulo}
          </span>
        </span>
        <span className="text-right text-muted">
          {serie.totalObras} {serie.totalObras === 1 ? "obra" : "obras"}
          {range ? ` · ${range}` : ""}
        </span>
      </div>
    </Link>
  );
}
