(() => {
  "use strict";
  // STEP REFORM-WEB-1: add reform product and housing/construction category

  const menuButton = document.querySelector(".menu-button");
  const globalNav = document.querySelector(".global-nav");
  const backToTop = document.querySelector(".back-to-top");
  const filterButtons = document.querySelectorAll(".filter-button");
  const systemCards = document.querySelectorAll(".system-card");
  const screenTabs = document.querySelectorAll(".screen-tab");
  const screenPreview = document.querySelector("#screen-preview");

  const screenContent = {
    customer: {
      label: "Customer Experience",
      title: "LINEから、すぐ予約。",
      text: "空き状況を確認し、そのまま予約。会員証や次回予定もひとつの画面で確認できます。",
      ui: `
        <span>LINE予約</span>
        <strong>ご希望の日時を選択</strong>
        <button>7月18日 10:30</button>
        <button>7月18日 13:00</button>
        <button>7月19日 11:00</button>
      `
    },
    owner: {
      label: "Owner Experience",
      title: "店舗全体を、ひとつの画面で。",
      text: "予約、顧客、設定、フォロー業務をまとめて確認。今日やることがすぐ分かります。",
      ui: `
        <span>オーナー管理</span>
        <strong>本日の状況</strong>
        <button>予約 12件</button>
        <button>対応待ち 4件</button>
        <button>顧客検索</button>
      `
    },
    staff: {
      label: "Staff Experience",
      title: "現場では、必要な操作だけ。",
      text: "受付、来店確認、ステータス更新など、スタッフが使う機能を大きくシンプルに表示します。",
      ui: `
        <span>スタッフ画面</span>
        <strong>今日の予定</strong>
        <button>10:00 山田様</button>
        <button>11:30 佐藤様</button>
        <button>13:00 田中様</button>
      `
    }
  };

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

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      systemCards.forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  screenTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.screen;
      const content = screenContent[key];
      if (!content || !screenPreview) return;

      screenTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      screenPreview.innerHTML = `
        <div class="preview-copy">
          <small>${content.label}</small>
          <h3>${content.title}</h3>
          <p>${content.text}</p>
        </div>
        <div class="preview-device ${key}-preview">
          <div class="preview-ui">${content.ui}</div>
        </div>
      `;
    });
  });

  window.addEventListener("scroll", () => {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 700);
  }, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();


// STEP DPRO-WEB-4 : screen modal
(() => {
  const modal = document.getElementById('screen-modal');
  if (!modal) return;

  const frame = document.getElementById('screen-modal-frame');
  const title = document.getElementById('screen-modal-title');
  const external = document.getElementById('screen-modal-external');

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    frame.src = 'about:blank';
  };

  document.querySelectorAll('.js-screen-modal').forEach((button) => {
    button.addEventListener('click', () => {
      const url = button.dataset.screenUrl;
      const screenTitle = button.dataset.screenTitle || '実画面';
      title.textContent = screenTitle;
      frame.src = url;
      external.href = url;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();


// DPRO WEB PHASE 1-R2: bakery iframe safety
(() => {
  const iframe = document.getElementById('bakery-live-iframe');
  const fallback = document.querySelector('.bakery-fallback');
  if (!iframe || !fallback) return;

  const revealFallback = () => {
    iframe.style.display = 'none';
    fallback.setAttribute('aria-hidden', 'false');
    fallback.style.zIndex = '3';
  };

  iframe.addEventListener('load', () => {
    try {
      const bodyText = iframe.contentDocument?.body?.innerText || '';
      if (/404|There isn't a GitHub Pages site here/i.test(bodyText)) revealFallback();
    } catch (_) {
      // Cross-origin pages cannot always be inspected. In that case the iframe remains visible.
    }
  });

  iframe.addEventListener('error', revealFallback);
})();


// DPRO WEB PHASE 4-R2: product catalog filters + direct category links
(() => {
  const buttons = document.querySelectorAll('.catalog-filter');
  const cards = document.querySelectorAll('.catalog-card');
  if (!buttons.length || !cards.length) return;

  const categoryMap = {
    '美容・健康': ['美容室','ネイル','プライベートヨガ','美容サロン','エステ・リラクゼーション','整骨院・接骨院'],
    '医療・ペット': ['ペットサロン','動物病院','歯科'],
    '飲食・小売': ['ベーカリー','居酒屋','テイクアウト'],
    '買取・リユース': ['買取・査定'],
    '住まい・建築': ['不動産・賃貸内見','リフォーム・工務店'],
    '教育・生活サービス': ['学習塾・習い事','車検・整備','修理受付','クリーニング','デイサービス','葬儀・法要サポート','写真館・フォトスタジオ'],
    '士業・企業支援': ['社労士・顧問先対応']
  };

  const applyCategory = (category, updateUrl = false) => {
    const safeCategory = categoryMap[category] ? category : 'all';

    buttons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.category === safeCategory);
    });

    cards.forEach((card) => {
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      const shouldShow = safeCategory === 'all' || categoryMap[safeCategory].includes(title);
      card.style.display = shouldShow ? '' : 'none';
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (safeCategory === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', safeCategory);
      }
      url.hash = 'catalog';
      history.replaceState(null, '', url);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      applyCategory(button.dataset.category, true);
      document.getElementById('catalog')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  const requestedCategory = new URLSearchParams(window.location.search).get('category');
  if (requestedCategory && categoryMap[requestedCategory]) {
    applyCategory(requestedCategory, false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('catalog')?.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      });
    });
  }
})();
