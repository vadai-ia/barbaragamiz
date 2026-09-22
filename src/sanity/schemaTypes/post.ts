import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Entrada de blog",
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
      name: "fecha",
      title: "Fecha",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lugar",
      title: "Lugar",
      description:
        'Aparece junto a la fecha. Por ejemplo: "Campo Marte, CDMX".',
      type: "string",
    }),
    defineField({
      name: "destacada",
      title: "Mostrar en inicio",
      description:
        "Actívalo para que la nota aparezca en la sección Trayectoria de la portada (se muestran las tres más recientes).",
      type: "boolean",
      initialValue: false,
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
      description: "Resumen breve que se muestra en el listado y en la portada.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      description: "Texto completo de la nota. Opcional.",
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
    select: {
      title: "titulo",
      fecha: "fecha",
      lugar: "lugar",
      destacada: "destacada",
      media: "imagen",
    },
    prepare: ({ title, fecha, lugar, destacada, media }) => {
      const anio = fecha ? new Date(fecha).getFullYear() : "";
      const partes = [anio, lugar].filter(Boolean).join(" · ");
      return {
        title,
        subtitle: destacada ? `${partes} · En inicio` : partes,
        media,
      };
    },
  },
});
