import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fechaYLugar } from "@/lib/fechas";
import type { Post } from "@/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-card shadow-[4px_4px_5px_rgba(0,0,0,0.15)]">
      <div className="grid items-center gap-8 p-4 md:grid-cols-[377px_1fr] md:gap-[51px] md:py-4 md:pl-5 md:pr-6">
        <div className="relative aspect-square overflow-hidden bg-line md:h-[384px] md:w-[377px]">
          {post.imagen ? (
            <Image
              src={post.imagen}
              alt={post.titulo}
              fill
              sizes="(max-width: 768px) 100vw, 377px"
              className="object-cover"
            />
          ) : (
            <div className="type-eyebrow flex h-full w-full items-center justify-center text-muted">
              Sin imagen
            </div>
          )}
        </div>

        <div className="flex max-w-[323px] flex-col gap-4">
          <p className="type-eyebrow text-muted">
            {fechaYLugar(post.fecha, post.lugar)}
          </p>
          <h3 className="type-heading text-ink">{post.titulo}</h3>
          <div className="mt-1 flex flex-col gap-8">
            {post.extracto && (
              <p className="type-small text-muted">{post.extracto}</p>
            )}
            <Link
              href={`/blog/${post.slug}`}
              aria-label={`Leer ${post.titulo}`}
              className="group inline-flex h-10 w-10 items-center justify-center bg-ink text-paper transition-colors hover:bg-accent"
            >
              <ArrowUpRight
                size={20}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px] motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
