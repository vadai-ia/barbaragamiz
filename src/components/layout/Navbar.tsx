"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/70 backdrop-blur-[25px]">
      <div className="page-shell flex items-center justify-between py-6">
        <Logo />

        <nav className="hidden items-center gap-4 lg:flex">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] leading-[18px] text-ink transition-opacity hover:opacity-60 ${
                  active ? "underline underline-offset-2" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <SocialIcons />
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center border border-line lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full w-full border-b border-line bg-canvas px-4 py-8 shadow-xl lg:hidden">
          <nav className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 font-serif text-3xl"
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
