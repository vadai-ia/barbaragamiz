import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { ArtworkSlider } from "@/components/artworks/ArtworkSlider";
import { FeaturedWorksGrid } from "@/components/artworks/FeaturedWorksGrid";
import { ExhibitionCard } from "@/components/exhibitions/ExhibitionCard";
import { SpacesGallery } from "@/components/spaces/SpacesGallery";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { exhibitions } from "@/data/exhibitions";
import { getFeaturedArtworks } from "@/sanity/lib/artworks";

export const revalidate = 60;

const intro = [
  "Creo obras abstractas donde el color, la materia y la textura se convierten en un lenguaje para explorar aquello que no siempre puede expresarse con palabras.",
  "Mi principal objetivo es crear obras que conecten profundamente con las personas. En cada pieza construyo múltiples capas de textura porque encuentro en ellas un reflejo de nuestra propia naturaleza: los seres humanos nos revelamos poco a poco, mostrando distintas partes de quienes somos con el tiempo.",
  "Cada obra nace de un proceso intuitivo de experimentación, donde los materiales y los gestos construyen una narrativa abierta que invita a cada persona a descubrir su propia interpretación.",
  "Cuando alguien encuentra una parte de sí mismo en una obra y conecta con ella, siento que mi propósito está cumplido.",
];

const disciplines = [
  {
    title: "Pintura",
    text: "Las capas de cada obra son un reflejo de las capas que todos llevamos dentro. A través del color, la materia y la textura, busco crear un espacio donde cada persona pueda encontrar una parte de sí misma.",
    href: "/obras",
    image:
      "https://res.cloudinary.com/dvxrojzi1/image/upload/v1788288730/Miedo_152X91_jhhwhj.jpg",
    alt: "Miedo, pintura de Bárbara Gamiz",
  },
  {
    title: "Escultura",
    text: "Cada escultura comienza como un rompecabezas. Pieza a pieza, los materiales encuentran su lugar hasta transformarse en una obra con identidad propia, capaz de conectar con quien la contempla.",
    href: "/obras",
    image:
      "https://res.cloudinary.com/dvxrojzi1/image/upload/v1788287807/Amistad_bsmirc.jpg",
    alt: "Amistad, escultura de Bárbara Gamiz",
  },
  {
    title: "Fotografía",
    text: "La fotografía me permite preservar aquellos instantes que despiertan algo en mí, para compartirlos y hacer que continúen viviendo en la mirada de alguien más.",
    href: "/obras",
    image:
      "https://res.cloudinary.com/dvxrojzi1/image/upload/v1788288310/5Z9B3623_na9p1w.jpg",
    alt: "Obra fotográfica de Bárbara Gamiz",
  },
];

const aboutBand = {
  background: "/intro.png",
  image:
    "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=2000&q=90",
  alt: "Retrato de Bárbara Gamiz en su estudio",
  lead: "Para mí, crear es una forma de comprender aquello que las palabras no alcanzan a explicar.",
  paragraphs: [
    "Mi obra nace de la curiosidad por explorar la materia, el color y la textura como un lenguaje capaz de despertar recuerdos, preguntas y nuevas formas de mirar.",
    "A lo largo de los años he encontrado en distintas disciplinas una manera de expresar esa misma búsqueda.",
  ],
  disciplineLines: [
    "En pintura, busco conectar.",
    "En escultura, construyo.",
    "En fotografía, preservo.",
  ],
  closing:
    "Cada una representa una forma distinta de entender el mundo, pero todas comparten un mismo propósito: crear obras que establezcan un diálogo profundo con quienes las contemplan.",
};

