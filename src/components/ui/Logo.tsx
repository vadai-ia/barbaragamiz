import Image from "next/image";
import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" aria-label="Bárbara Gamiz, inicio" className="inline-block">
      <Image
        src="/logo.svg"
        alt="Bárbara Gamiz"
        width={203}
        height={52}
        priority
        className={`h-[42px] w-auto ${inverse ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
