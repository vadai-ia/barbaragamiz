/**
 * Carga el catálogo de obras y series (sin imágenes) en Sanity.
 *
 * Crea las series y las obras con título, categoría, técnica, dimensiones y
 * año ya rellenos. Las imágenes se suben después, una a una, desde el Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-obras.ts            # vista previa, no escribe nada
 *   npx tsx scripts/seed-obras.ts --write    # escribe en Sanity
 *
 * Nunca modifica lo que ya existe: antes de escribir consulta los _id
 * presentes en el dataset y omite los que ya están, informando de cuáles.
 * Así volver a ejecutarlo no duplica nada ni pisa imágenes ni ediciones.
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

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

type Categoria = "Pintura" | "Escultura";

const TELA = "Técnica mixta sobre tela";
const PAPEL = "Técnica mixta sobre papel";

interface ObraSeed {
  titulo: string;
  tecnica?: string;
  dimensiones?: string;
  anio?: number;
}

interface SerieSeed {
  titulo: string;
  categoria: Categoria;
  /** Solo cuando el slug del título ya está ocupado por otra serie. */
  slug?: string;
  obras: ObraSeed[];
}

interface GrupoUnicas {
  categoria: Categoria;
  obras: ObraSeed[];
}

const series: SerieSeed[] = [
  {
    titulo: "A mi padre",
    categoria: "Pintura",
    obras: [
      { titulo: "Cuerpo", tecnica: TELA, dimensiones: "230 x 118 cm", anio: 2015 },
      { titulo: "Soñando", tecnica: TELA, dimensiones: "122 x 182 cm", anio: 2015 },
      { titulo: "Enigma", tecnica: PAPEL, dimensiones: "122 x 220 cm", anio: 2015 },
      { titulo: "Piensa", tecnica: PAPEL, dimensiones: "120 x 180 cm", anio: 2015 },
      { titulo: "Leaving Home", tecnica: PAPEL, dimensiones: "75 x 95 cm", anio: 2015 },
      { titulo: "Mind Map", tecnica: PAPEL, dimensiones: "75 x 95 cm", anio: 2015 },
    ],
  },
  {
    titulo: "Lunas",
    categoria: "Pintura",
    obras: [
      { titulo: "Luna y Marte", tecnica: TELA, dimensiones: "122 x 122 cm", anio: 2018 },
      { titulo: "Mujer Luna", tecnica: TELA, dimensiones: "170 x 143 cm", anio: 2022 },
      { titulo: "La Luna en Tiempos de Esperanza", tecnica: TELA, dimensiones: "80 x 80 cm", anio: 2022 },
      { titulo: "La Musa del Cielo", tecnica: TELA, dimensiones: "150 x 130 cm", anio: 2022 },
      { titulo: "Luna Atrevida", tecnica: TELA, dimensiones: "150 x 130 cm", anio: 2022 },
    ],
  },
  {
    titulo: "Afirmaciones",
    categoria: "Pintura",
    obras: [
      { titulo: "La Paz Comienza con una Sonrisa", tecnica: TELA, dimensiones: "90 x 60 cm", anio: 2026 },
      { titulo: "Sin Concesiones", tecnica: TELA, dimensiones: "90 x 60 cm", anio: 2026 },
      { titulo: "Habito el Silencio", tecnica: TELA, dimensiones: "90 x 60 cm", anio: 2026 },
      { titulo: "Una sola Voz", tecnica: TELA, dimensiones: "90 x 60 cm", anio: 2026 },
    ],
  },
  {
    titulo: "Materia Viva",
    categoria: "Pintura",
    obras: [
      { titulo: "Materia Viva I", tecnica: TELA, dimensiones: "70 x 50 cm", anio: 2026 },
      { titulo: "Materia Viva II", tecnica: TELA, dimensiones: "70 x 50 cm", anio: 2026 },
      { titulo: "Materia Viva III", tecnica: TELA, dimensiones: "70 x 50 cm", anio: 2026 },
    ],
  },
  {
    titulo: "Permanencia",
    categoria: "Pintura",
    obras: [
      { titulo: "Flujo", tecnica: TELA, dimensiones: "40 x 30 cm", anio: 2026 },
      { titulo: "Origen", tecnica: TELA, dimensiones: "40 x 30 cm", anio: 2026 },
      { titulo: "Pulso", tecnica: TELA, dimensiones: "40 x 30 cm", anio: 2026 },
      { titulo: "Rastro", tecnica: TELA, dimensiones: "40 x 30 cm", anio: 2026 },
    ],
  },
  {
    // Comparte nombre con la serie de pintura, por eso lleva slug propio.
    titulo: "Lunas",
    categoria: "Escultura",
    slug: "lunas-escultura",
    obras: [
      { titulo: "Luna Mágica", tecnica: "Alabastro y metal", dimensiones: "25 x 63.5 x 16 cm", anio: 2016 },
      { titulo: "Luna Bronce", tecnica: "Bronce", dimensiones: "10 x 40 x 8 cm", anio: 2017 },
      { titulo: "Conquistando la Luna", tecnica: "Metal y madera", dimensiones: "45 x 80 x 30 cm", anio: 2017 },
      { titulo: "Luna Compuesta", tecnica: "Metal", dimensiones: "20 x 75 x 20 cm", anio: 2017 },
      { titulo: "Luna Monumental", tecnica: "Bronce", dimensiones: "38 x 125 x 25 cm", anio: 2016 },
      { titulo: "Luna Amarilla", tecnica: "Madera", dimensiones: "30 x 90 x 60 cm", anio: 2018 },
      { titulo: "Luna Traviesa", tecnica: "Madera", dimensiones: "44 x 64 x 18 cm", anio: 2017 },
      { titulo: "Luna Nostálgica", tecnica: "Found objects", dimensiones: "60 x 154 x 50 cm", anio: 2016 },
    ],
  },
];

