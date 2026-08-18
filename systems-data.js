/* DPRO PRODUCT SITE / DPRO MEDICAL CATALOG ADDON V1.1
 * Keeps the current 50-system catalog pinned to commit d8ac2578c4b713493dd80315f8ba7e6d3bfcc269,
 * adds DPRO MEDICAL as the 51st product, and normalizes visible/SEO counts to 51.
 */
(() => {
  "use strict";

  const CORE = "https://cdn.jsdelivr.net/gh/dpromstk2000-lab/dpro-line-systems-site@d8ac2578c4b713493dd80315f8ba7e6d3bfcc269/systems-data.js";

  function replaceText(root, from, to) {
    if (!root || !from) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if ((node.nodeValue || "").includes(from)) {
        node.nodeValue = node.nodeValue.split(from).join(to);
      }
    });
  }

  function patchStructuredData() {
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
      try {
        const data = JSON.parse(script.textContent || "");
        const visit = node => {
          if (!node || typeof node !== "object") return;
          if (typeof node.name === "string") {
            node.name = node.name
              .replaceAll("50システム", "51システム")
              .replaceAll("50の業種別", "51の業種別");
          }
          if (typeof node.description === "string") {
            node.description = node.description
              .replaceAll("50システム", "51システム")
              .replaceAll("50の業種別", "51の業種別")
              .replaceAll("50の完成", "51の完成");
          }
          if (Object.prototype.hasOwnProperty.call(node, "numberOfItems") && node.numberOfItems === 50) {
            node.numberOfItems = 51;
          }
          Object.values(node).forEach(value => {
            if (Array.isArray(value)) value.forEach(visit);
            else if (value && typeof value === "object") visit(value);
          });
        };
        visit(data);
        script.textContent = JSON.stringify(data);
      } catch (_) {}
    });
  }

  function patch51Copy() {
    if (typeof document === "undefined") return;

    document.title = String(document.title || "")
      .replaceAll("50システム", "51システム")
      .replaceAll("50の業種別", "51の業種別");

    document.querySelectorAll(
      'meta[name="description"],meta[property="og:title"],meta[property="og:description"]'
    ).forEach(meta => {
      meta.content = String(meta.content || "")
        .replaceAll("50システム", "51システム")
        .replaceAll("50の業種別", "51の業種別")
        .replaceAll("50の完成", "51の完成");
    });

    if (document.body) {
      [
        ["50の業種別システム", "51の業種別システム"],
        ["50の業種専用DPROシステム", "51の業種専用DPROシステム"],
        ["50製品データを読み込み中", "51製品データを読み込み中"],
        ["50システム一覧", "51システム一覧"]
      ].forEach(([from,to]) => replaceText(document.body, from, to));
    }

    patchStructuredData();
  }

  function addMedical(global) {
    const base = global.DPROSystemsData;
    if (!base || !Array.isArray(base.systems)) {
      console.error("DPRO MEDICAL addon: base systems data unavailable.");
      return;
    }

    if (!(typeof base.getByCode === "function" && base.getByCode("MEDICAL"))) {
      const medical = Object.freeze({
        code: "MEDICAL",
        assetSlug: "medical",
        name: "DPRO MEDICAL",
        category: "medical_pet",
        systemPage: "systems/medical.html",
        lpUrl: "systems/medical.html",
        flyerHtml: "",
        flyerPdf: "",
        demoUrl: "https://dpromstk2000-lab.github.io/dpro-medical-standard/medical-public-demo.html",
        status: "AVAILABLE",
        verificationStatus: "VERIFIED",
        tagline: "予約・WEB問診・来院受付・院内進行・医院管理・医院HPまでを、一つの医療COREにつなぐ。",
        summary: "医療機関向けに、患者スマホ、予約、WEB問診、受付、待ち状況、院内進行、医院管理PC、受付iPad、スタッフ画面、医院HPをONE CORE / ONE CONTRACTでまとめるDPROシステム。",
        targets: Object.freeze([
          "医療機関","一般・内科","眼科","小児科","整形外科","美容医療","婦人科・女性医療"
        ]),
        features: Object.freeze([
          "予約・当日受付","WEB問診","院内進行・待ち状況","患者スマホ","医院管理PC・受付iPad","医院HP・6診療PRESET"
        ]),
        previewAsset: "systems/medical.html",
        experienceScreens: Object.freeze([])
      });

      const systems = base.systems.slice();
      const dentalIndex = systems.findIndex(item => item && item.code === "DENTAL");
      systems.splice(dentalIndex >= 0 ? dentalIndex + 1 : systems.length, 0, medical);

      const frozenSystems = Object.freeze(systems);
      const byCode = new Map(frozenSystems.map(item => [String(item.code || "").toUpperCase(), item]));
      const categories = base.categories;

      global.DPROSystemsData = Object.freeze({
        categories,
        systems: frozenSystems,
        systemCount: frozenSystems.length,
        getByCode(code) {
          return byCode.get(String(code == null ? "" : code).trim().toUpperCase()) || null;
        },
        getByCategory(category) {
          const key = String(category || "").trim();
          return frozenSystems.filter(item => item.category === key);
        }
      });
    }

    patch51Copy();
  }

  if (typeof document !== "undefined" && document.readyState === "loading") {
    const inline = "(" + addMedical.toString() + ")(window);";
    document.write(
      '<script src="' + CORE + '"><\\/script>' +
      '<script>' + inline + '<\\/script>'
    );
  } else if (typeof document !== "undefined") {
    const script = document.createElement("script");
    script.src = CORE;
    script.async = false;
    script.onload = () => addMedical(window);
    script.onerror = () => console.error("DPRO MEDICAL addon: pinned catalog could not be loaded.");
    (document.head || document.documentElement).appendChild(script);
  }
})();
