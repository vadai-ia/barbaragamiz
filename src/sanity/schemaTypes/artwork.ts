import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const artwork = defineType({
  name: "artwork",
  title: "Obra",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
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
      name: "imagen",
      title: "Imagen de la obra",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serie",
      title: "Pertenece a la serie",
      description:
        "Déjalo vacío si es una obra única. Si la eliges, la obra se mostrará dentro de la página de esa serie.",
      type: "reference",
      to: [{ type: "serie" }],
    }),
    defineField({ name: "tecnica", title: "Técnica", type: "string" }),
    defineField({
      name: "dimensiones",
      title: "Dimensiones",
      type: "string",
      description: 'Por ejemplo: "120 x 100 cm".',
    }),
    defineField({ name: "anio", title: "Año", type: "number" }),
    defineField({
      name: "destacada",
      title: "Destacada",
      description: "Actívalo para que la obra aparezca en la página de inicio.",
      type: "boolean",
      initialValue: false,
    }),
    orderRankField({ type: "artwork" }),
  ],
  preview: {
    select: {
      title: "titulo",
      categoria: "categoria",
      serie: "serie.titulo",
      media: "imagen",
    },
    prepare: ({ title, categoria, serie, media }) => ({
      title,
      subtitle: serie ? `${categoria} · ${serie}` : `${categoria} · Obra única`,
      media,
    }),
  },
});
