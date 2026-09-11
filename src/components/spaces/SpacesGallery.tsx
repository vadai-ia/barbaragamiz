"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const spaces = [
  {
    titulo: "Primavera",
    dimensiones: "90 x 130",
    captionTop: true,
    src: "/primavera.png",
  },
  {
    titulo: "Mujer Luna",
    dimensiones: "110 x 150",
    captionTop: false,
    src: "/mujer-luna.png",
  },
  {
    titulo: "La Musa Del Cielo",
    dimensiones: "120 x 100 cm",
    captionTop: true,
    src: "/la-musa-del-cielo.png",
  },
  {
    titulo: "Rétorica",
    dimensiones: "120 x 270",
    captionTop: false,
    src: "/retorica.png",
  },
  {
    titulo: "Trilogía",
    dimensiones: "100 x 140",
    captionTop: true,
    src: "/retorica-2.png",
  },
  {
    titulo: "Luna Atrevida",
    dimensiones: "120 x 100",
    captionTop: false,
    src: "/luna-atrevida.png",
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
            <div className="flex items-center justify-between gap-4 text-[16px] leading-none tracking-[0.02em]">
              <span className="font-bold text-ink">{space.titulo}</span>
              <span className="text-right text-muted">{space.dimensiones}</span>
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
                  alt={space.titulo}
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
