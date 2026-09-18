"use strict";

const { GUIDES } = require("../data");
const { guideCard } = require("../lib");
const { pageHero } = require("../layout");

function guiasIndex() {
  const html = `
  ${pageHero({
    eyebrow: "Guías de compra",
    title: "Todas las guías",
    dek: "Criterios para elegir robots aspiradores, mopas eléctricas, limpiadores a vapor y demás productos de limpieza del hogar, sin recomendar una marca concreta.",
  })}
  <section class="section">
    <div class="wrap">
      <div class="card-grid">
        ${GUIDES.map(guideCard).join("\n")}
      </div>
    </div>
  </section>
  `;

  return {
    route: "guias/index.html",
    path: "/guias/",
    title: "Guías de compra",
    description: "Todas las guías de compra de CasaLimpia: robots aspiradores, aspiradores verticales, mopas eléctricas, limpiadores a vapor, recambios, fregonas, limpiadores multiusos, guantes y utensilios, organizadores y aspiradores de mano.",
    breadcrumbsItems: [{ label: "Inicio", href: "/" }, { label: "Guías de compra" }],
    html,
  };
}

module.exports = guiasIndex;
