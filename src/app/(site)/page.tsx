import Image from "next/image";
import { ArtworkSlider } from "@/components/artworks/ArtworkSlider";
import { FeaturedWorksGrid } from "@/components/artworks/FeaturedWorksGrid";
import { PostCard } from "@/components/blog/PostCard";
import { SpacesGallery } from "@/components/spaces/SpacesGallery";
import { ActionLink } from "@/components/ui/ActionLink";
import { EditorialList, EditorialRow } from "@/components/ui/EditorialList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredPress } from "@/data/press";
import {
  getAllArtworks,
  getArtworksBySlugs,
  getFeaturedArtworks,
} from "@/sanity/lib/artworks";
import { getFeaturedPosts } from "@/sanity/lib/posts";

export const revalidate = 60;

const CLOUDINARY = "https://res.cloudinary.com/dvxrojzi1/image/upload";

// Scroll 1 · Hero. Obras horizontales, de alta resolución y que llenan el
// lienzo de borde a borde: sin marco ni muro visibles, que a pantalla completa
// delatan la foto. Un slug que no exista se omite solo.
const heroSlugs = ["palpitaciones", "grafitopia", "enigma"];

// Scroll 2 · Filosofía
const philosophy = {
  paragraphs: [
    "Creo obras abstractas donde el color, la materia y la textura se convierten en un lenguaje para explorar aquello que no siempre puede expresarse con palabras.",
    "Mi principal objetivo es crear obras que conecten profundamente con las personas. En cada pieza construyo múltiples capas de textura porque encuentro en ellas un reflejo de nuestra propia naturaleza: los seres humanos nos revelamos poco a poco, mostrando distintas partes de quienes somos con el tiempo.",
    "Cada obra nace de un proceso intuitivo de experimentación, donde los materiales y los gestos construyen una narrativa abierta que invita a cada persona a descubrir su propia interpretación.",
    "Cuando alguien encuentra una parte de sí mismo en una obra y conecta con ella, siento que mi propósito está cumplido.",
  ],
  // Pendiente: la maqueta pide "Laberinto", que aún no está en Cloudinary.
  image: `${CLOUDINARY}/v1788289006/20240618Ba_%C3%BCrbaraGamiz-2_pc9wpd.jpg`,
  alt: "Bárbara Gamiz en su espacio expositivo, rodeada de sus obras",
};

// Scrolls 3, 4 y 5 · Disciplinas
const disciplines = [
  {
    title: "Pintura",
    text: "Las capas de cada obra son un reflejo de las capas que todos llevamos dentro. A través del color, la materia y la textura, busco crear un espacio donde cada persona pueda encontrar una parte de sí misma.",
    href: "/obras?disciplina=pintura",
    image: `${CLOUDINARY}/v1788288730/Miedo_152X91_jhhwhj.jpg`,
    alt: "Miedo, pintura de Bárbara Gamiz",
  },
  {
    title: "Escultura",
    text: "Cada escultura comienza como un rompecabezas. Pieza a pieza, los materiales encuentran su lugar hasta transformarse en una obra con identidad propia, capaz de conectar con quien la contempla.",
    href: "/obras?disciplina=escultura",
    image: `${CLOUDINARY}/v1788287807/Amistad_bsmirc.jpg`,
    alt: "Amistad, escultura de Bárbara Gamiz",
  },
  {
    title: "Fotografía",
    text: "La fotografía me permite preservar aquellos instantes que despiertan algo en mí, para compartirlos y hacer que continúen viviendo en la mirada de alguien más.",
    href: "/obras",
    image: `${CLOUDINARY}/v1788288310/5Z9B3623_na9p1w.jpg`,
    alt: "Obra fotográfica de Bárbara Gamiz",
  },
];

// Scroll 6 · Barbara Gámiz
const aboutBand = {
  image: `${CLOUDINARY}/v1788288994/20240618Ba_%C3%BCrbaraGamiz-5_qqiwcl.jpg`,
  alt: "Retrato de Bárbara Gamiz en su estudio, junto a Mantra",
  lead: "Para mí, crear es una forma de comprender aquello que las palabras no alcanzan a explicar.",
  body: "Mi obra nace de la curiosidad por explorar la materia, el color y la textura como un lenguaje capaz de despertar recuerdos, preguntas y nuevas formas de mirar. A lo largo de los años he encontrado en distintas disciplinas una manera de expresar esa misma búsqueda.",
  statements: [
    "En pintura, busco conectar.",
    "En escultura, construyo.",
    "En fotografía, preservo.",
  ],
  closing:
    "Cada una representa una forma distinta de entender el mundo, pero todas comparten un mismo propósito: crear obras que establezcan un diálogo profundo con quienes las contemplan.",
};

