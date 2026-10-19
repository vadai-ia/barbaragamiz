import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";
import type { ArtworkCategory } from "../types";

/**
 * Una entrada de menú por disciplina. Cada lista llega ya filtrada y su botón
 * de crear trae la categoría puesta (ver `templates` en sanity.config.ts), así
 * que una fotografía no puede acabar guardada como pintura por no haber visto
 * el selector. El orden de cada lista se arrastra y es el que usa la web.
 */
const disciplinas: {
  categoria: ArtworkCategory;
  titulo: string;
  nueva: string;
  template: string;
  id: string;
}[] = [
  {
    categoria: "Pintura",
    titulo: "Pinturas",
    nueva: "Nueva pintura",
    template: "artwork-pintura",
    id: "obras-pintura",
  },
  {
    categoria: "Escultura",
    titulo: "Esculturas",
    nueva: "Nueva escultura",
    template: "artwork-escultura",
    id: "obras-escultura",
  },
  {
    categoria: "Fotografía",
    titulo: "Fotografías",
    nueva: "Nueva fotografía",
    template: "artwork-fotografia",
    id: "obras-fotografia",
  },
];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Contenido")
    .items([
      ...disciplinas.map(({ categoria, titulo, nueva, template, id }) =>
        orderableDocumentListDeskItem({
          type: "artwork",
          id,
          title: titulo,
          filter: "categoria == $categoria",
          params: { categoria },
          // Sustituye al "Create new" genérico, que no fijaba la categoría.
          createIntent: false,
          menuItems: [
            S.menuItem()
              .title(nueva)
              .intent({
                type: "create",
                // La tupla es [destino, valores del modelo]: el modelo ya
                // lleva la categoría, así que no hace falta pasarle nada.
                params: [{ type: "artwork", template }, {}],
              })
              .serialize(),
          ],
          S,
          context,
        })
      ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "serie",
        title: "Series",
        S,
        context,
      }),
      S.divider(),
      S.documentTypeListItem("post").title("Exposiciones"),
    ]);
