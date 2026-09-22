import Link from "next/link";

/** Único botón sólido del sitio (acciones de conversión y formularios). */
export const buttonStyles =
  "type-eyebrow inline-flex items-center justify-center bg-ink px-8 py-5 text-paper transition-colors hover:bg-accent";

export function ButtonLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  /** Destinos fuera del sitio (WhatsApp, por ejemplo). */
  external?: boolean;
  className?: string;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${buttonStyles} ${className}`}>
      {children}
    </Link>
  );
}
