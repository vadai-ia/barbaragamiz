import type { Metadata } from "next";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { notFound } from "next/navigation";
import { ActionLink } from "@/components/ui/ActionLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { fechaYLugar } from "@/lib/fechas";
import { getPost, getPostSlugs } from "@/sanity/lib/posts";
import type { PortableTextBlock } from "sanity";

export const revalidate = 60;
export const dynamicParams = true;

interface NotaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NotaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.titulo,
    description: post.extracto,
  };
}

/** El texto de la nota usa la misma escala tipográfica del sitio. */
const componentes: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="type-body text-muted">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="type-heading mt-4 text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="type-small font-medium uppercase tracking-[0.06em] text-ink">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="type-lead border-l border-accent pl-6 text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="type-body list-disc pl-5 text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="type-body list-decimal pl-5 text-muted">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export default async function NotaPage({ params }: NotaPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <PageHero
        back={
          <ActionLink href="/blog" back>
            Volver al blog
          </ActionLink>
        }
        eyebrow={fechaYLugar(post.fecha, post.lugar)}
        title={post.titulo}
        intro={post.extracto}
      />

      <Section>
        {post.imagen && (
          <div className="relative aspect-[3/2] overflow-hidden bg-line">
            <Image
              src={post.imagen}
              alt={post.titulo}
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 2.5rem), 1040px"
              className="object-cover"
            />
          </div>
        )}

        {post.contenido && post.contenido.length > 0 && (
          <div className="stack-header flex max-w-2xl flex-col gap-6">
            <PortableText
              value={post.contenido as PortableTextBlock[]}
              components={componentes}
            />
          </div>
        )}
      </Section>
    </>
  );
}
