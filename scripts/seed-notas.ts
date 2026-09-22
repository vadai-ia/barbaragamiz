/**
 * Pasa a Sanity las tres exposiciones que estaban escritas en el código, como
 * notas del blog, con su imagen. A partir de aquí se gestionan desde el Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-notas.ts            # vista previa
 *   npx tsx scripts/seed-notas.ts --write    # escribe en Sanity
 *
 * Omite las notas que ya existan, así que volver a ejecutarlo es seguro.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

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

interface NotaSeed {
  slug: string;
  titulo: string;
  fecha: string;
  lugar: string;
  extracto: string;
  imagen: string;
}

const notas: NotaSeed[] = [
  {
    slug: "bada-mexico-2026",
    titulo: "BADA México 2026",
    fecha: "2026-02-05",
    lugar: "Campo Marte, CDMX",
    extracto:
      "Sexta edición de la Feria de Arte Directo del Artista, donde la obra se presenta y se vende sin galerías de por medio. Más de doscientos artistas nacionales e internacionales y el contacto directo con quien mira como eje de la feria.",
    imagen:
      "https://res.cloudinary.com/dvxrojzi1/image/upload/v1790014450/BADA_ejtav0.png",
  },
  {
    slug: "cowparade-mexico-2024",
    titulo: "CowParade México 2024",
    fecha: "2024-07-21",
    lugar: "Paseo de la Reforma, CDMX",
    extracto:
      "Intervención de una de las piezas de CowParade, la exhibición urbana que llevó más de cincuenta vacas intervenidas por artistas a lo largo de kilómetro y medio de Paseo de la Reforma, entre la Diana Cazadora y el Ángel de la Independencia. Al cierre, las obras se subastan con fines sociales.",
    imagen:
      "https://res.cloudinary.com/dvxrojzi1/image/upload/v1788288974/BGP_Vaca_di5yoc.jpg",
  },
  {
    slug: "huixquilucan-con-arte-2024",
    titulo: "Huixquilucan con Arte 2024",
    fecha: "2024-02-01",
    lugar: "Paseo Interlomas, Edo. de México",
    extracto:
      "Exposición colectiva del programa con el que el municipio lleva el arte a sus espacios públicos: esculturas monumentales intervenidas por artistas y artesanos, exhibidas con entrada libre en Paseo Interlomas.",
    imagen:
      "https://res.cloudinary.com/dvxrojzi1/image/upload/v1790014328/Huixquilucan_rqg4sl.png",
  },
];

const write = process.argv.includes("--write");
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

async function run() {
  const existentes = new Set<string>(
    await client.fetch<string[]>(`*[_type == "post"]._id`)
  );

  let creadas = 0;
  for (const nota of notas) {
    const id = `post-${nota.slug}`;
    if (existentes.has(id)) {
      console.log(`${nota.titulo} — ya existe, se omite`);
      continue;
    }

    process.stdout.write(`${nota.titulo}… `);

    if (!write) {
      console.log("pendiente");
      creadas += 1;
      continue;
    }

    const res = await fetch(nota.imagen);
    if (!res.ok) {
      console.log(`error al descargar la imagen (HTTP ${res.status})`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename: `${nota.slug}.${nota.imagen.endsWith(".png") ? "png" : "jpg"}`,
    });

    await client.create({
      _id: id,
      _type: "post",
      titulo: nota.titulo,
      slug: { _type: "slug", current: nota.slug },
      fecha: new Date(nota.fecha).toISOString(),
      lugar: nota.lugar,
      extracto: nota.extracto,
      destacada: true,
      imagen: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    });

    creadas += 1;
    console.log("ok");
  }

  if (!write) {
    console.log(
      `\n${creadas} notas por crear. Ejecuta 'npx tsx scripts/seed-notas.ts --write' para cargarlas.`
    );
    return;
  }

  console.log(`\n${creadas} notas creadas ✅`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
