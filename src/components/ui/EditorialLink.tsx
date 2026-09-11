import Link from "next/link";

export function EditorialLink({
  href,
  children,
  variant = "solid",
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "underline";
  inverse?: boolean;
}) {
  if (variant === "underline") {
    return (
      <Link
        href={href}
        className={`inline-block text-[14px] leading-[18px] underline underline-offset-2 transition-opacity hover:opacity-60 ${
          inverse ? "text-paper" : "text-ink"
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-[14px] py-[10px] text-[14px] font-medium uppercase leading-none transition-opacity hover:opacity-85 ${
        inverse ? "bg-paper text-ink" : "bg-ink text-white"
      }`}
    >
      {children}
    </Link>
  );
}