/** Obras que no pertenecen a ninguna serie. */
const unicas: GrupoUnicas[] = [
  {
    categoria: "Pintura",
    obras: [
      { titulo: "Palpitaciones", tecnica: TELA, dimensiones: "120 x 240 cm", anio: 2025 },
      { titulo: "Ecos de la Tierra", tecnica: TELA, dimensiones: "281 x 140 cm", anio: 2024 },
      { titulo: "Respiración", tecnica: TELA, dimensiones: "120 x 240 cm", anio: 2026 },
      { titulo: "Huellas de Otoño", tecnica: TELA, dimensiones: "150 x 120 cm", anio: 2025 },
      { titulo: "Dorado Silencio", tecnica: TELA, dimensiones: "100 cm de diámetro", anio: 2026 },
      { titulo: "Mantra", tecnica: TELA, dimensiones: "150 cm de diámetro", anio: 2023 },
      { titulo: "Grafitopía", tecnica: TELA, dimensiones: "150 x 300 cm", anio: 2019 },
      { titulo: "Retórica", tecnica: TELA, dimensiones: "120 x 270 cm", anio: 2016 },
      { titulo: "Emociones", tecnica: TELA, dimensiones: "100 x 200 cm", anio: 2010 },
      // En la tabla original solo consta el título.
      { titulo: "Umbral" },
      { titulo: "Stain", tecnica: PAPEL, dimensiones: "55 x 76 cm", anio: 2015 },
      { titulo: "Ilusiones Lejanas", tecnica: TELA, dimensiones: "91 x 61 cm", anio: 2022 },
    ],
  },
  {
    categoria: "Escultura",
    obras: [
      { titulo: "Empowering Women", tecnica: "Madera", dimensiones: "155 x 180 x 55 cm", anio: 2015 },
      { titulo: "Árbol de la Vida", tecnica: "Madera y naturaleza muerta", dimensiones: "100 x 250 x 100 cm", anio: 2017 },
      { titulo: "Brújula", tecnica: "Metal", dimensiones: "167 x 80 x 50 cm", anio: 2021 },
      { titulo: "Todo y Nada", tecnica: "Madera", dimensiones: "4 módulos de 60.5 x 60.5 cm / 121 x 121 cm", anio: 2020 },
      { titulo: "Amistad", tecnica: "Madera", dimensiones: "50 x 60 x 20 cm", anio: 2015 },
      { titulo: "Pensamientos", tecnica: "Metal", dimensiones: "100 x 173 x 25 cm", anio: 2021 },
      { titulo: "Pajarillo", tecnica: "Madera", dimensiones: "53 x 73 x 39 cm", anio: 2016 },
      { titulo: "Arbolito", tecnica: "Metal", dimensiones: "100 x 173 x 25 cm", anio: 2019 },
    ],
  },
];

