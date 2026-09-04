/* DPRO VISIT_AHAKI CATALOG ROUTING FIX V2.2
   Purpose: keep the canonical 54 dataset untouched while correcting only
   VISIT_AHAKI presentation destinations before the catalog/proposal runtime renders.
*/
(function (global) {
  "use strict";
  const source = global.DPROSystemsData;
  if (!source || !Array.isArray(source.systems)) return;

  const systems = Object.freeze(source.systems.map((item) => {
    if (String(item.code || "").toUpperCase() !== "VISIT_AHAKI") return item;
    return Object.freeze({
      ...item,
      systemPage: "systems/visit-ahaki.html",
      lpUrl: "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/lp.html",
      flyerHtml: "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/flyer-visit-ahaki.html",
      flyerPdf: "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/DPRO_VISIT_AHAKI_A4_FLYER_V1.0_20260902.pdf",
      previewAsset: "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/DPRO_VISIT_AHAKI_A4_FLYER_MASTER_V2.0_PREVIEW.png"
    });
  }));

  const byCode = new Map(systems.map((item) => [
    String(item.code || "").trim().toUpperCase(),
    item
  ]));

  global.DPROSystemsData = Object.freeze({
    categories: source.categories,
    systems,
    systemCount: systems.length,
    getByCode(code) {
      return byCode.get(String(code == null ? "" : code).trim().toUpperCase()) || null;
    },
    getByCategory(category) {
      const key = String(category || "").trim();
      return systems.filter((item) => item.category === key);
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
