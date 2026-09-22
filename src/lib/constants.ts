export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Galería de obras", href: "/obras" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

/** WhatsApp de la artista. El número lleva código de país, sin signos. */
export const whatsapp = {
  numero: "525566964530",
  visible: "55 6696 4530",
};

/** Enlace a WhatsApp con un mensaje ya escrito. */
export function whatsappUrl(mensaje: string) {
  return `https://wa.me/${whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

export const socialLinks = {
  instagram: "https://www.instagram.com/barbara_gamizart/",
  facebook: "https://www.facebook.com/barbaragamizart/",
};
