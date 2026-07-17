(() => {
  "use strict";
  // STEP HOUSEKEEP-WEB-1: add DPRO House Cleaning & Housekeeping LINE as product 27

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
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Legacy filter support
  const filterButtons = document.querySelectorAll(".filter-button");
  const systemCards = document.querySelectorAll(".system-card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      systemCards.forEach((card) => {
        card.classList.toggle("is-hidden", !(filter === "all" || card.dataset.category === filter));
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
      screenPreview.innerHTML = `<div class="preview-copy"><small>${content.label}</small><h3>${content.title}</h3><p>${content.text}</p></div><div class="preview-device ${tab.dataset.screen}-preview"><div class="preview-ui">${content.ui}</div></div>`;
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
    modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", closeModal));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  // Product 27 visual count update
  const setFirstText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };
  setFirstText(".phase-mini-proof span:first-child", "27業種");
  setFirstText(".phase-number-grid .phase-number:first-child strong", "27");
  setFirstText(".catalog-orbit .orbit-core", "27");
  setFirstText(".catalog-summary-grid article:first-child strong", "27");

  const catalogHeroText = document.querySelector(".catalog-hero-inner > p:not(.eyebrow)");
  if (catalogHeroText) catalogHeroText.innerHTML = catalogHeroText.innerHTML.replace(/26業種/g, "27業種");
  const moreLink = document.querySelector(".catalog-more-link a");
  if (moreLink) moreLink.textContent = "27システムをすべて見る";

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = metaDescription.content.replace(/26業種/g, "27業種");

  const lifePanel = Array.from(document.querySelectorAll(".industry-panel")).find((panel) =>
    panel.querySelector("h3")?.textContent?.trim() === "教育・生活サービス"
  );
  if (lifePanel) {
    const description = lifePanel.querySelector("p");
    if (description && !description.textContent.includes("ハウスクリーニング")) {
      description.textContent = `${description.textContent}、ハウスクリーニング・家事代行`;
    }
  }

  // Insert the new card into the catalog only once
  const catalogGrid = document.querySelector(".catalog-grid");
  if (catalogGrid && !catalogGrid.querySelector('a[href="systems/housekeep.html"]')) {
    const card = document.createElement("a");
    card.className = "catalog-card reveal visible is-live";
    card.href = "systems/housekeep.html";
    card.innerHTML = `
      <div class="catalog-card-top">
        <span class="catalog-code">HK</span>
        <span class="catalog-status">公開中</span>
      </div>
      <div class="catalog-visual catalog-live-visual catalog-live-housekeep">
        <iframe title="ハウスクリーニング・家事代行実画面プレビュー" loading="lazy"
          src="https://dpromstk2000-lab.github.io/dpro-housekeep-line-liff/owner.html?demo=1&amp;v=housekeep-8"></iframe>
        <span class="catalog-live-badge">実画面あり</span>
      </div>
      <div class="catalog-card-copy">
        <small>教育・生活サービス</small>
        <h3>ハウスクリーニング・家事代行</h3>
        <p>予約・見積り・定期訪問・担当割当・作業チェック・写真報告。</p>
        <b class="catalog-card-cta">今すぐ製品ページを見る →</b>
      </div>`;
    catalogGrid.appendChild(card);
  }

  // Catalog filters + direct category links
  const categoryMap = {
    "美容・健康": ["美容室","ネイル","プライベートヨガ","美容サロン","エステ・リラクゼーション","整骨院・接骨院"],
    "医療・ペット": ["ペットサロン","動物病院","歯科"],
    "飲食・小売": ["ベーカリー","ケーキ・洋菓子店","居酒屋","テイクアウト"],
    "買取・リユース": ["買取・査定","中古車買取・販売"],
    "住まい・建築": ["不動産・賃貸内見","リフォーム・工務店"],
    "教育・生活サービス": ["学習塾・習い事","車検・整備","修理受付","クリーニング","デイサービス","葬儀・法要サポート","写真館・フォトスタジオ","ハウスクリーニング・家事代行"],
    "士業・企業支援": ["社労士・顧問先対応","税理士・会計事務所"]
  };
  const categoryButtons = document.querySelectorAll(".catalog-filter");
  const applyCategory = (category, updateUrl = false) => {
    const safeCategory = categoryMap[category] ? category : "all";
    categoryButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.category === safeCategory));
    document.querySelectorAll(".catalog-card").forEach((card) => {
      const titleText = card.querySelector("h3")?.textContent?.trim() || "";
      card.style.display = safeCategory === "all" || categoryMap[safeCategory].includes(titleText) ? "" : "none";
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
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  if (requestedCategory && categoryMap[requestedCategory]) {
    applyCategory(requestedCategory, false);
    requestAnimationFrame(() => requestAnimationFrame(() =>
      document.getElementById("catalog")?.scrollIntoView({ behavior: "auto", block: "start" })
    ));
  }
})();