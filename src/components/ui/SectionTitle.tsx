interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <header className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="mb-4 text-[14px] font-medium leading-[18px] text-ink">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.01em] text-ink md:text-[72px]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-md text-[14px] leading-[18px] text-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
