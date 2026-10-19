import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo desarrollo: permite abrir el sitio desde el celular en la misma red
  // (sin esto, Next bloquea sus scripts y la página no es interactiva).
  allowedDevOrigins: ["192.168.1.65", "192.168.1.64"],
  // El blog pasó a llamarse Exposiciones. /blog quedó publicado en el dominio,
  // así que su dirección antigua (y la de cada entrada) sigue llevando al
  // sitio correcto en vez de a un 404.
  async redirects() {
    return [
      { source: "/blog", destination: "/exposiciones", permanent: true },
      {
        source: "/blog/:slug",
        destination: "/exposiciones/:slug",
        permanent: true,
      },
    ];
  },
  images: {
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
