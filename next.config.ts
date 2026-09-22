import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo desarrollo: permite abrir el sitio desde el celular en la misma red
  // (sin esto, Next bloquea sus scripts y la página no es interactiva).
  allowedDevOrigins: ["192.168.1.65", "192.168.1.64"],
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
