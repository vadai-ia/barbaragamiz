"use client";

import { useState } from "react";
import type { Artwork, ArtworkCategory, Serie } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { SerieCard } from "./SerieCard";

type Filter = "Todas" | ArtworkCategory;

const filters: Filter[] = ["Todas", "Pintura", "Escultura"];

export function ArtworkGallery({
  series,
  artworks,
}: {
  series: Serie[];
  /** Solo obras únicas: las de una serie se ven dentro de su tarjeta. */
  artworks: Artwork[];
}) {
  const [filter, setFilter] = useState<Filter>("Todas");

  const matches = (categoria: ArtworkCategory) =>
    filter === "Todas" || categoria === filter;

  const visibleSeries = series.filter((serie) => matches(serie.categoria));
  const visibleArtworks = artworks.filter((artwork) =>
    matches(artwork.categoria)
  );
  const isEmpty = !visibleSeries.length && !visibleArtworks.length;

  return (
    <>
      <div className="mb-14 flex flex-wrap gap-3 border-b border-line pb-6">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`px-5 py-3 text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
              filter === item
                ? "bg-ink text-paper"
                : "border border-line hover:border-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {isEmpty ? (
        <p className="py-16 text-center text-[14px] leading-6 text-muted">
          Todavía no hay obras en esta categoría.
        </p>
      ) : (
        <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visibleSeries.map((serie, index) => (
            <SerieCard key={serie.id} serie={serie} priority={index < 3} />
          ))}
          {visibleArtworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              priority={!visibleSeries.length && index < 3}
            />
          ))}
        </div>
      )}
    </>
  );
}
