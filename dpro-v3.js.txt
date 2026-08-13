/* DPRO PRODUCT SITE V3.0 — COMMON BEHAVIOR */
(function (global) {
  "use strict";

  const doc = typeof document !== "undefined" ? document : null;
  const win = typeof window !== "undefined" ? window : null;

  function qs(selector, root) { return (root || doc)?.querySelector(selector) || null; }
  function qsa(selector, root) { return Array.from((root || doc)?.querySelectorAll(selector) || []); }
  function reducedMotion() { return !!(win && win.matchMedia && win.matchMedia("(prefers-reduced-motion: reduce)").matches); }

  function initMobileNav(root) {
    if (!doc) return;
    const scope = root || doc;
    qsa("[data-dpro-nav-toggle]", scope).forEach((button) => {
      const targetSelector = button.getAttribute("data-dpro-nav-toggle");
      const nav = targetSelector ? qs(targetSelector, scope) || qs(targetSelector, doc) : null;
      if (!nav || button.dataset.dproBound === "1") return;
      button.dataset.dproBound = "1";
      const sync = (open) => {
        nav.hidden = !open;
        button.setAttribute("aria-expanded", String(open));
      };
      if (!button.hasAttribute("aria-expanded")) sync(!nav.hidden);
      button.addEventListener("click", () => sync(button.getAttribute("aria-expanded") !== "true"));
    });
  }

  function initProgressiveReveal(root) {
    if (!doc) return;
    const scope = root || doc;
    const items = qsa("[data-dpro-reveal]", scope);
    if (!items.length) return;
    if (reducedMotion() || !("IntersectionObserver" in global)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    doc.documentElement.classList.add("dpro-reveal-ready");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
  }

  function safeFrameUrl(value) {
    if (!value || !doc) return null;
    try {
      const parsed = new URL(value, doc.baseURI);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
      return parsed.href;
    } catch (_) { return null; }
  }

  function initLiveIframes(root) {
    if (!doc) return;
    const scope = root || doc;
    qsa("[data-dpro-live-load]", scope).forEach((button) => {
      if (button.dataset.dproBound === "1") return;
      const shellSelector = button.getAttribute("data-dpro-live-load");
      const shell = shellSelector ? qs(shellSelector, scope) || qs(shellSelector, doc) : button.closest(".dpro-live-preview");
      if (!shell) return;
      button.dataset.dproBound = "1";
      button.addEventListener("click", () => {
        if (shell.querySelector("iframe")) return;
        const url = safeFrameUrl(button.dataset.src || shell.dataset.src);
        if (!url) return;
        const frame = doc.createElement("iframe");
        frame.src = url;
        frame.loading = "lazy";
        frame.title = button.dataset.title || shell.dataset.title || "DPRO live preview";
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.setAttribute("allow", "clipboard-read; clipboard-write");
        shell.replaceChildren(frame);
      });
    });
  }

  function initStickyCTA(root) {
    if (!doc) return;
    const scope = root || doc;
    qsa("[data-dpro-sticky-cta]", scope).forEach((bar) => {
      const sentinelSelector = bar.getAttribute("data-dpro-sticky-cta");
      const sentinel = sentinelSelector ? qs(sentinelSelector, doc) : null;
      if (!sentinel || !("IntersectionObserver" in global)) return;
      const observer = new IntersectionObserver(([entry]) => {
        bar.toggleAttribute("data-active", !entry.isIntersecting);
        bar.hidden = entry.isIntersecting;
      });
      observer.observe(sentinel);
    });
  }

  function normalizeSearch(value) {
    return String(value || "").normalize("NFKC").trim().toLocaleLowerCase("ja");
  }

  function initSearchFilter(root) {
    if (!doc) return;
    const scope = root || doc;
    qsa("[data-dpro-search]", scope).forEach((group) => {
      if (group.dataset.dproBound === "1") return;
      const input = qs("[data-dpro-search-input]", group);
      const filters = qsa("[data-dpro-filter]", group);
      const items = qsa("[data-dpro-search-item]", group);
      if (!items.length) return;
      group.dataset.dproBound = "1";
      const apply = () => {
        const query = normalizeSearch(input?.value);
        const active = filters.find((el) => el.matches(":checked"))?.value || group.dataset.activeFilter || "";
        items.forEach((item) => {
          const haystack = normalizeSearch(item.dataset.searchText || item.textContent);
          const category = item.dataset.category || "";
          const matchesText = !query || haystack.includes(query);
          const matchesCategory = !active || active === "all" || category === active;
          item.hidden = !(matchesText && matchesCategory);
        });
      };
      input?.addEventListener("input", apply);
      filters.forEach((filter) => filter.addEventListener("change", apply));
      apply();
    });
  }

  function renderCount(root) {
    if (!doc) return 0;
    const scope = root || doc;
    const count = global.DPROSystemsData?.systems?.length || 0;
    qsa("[data-dpro-system-count]", scope).forEach((node) => { node.textContent = String(count); });
    return count;
  }

  function joinPath() {
    return Array.from(arguments)
      .filter((part) => part !== undefined && part !== null && String(part) !== "")
      .map((part, index) => String(part).replace(index === 0 ? /\/+$/g : /^\/+|\/+$/g, ""))
      .filter(Boolean)
      .join("/");
  }

  function resolveAssetPath(assetPath, basePath) {
    const asset = String(assetPath || "").trim();
    if (!asset) return "";
    try {
      if (/^(?:https?:)?\/\//i.test(asset)) return asset;
      return joinPath(basePath || ".", asset);
    } catch (_) { return asset; }
  }

  function init(root) {
    initMobileNav(root);
    initProgressiveReveal(root);
    initLiveIframes(root);
    initStickyCTA(root);
    initSearchFilter(root);
    renderCount(root);
  }

  const api = Object.freeze({
    init,
    initMobileNav,
    initProgressiveReveal,
    initLiveIframes,
    initStickyCTA,
    initSearchFilter,
    renderCount,
    joinPath,
    resolveAssetPath
  });

  global.DPROV3 = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;

  if (doc) {
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", () => init(doc), { once: true });
    else init(doc);
  }
})(typeof window !== "undefined" ? window : globalThis);

/* DPRO PRODUCT SITE V3.1 — CUSTOMER-FACING COPY CLEANUP
   Removes internal implementation / QA wording from the public product site
   while preserving URLs, functions, prices and operating facts. */
(function () {
  "use strict";

  const doc = typeof document !== "undefined" ? document : null;
  if (!doc) return;

  const qs = (selector, root) => (root || doc).querySelector(selector);
  const qsa = (selector, root) => Array.from((root || doc).querySelectorAll(selector));
  const text = (node) => (node ? String(node.textContent || "").trim() : "");
  const setText = (node, value) => { if (node) node.textContent = value; };

  function findSectionByKicker(label) {
    return qsa(".core-section").find((section) => {
      const kicker = qs(".core-kicker", section);
      return kicker && text(kicker).includes(label);
    }) || null;
  }

  function replaceTextNodes(root, rules) {
    if (!root) return;
    const walker = doc.createTreeWalker(root, 4);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script,style,noscript")) return;
      let value = node.nodeValue || "";
      rules.forEach(([pattern, replacement]) => {
        value = value.replace(pattern, replacement);
      });
      node.nodeValue = value;
    });
  }

  function cleanHomePage() {
    if (!doc.body.classList.contains("core-home")) return;

    const live = qs("#live-demo");
    if (live) {
      const kicker = qs(".core-kicker", live);
      if (kicker && /ON DEMAND/i.test(text(kicker))) setText(kicker, "REAL SCREEN / DEMO");

      const copy = qs(".core-heading p:last-child", live);
      setText(copy, "代表的なデモ画面を、実際に操作してご確認いただけます。");

      const meta = qsa(".core-demo-meta span", live);
      if (meta[1]) setText(meta[1], "実際の画面を操作できます");

      qsa(".dpro-live-preview__placeholder .dpro-muted", live).forEach((node) => {
        setText(node, "ボタンを押すと、実際の画面をご確認いただけます。");
      });
    }

    const priceCopy = qs("#price-guide .core-heading p:last-child");
    if (priceCopy && /現行の標準料金/.test(text(priceCopy))) {
      setText(priceCopy, "標準料金をサービス別に整理しています。追加機能や個別開発は内容により別途お見積りします。");
    }
  }

  function cleanCatalogPage() {
    const main = qs("main[data-dpro-search]");
    if (!main) return;

    const heroEyebrow = qs(".hero .eyebrow");
    if (heroEyebrow && /V3\.0/.test(text(heroEyebrow))) setText(heroEyebrow, "DPRO PRODUCT CATALOG");

    qsa(".hero p").forEach((node) => {
      if (/SYSTEM CODE|正式データ/.test(text(node))) {
        setText(node, "業種名・お悩み・主要機能から検索。カテゴリ絞り込みとDPRO FINDERで、条件に近い候補をすぐ確認できます。");
      }
    });

    const finder = qs("#finder");
    if (finder) {
      setText(qs(".section-head h2", finder), "2項目から、あなたに合う候補を絞り込み。");
      setText(qs(".section-head p:not(.eyebrow)", finder), "業種と改善したいことを選ぶと、条件に近いDPROシステムを確認できます。");

      const disabled = qs(".finder-disabled", finder);
      if (disabled) disabled.remove();

      const note = qs(".finder-note", finder);
      setText(note, "※ 条件に近い候補を表示します。詳しい適合内容はご相談時に確認します。");
    }

    qsa(".section-head p", main).forEach((node) => {
      if (/CENTRAL LOCKED|正式データから静的出力/.test(text(node))) {
        setText(node, "各製品の機能・料金・デモをご確認いただけます。");
      }
    });
  }

  function cleanSystemOverviewPage() {
    if (!doc.body.classList.contains("core-system")) return;

    const live = qs("#live-demo");
    if (live) {
      const kicker = qs(".core-kicker", live);
      if (kicker && /ON DEMAND/i.test(text(kicker))) setText(kicker, "REAL SCREEN / DEMO");
      setText(qs(".core-heading p:last-child", live), "代表例として、ペットサロンの会員画面を実際に操作してご確認いただけます。");
      qsa(".dpro-live-preview__placeholder .dpro-muted", live).forEach((node) => {
        setText(node, "ボタンを押すと、実際の画面をご確認いただけます。");
      });
    }

    const why = findSectionByKicker("WHY DPRO");
    if (why) {
      setText(qs(".core-heading p:last-child", why), "業種ごとの製品ページから、機能・料金・デモを分かりやすく確認できます。");
      qsa(".core-card p", why).forEach((node) => {
        if (/正式ページ/.test(text(node))) {
          setText(node, text(node).replace("正式ページ", "製品ページ"));
        }
      });
    }
  }

  function cleanLinePage() {
    if (!doc.body.classList.contains("core-line")) return;
    const setupCopy = qs("#setup .core-heading p:last-child");
    if (setupCopy && /現行サービス/.test(text(setupCopy))) {
      setText(setupCopy, "店舗情報からリッチメニュー、予約・相談への導線まで、実際の運用に合わせて整えます。");
    }
  }

  function cleanWebsitePage() {
    if (!doc.body.classList.contains("core-web")) return;

    const heroLead = qs(".core-hero__lead");
    if (heroLead && /正式実装|導入仕様/.test(text(heroLead))) {
      setText(heroLead, "ホームページは「見られるだけ」で終わらせず、検索から店舗情報を確認し、LINE・相談・予約へ進める入口として設計します。DPRO SYSTEMとの連携内容も、現在の運用を確認しながらご提案します。");
    }

    qsa(".core-proof span").forEach((node) => {
      if (/連携範囲は仕様確認/.test(text(node))) setText(node, "連携内容は事前確認");
    });

    qsa("#plans .core-card p").forEach((node) => {
      if (/正式仕様/.test(text(node))) {
        setText(node, "LINE・DPRO SYSTEMとの導線・連携を含む運用型構成。連携内容は、現在の運用を確認しながら決めます。");
      }
    });

    qsa(".core-table td").forEach((node) => {
      if (/正式実装|未実装の自動同期/.test(text(node))) {
        setText(node, "予約やLINEへの導線など、必要な連携内容を確認しながら設計します。");
      } else if (/正式な入口へ案内/.test(text(node))) {
        setText(node, "LINE相談、問い合わせ、予約など、次の行動へ分かりやすく案内。");
      }
    });

    const samples = qs("#samples");
    if (samples) {
      setText(qs(".core-heading h2", samples), "実際のホームページ制作例をご覧いただけます。");
      setText(qs(".core-heading p:last-child", samples), "気になる制作例を選ぶと、実際のホームページをご覧いただけます。");
    }

    const boundary = findSectionByKicker("BOUNDARY / NO OVERCLAIM");
    if (boundary) {
      setText(qs(".core-kicker", boundary), "CONNECTION GUIDE");
      setText(qs(".core-heading h2", boundary), "必要な連携内容は、導入前に確認します。");
      setText(qs(".core-heading p:last-child", boundary), "予約やお知らせなど、店舗に必要な導線を確認しながら構成します。");

      const cards = qsa(".core-card", boundary);
      const copy = [
        ["01", "現在の導線を活用", "現在お使いのホームページやLINEなども確認し、活かせる導線はそのまま活用します。"],
        ["02", "必要な連携を確認", "営業時間、お知らせ、予約など、必要な項目を相談しながら決めます。"],
        ["03", "できることを明確に", "導入前にできること・できないことを確認し、分かりやすくご案内します。"]
      ];
      cards.slice(0, 3).forEach((card, index) => {
        const row = copy[index];
        setText(qs(".core-card__num", card), row[0]);
        setText(qs("h3", card), row[1]);
        setText(qs("p", card), row[2]);
      });
    }
  }

  function cleanProductPages() {
    const main = qs("main");
    if (!main || !qs(".ps-hero", main)) return;

    qsa(".ps-status", main).forEach((node) => {
      setText(node, text(node).replace(/VERIFIED DEMO/g, "LIVE DEMO"));
    });

    qsa(".ps-live-role", main).forEach((node) => {
      setText(node, text(node).replace(/VERIFIED DEMO/g, "LIVE DEMO"));
    });

    qsa(".ps-live-placeholder h4", main).forEach((node) => {
      if (/VERIFIED LIVE DEMO/.test(text(node))) setText(node, "LIVE DEMO");
    });

    qsa(".ps-preview-card p", main).forEach((node) => {
      if (/初期表示|正式.*DEMO|確認済み.*DEMO|読み込みません/.test(text(node))) {
        setText(node, "ボタンを押すと、実際のデモ画面を操作できます。");
      }
    });

    qsa(".ps-preview-note", main).forEach((node) => {
      if (/重く|必要時|ロード/.test(text(node))) setText(node, "ボタンから実画面を確認");
    });

    qsa("[data-dpro-live-load]", main).forEach((button) => {
      if (/LIVE画面を読み込む/.test(text(button))) setText(button, "実画面を開く");
    });

    const problemsCopy = qs("#problems .ps-section-heading p:last-child", main);
    if (problemsCopy && /正式.*機能/.test(text(problemsCopy))) {
      setText(problemsCopy, "現場で起きやすい課題を、DPROの仕組みで整理します。");
    }

    const functionsCopy = qs("#functions .ps-section-heading p:last-child", main);
    if (functionsCopy && /(FOUNDATION|CENTRAL|正式実装|事実範囲|推測の機能|正式\d+機能|正式な\d+機能)/.test(text(functionsCopy))) {
      setText(functionsCopy, "この業種で使う主な機能を、実際の運用に沿って分かりやすくご紹介します。");
    }

    const liveCopy = qs("#live .ps-section-heading p:last-child", main);
    if (liveCopy) setText(liveCopy, "実際のデモ画面で、操作の流れをご確認いただけます。");

    qsa("#live .ps-live-placeholder p", main).forEach((node) => {
      if (/必要時|読み込|DEMO/.test(text(node))) {
        setText(node, "ボタンを押すと、実際のデモ画面を操作できます。");
      }
    });

    qsa("#live .ps-live-copy p", main).forEach((node) => {
      let value = text(node);
      value = value
        .replace(/^確認済みの正式LIVE DEMOで/, "デモ画面で")
        .replace(/^確認済みLIVE DEMOで/, "デモ画面で")
        .replace(/^正式LIVE DEMOで/, "デモ画面で")
        .replace(/^正式DEMOで/, "デモ画面で");
      setText(node, value);
    });

    qsa("#faq details", main).forEach((details) => {
      const summary = qs("summary", details);
      const summaryText = text(summary);
      if (/iframe|一斉に読み込/.test(summaryText)) {
        details.remove();
        return;
      }

      const answer = qs("p", details);
      if (summary && /正式DEMO|LIVE DEMO/.test(summaryText)) {
        setText(summary, "実際の画面を確認できますか？");
      }
      if (answer && /(必要時|正式DEMO|正式LIVE DEMO|確認済み.*DEMO URL)/.test(text(answer))) {
        setText(answer, "はい。このページのデモから、実際の画面と操作感をご確認いただけます。");
      }
      if (answer && /(MOBILE FIRST|390px|主要タップ領域)/.test(text(answer))) {
        setText(answer, "はい。スマートフォンでも見やすく、主要な操作をしやすい画面設計です。");
      }
      if (answer && /(固定導線|A4チラシHTML|A4 PDF)/.test(text(answer))) {
        setText(answer, "はい。営業資料やA4チラシ、PDF資料をページ下部からご確認いただけます。");
      }
    });

    const productRules = [
      [/確認済みの正式LIVE DEMO/g, "実際のデモ画面"],
      [/確認済みの正式DEMO/g, "実際のデモ画面"],
      [/確認済みLIVE DEMO/g, "実際のデモ画面"],
      [/正式LIVE DEMO/g, "デモ画面"],
      [/正式DEMO/g, "デモ画面"],
      [/6つの正式機能/g, "6つの主な機能"],
      [/正式な(\d+)機能/g, "主な$1機能"],
      [/正式(\d+)機能/g, "主な$1機能"],
      [/正式機能/g, "主な機能"]
    ];
    replaceTextNodes(main, productRules);
  }

  function run() {
    cleanHomePage();
    cleanCatalogPage();
    cleanSystemOverviewPage();
    cleanLinePage();
    cleanWebsitePage();
    cleanProductPages();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