// Scroll 7 · El proceso
const studioProcess = {
  // La primera frase hace de entradilla; el resto, de cuerpo.
  lead: "Cada obra comienza mucho antes del primer trazo.",
  body: "Es un proceso de exploración donde la intuición guía cada decisión y los materiales revelan posibilidades inesperadas. Aquí las texturas se construyen capa tras capa, los materiales se transforman y cada pieza encuentra su propia identidad antes de convertirse en una obra terminada.",
  images: [
    {
      src: `${CLOUDINARY}/v1788288981/BGP_ENTRE_EL_CIELO_Y_LA_TIERRA_wpjmha.jpg`,
      alt: "Bárbara Gamiz pintando un lienzo rojo de gran formato en su estudio",
      caption: "01 · Gran formato",
    },
    {
      src: `${CLOUDINARY}/v1788288973/BGP_MANTRA_gswvnf.jpg`,
      alt: "Bárbara Gamiz trabajando sobre la superficie circular de Mantra",
      caption: "02 · Mantra, en proceso",
    },
    {
      src: `${CLOUDINARY}/v1788288974/BGP_PINTA_PAPEL_qdkd2k.jpg`,
      alt: "Detalle de las manos de Bárbara Gamiz aplicando materia con espátula sobre papel",
      caption: "03 · Materia sobre papel",
    },
  ],
};

