import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Contenido")
    .items([
      orderableDocumentListDeskItem({
        type: "artwork",
        title: "Obras",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "serie",
        title: "Series",
        S,
        context,
      }),
      S.divider(),
      S.documentTypeListItem("post").title("Blog"),
    ]);
