import { Eyebrow } from "./Eyebrow";

/**
 * Cabecera de sección. "split" usa las mismas columnas que PageHero, así
 * títulos y textos caen siempre sobre las mismas guías.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "split",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "split" | "center";
}) {
  if (align === "center") {
    return (
      <header className="mx-auto max-w-2xl text-center">
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <h2 className="type-title text-ink">{title}</h2>
        {description && (
          <p className="type-body mt-6 text-muted">{description}</p>
        )}
        {action && <div className="mt-8 flex justify-center">{action}</div>}
      </header>
    );
  }

  const hasColumn = Boolean(description || action);

  return (
    <header>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <div
        className={
          hasColumn
            ? "grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end md:gap-16"
            : undefined
        }
      >
        <h2 className="type-title text-ink">{title}</h2>
        {hasColumn && (
          <div className="flex flex-col gap-6">
            {description && <p className="type-body text-muted">{description}</p>}
            {action}
          </div>
        )}
      </div>
    </header>
  );
}
