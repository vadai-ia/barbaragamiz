/**
 * Carga inicial: sube las obras actuales (y sus imágenes) a Sanity.
 *
 * Uso (una sola vez, tras crear el proyecto y rellenar .env.local):
 *   npx tsx scripts/seed.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { artworks } from "../src/data/artworks";

// Carga simple de .env.local (sin dependencias extra).
try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  }
} catch {
  // sin .env.local: se usan las variables ya presentes en el entorno
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN en .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-07-06",
  token,
  useCdn: false,
});

const rank = (index: number) => `a${String(index).padStart(6, "0")}`;

async function run() {
  let index = 0;
  for (const artwork of artworks) {
    index += 1;
    process.stdout.write(
      `(${index}/${artworks.length}) ${artwork.titulo}… `
    );

    const response = await fetch(artwork.imagen);
    if (!response.ok) {
      console.log("imagen no disponible, se omite");
      continue;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename: `${artwork.slug}.jpg`,
    });

    await client.createOrReplace({
      _id: `artwork-${artwork.slug}`,
      _type: "artwork",
      titulo: artwork.titulo,
      slug: { _type: "slug", current: artwork.slug },
      categoria: artwork.categoria,
      tecnica: artwork.tecnica,
      dimensiones: artwork.dimensiones,
      anio: artwork.año,
      destacada: Boolean(artwork.destacada),
      orderRank: rank(index),
      imagen: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    });

    console.log("ok");
  }
  console.log("\nCarga inicial completada ✅");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
