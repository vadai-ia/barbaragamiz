"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Artwork } from "@/types";

/**
 * Retícula de fotografía: solo imágenes, sin títulos ni fichas. Al pulsar una,
 * se abre en grande y se puede pasar a la anterior o la siguiente sin cerrar
 * el visor.
 *
 * La obra fotográfica muestra el título al ampliar; los proyectos no, porque
 * sus imágenes se leen como una serie y no llevan título propio.
 *
 * Deliberadamente distinta de ArtworkCard: en pintura y escultura la ficha
 * técnica acompaña a la obra; aquí la imagen va sola.
 */
export function PhotoGallery({
  photos,
  mostrarTitulo = true,
}: {
  photos: Artwork[];
  /** Título bajo la imagen ampliada. */
  mostrarTitulo?: boolean;
}) {
  const [abierta, setAbierta] = useState<number | null>(null);
  const total = photos.length;

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (paso: number) =>
      setAbierta((i) => (i === null ? i : (i + paso + total) % total)),
    [total]
  );

  // Teclado: salir con Escape, pasar con las flechas.
  useEffect(() => {
    if (abierta === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") cerrar();
      if (event.key === "ArrowRight") mover(1);
      if (event.key === "ArrowLeft") mover(-1);
    };

    // Sin esto, la página de detrás se desplaza con el visor abierto.
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [abierta, cerrar, mover]);

  if (!total) {
    return (
      <p className="type-body text-center text-muted">
        Todavía no hay fotografías publicadas.
      </p>
    );
  }

  const actual = abierta === null ? null : { indice: abierta, foto: photos[abierta] };

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {photos.map((photo, index) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setAbierta(index)}
              aria-label={`Ampliar ${photo.titulo}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-line"
            >
              <span className="block aspect-square">
                {photo.imagen && (
                  <Image
                    src={photo.imagen}
                    alt={photo.titulo}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {actual && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={actual.foto.titulo}
          onClick={cerrar}
          className="fixed inset-0 z-[60] flex flex-col bg-black/95 p-4 md:p-8"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="grid h-11 w-11 place-items-center text-white/70 transition-colors hover:text-white"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* El clic en la imagen no cierra: solo el fondo. */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            {total > 1 && (
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Fotografía anterior"
                className="absolute left-0 z-10 grid h-12 w-12 place-items-center text-white/60 transition-colors hover:text-white"
              >
                <ChevronLeft size={32} strokeWidth={1.25} />
              </button>
            )}

            <div className="relative h-full w-full">
              {actual.foto.imagen && (
                <Image
                  key={actual.foto.id}
                  src={actual.foto.imagen}
                  alt={actual.foto.titulo}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              )}
            </div>

            {total > 1 && (
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Fotografía siguiente"
                className="absolute right-0 z-10 grid h-12 w-12 place-items-center text-white/60 transition-colors hover:text-white"
              >
                <ChevronRight size={32} strokeWidth={1.25} />
              </button>
            )}
          </div>

          {/* Lo único que acompaña a la imagen ampliada es su título. */}
          {mostrarTitulo ? (
            <p className="type-small mt-5 text-center text-white/80">
              {actual.foto.titulo}
            </p>
          ) : (
            <p className="type-caption mt-5 text-center text-white/40">
              {actual.indice + 1} / {total}
            </p>
          )}
        </div>
      )}
    </>
  );
}
