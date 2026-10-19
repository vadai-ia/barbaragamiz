"use client";

import { useEffect, useMemo, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Artwork, ArtworkCategory, Serie } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { ArtworkGrid } from "./ArtworkGrid";
import { SerieCard } from "./SerieCard";

const orden: ArtworkCategory[] = ["Pintura", "Escultura", "Fotografía"];

// La disciplina viaja en la URL (?disciplina=escultura) para poder enlazarla
// desde la portada y compartirla.
const PARAM = "disciplina";

function slug(categoria: ArtworkCategory) {
  return categoria
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function ArtworkGallery({
  series,
  artworks,
}: {
  series: Serie[];
  /** Solo obras únicas: las de una serie se ven dentro de su tarjeta. */
  artworks: Artwork[];
}) {
  // Solo se ofrece una disciplina si tiene algo que enseñar: así Fotografía
  // aparece sola el día que se publique la primera obra, sin tocar código.
  const filters = useMemo(
    () =>
      orden.filter(
        (categoria) =>
          series.some((serie) => serie.categoria === categoria) ||
          artworks.some((artwork) => artwork.categoria === categoria)
      ),
    [series, artworks]
  );

  const [filter, setFilter] = useState<ArtworkCategory>(
    filters[0] ?? "Pintura"
  );

  // Se lee en el cliente para que la página siga siendo estática.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get(PARAM);
    const match = filters.find((categoria) => slug(categoria) === value);
    if (match) setFilter(match);
  }, [filters]);

  const select = (item: ArtworkCategory) => {
    setFilter(item);
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, slug(item));
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

      {isEmpty && (
        <p className="type-body stack-header text-center text-muted">
          Todavía no hay obras en esta categoría.
        </p>
      )}

      {/* Obras sueltas y series se leían mezcladas en la misma cuadrícula.
          Ahora cada grupo lleva su propio encabezado. */}
      {visibleArtworks.length > 0 && (
        <ArtworkGrid className="stack-header">
          {visibleArtworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              priority={index < 2}
            />
          ))}
        </ArtworkGrid>
      )}

      {visibleSeries.length > 0 && (
        <div className={visibleArtworks.length ? "stack-header" : undefined}>
          <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
            <Eyebrow>Series</Eyebrow>
            <Eyebrow>
              ({visibleSeries.length}{" "}
              {visibleSeries.length === 1 ? "serie" : "series"})
            </Eyebrow>
          </div>
          <ArtworkGrid className="stack-header">
            {visibleSeries.map((serie, index) => (
              <SerieCard
                key={serie.id}
                serie={serie}
                priority={!visibleArtworks.length && index < 2}
              />
            ))}
          </ArtworkGrid>
        </div>
      )}
    </>
  );
}
