# Pendiente antes de publicar y solicitar el alta en Amazon Afiliados

## Datos que faltan (obligatorios para legal/privacidad)

- **NIF/NIE y nombre o razón social** del titular: hoy son placeholders
  `[PENDIENTE: ...]` en `_build/nav.js` (`SITE.legal`). Se usan en
  [`legal/aviso-legal.html`](legal/aviso-legal.html) y
  [`legal/politica-privacidad.html`](legal/politica-privacidad.html).
- **Domicilio fiscal completo**: mismo sitio.
- **Correo real**: `hola@casalimpia.es` es un placeholder — hoy ese
  dominio no existe. Cambiar `SITE.email` en `_build/nav.js` por un correo
  que sí puedas leer (puede ser un Gmail mientras no haya dominio propio), y
  verificarlo antes de publicarlo en las páginas legales.

Después de rellenar `_build/nav.js`, ejecutar `node build.js` para
regenerar las páginas con los datos correctos.

## Tag de Amazon Afiliados (IMPORTANTE, placeholder sin crear todavía)

`SITE.amazonTag` en `_build/nav.js` vale hoy `casalimpia0a-21`, un
**placeholder inventado para poder generar los enlaces de ejemplo**. El
usuario todavía **no ha creado el Store ID real** para este sitio en el
panel de Amazon Afiliados. Antes de publicar:

1. Crear el Store ID real para CasaLimpia en `afiliados.amazon.es`.
2. Sustituir `casalimpia0a-21` por ese tag real en `_build/nav.js`
   (`SITE.amazonTag`, línea comentada como PLACEHOLDER).
3. Ejecutar `node build.js` para regenerar todos los enlaces de producto
   con el tag correcto — hoy todos los enlaces `?tag=casalimpia0a-21`
   apuntan a un tag que no existe y no va a generar comisión real.

## Dominio

No hay dominio comprado. `SITE.domain` en `_build/nav.js` apunta a un
subdominio provisional de Vercel (`casalimpia.vercel.app`) — todavía sin
desplegar. Para la solicitud de afiliados sirve un subdominio de Vercel,
pero un dominio propio (`.es` o `.com`) da más credibilidad en la revisión
manual de Amazon.

## Cuenta de Amazon Afiliados

Esta web puede usar la MISMA cuenta de Afiliados que los otros sitios de
este directorio (Amazon permite hasta 50 sitios por cuenta), pero necesita
su propio Store ID/tag para medir resultados por separado (ver sección
anterior: todavía no creado).

Una vez creado el tag real y publicado el sitio en Vercel, hay que añadir
la URL publicada en `afiliados.amazon.es` → "Tus páginas web o apps".

## Contenido para llegar y mantener el mínimo de Amazon

Hay 25 páginas de contenido real (10 guías + 5 artículos de blog + inicio +
guías-índice + blog-índice + catálogo de productos + 3 legales + 404 sin
indexar, más 118 fichas de producto individuales y 10 comparativas),
muy por encima del mínimo de 10 páginas que exige el programa.

## Enlaces de afiliado (mínimo viable, sin PA-API)

Cada guía tiene una sección "Productos que cumplen estos criterios" con
10-12 productos reales por guía (`products` en `_build/data.js`, 118
productos en total), enlazados con
`https://www.amazon.es/dp/<ASIN>?tag=<SITE.amazonTag>` (ver aviso del tag
placeholder arriba). Todas las páginas del sitio muestran además un
bloque "Lo más recomendado de CasaLimpia" con un producto por categoría
destacada.

Los precios y valoraciones mostrados son una foto fija tomada al añadir
cada producto (verificados en Amazon.es en septiembre de 2026: ASIN,
título e imagen reales), no datos en vivo — hay que revisarlos de vez en
cuando a mano, sobre todo en categorías con mucha rotación de modelos
(robots aspiradores, aspiradores de mano). Siguiente paso cuando haya
PA-API: sustituir esos datos estáticos por una consulta automática en
tiempo de build.

## Otras cosas menores

- `SITE.social` (Instagram/Pinterest) está vacío.
- No hay fotografías propias: el sitio usa solo iconos SVG a propósito,
  salvo las fotos de producto que vienen directamente de Amazon.
- Analítica: no hay ningún script de analítica instalado todavía.
- No tiene páginas "Sobre mí" ni "Contacto" (misma decisión que en los
  sitios hermanos): el correo de contacto vive solo en las páginas
  legales.
- El icono del logo (`icon("shield")` en `_build/layout.js`) se reutilizó
  del sitio plantilla (HogarSeguro) sin cambiar: no es incorrecto para
  limpieza, pero si se quiere un icono más temático (una gota, una
  escoba) habría que añadirlo a `_build/lib.js` (función `icon`) y
  referenciarlo en `headerHtml`/`footerHtml` de `_build/layout.js`.
