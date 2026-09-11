import { EditorialLink } from "@/components/ui/EditorialLink";

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-[0.68rem] uppercase tracking-[0.35em] text-accent">
        Error 404
      </p>
      <h1 className="mt-6 font-serif text-7xl leading-none md:text-9xl">
        Obra no encontrada
      </h1>
      <p className="mt-7 max-w-md text-sm font-light leading-7 text-muted">
        La pieza que buscas no está disponible o ha cambiado de ubicación.
      </p>
      <div className="mt-10">
        <EditorialLink href="/obras">Volver a la galería</EditorialLink>
      </div>
    </section>
  );
}
