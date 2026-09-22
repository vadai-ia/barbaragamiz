import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialList, EditorialRow } from "@/components/ui/EditorialList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { socialLinks, whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto directo por WhatsApp para información sobre obra, exposiciones y colaboraciones.",
};

const MENSAJE = "Hola, me gustaría saber más sobre tu obra.";
const CORREO = "hello@barbaragamiz.com";

// WhatsApp es la acción principal; el resto son alternativas.
const canales = [
  { meta: "Correo", titulo: CORREO, href: `mailto:${CORREO}` },
  {
    meta: "Instagram",
    titulo: "@barbara_gamizart",
    href: socialLinks.instagram,
  },
  { meta: "Facebook", titulo: "barbaragamizart", href: socialLinks.facebook },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos"
        intro="Si alguna de mis obras ha conectado contigo, o imaginas una pieza creada especialmente para tu espacio, será un gusto conocer tu historia y explorar juntos nuevas posibilidades."
      />

      <Section>
        {/* Mismas columnas que PageHero y SectionHeader. */}
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-start md:gap-16">
          <div className="flex flex-col">
            <p className="type-lead max-w-xl text-ink">
              Escríbeme por WhatsApp y hablamos directamente.
            </p>
            <ButtonLink
              href={whatsappUrl(MENSAJE)}
              external
              className="mt-8 self-start"
            >
              Escribir por WhatsApp
            </ButtonLink>
          </div>

          <div className="mx-auto w-3/4 max-w-xs md:mx-0 md:w-full md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden bg-line">
              <Image
                // La foto original es horizontal: se pide a Cloudinary el
                // recorte vertical ya hecho, para que el navegador solo tenga
                // que reducirla y no ampliarla (era la causa del desenfoque).
                src="https://res.cloudinary.com/dvxrojzi1/image/upload/ar_4:5,c_fill,g_auto,w_1200,q_auto/v1788288992/20240618Ba_%C3%BCrbaraGamiz-4_dqj86w.jpg"
                alt="Bárbara Gamiz en su estudio"
                fill
                priority
                sizes="(max-width: 768px) 75vw, 352px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Las filas necesitan el ancho completo para respirar. */}
        <div className="stack-header">
          <Eyebrow className="mb-6">Otros canales</Eyebrow>
          <EditorialList>
            {canales.map((canal) => (
              <EditorialRow
                key={canal.meta}
                meta={canal.meta}
                title={canal.titulo}
                href={canal.href}
                external={!canal.href.startsWith("mailto:")}
              />
            ))}
          </EditorialList>
        </div>
      </Section>
    </>
  );
}
