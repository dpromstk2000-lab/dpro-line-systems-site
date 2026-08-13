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
