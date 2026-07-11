(() => {
  "use strict";

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
