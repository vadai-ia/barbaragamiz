"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const CLOUDINARY = "https://res.cloudinary.com/dvxrojzi1/image/upload";

// Obras instaladas en interiores reales (Cloudinary: Barbara Gamiz/ESPACIOS).
const spaces: {
  titulo: string;
  dimensiones?: string;
  captionTop: boolean;
  src: string;
}[] = [
  {
    titulo: "Mujer Luna",
    dimensiones: "170 x 143 cm",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982266/Mujer_Luna_c5cpsc.jpg`,
  },
  {
    titulo: "Mantra",
    dimensiones: "150 cm de diámetro",
    captionTop: false,
    src: `${CLOUDINARY}/v1788982266/Mantra_vmqrbh.jpg`,
  },
  {
    titulo: "La Musa del Cielo",
    dimensiones: "150 x 130 cm",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982265/La_Musa_del_Cielo_popgoh.jpg`,
  },
  {
    titulo: "Soñando",
    dimensiones: "122 x 182 cm",
    captionTop: false,
    src: `${CLOUDINARY}/v1788982267/Son_%C3%A2ando_mubtrc.jpg`,
  },
  {
    titulo: "Emociones",
    dimensiones: "100 x 200 cm",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982262/Emociones_o11xp6.jpg`,
  },
  {
    titulo: "Cuerpo",
    dimensiones: "230 x 118 cm",
    captionTop: false,
    src: `${CLOUDINARY}/v1788982261/Cuerpo_izorlb.jpg`,
  },
  {
    titulo: "Enigma",
    dimensiones: "122 x 220 cm",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982263/Enigma_rr5a6c.jpg`,
  },
  {
    titulo: "Umbral",
    captionTop: false,
    src: `${CLOUDINARY}/v1788982278/Umbral_fuglzt.jpg`,
  },
  {
    titulo: "Miedo",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982264/Miedo_x6e2vo.jpg`,
  },
  {
    titulo: "Primavera",
    captionTop: false,
    src: `${CLOUDINARY}/v1788982266/Primavera_zb0tu2.jpg`,
  },
  {
    titulo: "Trilogía",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982267/Trilogia_yw1cnz.jpg`,
  },
  {
    titulo: "Entre el Cielo y la Tierra",
    captionTop: false,
    src: `${CLOUDINARY}/v1788982316/Entre_el_Cielo_y_la_Tierra_v40lw6.jpg`,
  },
  {
    titulo: "Intimidad",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982265/Intimidad_hzwrda.jpg`,
  },
  {
    titulo: "Garabatos",
    captionTop: false,
    src: `${CLOUDINARY}/v1788982263/Garabatos_rrfn1l.jpg`,
  },
  {
    titulo: "Alegoría",
    captionTop: true,
    src: `${CLOUDINARY}/v1788982310/Alegori_%C3%BCa_khl6pi.jpg`,
  },
];

export function SpacesGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  // Translate vertical wheel into horizontal scroll (desktop mouse wheel).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Let touch/pen use native momentum scrolling; only drag with a mouse.
    if (event.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
    drag.current.active = false;
  };

  // Prevent a drag gesture from also triggering a link navigation.
  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
      className="no-scrollbar -mx-5 cursor-grab overflow-x-auto overscroll-x-contain px-5 [-webkit-overflow-scrolling:touch] active:cursor-grabbing md:-mx-12 md:px-12"
    >
      <div className="flex w-max gap-6 md:gap-10">
        {spaces.map((space, index) => {
          const caption = (
            <div className="flex items-baseline justify-between gap-4">
              <span className="type-small font-medium text-ink">{space.titulo}</span>
              {space.dimensiones && (
                <span className="type-small text-right text-muted">
                  {space.dimensiones}
                </span>
              )}
            </div>
          );

          return (
            <figure
              key={`${space.titulo}-${index}`}
              className="flex w-[280px] flex-col gap-3 sm:w-[320px] md:w-[377px]"
            >
              {space.captionTop && caption}
              <div className="relative h-[380px] overflow-hidden bg-line shadow-[4px_4px_10px_rgba(0,0,0,0.15)] md:h-[466px]">
                <Image
                  src={space.src}
                  alt={`${space.titulo} instalada en un interior`}
                  fill
                  draggable={false}
                  sizes="377px"
                  className="pointer-events-none select-none object-cover"
                />
              </div>
              {!space.captionTop && caption}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
