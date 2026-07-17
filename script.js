(() => {
  "use strict";

  // STEP CHOSASHI-WEB-1 / 31 PRODUCTS / 20260717

  const menuButton = document.querySelector(".menu-button");
  const globalNav = document.querySelector(".global-nav");
  const backToTop = document.querySelector(".back-to-top");

  if (menuButton && globalNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.classList.toggle("open");
      globalNav.classList.toggle("open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });

    globalNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.classList.remove("open");
        globalNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("visible", window.scrollY > 700);
  }, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Legacy page filter support
  const filterButtons = document.querySelectorAll(".filter-button");
  const systemCards = document.querySelectorAll(".system-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      systemCards.forEach((card) => {
        card.classList.toggle(
          "is-hidden",
          !(filter === "all" || card.dataset.category === filter)
        );
      });
    });
  });

  // Legacy screen tab support
  const screenTabs = document.querySelectorAll(".screen-tab");
  const screenPreview = document.querySelector("#screen-preview");
  const screenContent = {
    customer: {
      label: "Customer Experience",
      title: "LINEから、すぐ予約。",
      text: "空き状況を確認し、そのまま予約。会員証や次回予定もひとつの画面で確認できます。",
      ui: "<span>LINE予約</span><strong>ご希望の日時を選択</strong><button>7月18日 10:30</button><button>7月18日 13:00</button><button>7月19日 11:00</button>"
    },
    owner: {
      label: "Owner Experience",
      title: "店舗全体を、ひとつの画面で。",
      text: "予約、顧客、設定、フォロー業務をまとめて確認。今日やることがすぐ分かります。",
      ui: "<span>オーナー管理</span><strong>本日の状況</strong><button>予約 12件</button><button>対応待ち 4件</button><button>顧客検索</button>"
    },
    staff: {
      label: "Staff Experience",
      title: "現場では、必要な操作だけ。",
      text: "受付、来店確認、ステータス更新など、スタッフが使う機能を大きくシンプルに表示します。",
      ui: "<span>スタッフ画面</span><strong>今日の予定</strong><button>10:00 山田様</button><button>11:30 佐藤様</button><button>13:00 田中様</button>"
    }
  };

  screenTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const content = screenContent[tab.dataset.screen];
      if (!content || !screenPreview) return;
      screenTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      screenPreview.innerHTML =
        `<div class="preview-copy"><small>${content.label}</small><h3>${content.title}</h3><p>${content.text}</p></div>` +
        `<div class="preview-device ${tab.dataset.screen}-preview"><div class="preview-ui">${content.ui}</div></div>`;
    });
  });

  // Screen modal
  const modal = document.getElementById("screen-modal");
  if (modal) {
    const frame = document.getElementById("screen-modal-frame");
    const title = document.getElementById("screen-modal-title");
    const external = document.getElementById("screen-modal-external");

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (frame) frame.src = "about:blank";
    };

    document.querySelectorAll(".js-screen-modal").forEach((button) => {
      button.addEventListener("click", () => {
        const url = button.dataset.screenUrl;
        if (!url || !frame || !title || !external) return;
        title.textContent = button.dataset.screenTitle || "実画面";
        frame.src = url;
        external.href = url;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      });
    });

    modal.querySelectorAll("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  // Product count
  const setFirstText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  setFirstText(".phase-mini-proof span:first-child", "31業種");
  setFirstText(".phase-number-grid .phase-number:first-child strong", "31");
  setFirstText(".catalog-orbit .orbit-core", "31");
  setFirstText(".catalog-summary-grid article:first-child strong", "31");

  const catalogHeroText = document.querySelector(".catalog-hero-inner > p:not(.eyebrow)");
  if (catalogHeroText) {
    catalogHeroText.innerHTML = catalogHeroText.innerHTML.replace(/\d+業種/g, "31業種");
  }

  const moreLink = document.querySelector(".catalog-more-link a");
  if (moreLink) moreLink.textContent = "31システムをすべて見る";

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = metaDescription.content.replace(/\d+業種/g, "31業種");
  }

  const progressTitleFirst = document.querySelector(".catalog-progress-title span:first-child");
  if (progressTitleFirst) progressTitleFirst.textContent = "31製品すべて、";

  const progressCopyText = document.querySelector(".catalog-progress-copy > p");
  if (progressCopyText) {
    progressCopyText.textContent =
      "31製品すべての詳細ページを公開しました。業種別の完成済みシステムを、実画面で確認できます。";
  }

  const progressCopySmall = document.querySelector(".catalog-progress-copy > small");
  if (progressCopySmall) progressCopySmall.textContent = "31 / 31 製品ページ公開済み";

  // Add product names to category introduction copy
  const appendDescription = (titleText, productText) => {
    const panel = Array.from(document.querySelectorAll(".industry-panel")).find(
      (item) => item.querySelector("h3")?.textContent?.trim() === titleText
    );
    const description = panel?.querySelector("p");
    if (description && !description.textContent.includes(productText)) {
      description.textContent = `${description.textContent}、${productText}`;
    }
  };

  appendDescription("美容・健康", "パーソナルジム");
  appendDescription("教育・生活サービス", "ハウスクリーニング・家事代行");
  appendDescription("教育・生活サービス", "不用品回収・遺品整理");
  appendDescription("士業・企業支援", "行政書士・許認可申請");
  appendDescription("士業・企業支援", "土地家屋調査士");

  // Add recently completed product cards. Existing cards are never duplicated.
  const catalogGrid = document.querySelector(".catalog-grid");

  const appendCatalogCard = ({
    href, code, previewClass, previewTitle, previewUrl,
    category, title, description
  }) => {
    if (!catalogGrid || catalogGrid.querySelector(`a[href="${href}"]`)) return;

    const card = document.createElement("a");
    card.className = "catalog-card reveal visible is-live";
    card.href = href;
    card.innerHTML = `
      <div class="catalog-card-top">
        <span class="catalog-code">${code}</span>
        <span class="catalog-status">公開中</span>
      </div>
      <div class="catalog-visual catalog-live-visual ${previewClass}">
        <iframe title="${previewTitle}" loading="lazy" src="${previewUrl}"></iframe>
        <span class="catalog-live-badge">実画面あり</span>
      </div>
      <div class="catalog-card-copy">
        <small>${category}</small>
        <h3>${title}</h3>
        <p>${description}</p>
        <b class="catalog-card-cta">今すぐ製品ページを見る →</b>
      </div>`;
    catalogGrid.appendChild(card);
  };

  appendCatalogCard({
    href: "systems/housekeep.html",
    code: "HK",
    previewClass: "catalog-live-housekeep",
    previewTitle: "ハウスクリーニング・家事代行実画面プレビュー",
    previewUrl: "https://dpromstk2000-lab.github.io/dpro-housekeep-line-liff/owner.html?demo=1&v=housekeep-8",
    category: "教育・生活サービス",
    title: "ハウスクリーニング・家事代行",
    description: "予約・見積り・定期訪問・担当割当・作業チェック・写真報告。"
  });

  appendCatalogCard({
    href: "systems/disposal.html",
    code: "DS",
    previewClass: "catalog-live-disposal",
    previewTitle: "不用品回収・遺品整理実画面プレビュー",
    previewUrl: "https://dpromstk2000-lab.github.io/dpro-disposal-line-liff/owner.html?demo=1&v=disposal-8-r2",
    category: "教育・生活サービス",
    title: "不用品回収・遺品整理",
    description: "写真相談・現地見積り・正式見積り・買取相殺・作業進捗・写真報告。"
  });

  appendCatalogCard({
    href: "systems/gyosei.html",
    code: "GY",
    previewClass: "catalog-live-gyosei",
    previewTitle: "行政書士・許認可申請実画面プレビュー",
    previewUrl: "https://dpromstk2000-lab.github.io/dpro-gyosei-permit-line/owner.html?demo=1&v=GYOSEI-10",
    category: "士業・企業支援",
    title: "行政書士・許認可申請",
    description: "相談受付・必要書類・案件進捗・申請・期限・更新管理。"
  });

  appendCatalogCard({
    href: "systems/gym.html",
    code: "PG",
    previewClass: "catalog-live-gym",
    previewTitle: "パーソナルジム実画面プレビュー",
    previewUrl: "https://dpromstk2000-lab.github.io/liff-gym-demo/dashboard.html?demo=1&v=gym-5-final",
    category: "美容・健康",
    title: "パーソナルジム",
    description: "体験予約・会員管理・回数券・来店進行・継続フォロー。"
  });

  appendCatalogCard({
    href: "systems/chosashi.html",
    code: "CH",
    previewClass: "catalog-live-chosashi",
    previewTitle: "土地家屋調査士実画面プレビュー",
    previewUrl: "https://dpromstk2000-lab.github.io/dpro-chosashi-line-liff/owner.html?demo=1&v=chosashi-8-r3-final",
    category: "士業・企業支援",
    title: "土地家屋調査士",
    description: "相談受付・案件進捗・必要書類・境界管理・現場報告・写真保存。"
  });

  // Product catalog filters
  const categoryMap = {
    "美容・健康": [
      "美容室", "ネイル", "プライベートヨガ", "美容サロン",
      "エステ・リラクゼーション", "整骨院・接骨院", "パーソナルジム"
    ],
    "医療・ペット": ["ペットサロン", "動物病院", "歯科"],
    "飲食・小売": ["ベーカリー", "ケーキ・洋菓子店", "居酒屋", "テイクアウト"],
    "買取・リユース": ["買取・査定", "中古車買取・販売"],
    "住まい・建築": ["不動産・賃貸内見", "リフォーム・工務店"],
    "教育・生活サービス": [
      "学習塾・習い事", "車検・整備", "修理受付", "クリーニング",
      "デイサービス", "葬儀・法要サポート", "写真館・フォトスタジオ",
      "ハウスクリーニング・家事代行", "不用品回収・遺品整理"
    ],
    "士業・企業支援": [
      "社労士・顧問先対応", "税理士・会計事務所", "行政書士・許認可申請",
      "土地家屋調査士"
    ]
  };

  const categoryButtons = document.querySelectorAll(".catalog-filter");

  const applyCategory = (category, updateUrl = false) => {
    const safeCategory = categoryMap[category] ? category : "all";

    categoryButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.category === safeCategory);
    });

    document.querySelectorAll(".catalog-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent?.trim() || "";
      card.style.display =
        safeCategory === "all" || categoryMap[safeCategory].includes(title) ? "" : "none";
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (safeCategory === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", safeCategory);
      url.hash = "catalog";
      history.replaceState(null, "", url);
    }
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyCategory(button.dataset.category, true);
      document.getElementById("catalog")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  if (requestedCategory && categoryMap[requestedCategory]) {
    applyCategory(requestedCategory, false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("catalog")?.scrollIntoView({
          behavior: "auto",
          block: "start"
        });
      });
    });
  }
})();