export default async function HomePage() {
  const [heroArtworks, featured, allArtworks, entradas] = await Promise.all([
    getArtworksBySlugs(heroSlugs),
    getFeaturedArtworks(),
    getAllArtworks(),
    getFeaturedPosts(),
  ]);

  // Selección de portada: las destacadas en el Studio; si aún no hay ninguna,
  // las primeras pinturas con imagen, para que la sección nunca quede vacía.
  const seleccion = (
    featured.length
      ? featured
      : allArtworks.filter((artwork) => artwork.categoria === "Pintura")
  )
    .filter((artwork) => artwork.imagen)
    .slice(0, 10);
  const seleccionLabel = seleccion.every(
    (artwork) => artwork.categoria === "Pintura"
  )
    ? "Pinturas seleccionadas"
    : "Obras seleccionadas";

  return (
    <>
      {/* Scroll 1 · Hero */}
      <ArtworkSlider artworks={heroArtworks} />

      {/* Scroll 2 · Filosofía */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="flex max-w-xl flex-col">
            <div className="type-body flex flex-col gap-6 text-muted">
              {philosophy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ActionLink href="/obras" className="mt-9">
              Explorar obras
            </ActionLink>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-line">
            <Image
              src={philosophy.image}
              alt={philosophy.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Scrolls 3, 4 y 5 · Pintura, Escultura, Fotografía */}
      <Section className="pt-0">
        <div className="grid gap-14 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-8 sm:gap-y-0 md:gap-x-10">
          {disciplines.map((item) => (
            <div
              key={item.title}
              className="flex flex-col sm:row-span-4 sm:grid sm:grid-rows-subgrid sm:gap-0"
            >
              <h2 className="type-heading text-ink">{item.title}</h2>
              <p className="type-small mt-4 text-muted">{item.text}</p>
              <div className="relative mt-6 aspect-[3/4] overflow-hidden bg-line">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <ActionLink href={item.href} className="mt-5">
                Descubrir colección
              </ActionLink>
            </div>
          ))}
        </div>
      </Section>

      {/* Todas las obras · selección */}
      {seleccion.length > 0 && (
        <Section className="pt-0">
          <SectionHeader
            title="Todas las obras"
            action={<ActionLink href="/obras">Ver todas las obras</ActionLink>}
          />
          <div className="stack-header flex items-end justify-between gap-6 border-b border-line pb-4">
            <Eyebrow>({seleccionLabel})</Eyebrow>
            <Eyebrow>({seleccion.length})</Eyebrow>
          </div>
          <div className="mt-10">
            <FeaturedWorksGrid artworks={seleccion} />
          </div>
        </Section>
      )}

      {/* Scroll 6 · Barbara Gámiz
          Foto entera a su proporción real (2:3), sin recorte. Dos voces
          tipográficas: serif para lo que dice ella, sans para la prosa. */}
      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-x-8">
          <div className="mx-auto w-3/4 max-w-xs md:col-span-5 md:mx-0 md:w-full md:max-w-none">
            <div className="relative aspect-[2/3] overflow-hidden bg-line">
              <Image
                src={aboutBand.image}
                alt={aboutBand.alt}
                fill
                sizes="(max-width: 768px) 75vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col md:col-span-6 md:col-start-7">
            <Eyebrow className="mb-6">Sobre mí</Eyebrow>
            <p className="type-lead text-ink">{aboutBand.lead}</p>
            <p className="type-body mt-6 text-muted">{aboutBand.body}</p>

            <div className="mt-8 border-l border-accent pl-6">
              {aboutBand.statements.map((line) => (
                <p key={line} className="type-lead italic text-ink">
                  {line}
                </p>
              ))}
            </div>

            <p className="type-body mt-8 text-muted">{aboutBand.closing}</p>
            <ActionLink href="/sobre-mi" className="mt-8">
              Conoce mi trayectoria
            </ActionLink>
          </div>
        </div>
      </Section>

      {/* Scroll 7 · El proceso
          Desktop: foto grande a toda altura a la izquierda; texto y dos fotos
          escalonadas a la derecha. Móvil: texto y carrusel automático. */}
      <Section>
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-14">
          <div className="flex flex-col md:col-span-5 md:col-start-8 md:row-start-1 md:pt-4">
            <Eyebrow className="mb-5">Estudio</Eyebrow>
            <h2 className="type-title text-ink">El proceso</h2>
            <p className="type-lead mt-8 text-ink">{studioProcess.lead}</p>
            <p className="type-body mt-5 text-muted">{studioProcess.body}</p>
            <ActionLink href="/sobre-mi" className="mt-8">
              Explorar el estudio
            </ActionLink>
          </div>

          <div className="md:hidden">
            <ImageCarousel images={studioProcess.images} />
          </div>

          <figure className="hidden md:col-span-6 md:col-start-1 md:row-span-2 md:row-start-1 md:flex md:flex-col">
            <div className="relative min-h-[40rem] flex-1 overflow-hidden bg-line">
              <Image
                src={studioProcess.images[0].src}
                alt={studioProcess.images[0].alt}
                fill
                sizes="520px"
                className="object-cover"
              />
            </div>
            <figcaption className="type-eyebrow mt-3 text-muted">
              {studioProcess.images[0].caption}
            </figcaption>
          </figure>

          <div className="hidden md:col-span-5 md:col-start-8 md:row-start-2 md:grid md:grid-cols-2 md:items-start md:gap-8">
            {studioProcess.images.slice(1).map((image, i) => (
              <figure key={image.src} className={i === 1 ? "md:mt-20" : undefined}>
                <div className="relative aspect-[3/4] overflow-hidden bg-line">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="type-eyebrow mt-3 text-muted">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* Scroll 8 · Trayectoria. Las entradas marcadas "Mostrar en inicio" en el
          Studio; el resto vive en /blog. */}
      {entradas.length > 0 && (
        <Section tone="paper">
          <SectionHeader
            align="center"
            title="Trayectoria"
            description="Cada exposición ha representado una oportunidad para compartir mi trabajo, conocer nuevas miradas y continuar construyendo un camino dentro del arte contemporáneo."
            action={<ActionLink href="/blog">Ver trayectoria completa</ActionLink>}
          />
          <div className="stack-header flex flex-col gap-10">
            {entradas.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Section>
      )}

      {/* Scroll 9 · Publicaciones y entrevistas */}
      <Section>
        <SectionHeader
          title="Publicaciones y entrevistas"
          description="A lo largo de mi trayectoria he tenido la oportunidad de compartir mi trabajo en distintos medios y proyectos que han contribuido a difundir mi práctica artística."
        />
        <div className="stack-header">
          <EditorialList>
            {featuredPress.map((item) => (
              <EditorialRow
                key={`${item.medio}-${item.anio}`}
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

      {/* Scroll 10 · Espacios */}
      <Section className="pt-0">
        <SectionHeader
          title="Espacios"
          description="Una obra no termina cuando sale del estudio. Comienza una nueva historia cuando encuentra a las personas y el lugar donde formará parte de su historia."
          action={<ActionLink href="/obras">Descubrir espacios</ActionLink>}
        />
        <div className="stack-header">
          <SpacesGallery />
        </div>
      </Section>

      {/* Scroll 11 · Contacto */}
      <Section tone="paper">
        <SectionHeader
          align="center"
          title="Hablemos"
          description="Si alguna de mis obras ha conectado contigo, o imaginas una pieza creada especialmente para tu espacio, será un gusto conocer tu historia y explorar juntos nuevas posibilidades."
          action={<ActionLink href="/contacto">Iniciar una conversación</ActionLink>}
        />
      </Section>
    </>
  );
}
