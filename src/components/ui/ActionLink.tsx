import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";

const styles =
  "type-eyebrow group inline-flex items-center gap-3 self-start text-accent transition-opacity hover:opacity-70";

// La flecha acompaña al cursor; un gesto corto, sin rebote.
const arrow =
  "transition-transform duration-300 ease-out motion-reduce:transition-none";

/** Enlace de acción del sitio: "Descubrir colección →", "← Volver". */
export function ActionLink({
  href,
  children,
  back = false,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  /** Flecha a la izquierda, para volver atrás. */
  back?: boolean;
  /** Abre en otra pestaña (medios, entrevistas). */
  external?: boolean;
  className?: string;
}) {
  const content = back ? (
    <>
      <MoveLeft
        size={18}
        strokeWidth={1.5}
        aria-hidden
        className={`${arrow} group-hover:-translate-x-1`}
      />
      {children}
    </>
  ) : (
    <>
      {children}
      <MoveRight
        size={18}
        strokeWidth={1.5}
        aria-hidden
        className={`${arrow} group-hover:translate-x-1`}
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${styles} ${className}`}>
      {content}
    </Link>
  );
}
