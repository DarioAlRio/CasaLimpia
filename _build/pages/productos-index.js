// Etiquetas cortas para los botones de filtro.
const SHORT_LABELS = {
  "robots-aspiradores": "Robots aspiradores",
  "aspiradores-verticales-sin-cable": "Aspiradores sin cable",
  "mopas-electricas": "Mopas eléctricas",
  "limpiadores-a-vapor": "Vaporetas",
  "recambios-y-filtros-para-robots-aspiradores": "Recambios robot",
  "fregonas-y-cubos-con-escurridor": "Fregonas",
  "limpiadores-multiusos-y-desinfectantes": "Limpiadores",
  "guantes-y-utensilios-de-limpieza": "Utensilios",
  "organizadores-de-productos-de-limpieza": "Organizadores",
  "aspiradores-de-mano-y-para-coche": "Aspiradores de mano",
  "trampas-para-mosquitas-de-la-fruta": "Antimosquitas"
};
"use strict";

const { SITE } = require("../nav");
const { GUIDES } = require("../data");
const { escapeHtml, productCard } = require("../lib");
const { pageHero } = require("../layout");

function productosIndex() {
  const allProducts = GUIDES.flatMap((g) =>
    g.products.map((p) => ({ ...p, category: g.slug, categoryTitle: g.title }))
  );

  const filters = GUIDES.map(
    (g) => `<button type="button" class="filter-btn" data-filter="${g.slug}">${escapeHtml(SHORT_LABELS[g.slug] || g.title)} (${g.products.length})</button>`
  ).join("\n        ");

  const html = `
  ${pageHero({
    eyebrow: "Catálogo",
    title: "Todos los productos seleccionados",
    dek: `${allProducts.length} productos repartidos en nuestras guías de compra. Filtra por categoría o entra en cada ficha para ver nuestra puntuación.`,
  })}
  <section class="section">
    <div class="wrap">
      <div class="filter-bar" role="group" aria-label="Filtrar por categoría" data-product-filter>
        <button type="button" class="filter-btn is-active" data-filter="all">Todos (${allProducts.length})</button>
        ${filters}
      </div>
      <div class="product-grid">
        ${allProducts
          .map((p) => `<div class="product-card-wrap" data-category="${p.category}">${productCard(p)}</div>`)
          .join("\n")}
      </div>
    </div>
  </section>
  `;

  return {
    route: "productos/index.html",
    path: "/productos/",
    title: "Todos los productos",
    description: `Catálogo completo de los ${allProducts.length} productos seleccionados en ${SITE.name}, filtrable por categoría.`,
    breadcrumbsItems: [{ label: "Inicio", href: "/" }, { label: "Productos" }],
    html,
  };
}

module.exports = productosIndex;
