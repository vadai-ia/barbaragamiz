/** "2026-02-05" → "Febrero 2026". Con lugar: "Febrero 2026 · Campo Marte". */
export function mesYAnio(iso: string) {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return iso;
  const texto = new Intl.DateTimeFormat("es-MX", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(fecha)
    // "febrero de 2026" → "febrero 2026"
    .replace(" de ", " ");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function fechaYLugar(iso: string, lugar?: string) {
  return [mesYAnio(iso), lugar].filter(Boolean).join(" · ");
}
