export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`type-eyebrow text-muted ${className}`}>{children}</p>;
}
