import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio se publica como ficheros estáticos en Hostinger (no hay Node
  // corriendo), así que el build tiene que generar la carpeta "out".
  // Consecuencia: el contenido queda fijado en el momento del build. Para que
  // una obra nueva de Sanity aparezca en la web hay que reconstruir y volver
  // a subir.
  output: "export",
  // El sitio ya publicado sirve carpetas con index.html (/obras/), y el
  // servidor redirige /obras a /obras/. Se mantiene igual para no cambiar
  // ninguna dirección que ya esté indexada o compartida.
  trailingSlash: true,
  // Solo desarrollo: permite abrir el sitio desde el celular en la misma red
  // (sin esto, Next bloquea sus scripts y la página no es interactiva).
  allowedDevOrigins: ["192.168.1.65", "192.168.1.64"],
  images: {
    // Sin servidor no hay optimizador de imágenes: se sirven directamente
    // desde los CDN de Sanity y Cloudinary, que ya las entregan al tamaño
    // pedido (ver el loader de ArtworkSlider).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
