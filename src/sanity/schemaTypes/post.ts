import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Nota / Blog",
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
      options: { source: "titulo", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "extracto",
      title: "Extracto",
      description: "Resumen breve que se muestra en el listado.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Más recientes",
      name: "fechaDesc",
      by: [{ field: "fecha", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titulo", subtitle: "fecha", media: "imagen" },
  },
});
