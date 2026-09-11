"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Artwork } from "@/types";

export function ArtworkSlider({ artworks }: { artworks: Artwork[] }) {
  const [current, setCurrent] = useState(0);
  // Una obra sin imagen cargada aún no puede ocupar el hero.
  const slides = artworks.filter((artwork) => artwork.imagen);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative min-h-[680px] overflow-hidden bg-ink text-paper md:min-h-[calc(100vh-6rem)]">
      {slides.map((artwork, index) => (
        <div
          key={artwork.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={artwork.imagen}
            alt={artwork.titulo}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </div>
      ))}

      <div className="page-shell relative z-10 flex min-h-[680px] items-end pb-20 md:min-h-[calc(100vh-6rem)] md:pb-24">
        <h1 className="max-w-3xl font-serif text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.045em]">
          The Art of Being You
        </h1>
      </div>
    </section>
  );
}
