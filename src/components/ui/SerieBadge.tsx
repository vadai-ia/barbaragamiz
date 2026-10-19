import Link from "next/link";

/*
 * Antes era un rectángulo negro y se leía antes que la propia obra. Ahora es
 * solo texto en terracota: marca la pertenencia a una serie sin competir con
 * la pintura que tiene al lado.
 */
const styles =
  "type-label inline-flex items-center text-accent transition-opacity";

export function SerieBadge({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  if (href) {
    return (
      <Link href={href} className={`${styles} hover:opacity-60 ${className}`}>
        {children}
      </Link>
    );
  }

  return <span className={`${styles} ${className}`}>{children}</span>;
}
