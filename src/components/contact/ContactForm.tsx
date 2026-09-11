"use client";

import { useState } from "react";

const fields = [
  { id: "nombre", label: "Nombre", type: "text", required: true },
  { id: "correo", label: "Correo electrónico", type: "email", required: true },
  { id: "telefono", label: "Teléfono (opcional)", type: "tel", required: false },
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
      className="space-y-8"
    >
      {fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="mb-3 block text-[0.65rem] uppercase tracking-[0.2em] text-muted"
          >
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            required={field.required}
            className="w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-ink"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="mensaje"
          className="mb-3 block text-[0.65rem] uppercase tracking-[0.2em] text-muted"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          className="w-full resize-none border-0 border-b border-line bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-ink"
        />
      </div>

      <button
        type="submit"
        className="bg-ink px-9 py-5 text-[0.68rem] uppercase tracking-[0.22em] text-paper transition-colors hover:bg-accent"
      >
        Enviar mensaje
      </button>

      {sent && (
        <p className="border-l-2 border-accent pl-4 text-sm leading-6 text-muted">
          Gracias. El formulario está listo para conectarse a Supabase.
        </p>
      )}
    </form>
  );
}
