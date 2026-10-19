import type { Metadata } from "next";
import { PostCard } from "@/components/exposiciones/PostCard";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/sanity/lib/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Exposiciones",
  description:
    "Exposiciones, ferias y novedades del trabajo de Bárbara Gamiz.",
};

export default async function ExposicionesPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Trayectoria"
        title="Exposiciones"
        intro="Exposiciones, ferias y novedades. Cada participación es una oportunidad para compartir el trabajo y conocer nuevas miradas."
      />

      <Section>
        {posts.length ? (
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="type-body text-center text-muted">
            Todavía no hay exposiciones publicadas.
          </p>
        )}
      </Section>
    </>
  );
}
