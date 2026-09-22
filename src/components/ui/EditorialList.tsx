import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Lista con filetes: trayectoria, publicaciones, cualquier índice. */
export function EditorialList({ children }: { children: React.ReactNode }) {
  return <ul className="border-t border-line">{children}</ul>;
}

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-6 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:gap-x-10 md:py-8";

export function EditorialRow({
  meta,
  title,
  description,
  aside,
  href,
  external = false,
}: {
  /** Dato corto a la izquierda: año, tipo de medio. */
  meta?: React.ReactNode;
  title: React.ReactNode;
  /** Línea secundaria bajo el título: el titular de la nota, por ejemplo. */
  description?: React.ReactNode;
  aside?: React.ReactNode;
  /** Con enlace, toda la fila es clicable y aparece el botón de flecha. */
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="type-eyebrow col-start-1 row-start-1 text-muted">
        {meta}
      </span>
      <span className="col-start-1 row-start-2 flex flex-col gap-1 md:col-start-2 md:row-start-1">
        <span className="type-heading break-words text-ink">{title}</span>
        {description && (
          <span className="type-small text-muted">{description}</span>
        )}
      </span>
      {href ? (
        <span
          aria-hidden
          className="col-start-2 row-span-2 row-start-1 grid h-10 w-10 place-items-center bg-ink text-paper transition-colors group-hover:bg-accent md:col-start-3 md:row-span-1 md:justify-self-end"
        >
          <ArrowUpRight
            size={18}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px] motion-reduce:transition-none"
          />
        </span>
      ) : (
        aside && (
          <span className="col-start-2 row-span-2 row-start-1 md:col-start-3 md:row-span-1 md:justify-self-end">
            {aside}
          </span>
        )
      )}
    </>
  );

  if (!href) {
    return (
      <li className={`border-b border-line ${rowGrid}`}>{content}</li>
    );
  }

  // Solo las rutas del sitio usan el enlace de Next; mailto:, tel: y las URLs
  // externas van con un enlace normal.
  const interno = href.startsWith("/");

  return (
    <li className="border-b border-line">
      {interno ? (
        <Link href={href} className={`group ${rowGrid}`}>
          {content}
        </Link>
      ) : (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={`group ${rowGrid}`}
        >
          {content}
        </a>
      )}
    </li>
  );
}
