"use strict";

// Datos del negocio y estructura de navegación. Todo lo que cambie de marca
// (nombre, dominio, tag de afiliado, datos fiscales) se toca aquí, no en las páginas.

const SITE = {
  name: "CasaLimpia",
  claim: "Guías y comparativas para elegir robots aspiradores y productos de limpieza sin perder tiempo ni dinero",
  description:
    "Guías de compra y comparativas independientes de robots aspiradores, mopas eléctricas, limpiadores a vapor y aspiradores verticales para mantener tu casa limpia sin gastar de más.",
  // Dominio provisional: no hay dominio propio comprado todavía.
  domain: "https://casalimpia.vercel.app",
  locale: "es_ES",
  lang: "es",
  email: "hola@casalimpia.es", // PENDIENTE: crear buzón real y verificarlo, ver PENDIENTE.md
  // PLACEHOLDER: Store ID provisional. El usuario todavía NO ha creado el
  // Store ID real en el panel de Amazon Afiliados para este sitio.
  // SUSTITUIR por el tag real en cuanto se cree, ver PENDIENTE.md.
  amazonTag: "casalimpia0a-21",
  amazonDisclaimer:
    "Como Afiliado de Amazon, CasaLimpia obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables.",
  social: {
    instagram: null,
    pinterest: null,
  },
  // Datos fiscales del titular: pendientes, ver PENDIENTE.md.
  legal: {
    titular: "[PENDIENTE: nombre y apellidos o razón social]",
    nif: "[PENDIENTE: NIF/NIE]",
    domicilio: "[PENDIENTE: domicilio fiscal completo]",
    registro: null,
  },
};

// Menú principal. Cada guía y artículo real vive en _build/data.js; aquí solo
// se listan los grupos y los enlaces fijos.
const NAV = [
  { label: "Guías de compra", href: "/guias/" },
  { label: "Productos", href: "/productos/" },
  { label: "Blog", href: "/blog/" },
];

const FOOT = {
  columnas: [
    {
      titulo: "Guías de compra",
      enlaces: [], // se rellena en build.js a partir de DATA.guides
    },
    {
      titulo: "Blog",
      enlaces: [], // se rellena en build.js a partir de DATA.articles
    },
    {
      titulo: "Legal",
      enlaces: [
        { label: "Aviso legal", href: "/legal/aviso-legal.html" },
        { label: "Política de privacidad", href: "/legal/politica-privacidad.html" },
        { label: "Política de cookies", href: "/legal/politica-cookies.html" },
      ],
    },
  ],
};

module.exports = { SITE, NAV, FOOT };
