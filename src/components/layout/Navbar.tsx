"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  // En portada el menú flota sobre la obra hasta que se hace scroll.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const overlay = isHome && !scrolled && !open;

  return (
    <header
      className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-50 transition-colors duration-500 ${
        overlay
          ? "bg-transparent text-paper"
          : "bg-card/70 text-ink backdrop-blur-[25px]"
      }`}
    >
      <div
        className={`${
          isHome ? "page-bleed" : "page-shell"
        } flex items-center justify-between py-6`}
      >
        <Logo inverse={overlay} />

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`type-nav transition-opacity hover:opacity-60 ${
                  overlay
                    ? "[text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
                    : ""
                } ${active ? "underline underline-offset-4" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <SocialIcons
            className={
              overlay ? "drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]" : undefined
            }
          />
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={`grid h-11 w-11 place-items-center border transition-colors lg:hidden ${
            overlay
              ? "border-paper/60 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
              : "border-line"
          }`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full w-full border-b border-line bg-canvas px-4 py-8 text-ink shadow-xl lg:hidden">
          <nav className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="type-heading border-b border-line py-5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <SocialIcons className="mt-8" />
        </div>
      )}
    </header>
  );
}
