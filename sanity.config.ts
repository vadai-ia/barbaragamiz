import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "barbara-gamiz",
  title: "Bárbara Gamiz",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Un modelo de obra por disciplina: el botón "Nueva fotografía" del menú
    // crea la obra con su categoría ya puesta.
    templates: (prev) => [
      ...prev,
      {
        id: "artwork-pintura",
        title: "Pintura",
        schemaType: "artwork",
        value: { categoria: "Pintura" },
      },
      {
        id: "artwork-escultura",
        title: "Escultura",
        schemaType: "artwork",
        value: { categoria: "Escultura" },
      },
      {
        id: "artwork-fotografia",
        title: "Fotografía",
        schemaType: "artwork",
        value: { categoria: "Fotografía" },
      },
    ],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
