(() => {
  "use strict";

  const legacySources = [
    "https://cdn.jsdelivr.net/gh/dpromstk2000-lab/dpro-line-systems-site@2749bb15742634b675895aa685dc0c51ddcac777/script.js",
    "https://raw.githack.com/dpromstk2000-lab/dpro-line-systems-site/2749bb15742634b675895aa685dc0c51ddcac777/script.js"
  ];
  const officialSite = "https://dpro-shop.com/";
  const salesLpMap = {
    "shiho.html": "../lp-shiho.html",
    "chosashi.html": "../lp-chosashi.html",
    "cosmetics.html": "../lp-cosmetics.html",
    "flower-shop.html": "../lp-flower.html",
    "home-nursing.html": "../lp-homenursing.html",
    "careplan.html": "../lp-careplan.html",
    "welfare-equipment.html": "../lp-welfare.html",
    "yakiniku.html": "../lp-yakiniku.html",
    "houkago-dayservice.html": "../lp-houkago.html",
    "gakudo.html": "../lp-gakudo.html"
  };

  const currentScriptUrl =
    document.currentScript && document.currentScript.src
      ? document.currentScript.src
      : new URL("script.js", window.location.href).href;

  const localAddon = (name) => new URL(name, currentScriptUrl).href;

  const installFavicon = () => {
    if (document.querySelector('link[data-dpro-product-favicon="true"]')) return;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#0b0b0d"/>
        <path fill="#ffffff" d="M15 13h18c11 0 19 8 19 19s-8 19-19 19H15V13zm10 9v20h8c6 0 10-4 10-10s-4-10-10-10h-8z"/>
        <circle cx="52" cy="12" r="6" fill="#a8ff2a"/>
      </svg>
    `.trim();

    document.querySelectorAll('link[rel~="icon"]').forEach((node) => node.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    link.dataset.dproProductFavicon = "true";
    document.head.appendChild(link);
  };

  const load = (src) =>
    new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`読み込み失敗: ${src}`));
      document.head.appendChild(s);
    });

  const loadFirstAvailable = async (sources) => {
    let lastError = null;
    for (const src of sources) {
      try {
        await load(src);
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error("既存共通処理を読み込めませんでした。");
  };

  const injectOfficialSite = () => {
    if (!document.getElementById("dpro-official-bridge-style")) {
      const st = document.createElement("style");
      st.id = "dpro-official-bridge-style";
      st.textContent = `.dpro-official-global-link{padding:9px 13px!important;border:1px solid rgba(255,255,255,.2)!important;border-radius:999px!important;color:#fff!important;background:rgba(255,255,255,.045)!important;font-weight:850!important;white-space:nowrap}.dpro-official-global-link:hover{color:#a8ff2a!important;border-color:#a8ff2a!important}@media(max-width:960px){.dpro-official-global-link{display:block!important;margin-top:8px!important;text-align:center!important;border-radius:12px!important}}`;
      document.head.appendChild(st);
    }

    const nav = document.querySelector(".global-nav");
    if (nav && !nav.querySelector("[data-official-site-link]")) {
      const a = document.createElement("a");
      a.href = officialSite;
      a.className = "dpro-official-global-link";
      a.dataset.officialSiteLink = "";
      a.textContent = "DPRO SHOP公式 ↗";
      const cta = nav.querySelector(".nav-cta");
      cta ? nav.insertBefore(a, cta) : nav.appendChild(a);
    }

    document.querySelectorAll(".site-footer nav").forEach((nav) => {
      if (nav.querySelector("[data-official-site-link]")) return;
      const a = document.createElement("a");
      a.href = officialSite;
      a.dataset.officialSiteLink = "";
      a.textContent = "DPRO SHOP公式サイト ↗";
      nav.appendChild(a);
    });
  };

  const injectSalesLpBridge = () => {
    const page = window.location.pathname.split("/").filter(Boolean).pop() || "";
    const href = salesLpMap[page];
    if (!href) return;

    if (!document.getElementById("dpro-sales-lp-style")) {
      const st = document.createElement("style");
      st.id = "dpro-sales-lp-style";
      st.textContent = `.dpro-sales-lp-button{border-color:#a8ff2a!important;background:#a8ff2a!important;color:#0b0b0d!important;font-weight:950!important;box-shadow:0 10px 28px rgba(168,255,42,.18)!important}.dpro-sales-lp-button:hover{transform:translateY(-1px);filter:brightness(.96)}@media(max-width:680px){.dpro-sales-lp-button{width:100%!important;text-align:center!important}}`;
      document.head.appendChild(st);
    }

    const addButton = (container, label) => {
      if (!container || container.querySelector("[data-sales-lp-link]")) return;
      const a = document.createElement("a");
      a.href = href;
      a.className = "button dpro-sales-lp-button";
      a.dataset.salesLpLink = "";
      a.textContent = label;
      container.appendChild(a);
    };

    addButton(
      document.querySelector(".product-hero .hero-actions, .product-hero-copy .hero-actions, .hero-actions"),
      "導入・料金を詳しく見る"
    );
    addButton(document.querySelector(".contact-actions"), "導入・料金を見る");
  };

  const run = async () => {
    installFavicon();

    try {
      await loadFirstAvailable(legacySources);
    } catch (error) {
      console.warn("[DPRO] 既存共通処理の読込確認", error);
    }

    try {
      await load(localAddon("green-rental-addon.js?v=2"));
    } catch (error) {
      console.warn("[DPRO GREEN] 追加処理の読込確認", error);
    }

    try {
      await load(localAddon("salesnavi-addon.js?v=1"));
    } catch (error) {
      console.warn("[DPRO SALES NAVI] 追加処理の読込確認", error);
    }

    injectOfficialSite();
    injectSalesLpBridge();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
