/* DPRO LINE SYSTEMS / PRODUCT 52 ADDON V1.0
 * Loads the locked 51-product runtime at f956c7361b8ef0c719e3b9ae26672ad80b31dfd2,
 * then adds DPRO 訪問マッサージ・鍼灸 as product #52.
 */
(() => {
  "use strict";
  const CORE = "https://cdn.jsdelivr.net/gh/dpromstk2000-lab/dpro-line-systems-site@f956c7361b8ef0c719e3b9ae26672ad80b31dfd2/systems-data.js";

  function patch52Copy() {
    if (typeof document === "undefined") return;
    document.querySelectorAll("[data-p36-count]").forEach(n => n.textContent = "52");
    const replacements = [
      ["51の業種別システム", "52の業種別システム"],
      ["51の業種専用DPROシステム", "52の業種専用DPROシステム"],
      ["51製品データを読み込み中", "52製品データを読み込み中"],
      ["51件の業種別の導入例", "52件の業種別の導入例"],
      ["51システムをすべて見る", "52システムをすべて見る"],
      ["51システム一覧", "52システム一覧"],
      ["51システム", "52システム"],
      ["51製品", "52製品"]
    ];
    if (document.body) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        let value = node.nodeValue || "";
        replacements.forEach(([a,b]) => { value = value.split(a).join(b); });
        if (/^\s*51\s*$/.test(value) && node.parentElement?.matches('[data-p36-count]')) value = value.replace("51","52");
        if (value !== node.nodeValue) node.nodeValue = value;
      });
    }
    let title = document.title || "";
    replacements.forEach(([a,b]) => { title = title.split(a).join(b); });
    document.title = title;
    document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"]').forEach(meta => {
      let value = meta.content || "";
      replacements.forEach(([a,b]) => { value = value.split(a).join(b); });
      meta.content = value;
    });
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
      try {
        const data = JSON.parse(script.textContent || "{}");
        const visit = node => {
          if (!node || typeof node !== "object") return;
          if (Object.prototype.hasOwnProperty.call(node,"numberOfItems") && Number(node.numberOfItems) === 51) node.numberOfItems = 52;
          Object.keys(node).forEach(key => {
            const value = node[key];
            if (typeof value === "string") {
              let v = value;
              replacements.forEach(([a,b]) => { v = v.split(a).join(b); });
              node[key] = v;
            } else if (Array.isArray(value)) value.forEach(visit);
            else if (value && typeof value === "object") visit(value);
          });
        };
        visit(data);
        script.textContent = JSON.stringify(data);
      } catch (_) {}
    });
  }

  function addVisitAhaki(global) {
    const base = global.DPROSystemsData;
    if (!base || !Array.isArray(base.systems)) {
      console.error("DPRO VISIT AHAKI addon: locked 51-product baseline unavailable.");
      patch52Copy();
      return false;
    }
    const exists = typeof base.getByCode === "function" && base.getByCode("VISIT_AHAKI");
    if (!exists) {
      const item = Object.freeze({
        code: "VISIT_AHAKI",
        assetSlug: "visit-ahaki",
        name: "訪問マッサージ・鍼灸",
        category: "medical_pet",
        systemPage: "systems/visit-ahaki.html",
        lpUrl: "systems/visit-ahaki.html",
        flyerHtml: "systems/visit-ahaki.html#documents",
        flyerPdf: "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/DPRO_VISIT_AHAKI_A4_FLYER_V1.0_20260902.pdf",
        demoUrl: "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/demo.html",
        status: "AVAILABLE",
        verificationStatus: "VERIFIED",
        tagline: "毎日の訪問予定・患者・施術者・施術記録・家族連絡を、一つの流れで回す。",
        summary: "訪問マッサージ・訪問鍼灸向けに、新規問い合わせ、患者情報、訪問予定、施術者割当、継続予約、施術記録、家族連絡、変更・キャンセル、担当引継ぎを役割別権限でまとめるDPROシステム。",
        targets: Object.freeze(["訪問マッサージ事業所","訪問鍼灸事業所","在宅施術事業者"]),
        features: Object.freeze(["問い合わせ・患者情報","訪問予定・継続予約","施術者割当・訪問ルート","施術記録・担当引継ぎ","家族連絡・変更受付","権限分離・監査・Demo/Production Guard"]),
        previewAsset: "systems/visit-ahaki.html",
        experienceScreens: Object.freeze([])
      });
      const systems = [...base.systems, item];
      const frozen = Object.freeze(systems);
      const byCode = new Map(frozen.map(x => [String(x.code || "").toUpperCase(), x]));
      global.DPROSystemsData = Object.freeze({
        categories: base.categories,
        systems: frozen,
        systemCount: frozen.length,
        getByCode(code) { return byCode.get(String(code == null ? "" : code).trim().toUpperCase()) || null; },
        getByCategory(category) { const key = String(category || "").trim(); return frozen.filter(x => x.category === key); }
      });
    }
    patch52Copy();
    return global.DPROSystemsData?.systems?.length === 52;
  }

  window.__DPRO_VISIT_AHAKI_52_BOOT__ = () => {
    const ok = addVisitAhaki(window);
    if (!ok) console.error("DPRO VISIT AHAKI addon: expected 52 systems after bootstrap.");
    try { delete window.__DPRO_VISIT_AHAKI_52_BOOT__; } catch (_) {}
  };

  if (document.readyState === "loading") {
    document.write('<script src="' + CORE + '"><\\/script><script>window.__DPRO_VISIT_AHAKI_52_BOOT__();<\\/script>');
  } else {
    const s = document.createElement("script");
    s.src = CORE; s.async = false;
    s.onload = () => window.__DPRO_VISIT_AHAKI_52_BOOT__?.();
    s.onerror = () => console.error("DPRO VISIT AHAKI addon: locked 51-product runtime could not be loaded.");
    document.head.appendChild(s);
  }
})();
