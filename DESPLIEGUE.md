# Despliegue

El sitio se publica como **ficheros estáticos** en Hostinger. No hay Node
corriendo en el servidor: LiteSpeed sirve HTML ya generado, por detrás de
Cloudflare.

## Publicar una versión nueva

```bash
npm install
npm run build        # genera la carpeta out/
```

Sube **todo el contenido de `out/`** a la raíz pública del dominio
(`public_html/`), reemplazando lo anterior.

Antes de subir, comprueba el resultado en local:

```bash
npx serve out        # y abre la URL que imprima
```

## `.htaccess`

Vive en [`public/.htaccess`](public/.htaccess), así que el build lo copia solo
a `out/.htaccess` y sube con el resto. **No lo borres al reemplazar ficheros.**
Hace tres cosas:

1. Redirige `/blog` y `/blog/<slug>` a `/exposiciones/...`. La sección cambió
   de nombre y las direcciones antiguas quedaron publicadas.
2. Sirve `/studio/index.html` para cualquier ruta bajo `/studio`. El panel de
   Sanity es una SPA y maneja sus propias direcciones internas
   (`/studio/structure`, `/studio/vision`...), que no existen como ficheros.
   Sin esta regla, recargar estando dentro del panel da un 404.
3. Fija el cacheo: HTML siempre revalidado, ficheros de `/_next/static`
   inmutables (llevan huella en el nombre).

## Configuración que depende del hosting

En [`next.config.ts`](next.config.ts):

- `output: "export"` — genera `out/` en vez de un servidor.
- `trailingSlash: true` — produce `obras/index.html`, que es la forma que ya
  servía el dominio. Cambiarlo rompería las direcciones existentes.
- `images.unoptimized: true` — sin servidor no hay optimizador. Las imágenes
  se sirven desde los CDN de Sanity y Cloudinary, que ya las entregan al
  tamaño pedido (ver el loader en `ArtworkSlider`).

Las páginas de obra, serie y exposición llevan `dynamicParams = false`: solo
existen las generadas en el build.

## Limitación importante: el contenido queda congelado

Las páginas se construyen con los datos que hay en Sanity **en el momento del
build**. El `revalidate = 60` de las páginas no tiene efecto sin servidor.

Consecuencia práctica: cuando Bárbara publica una obra nueva desde
`/studio`, se guarda bien en Sanity, pero **la web pública no la muestra**
hasta que alguien ejecute `npm run build` y vuelva a subir `out/`.

Esto afecta a todo el contenido: obras, series y exposiciones.

### Si se quiere que la web se actualice sola

Hace falta un hosting donde Next pueda ejecutarse (Vercel y Netlify lo hacen
en su plan gratuito, conectados a este repositorio). Entonces:

- Cada push se publica solo.
- El `revalidate = 60` funciona: el contenido que Bárbara publique aparece
  en la web en un minuto, sin intervención de nadie.

Los cambios para volver a ese modo son revertir las tres opciones de
`next.config.ts` de arriba y devolver `dynamicParams` a `true`. El `.htaccess`
dejaría de usarse; las redirecciones volverían a `redirects()` en la config.

## Sanity

El panel **no se despliega aparte**: es la ruta `/studio` de este mismo
proyecto. Cuando subes `out/`, el panel nuevo va incluido.

El esquema de contenido (tipos de documento y menú del panel) vive en
`src/sanity/`. Cambiarlo requiere reconstruir y volver a subir.

Proyecto de Sanity: `7f7uya6x`, dataset `production`. Las variables van en
`.env.local` (no está en el repo): ver `NEXT_PUBLIC_SANITY_*`. El dominio debe
estar dado de alta en Sanity → API → CORS Origins con *Allow credentials*, o
el panel no autentica.
