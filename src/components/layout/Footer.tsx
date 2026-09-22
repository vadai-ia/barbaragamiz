import Link from "next/link";
import { navigation } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="page-shell flex flex-col gap-16 pt-16 pb-28 md:flex-row md:items-start md:justify-between md:pt-[66px] md:pb-40">
        <div className="max-w-sm">
          <Logo inverse />
        </div>

        <div className="flex gap-16 md:gap-[72px]">
          <nav className="type-small flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-[18px]">
            <a
              href="mailto:hello@barbaragamiz.com"
              className="type-small text-white underline underline-offset-2 transition-opacity hover:opacity-60"
            >
              hello@barbaragamiz.com
            </a>
            <SocialIcons className="text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
