import { Children } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cuadrícula única para listados de obra: galería, series, relacionadas y la
 * selección de portada. Dos columnas como máximo, para que cada obra respire.
 * Las tarjetas aparecen escalonadas, con un tope para que una lista larga no
 * acabe esperando.
 */
export function ArtworkGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-x-8 gap-y-14 sm:grid-cols-2 ${className}`}>
      {Children.map(children, (child, index) => (
        <Reveal delay={Math.min(index, 3) * 70}>{child}</Reveal>
      ))}
    </div>
  );
}
