import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const serie = defineType({
  name: "serie",
  title: "Serie",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título de la serie",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Enlace (URL)",
      type: "slug",
      description: "Se genera automáticamente a partir del título.",
      options: { source: "titulo", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Pintura", value: "Pintura" },
          { title: "Escultura", value: "Escultura" },
        ],
        layout: "radio",
      },
      initialValue: "Pintura",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 4,
      description: "Texto que acompaña a la serie en su página.",
    }),
    defineField({
      name: "portada",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      description:
        "Opcional. Si la dejas vacía se usa la imagen de la primera obra de la serie.",
    }),
    orderRankField({ type: "serie" }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "categoria", media: "portada" },
  },
});
