export interface PressItem {
  anio: number;
  /** Medio o publicación. */
  medio: string;
  /** Título de la nota o del número. */
  titulo?: string;
  url?: string;
  /** Solo las marcadas aparecen en la portada; Sobre mí las muestra todas. */
  destacada?: boolean;
}

/** Publicaciones y entrevistas, de la más reciente a la más antigua. */
export const press: PressItem[] = [
  {
    anio: 2026,
    medio: "RSVP Excélsior",
    titulo:
      "Maridaje con los cinco sentidos: cobertura de la segunda edición de Inmerso",
  },
  {
    anio: 2026,
    medio: "Club Reforma",
    titulo: "Obra y Vino: cobertura de la segunda edición de Inmerso",
  },
  {
    anio: 2025,
    medio: "Luxury, Fashion & Travel News",
    titulo: "Reflejos de la Tierra",
    url: "https://lftnews.com/wordpress/index.php/2025/06/18/reflejos-de-la-tierra/",
    destacada: true,
  },
  {
    anio: 2025,
    medio: "Hola Polanco",
    titulo: "Reflejos de la Tierra: arte, conciencia y naturaleza en Be by Bloom",
    url: "https://www.holapolanco.com/recomendaciones/reflejos-de-la-tierra-arte-conciencia-y-naturaleza-en-beby-bloom/",
    destacada: true,
  },
  {
    anio: 2025,
    medio: "Masaryk TV",
    titulo: "Estilo Socialité: Reflejos de la Tierra en Be by Bloomm",
    url: "https://masaryk.tv/285411/la-galeria-de-arte-be-by-bloomm-presenta-reflejos-de-la-tierra-una-odacreativa-a-la-majestuosidad-natural",
    destacada: true,
  },
  {
    anio: 2025,
    medio: "FORO TV",
    titulo: "Expreso de la Mañana, con Héctor Alonso",
    url: "https://www.instagram.com/reel/DKTDYm2NHA8/",
    destacada: true,
  },
  {
    anio: 2024,
    medio: "El Capitalino",
    titulo: "¡CowParade Lala 2024 regresa a la CDMX este verano!",
    url: "https://elcapitalino.mx/capital/cowparade-lala-2024-regresa-a-la-cdmx-este-verano/",
    destacada: true,
  },
  {
    anio: 2024,
    medio: "La Prensa · Metrópoli",
    titulo:
      "¿Vacas multicolores? Llega a Paseo de la Reforma la exposición CowParade",
    url: "https://oem.com.mx/la-prensa/metropoli/exposicion-cowparade-llega-a-paseo-de-la-reforma-del-21-dejulio-al-1-de-septiembre-13070737",
  },
  {
    anio: 2024,
    medio: "24 Horas",
    titulo: "El privilegio del CowParade México",
    url: "https://www.24-horas.mx/2024/07/03/el-privilegio-del-cowparade-mexico/",
  },
  {
    anio: 2023,
    medio: "Bienal Internacional de Arte Contemporáneo",
    titulo: "Catálogo de la bienal, Cali, Colombia",
  },
  {
    anio: 2022,
    medio: "Metamorfosis, Revista de Arte",
    titulo: "Portales del Alma, edición n.º 2 · Madre Luna Arte",
  },
  {
    anio: 2020,
    medio: "Campos de Plumas",
    titulo: "Desesperanza, de Javier Paláu Hernández",
    url: "https://camposdeplumas.com/2020/04/27/desesperanza/",
  },
  {
    anio: 2020,
    medio: "Campos de Plumas",
    titulo:
      "La casa del tiempo. Epitafio general: A mi padre, de Mario Urquiza Montemayor",
    url: "https://camposdeplumas.com/2020/04/27/la-casa-del-tiemposeleccion/",
  },
  {
    anio: 2017,
    medio: "Departures Magazine",
    titulo: "Art Can Be the Way People Live",
  },
  {
    anio: 2017,
    medio: "Project Row Houses",
    titulo: "Layers of Womanhood",
    url: "https://projectrowhouses.org/blog/layers-of-womanhood-barbara-gamiz",
  },
  {
    anio: 2016,
    medio: "Glass Mountain Magazine",
    titulo: "Volumen n.º 17, Art",
  },
  {
    anio: 2012,
    medio: "Swirl Magazine",
    titulo: "Literary Arts Journal",
  },
];

/** Las que se muestran en la portada. */
export const featuredPress = press.filter((item) => item.destacada);
