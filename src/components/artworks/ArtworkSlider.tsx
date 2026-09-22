"use client";

import Image, { type ImageLoader } from "next/image";
import { useEffect, useState } from "react";
import type { Artwork } from "@/types";

const INTERVAL = 6500;

/**
 * Pide a Sanity la imagen al ancho exacto de cada pantalla, a calidad alta,
 * sin pasar por el optimizador de Next: así se comprime una sola vez.
 * `fit=max` evita ampliar por encima del archivo original.
 */
const sanityLoader: ImageLoader = ({ src, width }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", "90");
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
};

/**
 * Hero de portada: la obra a pantalla completa (el menú flota encima), con un
 * zoom lento mientras está visible, fundido entre obras y el título delante.
 * Sin subtítulos ni botones; la línea de progreso es solo decorativa.
 */
export function ArtworkSlider({ artworks }: { artworks: Artwork[] }) {
  const [current, setCurrent] = useState(0);
  // Cuenta cada cambio para reiniciar la animación de la línea de progreso.
  const [cycle, setCycle] = useState(0);
  // Tras el primer pintado, para que también la primera obra haga su zoom.
  const [ready, setReady] = useState(false);
  // Una obra sin imagen cargada aún no puede ocupar el hero.
  const slides = artworks.filter((artwork) => artwork.imagen);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
      setCycle((value) => value + 1);
    }, INTERVAL);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-black text-paper">
      {slides.map((artwork, index) => {
        const active = current === index;
        return (
          <div
            key={artwork.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={artwork.imagenBase ?? artwork.imagen}
              loader={artwork.imagenBase ? sanityLoader : undefined}
              alt={artwork.titulo}
              fill
              priority={index === 0}
              // Las demás también se cargan ya: cualquiera puede ser la imagen
              // principal en pantalla y el fundido no debe esperar a la descarga.
              loading={index === 0 ? undefined : "eager"}
              sizes="100vw"
              // Zoom corto (5 %): ampliar más resta nitidez a la obra.
              className={`object-cover transition-transform duration-[9000ms] ease-out motion-reduce:scale-100 motion-reduce:transition-none ${
                ready && active ? "scale-100" : "scale-[1.05]"
              }`}
            />
          </div>
        );
      })}

      {/* Película mínima y solo donde hay texto: una banda corta arriba para el
          menú y la mitad inferior para el título. En negro, que oscurece sin
          agrisar; la mitad superior de la obra queda limpia. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      <div className="page-shell relative z-10 flex h-full items-end pb-24 md:pb-28">
        {/* La sombra hace el trabajo que antes hacía la película. */}
        <h1 className="type-hero animate-hero-rise max-w-5xl [text-shadow:0_1px_3px_rgba(0,0,0,0.35),0_4px_40px_rgba(0,0,0,0.55)]">
          <span className="block">The Art</span>
          <span className="block italic">of Being You</span>
        </h1>
      </div>

      {slides.length > 1 && (
        <div
          aria-hidden
          className="absolute bottom-10 right-5 z-10 flex w-24 gap-2 md:bottom-12 md:right-12 md:w-40"
        >
          {slides.map((artwork, index) => (
            <span
              key={artwork.id}
              className="relative h-px flex-1 overflow-hidden bg-paper/30"
            >
              {index < current && (
                <span className="absolute inset-y-0 left-0 w-full bg-paper" />
              )}
              {index === current && (
                <span
                  key={cycle}
                  className="animate-hero-progress absolute inset-y-0 left-0 bg-paper motion-reduce:w-full"
                  style={{ animationDuration: `${INTERVAL}ms` }}
                />
              )}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
