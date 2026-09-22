"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Carrusel de imágenes que avanza solo. Se desliza con el dedo (scroll-snap
 * nativo), se pausa unos segundos cuando alguien lo toca y no se mueve si el
 * usuario pidió reducir el movimiento.
 */
export function ImageCarousel({
  images,
  interval = 4500,
  aspect = "aspect-[4/5]",
  // Ancho real en móvil: la página deja 1,25rem de margen a cada lado.
  sizes = "calc(100vw - 2.5rem)",
}: {
  images: CarouselImage[];
  interval?: number;
  aspect?: string;
  sizes?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const pause = () => {
    pausedUntil.current = Date.now() + 8000;
  };

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      const el = trackRef.current;
      // Oculto (p. ej. en desktop) no tiene ancho: no hay nada que mover.
      if (!el || el.clientWidth === 0 || Date.now() < pausedUntil.current) return;
      const current = Math.round(el.scrollLeft / el.clientWidth);
      goTo((current + 1) % images.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={(event) => {
          const el = event.currentTarget;
          if (el.clientWidth) setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        onPointerDown={pause}
        onTouchStart={pause}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {images.map((image, i) => (
          <figure
            key={image.src}
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${images.length}`}
            className="w-full shrink-0 snap-center"
          >
            <div className={`relative overflow-hidden bg-line ${aspect}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                className="object-cover"
              />
            </div>
            {image.caption && (
              <figcaption className="type-eyebrow mt-3 text-muted">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={index === i}
              onClick={() => {
                pause();
                goTo(i);
              }}
              className="flex-1 py-3"
            >
              <span
                className={`block h-[2px] w-full transition-colors duration-500 ${
                  index === i ? "bg-ink" : "bg-line"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
