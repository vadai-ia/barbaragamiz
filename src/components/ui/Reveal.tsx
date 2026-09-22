"use client";

import { useEffect, useRef } from "react";

/**
 * Aparición al entrar en pantalla: fundido y un ligero ascenso. Solo anima
 * opacidad y transform (no provoca recálculos de diseño) y deja de observar
 * en cuanto el bloque aparece. El estado inicial oculto vive en CSS y solo
 * se aplica si hay JavaScript, así nada queda invisible si falla.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Desfase en milisegundos, para escalonar elementos de una cuadrícula. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
