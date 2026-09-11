import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Biografía, práctica y trayectoria de Bárbara Gamiz.",
};

const milestones = [
  ["2025", "La materia recuerda", "Museo de Arte Contemporáneo"],
  ["2024", "Habitar la pausa", "Galería Norte"],
  ["2023", "Geografías íntimas", "Centro Cultural Sur"],
  ["2022", "Residencia de producción", "Taller Abierto"],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-shell grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-28">
        <div className="flex flex-col justify-center">
          <SectionTitle
            eyebrow="Sobre mí"
            title="El arte como forma de atención."
          />
          <p className="mt-10 max-w-xl text-sm font-light leading-8 text-muted md:text-base">
            Soy Bárbara Gamiz, artista plástica. Mi práctica surge del deseo de
            comprender cómo la materia guarda memoria y cómo los espacios que
            habitamos influyen en nuestra percepción.
          </p>
        </div>
        <div className="relative min-h-[620px] bg-line md:min-h-[760px]">
          <Image
            src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1600&q=90"
            alt="Bárbara Gamiz en su estudio"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover grayscale"
          />
        </div>
      </section>

      <section className="bg-paper py-24 md:py-36">
        <div className="page-shell grid gap-16 md:grid-cols-2 md:gap-28">
          <div className="relative aspect-[4/5] bg-line">
            <Image
              src="https://images.unsplash.com/photo-1605429523419-d828acb941d9?auto=format&fit=crop&w=1400&q=90"
              alt="Proceso de trabajo en el estudio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[0.66rem] uppercase tracking-[0.3em] text-accent">
              Práctica
            </p>
            <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.035em] md:text-7xl">
              Entre la intuición y la materia
            </h2>
            <div className="mt-9 space-y-6 text-sm font-light leading-8 text-muted">
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
      </section>

      <section className="page-shell py-24 md:py-36">
        <SectionTitle
          eyebrow="Trayectoria"
          title="Exposiciones y proyectos"
          description="Una selección de exhibiciones, colaboraciones y periodos de investigación recientes."
        />
        <div className="mt-16 md:mt-24">
          {milestones.map(([year, title, place]) => (
            <div
              key={`${year}-${title}`}
              className="grid gap-3 border-t border-line py-7 md:grid-cols-[0.2fr_1fr_1fr] md:items-center"
            >
              <p className="text-xs text-accent">{year}</p>
              <h3 className="font-serif text-3xl">{title}</h3>
              <p className="text-sm font-light text-muted md:text-right">
                {place}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
