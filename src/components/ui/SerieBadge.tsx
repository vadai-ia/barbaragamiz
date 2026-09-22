import Link from "next/link";
import { Layers } from "lucide-react";

const styles =
  "type-label inline-flex items-center gap-1.5 bg-ink px-2.5 py-1.5 text-paper";

/**
 * Etiqueta negra que marca que algo pertenece a una serie. Con `href` es un
 * enlace; sin él, un texto (dentro de tarjetas que ya son enlaces).
 */
export function SerieBadge({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const content = (
    <>
      <Layers size={11} strokeWidth={2} aria-hidden />
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${styles} transition-colors hover:bg-accent ${className}`}
      >
        {content}
      </Link>
    );
  }

  return <span className={`${styles} ${className}`}>{content}</span>;
}
