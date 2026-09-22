import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Bárbara Gamiz | Artista plástica",
    template: "%s | Bárbara Gamiz",
  },
  description:
    "Obra, exposiciones y trayectoria de Bárbara Gamiz, artista plástica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // La variable de la fuente va en <html>: el tema la lee desde :root, y si
    // solo existiera en <body> todas las serif caerían a la sans.
    <html lang="es" className={cormorant.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
