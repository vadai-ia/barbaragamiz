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
  obras: Artwork[];
  totalObras: number;
  anioInicio?: number;
  anioFin?: number;
  /** Solo cuando todas las obras comparten la misma técnica. */
  tecnica?: string;
}

export interface Exhibition {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
}