function formatMonthYear(fecha: string) {
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return fecha;
  return new Intl.DateTimeFormat("es-MX", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function HomePage() {
  const featured = await getFeaturedArtworks();
  const seleccion = featured.slice(0, 10);
  const lastExhibition = exhibitions[0];

  return (
    <>
      <ArtworkSlider artworks={featured.slice(0, 3)} />

      {/* Introducción + disciplinas */}
      <section className="page-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="max-w-xl">
            <div className="flex flex-col gap-6 text-[15px] leading-7 text-muted">
              {intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/obras"
              className="mt-9 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
            >
              Explorar obras
              <MoveRight size={20} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-line">
            <Image
              src="https://res.cloudinary.com/dvxrojzi1/image/upload/v1788289006/20240618Ba_%C3%BCrbaraGamiz-2_pc9wpd.jpg"
              alt="Bárbara Gamiz en su espacio expositivo, rodeada de sus obras"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-8 sm:gap-y-0 md:mt-24 md:gap-x-10">
          {disciplines.map((item) => (
            <div
              key={item.title}
              className="flex flex-col sm:row-span-4 sm:grid sm:grid-rows-subgrid sm:gap-0"
            >
              <h3 className="font-serif text-3xl leading-none text-ink md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-4 text-[14px] leading-6 text-muted">
                {item.text}
              </p>
              <div className="relative mt-6 aspect-[3/4] overflow-hidden bg-line">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-3 self-start text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
              >
                Descubrir colección
                <MoveRight size={18} strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Todas las obras */}
      {seleccion.length > 0 && (
        <section className="page-shell py-20 md:py-28">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.01em] text-ink md:text-[72px]">
                  Todas las obras
                </h2>
                <EditorialLink href="/obras">Ver todas las obras</EditorialLink>
              </div>
              <div className="flex items-end justify-between text-[14px] leading-[18px] text-ink">
                <p className="font-medium">(PINTURAS SELECCIONADAS)</p>
                <p className="underline underline-offset-2">
                  ({seleccion.length})
                </p>
              </div>
            </div>

            <FeaturedWorksGrid artworks={seleccion} />
          </div>
        </section>
      )}

      {/* Sobre mí — banda con imagen de fondo */}
      <section className="relative w-full overflow-hidden bg-line py-16 md:py-24">
        <Image
          src={aboutBand.background}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="page-shell relative">
          <div className="bg-paper px-6 py-10 md:px-12 md:py-14">
            <p className="text-[13px] leading-[18px] text-ink">(SOBRE MÍ)</p>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="flex flex-col justify-end">
                <p className="text-[14px] font-medium leading-[18px] text-ink">
                  Última exposición
                </p>
                <p className="mt-1 text-[13px] uppercase leading-[18px] tracking-[0.06em] text-muted">
                  {formatMonthYear(lastExhibition.fecha)} · {lastExhibition.titulo}
                </p>
                <div className="relative mt-5 aspect-[4/3] w-full max-w-[300px] overflow-hidden bg-line">
                  <Image
                    src={lastExhibition.imagen}
                    alt={lastExhibition.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-line">
                  <Image
                    src={aboutBand.image}
                    alt={aboutBand.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-7 font-serif text-2xl leading-[1.35] text-ink md:text-[28px]">
                  {aboutBand.lead}
                </p>
                <div className="mt-5 flex flex-col gap-4 text-[14px] leading-6 text-muted">
                  {aboutBand.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-5 flex flex-col text-[14px] font-medium leading-6 text-ink">
                  {aboutBand.disciplineLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <p className="mt-5 text-[14px] leading-6 text-muted">
                  {aboutBand.closing}
                </p>
                <Link
                  href="/sobre-mi"
                  className="mt-7 inline-flex items-center gap-3 self-start text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
                >
                  Conoce mi trayectoria
                  <MoveRight size={18} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exposiciones */}
      <section className="py-20 md:py-28">
        <div className="page-shell">
          <h2 className="text-center font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.01em] text-ink md:text-[72px]">
            Trayectoria
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-center text-[15px] leading-7 text-muted">
            Cada exposición ha representado una oportunidad para compartir mi
            trabajo, conocer nuevas miradas y continuar construyendo un camino
            dentro del arte contemporáneo.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
            >
              Ver trayectoria completa
              <MoveRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-12 flex flex-col gap-10 md:mt-16">
            {exhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>
        </div>
      </section>

      {/* Espacios */}
      <section className="page-shell py-20 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h2 className="font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.01em] text-ink md:text-[72px]">
            Espacios
          </h2>
          <div className="max-w-[377px]">
            <p className="text-[14px] leading-6 text-muted">
              Una obra no termina cuando sale del estudio. Comienza una nueva
              historia cuando encuentra a las personas y el lugar donde formará
              parte de su historia.
            </p>
            <Link
              href="/obras"
              className="mt-5 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-70"
            >
              Descubrir espacios
              <MoveRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        <div className="mt-10 md:mt-14">
          <SpacesGallery />
        </div>
      </section>
    </>
  );
}
