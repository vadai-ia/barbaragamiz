import type { Metadata } from "next";
import Image from "next/image";
import { EditorialList, EditorialRow } from "@/components/ui/EditorialList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { press } from "@/data/press";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Biografía, práctica y trayectoria de Bárbara Gamiz.",
};

const CLOUDINARY = "https://res.cloudinary.com/dvxrojzi1/image/upload";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre mí"
        title="El arte como forma de atención."
        intro="Soy Bárbara Gamiz, artista plástica. Mi práctica surge del deseo de comprender cómo la materia guarda memoria y cómo los espacios que habitamos influyen en nuestra percepción."
      />

      <Section>
        <div className="relative aspect-[3/2] overflow-hidden bg-line">
          <Image
            src={`${CLOUDINARY}/v1788288990/20240618Ba_%C3%BCrbaraGamiz-1_q1eox4.jpg`}
            alt="Bárbara Gamiz frente a una de sus pinturas en azul"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1040px"
            className="object-cover"
          />
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-line">
            <Image
              src={`${CLOUDINARY}/v1788288982/BGP_ESTUDIO_GLASSELL_tyhmmm.jpg`}
              alt="Bárbara Gamiz pintando un lienzo de gran formato subida a una escalera"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <Eyebrow className="mb-5">Práctica</Eyebrow>
            <h2 className="type-title text-ink">Entre la intuición y la materia</h2>
            <div className="type-body stack-header flex flex-col gap-6 text-muted">
              <p>
                Trabajo principalmente con pintura, cerámica, madera y metal.
                Me acerco a cada material atendiendo a sus tiempos, resistencias
                y accidentes, permitiendo que el proceso también tome
                decisiones.
              </p>
              <p>
                La naturaleza, la arquitectura y los recuerdos personales
                aparecen como puntos de partida. No busco representarlos
                literalmente, sino traducir sus ritmos, tensiones y silencios.
              </p>
              <p>
                Cada serie construye un lenguaje propio, aunque todas comparten
                una pregunta por la permanencia y por la capacidad de una forma
                para contener una experiencia.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Prensa"
          title="Publicaciones y entrevistas"
          description="A lo largo de mi trayectoria he tenido la oportunidad de compartir mi trabajo en distintos medios y proyectos que han contribuido a difundir mi práctica artística."
        />
        <div className="stack-header">
          <EditorialList>
            {press.map((item) => (
              <EditorialRow
                key={`${item.medio}-${item.anio}-${item.titulo ?? ""}`}
                meta={item.anio}
                title={item.medio}
                description={item.titulo}
                href={item.url}
                external
              />
            ))}
          </EditorialList>
        </div>
      </Section>
    </>
  );
}
