import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Exhibition } from "@/types";

export function ExhibitionCard({
  exhibition,
}: {
  exhibition: Exhibition;
}) {
  return (
    <article className="bg-card shadow-[4px_4px_5px_rgba(0,0,0,0.15)]">
      <div className="grid items-center gap-8 p-4 md:grid-cols-[377px_1fr] md:gap-[51px] md:py-4 md:pl-5 md:pr-6">
        <div className="relative aspect-square overflow-hidden bg-line md:h-[384px] md:w-[377px]">
          <Image
            src={exhibition.imagen}
            alt={exhibition.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 377px"
            className="object-cover"
          />
        </div>

        <div className="flex max-w-[323px] flex-col gap-4">
          <p className="text-[14px] leading-none text-muted">
            {exhibition.fecha}
          </p>
          <h3 className="font-serif text-[32px] font-semibold italic leading-none text-ink">
            {exhibition.titulo}
          </h3>
          <div className="mt-1 flex flex-col gap-8">
            <p className="text-[14px] leading-[18px] text-muted">
              {exhibition.descripcion}
            </p>
            <Link
              href="/contacto"
              aria-label={`Conocer ${exhibition.titulo}`}
              className="inline-flex h-10 w-10 items-center justify-center bg-ink text-white transition-opacity hover:opacity-85"
            >
              <ArrowUpRight size={20} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
