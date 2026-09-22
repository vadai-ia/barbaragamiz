"use client";

import { useEffect, useState } from "react";
import type { Artwork, ArtworkCategory, Serie } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { ArtworkGrid } from "./ArtworkGrid";
import { SerieCard } from "./SerieCard";

const filters: ArtworkCategory[] = ["Pintura", "Escultura"];

// La disciplina viaja en la URL (?disciplina=escultura) para poder enlazarla
// desde la portada y compartirla.
const PARAM = "disciplina";

function categoryFromParam(value: string | null): ArtworkCategory {
  return value === "escultura" ? "Escultura" : "Pintura";
}

export function ArtworkGallery({
  series,
  artworks,
}: {
  series: Serie[];
  /** Solo obras únicas: las de una serie se ven dentro de su tarjeta. */
  artworks: Artwork[];
}) {
  const [filter, setFilter] = useState<ArtworkCategory>("Pintura");

  // Se lee en el cliente para que la página siga siendo estática.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilter(categoryFromParam(params.get(PARAM)));
  }, []);

  const select = (item: ArtworkCategory) => {
    setFilter(item);
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, item.toLowerCase());
    window.history.replaceState(null, "", url);
  };

  const visibleSeries = series.filter((serie) => serie.categoria === filter);
  const visibleArtworks = artworks.filter(
    (artwork) => artwork.categoria === filter
  );
  const isEmpty = !visibleSeries.length && !visibleArtworks.length;

  return (
    <>
      <div className="flex flex-wrap gap-x-8 border-b border-line">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => select(item)}
            className={`type-eyebrow -mb-px border-b py-4 transition-colors ${
              filter === item
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {isEmpty ? (
        <p className="type-body stack-header text-center text-muted">
          Todavía no hay obras en esta categoría.
        </p>
      ) : (
        <ArtworkGrid className="stack-header">
          {visibleSeries.map((serie, index) => (
            <SerieCard key={serie.id} serie={serie} priority={index < 2} />
          ))}
          {visibleArtworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              priority={!visibleSeries.length && index < 2}
            />
          ))}
        </ArtworkGrid>
      )}
    </>
  );
}
