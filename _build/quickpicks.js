"use strict";

// Bloques de conversión: "Elige rápido" (arriba de cada guía) y "Sigue con la
// guía" (al final de cada artículo). Todo sale de data.js, nada se escribe a mano.

const { GUIDES } = require("./data");
const { escapeHtml, amazonProductUrl, productUrl, ratingNumber, icon } = require("./lib");

const fmtPrice = (p) => `${String(p.price).replace(".", ",")} €`;

// Devuelve { choice, value, cheap } con productos distintos de la guía.
function pickWinners(products) {
  const list = (products || []).filter((p) => ratingNumber(p.rating) !== null && !isNaN(Number(p.price)));
  if (list.length < 3) return null;
  const prices = list.map((p) => Number(p.price)).sort((a, b) => a - b);
  const median = prices[Math.floor(prices.length / 2)];
  const used = new Set();
  const take = (arr, key) => {
    const c = arr.filter((p) => !used.has(p.asin)).sort(key)[0];
    if (c) used.add(c.asin);
    return c;
  };
  // Nuestra elección: la mejor valoración; si empatan, la más cercana a la gama media.
  const choice = take(
    list,
    (a, b) =>
      ratingNumber(b.rating) - ratingNumber(a.rating) ||
      Math.abs(Number(a.price) - median) - Math.abs(Number(b.price) - median)
  );
  // Mejor calidad-precio: más valoración por euro (con raíz para no premiar solo lo barato).
  const good = list.filter((p) => ratingNumber(p.rating) >= 4.2);
  const value = take(
    good.length ? good : list,
    (a, b) =>
      (ratingNumber(b.rating) - 3.5) / Math.sqrt(Number(b.price)) -
      (ratingNumber(a.rating) - 3.5) / Math.sqrt(Number(a.price))
  );
  // Más económico: el más barato con valoración decente.
  const okCheap = list.filter((p) => ratingNumber(p.rating) >= 4.0);
  const cheap = take(okCheap.length ? okCheap : list, (a, b) => Number(a.price) - Number(b.price));
  return choice && value && cheap ? { choice, value, cheap } : null;
}

function quickPicks(g) {
  const w = pickWinners(g.products);
  if (!w) return "";
  const rows = [
    ["Nuestra elección", w.choice],
    ["Mejor calidad-precio", w.value],
    ["Más económico", w.cheap],
  ]
    .map(
      ([label, p]) => `<tr>
          <td data-label="Elección"><span class="quickpick-badge">${label}</span></td>
          <td data-label="Producto"><a class="quickpick-product" href="${productUrl(p)}"><img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy" width="56" height="56"><span>${escapeHtml(p.title)}</span></a></td>
          <td data-label="Valoración">${escapeHtml(p.rating)}</td>
          <td data-label="Precio">${escapeHtml(fmtPrice(p))}</td>
          <td class="quickpick-cta"><a class="btn btn-accent" href="${amazonProductUrl(p.asin)}" target="_blank" rel="nofollow sponsored noopener">Ver en Amazon ${icon("arrow")}</a></td>
        </tr>`
    )
    .join("\n");
  return `<div class="content-section quickpicks">
        <h2>Elige rápido</h2>
        <p class="quickpicks-note">Si tienes prisa: estas son las tres opciones que mejor se defienden en esta guía según su valoración en Amazon y su precio. Precios orientativos, compruébalos en Amazon.</p>
        <div class="quickpicks-scroll"><table class="quickpicks-table">
          <thead><tr><th>Elección</th><th>Producto</th><th>Valoración</th><th>Precio</th><th></th></tr></thead>
          <tbody>
        ${rows}
          </tbody>
        </table></div>
      </div>`;
}

// ---- Guías relacionadas con cada artículo (asignadas a mano por slug) ----
const ARTICLE_GUIDES = {
  "cuanto-dura-realmente-un-robot-aspirador": [
    "robots-aspiradores",
    "recambios-y-filtros-para-robots-aspiradores"
  ],
  "errores-comunes-al-limpiar-segun-el-tipo-de-suelo": [
    "limpiadores-multiusos-y-desinfectantes",
    "mopas-electricas"
  ],
  "como-organizar-el-armario-de-la-limpieza": [
    "organizadores-de-productos-de-limpieza"
  ],
  "limpieza-semanal-vs-limpieza-profunda-como-repartir-el-tiempo": [
    "guantes-y-utensilios-de-limpieza",
    "limpiadores-a-vapor"
  ],
  "vinagre-bicarbonato-y-otros-remedios-caseros-que-funcionan-de-verdad": [
    "limpiadores-multiusos-y-desinfectantes"
  ],
  "robot-aspirador-se-queda-atascado-que-hacer": [
    "robots-aspiradores"
  ],
  "aspirador-vertical-cuanta-autonomia-necesitas": [
    "aspiradores-verticales-sin-cable"
  ],
  "superficies-donde-no-usar-limpiador-a-vapor": [
    "limpiadores-a-vapor"
  ],
  "mantener-filtros-robot-aspirador-que-dure-mas": [
    "recambios-y-filtros-para-robots-aspiradores"
  ],
  "mopa-electrica-vs-fregona-tradicional-cuando-compensa-cada-una": [
    "mopas-electricas",
    "fregonas-y-cubos-con-escurridor"
  ],
  "cuando-cambiar-mopas-y-panos-de-microfibra": [
    "mopas-electricas",
    "recambios-y-filtros-para-robots-aspiradores"
  ],
  "por-que-tu-robot-aspirador-ya-no-succiona-igual": [
    "robots-aspiradores",
    "recambios-y-filtros-para-robots-aspiradores"
  ],
  "limpieza-antes-o-despues-de-una-mudanza": [
    "limpiadores-multiusos-y-desinfectantes",
    "guantes-y-utensilios-de-limpieza"
  ],
  "guantes-de-limpieza-cuando-son-realmente-necesarios": [
    "guantes-y-utensilios-de-limpieza"
  ],
  "como-elegir-orden-de-limpieza-por-habitacion": [
    "limpiadores-multiusos-y-desinfectantes",
    "fregonas-y-cubos-con-escurridor"
  ]
};

function relatedGuides(a, n = 2) {
  return (ARTICLE_GUIDES[a.slug] || [])
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter(Boolean)
    .slice(0, n);
}

function relatedBlock(a) {
  const gs = relatedGuides(a);
  if (!gs.length) return "";
  const items = gs
    .map((g) => {
      const w = pickWinners(g.products);
      return `<li>
          <a class="related-guide-title" href="/guias/${g.slug}.html">${escapeHtml(g.title)}</a>
          <span class="related-guide-dek">${escapeHtml(g.dek || "")}</span>
          ${w ? `<span class="related-guide-pick">Nuestra elección: <a href="${productUrl(w.choice)}">${escapeHtml(w.choice.title)}</a> (${escapeHtml(w.choice.rating)}, ${escapeHtml(fmtPrice(w.choice))})</span>` : ""}
        </li>`;
    })
    .join("\n");
  return `<div class="content-section related-guides">
        <h2>¿Ya sabes qué necesitas? Mira las mejores opciones</h2>
        <ul class="related-guide-list">
        ${items}
        </ul>
      </div>`;
}

module.exports = { quickPicks, relatedBlock, relatedGuides, pickWinners };
