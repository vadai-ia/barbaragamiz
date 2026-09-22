import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Cabecera única de todas las páginas: misma posición, tamaño y aire.
 * Título a la izquierda; entradilla y datos en la columna derecha, que
 * comparte guía con SectionHeader.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  aside,
  back,
  border = true,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
  /** Enlace de vuelta, sobre la etiqueta. */
  back?: React.ReactNode;
  /** Filete inferior que separa la cabecera del contenido. */
  border?: boolean;
  /** Contenido propio de la cabecera (p. ej. el carrusel de portada). */
  children?: React.ReactNode;
}) {
  const hasColumn = Boolean(intro || aside);

  return (
    <header className="page-shell hero-top">
      {back && <div className="mb-10 md:mb-14">{back}</div>}
      <div className={`hero-bottom ${border ? "border-b border-line" : ""}`}>
        <Reveal>
        {eyebrow && <Eyebrow className="mb-5 md:mb-6">{eyebrow}</Eyebrow>}
        <div
          className={
            hasColumn
              ? "grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end md:gap-16"
              : undefined
          }
        >
          <h1 className="type-display text-ink">{title}</h1>
          {hasColumn && (
            <div className="flex flex-col gap-6">
              {intro && <div className="type-body text-muted">{intro}</div>}
              {aside}
            </div>
          )}
        </div>
        </Reveal>
        {children}
      </div>
    </header>
  );
}
