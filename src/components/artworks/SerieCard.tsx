import Image from "next/image";
import Link from "next/link";
import { SerieBadge } from "@/components/ui/SerieBadge";
import { frameSize } from "@/lib/imageFormat";
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
      className="group flex h-full flex-col justify-between bg-card p-6 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 md:h-[520px]"
    >
      {/* Centrada sobre el mismo eje que la obra, sea cual sea su formato. */}
      <div className="flex justify-center">
        <SerieBadge className="transition-colors group-hover:bg-accent">
          Serie · {serie.totalObras} {serie.totalObras === 1 ? "obra" : "obras"}
        </SerieBadge>
      </div>

      <div className="mt-5 flex flex-1 items-center justify-center">
        {/* Las capas apiladas anuncian que la tarjeta contiene varias obras. */}
        <div className={`relative ${frameSize(serie.portadaFormato)}`}>
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
      </div>

      {/* Dos series pueden compartir título (p. ej. "Lunas" en pintura y en
          escultura), así que la disciplina va junto al nombre. */}
      <div className="mt-6 flex items-end justify-between gap-4">
        <span className="flex flex-col gap-2">
          <span className="type-eyebrow text-muted">{serie.categoria}</span>
          <span className="type-small font-medium text-ink">{serie.titulo}</span>
        </span>
        {range && <span className="type-small text-right text-muted">{range}</span>}
      </div>
    </Link>
  );
}
