(() => {
  "use strict";

  // STEP SITE-GAKUDO-48 / 48 PRODUCTS / PRESERVE ALL 47 PRODUCTS / 20260802

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  const menuButton = $(".menu-button");
  const globalNav = $(".global-nav");
  const backToTop = $(".back-to-top");

  if (menuButton && globalNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.classList.toggle("open");
      globalNav.classList.toggle("open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
      );
    });

    $$("a", globalNav).forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.classList.remove("open");
        globalNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );
    $$(".reveal").forEach((element) => revealObserver.observe(element));
  } else {
    $$(".reveal").forEach((element) => element.classList.add("visible"));
  }

  window.addEventListener(
    "scroll",
    () => backToTop?.classList.toggle("visible", window.scrollY > 700),
    { passive: true }
  );

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // 旧形式の絞り込みにも対応
  const filterButtons = $$(".filter-button");
  const systemCards = $$(".system-card");
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

  // 役割別プレビュー
  const screenTabs = $$(".screen-tab");
  const screenPreview = $("#screen-preview");
  const screenContent = {
    customer: {
      label: "Customer Experience",
      title: "LINEから、すぐ予約。",
      text:
        "空き状況を確認し、そのまま予約。会員証や次回予定もひとつの画面で確認できます。",
      ui:
        "<span>LINE予約</span><strong>ご希望の日時を選択</strong><button>7月18日 10:30</button><button>7月18日 13:00</button><button>7月19日 11:00</button>"
    },
    owner: {
      label: "Owner Experience",
      title: "店舗全体を、ひとつの画面で。",
      text:
        "予約、顧客、設定、フォロー業務をまとめて確認。今日やることがすぐ分かります。",
      ui:
        "<span>オーナー管理</span><strong>本日の状況</strong><button>予約 12件</button><button>対応待ち 4件</button><button>顧客検索</button>"
    },
    staff: {
      label: "Staff Experience",
      title: "現場では、必要な操作だけ。",
      text:
        "受付、来店確認、ステータス更新など、スタッフが使う機能を大きくシンプルに表示します。",
      ui:
        "<span>スタッフ画面</span><strong>今日の予定</strong><button>10:00 山田様</button><button>11:30 佐藤様</button><button>13:00 田中様</button>"
    }
  };

  screenTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const content = screenContent[tab.dataset.screen];
      if (!content || !screenPreview) return;
      screenTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      screenPreview.innerHTML =
        `<div class="preview-copy"><small>${content.label}</small>` +
        `<h3>${content.title}</h3><p>${content.text}</p></div>` +
        `<div class="preview-device ${tab.dataset.screen}-preview">` +
        `<div class="preview-ui">${content.ui}</div></div>`;
    });
  });

  // 実画面拡大モーダル
  const modal = $("#screen-modal");
  if (modal) {
    const frame = $("#screen-modal-frame");
    const title = $("#screen-modal-title");
    const external = $("#screen-modal-external");

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (frame) frame.src = "about:blank";
    };

    $$(".js-screen-modal").forEach((button) => {
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

    $$("[data-modal-close]", modal).forEach((button) =>
      button.addEventListener("click", closeModal)
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  const productCount = 48;

  const setFirstText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  setFirstText(".phase-mini-proof span:first-child", `${productCount}業種`);
  setFirstText(
    ".phase-number-grid .phase-number:first-child strong",
    String(productCount)
  );
  setFirstText(".catalog-orbit .orbit-core", String(productCount));
  setFirstText(
    ".catalog-summary-grid article:first-child strong",
    String(productCount)
  );

  const catalogHeroText = $(".catalog-hero-inner > p:not(.eyebrow)");
  if (catalogHeroText) {
    catalogHeroText.innerHTML = catalogHeroText.innerHTML.replace(
      /\d+業種/g,
      `${productCount}業種`
    );
  }

  const moreLink = $(".catalog-more-link a");
  if (moreLink) {
    moreLink.textContent = `${productCount}システムをすべて見る`;
  }

  const metaDescription = $('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = metaDescription.content.replace(
      /\d+業種/g,
      `${productCount}業種`
    );
  }

  const progressTitleFirst = $(".catalog-progress-title span:first-child");
  if (progressTitleFirst) {
    progressTitleFirst.textContent = `${productCount}製品すべて、`;
  }

  const progressCopyText = $(".catalog-progress-copy > p");
  if (progressCopyText) {
    progressCopyText.textContent =
      `${productCount}製品すべての詳細ページを公開しました。` +
      "業種別の完成済みシステムを、実画面で確認できます。";
  }

  const progressCopySmall = $(".catalog-progress-copy > small");
  if (progressCopySmall) {
    progressCopySmall.textContent =
      `${productCount} / ${productCount} 製品ページ公開済み`;
  }

  const appendDescription = (titleText, productText) => {
    const panel = $$(".industry-panel").find(
      (item) => $("h3", item)?.textContent?.trim() === titleText
    );
    const description = panel ? $("p", panel) : null;
    if (description && !description.textContent.includes(productText)) {
      description.textContent = `${description.textContent}、${productText}`;
    }
  };

  [
    ["美容・健康", "パーソナルジム"],
    ["美容・健康", "まつげ・眉サロン"],
    ["美容・健康", "化粧品店"],
    ["飲食・小売", "焼肉店"],
    ["飲食・小売", "フラワーショップ"],
    ["教育・生活サービス", "ハウスクリーニング・家事代行"],
    ["教育・生活サービス", "不用品回収・遺品整理"],
    ["教育・生活サービス", "放課後等デイサービス"],
    ["教育・生活サービス", "宿泊・民泊"],
    ["教育・生活サービス", "訪問介護・家族連絡"],
    ["教育・生活サービス", "福祉用具レンタル・販売"],
    ["教育・生活サービス", "介護タクシー"],
    ["教育・生活サービス", "福祉施設送迎"],
    ["教育・生活サービス", "高齢者配食サービス"],
    ["教育・生活サービス", "相談支援事業所"],
    ["教育・生活サービス", "訪問看護ステーション"],
    ["教育・生活サービス", "居宅介護支援・ケアマネ"],
    ["教育・生活サービス", "学童保育・放課後児童クラブ"],
    ["士業・企業支援", "行政書士・許認可申請"],
    ["士業・企業支援", "土地家屋調査士"],
    ["士業・企業支援", "司法書士・相続登記"]
  ].forEach(([category, product]) => appendDescription(category, product));

  const catalogGrid = $(".catalog-grid");

  const appendCatalogCard = ({
    href,
    code,
    previewClass,
    previewTitle,
    previewUrl,
    category,
    title,
    description
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
        <iframe
          title="${previewTitle}"
          loading="lazy"
          src="${previewUrl}"
        ></iframe>
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

  const products = [
    [
      "systems/housekeep.html",
      "HK",
      "catalog-live-housekeep",
      "ハウスクリーニング・家事代行実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-housekeep-line-liff/owner.html?demo=1&v=housekeep-8",
      "教育・生活サービス",
      "ハウスクリーニング・家事代行",
      "予約・見積り・定期訪問・担当割当・作業チェック・写真報告。"
    ],
    [
      "systems/disposal.html",
      "DS",
      "catalog-live-disposal",
      "不用品回収・遺品整理実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-disposal-line-liff/owner.html?demo=1&v=disposal-8-r2",
      "教育・生活サービス",
      "不用品回収・遺品整理",
      "写真相談・現地見積り・正式見積り・買取相殺・作業進捗・写真報告。"
    ],
    [
      "systems/gyosei.html",
      "GY",
      "catalog-live-gyosei",
      "行政書士・許認可申請実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-gyosei-permit-line/owner.html?demo=1&v=GYOSEI-10",
      "士業・企業支援",
      "行政書士・許認可申請",
      "相談受付・必要書類・案件進捗・申請・期限・更新管理。"
    ],
    [
      "systems/gym.html",
      "PG",
      "catalog-live-gym",
      "パーソナルジム実画面プレビュー",
      "https://dpromstk2000-lab.github.io/liff-gym-demo/dashboard.html?demo=1&v=gym-5-final",
      "美容・健康",
      "パーソナルジム",
      "体験予約・会員管理・回数券・来店進行・継続フォロー。"
    ],
    [
      "systems/chosashi.html",
      "CH",
      "catalog-live-chosashi",
      "土地家屋調査士実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-chosashi-line-liff/owner.html?demo=1&v=chosashi-8-r3-final",
      "士業・企業支援",
      "土地家屋調査士",
      "相談受付・案件進捗・必要書類・境界管理・現場報告・写真保存。"
    ],
    [
      "systems/yakiniku.html",
      "YK",
      "catalog-live-yakiniku",
      "焼肉店 予約・順番受付実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-yakiniku-line-liff/index.html?demo=1&v=YAKINIKU-7-R1",
      "飲食・小売",
      "焼肉店 予約・順番受付",
      "日時予約・当日順番受付・呼び出し・テーブル回転・顧客・分析管理。"
    ],
    [
      "systems/houkago-dayservice.html",
      "HG",
      "catalog-live-houkago",
      "放課後等デイサービス実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-houkago-dayservice-line/member.html?demo=1&v=houkago-11",
      "教育・生活サービス",
      "放課後等デイサービス",
      "保護者連絡・利用予定・送迎・日常確認・5領域活動記録・支援計画期限。"
    ],
    [
      "systems/stay.html",
      "ST",
      "catalog-live-stay",
      "宿泊・民泊実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-stay-line/member.html?demo=1&v=STAY-11",
      "教育・生活サービス",
      "宿泊・民泊",
      "予約確認・到着時間・滞在案内・問い合わせ・清掃・客室・忘れ物管理。"
    ],
    [
      "systems/eye-salon.html",
      "EY",
      "catalog-live-eye",
      "まつげ・眉サロン実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-eye-salon-line/owner.html?demo=1&v=EYE-11",
      "美容・健康",
      "まつげ・眉サロン",
      "LINE予約・まつげ/眉カルテ・施術写真・再来店・既存システム移行。"
    ],
    [
      "systems/shiho.html",
      "SH",
      "catalog-live-gyosei",
      "司法書士・相続登記実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-shiho-inheritance-line-liff/owner.html?demo=1&v=SHIHO-11",
      "士業・企業支援",
      "司法書士・相続登記",
      "相続相談・必要書類・相続人・不動産・申請・補正・期限・LINE連携管理。"
    ],
    [
      "systems/flower-shop.html",
      "FL",
      "catalog-live-flower",
      "フラワーショップ実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-flower-line-liff/owner.html?demo=1&v=FLOWER-15",
      "飲食・小売",
      "フラワーショップ",
      "LINE注文・電話/店頭注文・制作・完成写真・店頭受取・配達管理。"
    ],
    [
      "systems/cosmetics.html",
      "CM",
      "catalog-live-cosmetics",
      "化粧品店実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-cosmetics-line-liff/owner.html?demo=1&v=COSMETICS-10",
      "美容・健康",
      "化粧品店",
      "美容相談・商品取り置き・購入履歴・再購入・問合せ・販促管理。"
    ],
    [
      "systems/homecare.html",
      "HC",
      "catalog-live-homecare",
      "訪問介護・家族連絡実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-homecare-family-line/owner.html?demo=1&v=HOMECARE-10",
      "教育・生活サービス",
      "訪問介護・家族連絡",
      "訪問予定・スタッフ記録・家族報告・申し送り・事故・問い合わせ管理。"
    ],
    [
      "systems/welfare-equipment.html",
      "WE",
      "catalog-live-welfare-equipment",
      "福祉用具レンタル・販売実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-welfare-equipment-line/member.html?v=WELFARE-EQUIP-10",
      "教育・生活サービス",
      "福祉用具レンタル・販売",
      "相談・アセスメント・計画・契約・個体管理・納品・保守・請求・スタッフ権限。"
    ],
    [
      "systems/caretaxi.html",
      "CT",
      "catalog-live-caretaxi",
      "介護タクシー実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-caretaxi-line/owner.html?v=CARETAXI-11",
      "教育・生活サービス",
      "介護タクシー",
      "送迎依頼・家族ポータル・配車・当日運行・料金・顧客乗車者台帳。"
    ],
    [
      "systems/welfare-shuttle.html",
      "WS",
      "catalog-live-welfare-shuttle",
      "福祉施設送迎実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-welfare-shuttle-line/?demo=1&v=SHUTTLE-10-R1",
      "教育・生活サービス",
      "福祉施設送迎",
      "利用者・家族連携・定期予定・配車・スタッフ運行・変更依頼・一括検査。"
    ],
    [
      "systems/senior-meal-delivery.html",
      "SM",
      "catalog-live-senior-meal",
      "高齢者配食サービス実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-senior-meal-delivery-line/owner.html?demo=1&v=HAISHOKU-12",
      "教育・生活サービス",
      "高齢者配食サービス",
      "電話・店頭注文、定期利用、厨房、配達、家族連絡、変更依頼、LINE通知を一元管理。"
    ],
    [
      "systems/sodan.html",
      "SD",
      "catalog-live-sodan",
      "相談支援事業所実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-sodan-line/owner.html?v=SODAN-13-R1",
      "教育・生活サービス",
      "相談支援事業所",
      "初回相談・案件・計画・書類提出・モニタリング・本人家族連携。"
    ],
    [
      "systems/home-nursing.html",
      "HN",
      "catalog-live-home-nursing",
      "訪問看護ステーション実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-home-nursing-line/owner.html?v=NURSING-11",
      "教育・生活サービス",
      "訪問看護ステーション",
      "新規相談・訪問予定・スタッフ配置・訪問開始終了・家族報告・LINE連携・家族連絡。"
    ],
    [
      "systems/careplan.html",
      "CP",
      "catalog-live-careplan",
      "居宅介護支援・ケアマネ実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-careplan-line/owner.html?v=CAREPLAN-10",
      "教育・生活サービス",
      "居宅介護支援・ケアマネ",
      "新規相談・利用者台帳・認定期限・ケアプラン・モニタリング・非公開書類・家族連携。"
    ],
    [
      "systems/gakudo.html",
      "GK",
      "catalog-live-gakudo",
      "学童保育・放課後児童クラブ実画面プレビュー",
      "https://dpromstk2000-lab.github.io/dpro-gakudo-line/owner.html?v=GAKUDO-10",
      "教育・生活サービス",
      "学童保育・放課後児童クラブ",
      "欠席・利用変更・お迎え連絡・入退室・長期休暇・日別定員・通知・安全警告。"
    ]
  ];

  products.forEach(
    ([
      href,
      code,
      previewClass,
      previewTitle,
      previewUrl,
      category,
      title,
      description
    ]) => {
      appendCatalogCard({
        href,
        code,
        previewClass,
        previewTitle,
        previewUrl,
        category,
        title,
        description
      });
    }
  );

  const categoryMap = {
    "美容・健康": [
      "美容室",
      "ネイル",
      "プライベートヨガ",
      "美容サロン",
      "エステ・リラクゼーション",
      "整骨院・接骨院",
      "整骨院・整体",
      "パーソナルジム",
      "まつげ・眉サロン",
      "化粧品店"
    ],
    "医療・ペット": ["ペットサロン", "動物病院", "歯科"],
    "飲食・小売": [
      "ベーカリー",
      "ケーキ・洋菓子店",
      "居酒屋",
      "テイクアウト",
      "テイクアウト・モバイルオーダー",
      "焼肉店 予約・順番受付",
      "フラワーショップ"
    ],
    "買取・リユース": ["買取・査定", "中古車買取・販売"],
    "住まい・建築": ["不動産・賃貸内見", "リフォーム・工務店"],
    "教育・生活サービス": [
      "学習塾・習い事",
      "車検・整備",
      "車検・整備工場",
      "修理受付",
      "クリーニング",
      "デイサービス",
      "訪問介護・家族連絡",
      "葬儀・法要サポート",
      "写真館・フォトスタジオ",
      "ハウスクリーニング・家事代行",
      "不用品回収・遺品整理",
      "放課後等デイサービス",
      "就労継続支援B型",
      "相談支援事業所",
      "訪問看護ステーション",
      "居宅介護支援・ケアマネ",
      "宿泊・民泊",
      "福祉用具レンタル・販売",
      "介護タクシー",
      "福祉施設送迎",
      "高齢者配食サービス"
    ],
    "士業・企業支援": [
      "社労士・顧問先対応",
      "税理士・会計事務所",
      "行政書士・許認可申請",
      "土地家屋調査士",
      "司法書士・相続登記"
    ]
  };

  const categoryButtons = $$(".catalog-filter");

  const applyCategory = (category, updateUrl = false) => {
    const safeCategory = categoryMap[category] ? category : "all";

    categoryButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.category === safeCategory
      );
    });

    $$(".catalog-card").forEach((card) => {
      const title = $("h3", card)?.textContent?.trim() || "";
      card.style.display =
        safeCategory === "all" || categoryMap[safeCategory].includes(title)
          ? ""
          : "none";
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (safeCategory === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", safeCategory);
      }
      url.hash = "catalog";
      history.replaceState(null, "", url);
    }
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyCategory(button.dataset.category, true);
      $("#catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const requestedCategory = new URLSearchParams(window.location.search).get(
    "category"
  );

  if (requestedCategory && categoryMap[requestedCategory]) {
    applyCategory(requestedCategory, false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        $("#catalog")?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    });
  }
})();
