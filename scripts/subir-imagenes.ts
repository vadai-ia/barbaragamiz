/**
 * Sube a Sanity la imagen de cada obra, tomándola de Cloudinary.
 *
 * Origen: carpetas "Barbara Gamiz/PINTURA", ".../ESCULTURA",
 * ".../SERIES PINTURA/*" y ".../SERIES ESCULTURA/*".
 * Quedan fuera FOTOGRAFIA, ESPACIOS, Inicio y anteriores.
 *
 * Uso:
 *   npx tsx scripts/subir-imagenes.ts            # comprueba y no escribe
 *   npx tsx scripts/subir-imagenes.ts --write    # sube y asigna
 *
 * Solo toca obras que aún no tienen imagen; volver a ejecutarlo es seguro.
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
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

const CLOUD_NAME = "dvxrojzi1";

/** slug de la obra en Sanity → asset de Cloudinary. */
interface Emparejamiento {
  slug: string;
  publicId: string;
  formato: string;
}

const emparejamientos: Emparejamiento[] = [
  // ── Pinturas únicas · Barbara Gamiz/PINTURA ──────────────────────────
  { slug: "palpitaciones", publicId: "Palpitaciones_240_x_120_cm_edmmf0", formato: "jpg" },
  { slug: "ecos-de-la-tierra", publicId: "Ecos_de_la_Tierra_rplvtr", formato: "jpg" },
  { slug: "respiracion", publicId: "Respiracio_ün_120x240_01_26_lq6oiw", formato: "jpg" },
  { slug: "huellas-de-otono", publicId: "Huellas_de_Oton_âo_120x150_c_u_bzgx0e", formato: "jpg" },
  { slug: "dorado-silencio", publicId: "Dorado_Silencio_raeehv", formato: "jpg" },
  { slug: "mantra", publicId: "Mantra_150_cm_dqe3kg", formato: "jpg" },
  { slug: "grafitopia", publicId: "Grafitopia_150x300_bnh9wt", formato: "jpg" },
  { slug: "retorica", publicId: "Reto_ürica_120x270_ccdrcz", formato: "jpg" },
  { slug: "emociones", publicId: "Emociones_200x100_s2qd0e", formato: "jpg" },
  { slug: "umbral", publicId: "Umbral_240x120_cm_gtmvr0", formato: "jpg" },
  { slug: "stain", publicId: "Stain_55x76_uipvav", formato: "jpg" },
  { slug: "ilusiones-lejanas", publicId: "Ilusiones_lejanas_m39wcv", formato: "jpg" },

  // ── Esculturas únicas · Barbara Gamiz/ESCULTURA ──────────────────────
  { slug: "empowering-women", publicId: "Empowering_women_equetk", formato: "jpg" },
  { slug: "arbol-de-la-vida", publicId: "Arbol_de_la_vida_drr183", formato: "jpg" },
  { slug: "brujula", publicId: "Bru_üjula_kt4xor", formato: "jpg" },
  { slug: "todo-y-nada", publicId: "TODO_Y_NADA_l6mkiu", formato: "jpg" },
  { slug: "amistad", publicId: "Amistad_d1k1e8", formato: "jpg" },
  { slug: "pensamientos", publicId: "Pensamiento_itctei", formato: "jpg" },
  { slug: "pajarillo", publicId: "Pajarillo_jrromw", formato: "jpg" },

  // ── Serie A mi padre ─────────────────────────────────────────────────
  { slug: "cuerpo", publicId: "Cuerpo_230x118_ap5qhw", formato: "jpg" },
  { slug: "sonando", publicId: "Son_âando_122x182_soycs9", formato: "jpg" },
  { slug: "enigma", publicId: "Enigma_122x220_p0fw9r", formato: "jpg" },
  { slug: "piensa", publicId: "Piensa_120x180_oxmv2c", formato: "jpg" },
  { slug: "leaving-home", publicId: "Leaving_Home_75x95_zik83g", formato: "jpg" },
  { slug: "mind-map", publicId: "Mind_Map_75x95_qwi69w", formato: "jpg" },

  // ── Serie Lunas (pintura) ────────────────────────────────────────────
  { slug: "luna-y-marte", publicId: "Luna_y_Marte_122x122_qsyg18", formato: "jpg" },
  { slug: "mujer-luna", publicId: "Mujer_Luna_143x170_cm_dzqjtx", formato: "jpg" },
  { slug: "la-luna-en-tiempos-de-esperanza", publicId: "La_Luna_en_tiempos_de_Esperanza_80_x_80_wksfkk", formato: "jpg" },
  { slug: "la-musa-del-cielo", publicId: "La_Musa_del_Cielo_130_x_150_cm_fupuo1", formato: "jpg" },
  { slug: "luna-atrevida", publicId: "Luna_Atrevida_120_x_100_x_4_wocm8t", formato: "jpg" },

  // ── Serie Afirmaciones ───────────────────────────────────────────────
  { slug: "la-paz-comienza-con-una-sonrisa", publicId: "La_paz_comienza_90x60cm_swewsp", formato: "jpg" },
  { slug: "sin-concesiones", publicId: "Sin_Concesiones_90x60_cm_klv61i", formato: "jpg" },
  { slug: "una-sola-voz", publicId: "Una_Sola_Voz_90x60cm_zcw619", formato: "jpg" },

  // ── Serie Materia Viva ───────────────────────────────────────────────
  { slug: "materia-viva-i", publicId: "Materia_Viva_I_70x50_y2v9vu", formato: "png" },
  { slug: "materia-viva-ii", publicId: "Materia_Viva_II_70x50_mhuecz", formato: "jpg" },
  { slug: "materia-viva-iii", publicId: "Materia_Viva_III_70x50_towkx8", formato: "jpg" },

  // ── Serie Permanencia ────────────────────────────────────────────────
  { slug: "flujo", publicId: "Flujo_40x30_v5lven", formato: "jpg" },
  { slug: "origen", publicId: "Origen_40x30_nqybc7", formato: "jpg" },
  { slug: "pulso", publicId: "Pulso_wdsymt", formato: "jpg" },
  { slug: "rastro", publicId: "Rastro_40x30_nrtld4", formato: "jpg" },

  // ── Serie Lunas (escultura) ──────────────────────────────────────────
  { slug: "luna-magica", publicId: "Luna_magica_idkami", formato: "jpg" },
  { slug: "luna-bronce", publicId: "Luna_Bronce_d3bkgv", formato: "jpg" },
  { slug: "conquistando-la-luna", publicId: "Conquistando_la_luna_madera_metal_n5hb1d", formato: "jpg" },
  { slug: "luna-compuesta", publicId: "Luna_compuesta_gehx7v", formato: "jpg" },
  { slug: "luna-monumental", publicId: "Luna_Monumental_ouvtnu", formato: "jpg" },
  { slug: "luna-amarilla", publicId: "Luna_Amarilla_xrwduu", formato: "jpg" },
  { slug: "luna-traviesa", publicId: "Luna_Traviesa_fvtxho", formato: "jpg" },
  { slug: "luna-nostalgica", publicId: "Luna_nostalgia_gxwm1b", formato: "jpg" },
];

