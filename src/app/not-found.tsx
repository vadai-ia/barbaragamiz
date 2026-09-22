import { ActionLink } from "@/components/ui/ActionLink";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <div className="section-y">
      <PageHero
        eyebrow="Error 404"
        title="Obra no encontrada"
        intro="La pieza que buscas no está disponible o ha cambiado de ubicación."
        aside={
          <ActionLink href="/obras" back>
            Volver a la galería
          </ActionLink>
        }
      />
    </div>
  );
}
