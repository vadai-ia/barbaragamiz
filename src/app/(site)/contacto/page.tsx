import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialIcons } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto para información sobre obra, exposiciones y colaboraciones.",
};

export default function ContactPage() {
  return (
    <section className="grid min-h-[calc(100vh-6rem)] lg:grid-cols-2">
      <div className="relative min-h-[480px] bg-line lg:min-h-full">
        <Image
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=90"
          alt="Detalle de una obra de Bárbara Gamiz"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/15" />
      </div>

      <div className="flex items-center px-6 py-20 md:px-16 lg:px-24 lg:py-28">
        <div className="w-full max-w-xl">
          <p className="text-[0.66rem] uppercase tracking-[0.34em] text-accent">
            Contacto
          </p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.85] tracking-[-0.045em] md:text-8xl">
            Hablemos.
          </h1>
          <p className="mt-8 max-w-lg text-sm font-light leading-7 text-muted">
            Para consultar disponibilidad de obra, exposiciones, encargos o
            colaboraciones, puedes escribir a través de este formulario.
          </p>

          <div className="mt-14">
            <ContactForm />
          </div>

          <div className="mt-14 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="mailto:hola@barbaragamiz.com"
              className="font-serif text-xl"
            >
              hola@barbaragamiz.com
            </a>
            <SocialIcons />
          </div>
        </div>
      </div>
    </section>
  );
}