function urlDeCloudinary({ publicId, formato }: Emparejamiento) {
  // Los public_id llevan acentos codificados de forma rara; hay que escaparlos.
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${encodeURIComponent(
    publicId
  )}.${formato}`;
}

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

interface ObraSanity {
  _id: string;
  titulo: string;
  slug: string;
  categoria: string;
  tieneImagen: boolean;
}

async function run() {
  const obras = await client.fetch<ObraSanity[]>(
    `*[_type == "artwork"] | order(orderRank) {
       _id, titulo, "slug": slug.current, categoria,
       "tieneImagen": defined(imagen.asset)
     }`
  );
  const porSlug = new Map(obras.map((obra) => [obra.slug, obra]));

  // 1. Coherencia del emparejamiento contra el catálogo real.
  const slugsDesconocidos = emparejamientos.filter((e) => !porSlug.has(e.slug));
  const duplicados = emparejamientos
    .map((e) => e.slug)
    .filter((slug, i, all) => all.indexOf(slug) !== i);
  const sinImagen = obras.filter(
    (obra) =>
      !obra.tieneImagen && !emparejamientos.some((e) => e.slug === obra.slug)
  );

  if (slugsDesconocidos.length) {
    console.error(
      `Estos slugs no existen en Sanity: ${slugsDesconocidos
        .map((e) => e.slug)
        .join(", ")}`
    );
    process.exit(1);
  }
  if (duplicados.length) {
    console.error(`Slugs repetidos en el emparejamiento: ${duplicados.join(", ")}`);
    process.exit(1);
  }

  // 2. Comprobar que cada URL de Cloudinary responde antes de tocar nada.
  const pendientes = emparejamientos.filter((e) => !porSlug.get(e.slug)!.tieneImagen);
  const yaTienen = emparejamientos.length - pendientes.length;

  console.log(
    `Catálogo: ${obras.length} obras · con imagen ${
      obras.filter((o) => o.tieneImagen).length
    }`
  );
  console.log(
    `Emparejadas: ${emparejamientos.length} · pendientes de subir: ${pendientes.length}` +
      (yaTienen ? ` · ya tenían imagen: ${yaTienen}` : "")
  );

  const rotas: string[] = [];
  for (const e of pendientes) {
    const res = await fetch(urlDeCloudinary(e), { method: "HEAD" });
    if (!res.ok) rotas.push(`${e.slug} → ${e.publicId} (HTTP ${res.status})`);
  }
  if (rotas.length) {
    console.error(`\nURLs de Cloudinary que no responden:\n  ${rotas.join("\n  ")}`);
    process.exit(1);
  }
  console.log("Todas las URLs de Cloudinary responden ✅");

  if (sinImagen.length) {
    console.log(
      `\nObras sin imagen y sin archivo en Cloudinary (${sinImagen.length}):`
    );
    for (const obra of sinImagen) {
      console.log(`  ${obra.titulo} (${obra.categoria})`);
    }
  }

  if (!write) {
    console.log(
      "\nComprobación completada. No se ha escrito nada.\nEjecuta 'npx tsx scripts/subir-imagenes.ts --write' para subirlas."
    );
    return;
  }

  // 3. Subir y asignar, una a una.
  let hechas = 0;
  for (const e of pendientes) {
    const obra = porSlug.get(e.slug)!;
    process.stdout.write(
      `(${hechas + 1}/${pendientes.length}) ${obra.titulo}… `
    );

    const res = await fetch(urlDeCloudinary(e));
    if (!res.ok) {
      console.log(`error al descargar (HTTP ${res.status}), se omite`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename: `${e.slug}.${e.formato}`,
    });

    await client
      .patch(obra._id)
      .set({
        imagen: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      })
      .commit();

    hechas += 1;
    console.log(`ok (${Math.round(buffer.length / 1024)} KB)`);
  }

  console.log(`\n${hechas} imágenes subidas y asignadas ✅`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
