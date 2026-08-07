(() => {
  "use strict";

  const PRODUCT_COUNT = 50;
  const INDUSTRY_COUNT = 49;
  const TITLE = "DPRO営業ナビ";
  const CATEGORY = "士業・企業支援";
  const DEMO_URL = "https://dpro-salesnavi-demo.pages.dev";

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  const updateMetaAndCounts = () => {
    document.querySelectorAll('meta[name="description"]').forEach((meta) => {
      meta.content = meta.content
        .replace(/\d+製品/g, `${PRODUCT_COUNT}製品`)
        .replace(/\d+システム/g, `${PRODUCT_COUNT}システム`);
    });

    setText(".phase-mini-proof span:first-child", `${INDUSTRY_COUNT}業種`);
    setText(".phase-number-grid .phase-number:first-child strong", String(INDUSTRY_COUNT));
    setText(".catalog-orbit .orbit-core", String(PRODUCT_COUNT));
    setText(".catalog-summary-grid article:first-child strong", String(PRODUCT_COUNT));
    setText(".dpro-system-hero__proof span:first-child", `${INDUSTRY_COUNT}業種`);
    setText(".dpro-system-difference-grid article:first-child strong", String(INDUSTRY_COUNT));

    const catalogHeroText = document.querySelector(".catalog-hero-inner > p:not(.eyebrow)");
    if (catalogHeroText) {
      catalogHeroText.innerHTML = catalogHeroText.innerHTML.replace(/\d+業種/g, `${INDUSTRY_COUNT}業種`);
    }

    const more = document.querySelector(".catalog-more-link a");
    if (more) more.textContent = `${PRODUCT_COUNT}システムをすべて見る`;

    setText(".catalog-progress-title span:first-child", `${PRODUCT_COUNT}製品すべて、`);
    const progressText = document.querySelector(".catalog-progress-copy > p");
    if (progressText) {
      progressText.textContent = `${PRODUCT_COUNT}製品すべての詳細ページを公開しました。業種別の完成済みシステムを、実画面で確認できます。`;
    }
    setText(".catalog-progress-copy > small", `${PRODUCT_COUNT} / ${PRODUCT_COUNT} 製品ページ公開済み`);

    document.querySelectorAll("a").forEach((a) => {
      const text = a.textContent.trim();
      if (/^(48|49)製品一覧$/.test(text)) a.textContent = `${PRODUCT_COUNT}製品一覧`;
      if (/^(48|49)製品を確認する$/.test(text)) a.textContent = `${PRODUCT_COUNT}製品を確認する`;
      if (/^(48|49)製品を業種から探す$/.test(text)) a.textContent = `${PRODUCT_COUNT}製品を業種から探す`;
      if (/^(48|49)製品一覧を見る$/.test(text)) a.textContent = `${PRODUCT_COUNT}製品一覧を見る`;
    });
  };

  const ensureStyle = () => {
    if (document.getElementById("dpro-salesnavi-addon-style")) return;
    const style = document.createElement("style");
    style.id = "dpro-salesnavi-addon-style";
    style.textContent = `
      .catalog-live-salesnavi{background:linear-gradient(145deg,#071d16,#0d3d2d)!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:22px!important}
      .salesnavi-mini-ui{width:100%;max-width:360px;border-radius:16px;background:#f4f8f5;padding:16px;box-shadow:0 18px 42px rgba(0,0,0,.24);font-family:inherit}
      .salesnavi-mini-ui__top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}.salesnavi-mini-ui__top strong{font-size:14px;color:#0a2b20}.salesnavi-mini-ui__top span{font-size:10px;font-weight:900;color:#7a378e;background:#f7eafd;border:1px solid #e7c8f2;border-radius:999px;padding:5px 8px}
      .salesnavi-mini-ui__steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.salesnavi-mini-ui__steps b{display:flex;align-items:center;justify-content:center;min-height:46px;padding:7px 4px;border-radius:9px;background:#fff;border:1px solid #dbe7e1;color:#174535;font-size:10px;line-height:1.35;text-align:center}
      .salesnavi-mini-ui__route{margin-top:9px;padding:10px 12px;border-radius:10px;background:#167a54;color:#fff;font-size:11px;font-weight:900;text-align:center}
      .dpro-salesnavi-site-feature{width:min(1180px,calc(100% - 40px));margin:34px auto 88px;padding:38px;border:1px solid rgba(18,91,65,.18);border-radius:30px;background:radial-gradient(circle at 85% 18%,rgba(89,208,150,.18),transparent 28%),linear-gradient(145deg,#f6faf8,#edf6f1);box-shadow:0 28px 70px rgba(7,55,38,.09);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr);gap:34px;align-items:center}
      .dpro-salesnavi-site-feature__copy small{display:block;color:#176d4d;font-weight:900;letter-spacing:.16em;font-size:11px}.dpro-salesnavi-site-feature__copy h2{margin:12px 0 0;font-size:clamp(32px,4.4vw,58px);line-height:1.04;color:#0b2e22;letter-spacing:-.04em}.dpro-salesnavi-site-feature__copy p{margin:18px 0 0;max-width:720px;color:#607268;font-size:15px;line-height:1.9}.dpro-salesnavi-site-feature__actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.dpro-salesnavi-site-feature__actions a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:999px;text-decoration:none;font-weight:900}.dpro-salesnavi-site-feature__actions .is-primary{background:#147651;color:#fff}.dpro-salesnavi-site-feature__actions .is-secondary{background:#fff;color:#164934;border:1px solid #cfe1d8}
      .dpro-salesnavi-site-feature__visual{padding:18px;border-radius:22px;background:#09281e;box-shadow:0 18px 50px rgba(4,36,25,.22)}.dpro-salesnavi-site-feature__visual .salesnavi-mini-ui{max-width:none}
      .dpro-salesnavi-system-callout{width:min(1180px,calc(100% - 40px));margin:0 auto 80px;padding:25px 28px;border-radius:24px;background:linear-gradient(135deg,#0a2b20,#13563f);color:#fff;display:flex;gap:22px;align-items:center;justify-content:space-between;box-shadow:0 22px 55px rgba(5,42,29,.2)}.dpro-salesnavi-system-callout small{display:block;color:#aee5c8;font-weight:900;letter-spacing:.12em}.dpro-salesnavi-system-callout h2{margin:6px 0 0;font-size:clamp(23px,3vw,36px)}.dpro-salesnavi-system-callout p{margin:8px 0 0;color:rgba(255,255,255,.72);line-height:1.7}.dpro-salesnavi-system-callout a{flex:0 0 auto;padding:13px 20px;border-radius:999px;background:#fff;color:#124533;text-decoration:none;font-weight:900}
      @media(max-width:820px){.dpro-salesnavi-site-feature{grid-template-columns:1fr;padding:26px;margin-bottom:60px}.dpro-salesnavi-system-callout{align-items:flex-start;flex-direction:column}.dpro-salesnavi-system-callout a{width:100%;text-align:center}.salesnavi-mini-ui__steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(style);
  };

  const miniUi = () => `
    <div class="salesnavi-mini-ui">
      <div class="salesnavi-mini-ui__top"><strong>DPRO営業ナビ</strong><span>DEMO</span></div>
      <div class="salesnavi-mini-ui__steps"><b>営業先を探す</b><b>今日回る</b><b>おすすめ順</b><b>結果を記録</b></div>
      <div class="salesnavi-mini-ui__route">現在地から訪問順を自動計算</div>
    </div>`;

  const createCatalogCard = () => {
    const grid = document.querySelector(".catalog-grid");
    if (!grid || grid.querySelector('a[href="systems/salesnavi.html"]')) return;

    const card = document.createElement("a");
    card.className = "catalog-card reveal visible is-live";
    card.href = "systems/salesnavi.html";
    card.dataset.salesnaviCard = "";
    card.innerHTML = `
      <div class="catalog-card-top">
        <span class="catalog-code">SN</span>
        <span class="catalog-status">公開DEMOあり</span>
      </div>
      <div class="catalog-visual catalog-live-visual catalog-live-salesnavi">
        ${miniUi()}
        <span class="catalog-live-badge">営業ナビ完成版</span>
      </div>
      <div class="catalog-card-copy">
        <small>${CATEGORY}</small>
        <h3>${TITLE}</h3>
        <p>営業先検索・今日の訪問・おすすめルート・営業記録・再訪・分析まで、外回り営業をスマホ中心で整理。</p>
        <b class="catalog-card-cta">公開DEMO付き製品ページを見る →</b>
      </div>`;
    grid.prepend(card);
  };

  const fixCategoryDisplay = (category) => {
    const card = document.querySelector('[data-salesnavi-card]');
    if (!card) return;
    card.style.display = category === "all" || category === CATEGORY ? "" : "none";
  };

  const bindFilters = () => {
    const buttons = [...document.querySelectorAll(".catalog-filter")];
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        setTimeout(() => fixCategoryDisplay(button.dataset.category || "all"), 0);
      });
    });
    const requested = new URLSearchParams(location.search).get("category");
    fixCategoryDisplay(requested || "all");
  };

  const injectHomeFeature = () => {
    if (!document.body.classList.contains("brand-home")) return;
    if (document.querySelector("[data-salesnavi-home-feature]")) return;
    const anchor = document.querySelector("#numbers");
    if (!anchor) return;
    const section = document.createElement("section");
    section.className = "dpro-salesnavi-site-feature reveal visible";
    section.dataset.salesnaviHomeFeature = "";
    section.innerHTML = `
      <div class="dpro-salesnavi-site-feature__copy">
        <small>NEW PRODUCT / DPRO SALES NAVI</small>
        <h2>営業先探しから、訪問・再訪まで。</h2>
        <p>Googleから営業候補を探し、今日回る営業先を決め、現在地からおすすめ順を計算。訪問結果と次回予定まで、その場で記録できます。</p>
        <div class="dpro-salesnavi-site-feature__actions">
          <a class="is-primary" href="systems/salesnavi.html">DPRO営業ナビを見る</a>
          <a class="is-secondary" href="${DEMO_URL}" target="_blank" rel="noopener">公開DEMOを体験する ↗</a>
        </div>
      </div>
      <div class="dpro-salesnavi-site-feature__visual">${miniUi()}</div>`;
    anchor.insertAdjacentElement("afterend", section);
  };

  const injectSystemCallout = () => {
    if (!document.body.classList.contains("dpro-system-page")) return;
    if (document.querySelector("[data-salesnavi-system-callout]")) return;
    const hero = document.querySelector(".dpro-system-hero");
    if (!hero) return;
    const section = document.createElement("section");
    section.className = "dpro-salesnavi-system-callout reveal visible";
    section.dataset.salesnaviSystemCallout = "";
    section.innerHTML = `<div><small>NEW / SALES SUPPORT</small><h2>DPRO営業ナビ</h2><p>営業先検索・訪問順・営業記録・再訪管理を、外回り営業向けに一つへ。</p></div><a href="systems/salesnavi.html">製品ページを見る →</a>`;
    hero.insertAdjacentElement("afterend", section);
  };

  ensureStyle();
  updateMetaAndCounts();
  createCatalogCard();
  bindFilters();
  injectHomeFeature();
  injectSystemCallout();
})();
