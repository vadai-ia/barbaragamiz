import Image from "next/image";
import Link from "next/link";
import type { Serie } from "@/types";

/**
 * Acceso a un proyecto de fotografía. Sin marco ni fondo, al contrario que
 * SerieCard: en fotografía manda la imagen y el texto se queda debajo.
 */
export function ProjectCard({
  serie,
  priority = false,
}: {
  serie: Serie;
  priority?: boolean;
}) {
  return (
    <Link href={`/obras/serie/${serie.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-line">
        {serie.portada && (
          <Image
            src={serie.portada}
            alt={serie.titulo}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </div>
      <h3 className="type-heading mt-5 text-ink">{serie.titulo}</h3>
      {serie.subtitulo && (
        <p className="type-small mt-2 text-muted">{serie.subtitulo}</p>
      )}
    </Link>
  );
}