function slugify(value: string) {
  // NFD separa la tilde de la letra; se descartan los signos diacríticos
  // (rango combining U+0300–U+036F) y queda el ASCII de base.
  return value
    .normalize("NFD")
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code < 0x0300 || code > 0x036f;
    })
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const rank = (index: number) => `a${String(index).padStart(6, "0")}`;

const write = process.argv.includes("--write");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (write && (!projectId || !token)) {
  console.error(
    "Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN en .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion: "2024-07-06",
  token,
  useCdn: false,
});

async function run() {
  // Los _id que ya existen se respetan tal cual: nunca se sobrescriben.
  const existing = new Set<string>(
    projectId ? await client.fetch<string[]>(`*[_type in ["artwork", "serie"]]._id`) : []
  );

  // Los documentos nuevos se ordenan detrás de los que ya hay, para no
  // quedar intercalados con el orden que se haya fijado en el Studio.
  let serieRank = projectId
    ? await client.fetch<number>(`count(*[_type == "serie"])`)
    : 0;
  let obraRank = projectId
    ? await client.fetch<number>(`count(*[_type == "artwork"])`)
    : 0;

  const transaction = client.transaction();
  const skipped: string[] = [];
  let seriesCount = 0;
  let obrasCount = 0;

  const create = (
    id: string,
    doc: { _type: string } & Record<string, unknown>
  ) => {
    if (existing.has(id)) {
      skipped.push(id);
      return false;
    }
    transaction.create({ ...doc, _id: id });
    return true;
  };

  const crearObra = (
    obra: ObraSeed,
    categoria: Categoria,
    serieId?: string
  ) => {
    const obraSlug = slugify(obra.titulo);
    const creada = create(`artwork-${obraSlug}`, {
      _type: "artwork",
      titulo: obra.titulo,
      slug: { _type: "slug", current: obraSlug },
      categoria,
      tecnica: obra.tecnica,
      dimensiones: obra.dimensiones,
      anio: obra.anio,
      destacada: false,
      ...(serieId ? { serie: { _type: "reference", _ref: serieId } } : {}),
      orderRank: rank(obraRank + 1),
    });
    if (creada) {
      obraRank += 1;
      obrasCount += 1;
    }
    return creada;
  };

  for (const serie of series) {
    const slug = serie.slug ?? slugify(serie.titulo);
    const serieId = `serie-${slug}`;

    const serieCreada = create(serieId, {
      _type: "serie",
      titulo: serie.titulo,
      slug: { _type: "slug", current: slug },
      categoria: serie.categoria,
      orderRank: rank(serieRank + 1),
    });
    if (serieCreada) {
      serieRank += 1;
      seriesCount += 1;
    }
    console.log(
      `Serie  · ${serie.titulo} (${serie.categoria}, ${serie.obras.length} obras)${
        serieCreada ? "" : "  [ya existe, se omite]"
      }`
    );

    for (const obra of serie.obras) {
      const creada = crearObra(obra, serie.categoria, serieId);
      console.log(
        `  obra · ${obra.titulo}${creada ? "" : "  [ya existe, se omite]"}`
      );
    }
  }

  for (const grupo of unicas) {
    for (const obra of grupo.obras) {
      const creada = crearObra(obra, grupo.categoria);
      console.log(
        `Única  · ${obra.titulo} (${grupo.categoria})${
          creada ? "" : "  [ya existe, se omite]"
        }`
      );
    }
  }

  console.log(`\nA crear: ${seriesCount} series · ${obrasCount} obras`);
  if (skipped.length) {
    console.log(`Ya existían y se omiten: ${skipped.length} documentos`);
  }

  if (!write) {
    console.log(
      "\nVista previa. No se ha escrito nada.\nEjecuta 'npx tsx scripts/seed-obras.ts --write' para cargarlo en Sanity."
    );
    return;
  }

  if (!seriesCount && !obrasCount) {
    console.log("\nNada nuevo que cargar.");
    return;
  }

  await transaction.commit();
  console.log(
    "\nCatálogo cargado ✅\nEntra al Studio y sube la imagen de cada obra."
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
