export type ArtworkCategory = "Pintura" | "Escultura";

/** Referencia ligera a la serie a la que pertenece una obra. */
export interface SerieRef {
  id: string | number;
  slug: string;
  titulo: string;
}

export interface Artwork {
  id: string | number;
  slug: string;
  titulo: string;
  categoria: ArtworkCategory;
  tecnica?: string;
  dimensiones?: string;
  año?: number;
  descripcion?: string;
  imagen: string;
  /**
   * URL de Sanity sin tamaño ni calidad, para pedir la imagen exacta desde el
   * cliente (hero a pantalla completa) y evitar una doble compresión.
   */
  imagenBase?: string;
  /** Proporciones del archivo original, para enmarcar la obra sin recortes. */
  imagenAncho?: number;
  imagenAlto?: number;
  destacada?: boolean;
  /** Ausente en las obras únicas. */
  serie?: SerieRef;
}

export interface Serie {
  id: string | number;
  slug: string;
  titulo: string;
  categoria: ArtworkCategory;
  descripcion?: string;
  /** Portada propia o, si no la hay, la imagen de la primera obra. */
  portada: string;
  /** Formato de la portada, para enmarcarla sin recortes. */
  portadaFormato: "horizontal" | "cuadrada" | "vertical";
  obras: Artwork[];
  totalObras: number;
  anioInicio?: number;
  anioFin?: number;
  /** Solo cuando todas las obras comparten la misma técnica. */
  tecnica?: string;
}

/** Nota del blog: exposiciones, ferias y novedades, gestionadas en Sanity. */
export interface Post {
  id: string;
  slug: string;
  titulo: string;
  /** ISO. Se muestra como "Febrero 2026". */
  fecha: string;
  lugar?: string;
  extracto?: string;
  imagen: string;
  contenido?: unknown[];
}
