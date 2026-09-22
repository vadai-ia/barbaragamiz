import type { ArtworkCategory } from "@/types";

export type ImageFormat = "horizontal" | "cuadrada" | "vertical";

/**
 * Formato de una imagen a partir de sus medidas reales. Sin medidas, las
 * esculturas se asumen verticales, que es como se fotografían casi siempre.
 */
export function imageFormat(
  ancho?: number,
  alto?: number,
  categoria?: ArtworkCategory
): ImageFormat {
  if (ancho && alto) {
    const ratio = alto / ancho;
    if (ratio > 1.1) return "vertical";
    if (ratio >= 0.9) return "cuadrada";
    return "horizontal";
  }
  return categoria === "Escultura" ? "vertical" : "horizontal";
}

/**
 * Tamaño del marco de una tarjeta según el formato, para que la obra no se
 * recorte. Las horizontales usan el ancho; verticales y cuadradas, la altura,
 * que es lo que limita dentro de una tarjeta de alto fijo.
 */
export function frameSize(format: ImageFormat, horizontalAspect = "aspect-[3/2]") {
  if (format === "vertical") {
    return "aspect-[3/4] w-[70%] md:h-[320px] md:w-auto lg:h-[340px]";
  }
  if (format === "cuadrada") {
    return "aspect-square w-[75%] md:h-[260px] md:w-auto lg:h-[300px]";
  }
  return `w-[80%] ${horizontalAspect}`;
}
