import { Reveal } from "./Reveal";

/** Sección estándar: ancho de página y separación vertical del sistema. */
export function Section({
  children,
  tone = "canvas",
  className = "",
  reveal = true,
}: {
  children: React.ReactNode;
  /** "paper" pinta una banda clara a todo el ancho para alternar ritmo. */
  tone?: "canvas" | "paper";
  className?: string;
  /** Aparición al entrar en pantalla. Desactívalo si estorba. */
  reveal?: boolean;
}) {
  const contenido = reveal ? <Reveal>{children}</Reveal> : children;

  return (
    <section className={tone === "paper" ? "bg-paper" : undefined}>
      <div className={`page-shell section-y ${className}`}>{contenido}</div>
    </section>
  );
}
