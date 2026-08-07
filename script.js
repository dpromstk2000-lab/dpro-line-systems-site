(() => {
  "use strict";

  const legacySources = [
    "https://cdn.jsdelivr.net/gh/dpromstk2000-lab/dpro-line-systems-site@2749bb15742634b675895aa685dc0c51ddcac777/script.js",
    "https://raw.githack.com/dpromstk2000-lab/dpro-line-systems-site/2749bb15742634b675895aa685dc0c51ddcac777/script.js"
  ];
  const officialSite = "https://dpro-shop.com/";

  const currentScriptUrl =
    document.currentScript && document.currentScript.src
      ? document.currentScript.src
      : new URL("script.js", window.location.href).href;

  const localAddon = (name) => new URL(name, currentScriptUrl).href;

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

  const run = async () => {
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
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
