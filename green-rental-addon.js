(() => {
  "use strict";

  const PRODUCT_COUNT = 49;
  const GREEN_TITLE = "グリーンレンタル";
  const GREEN_CATEGORY = "教育・生活サービス";

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  const updateMeta = () => {
    document.querySelectorAll('meta[name="description"]').forEach((meta) => {
      meta.content = meta.content.replace(/\d+業種/g, `${PRODUCT_COUNT}業種`);
    });
  };

  const updateCounts = () => {
    setText(".phase-mini-proof span:first-child", `${PRODUCT_COUNT}業種`);
    setText(".phase-number-grid .phase-number:first-child strong", String(PRODUCT_COUNT));
    setText(".catalog-orbit .orbit-core", String(PRODUCT_COUNT));
    setText(".catalog-summary-grid article:first-child strong", String(PRODUCT_COUNT));

    const heroText = document.querySelector(".catalog-hero-inner > p:not(.eyebrow)");
    if (heroText) heroText.innerHTML = heroText.innerHTML.replace(/\d+業種/g, `${PRODUCT_COUNT}業種`);

    const more = document.querySelector(".catalog-more-link a");
    if (more) more.textContent = `${PRODUCT_COUNT}システムをすべて見る`;

    setText(".catalog-progress-title span:first-child", `${PRODUCT_COUNT}製品すべて、`);
    const progressText = document.querySelector(".catalog-progress-copy > p");
    if (progressText) progressText.textContent = `${PRODUCT_COUNT}製品すべての詳細ページを公開しました。業種別の完成済みシステムを、実画面で確認できます。`;
    setText(".catalog-progress-copy > small", `${PRODUCT_COUNT} / ${PRODUCT_COUNT} 製品ページ公開済み`);
  };

  const updateIndustryDescription = () => {
    const panel = [...document.querySelectorAll(".industry-panel")].find(
      (item) => item.querySelector("h3")?.textContent?.trim() === GREEN_CATEGORY
    );
    const description = panel?.querySelector("p");
    if (description && !description.textContent.includes("観葉植物レンタル")) {
      description.textContent += "、観葉植物レンタル";
    }
  };

  const createCard = () => {
    const grid = document.querySelector(".catalog-grid");
    if (!grid || grid.querySelector('a[href="systems/green-rental.html"]')) return null;

    const card = document.createElement("a");
    card.className = "catalog-card reveal visible is-live";
    card.href = "systems/green-rental.html";
    card.innerHTML = `
      <div class="catalog-card-top">
        <span class="catalog-code">GR</span>
        <span class="catalog-status">公開中</span>
      </div>
      <div class="catalog-visual catalog-live-visual catalog-live-green-rental">
        <iframe
          title="グリーンレンタル管理PC実画面プレビュー"
          loading="lazy"
          src="https://dpromstk2000-lab.github.io/dpro-green-rental-line/owner.html"
        ></iframe>
        <span class="catalog-live-badge">実画面あり</span>
      </div>
      <div class="catalog-card-copy">
        <small>${GREEN_CATEGORY}</small>
        <h3>${GREEN_TITLE}</h3>
        <p>写真相談・植物資産・定期巡回・作業写真・交換・回収・養生・お客様報告。</p>
        <b class="catalog-card-cta">今すぐ製品ページを見る →</b>
      </div>`;
    grid.appendChild(card);
    return card;
  };

  const fixCategoryDisplay = (category) => {
    const green = document.querySelector('a[href="systems/green-rental.html"]');
    if (!green) return;
    green.style.display = category === "all" || category === GREEN_CATEGORY ? "" : "none";
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

  updateMeta();
  updateCounts();
  updateIndustryDescription();
  createCard();
  bindFilters();
})();