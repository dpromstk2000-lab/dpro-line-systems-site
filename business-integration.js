(() => {
  "use strict";

  const addLpLibraryLinks = () => {
    const nav = document.querySelector(".global-nav");
    if (nav && !nav.querySelector("[data-lp-library-link]")) {
      const link = document.createElement("a");
      link.href = "lp.html";
      link.textContent = "業種別LP";
      link.setAttribute("data-lp-library-link", "");

      const cta = nav.querySelector(".nav-cta");
      nav.insertBefore(link, cta || null);
    }

    const footerNav = document.querySelector(".site-footer nav");
    if (footerNav && !footerNav.querySelector("[data-lp-library-link]")) {
      const link = document.createElement("a");
      link.href = "lp.html";
      link.textContent = "業種別LP";
      link.setAttribute("data-lp-library-link", "");

      const contact = footerNav.querySelector('a[href="#contact"]');
      footerNav.insertBefore(link, contact || null);
    }
  };

  addLpLibraryLinks();

  const formatDate = (value) => {
    if (!value) return "日付未定";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  document.querySelectorAll("[data-sync-demo]").forEach((demo) => {
    const button = demo.querySelector("[data-sync-publish]");
    const titleInput = demo.querySelector("[data-sync-input-title]");
    const startInput = demo.querySelector("[data-sync-input-start]");
    const endInput = demo.querySelector("[data-sync-input-end]");
    const titleOutputs = demo.querySelectorAll("[data-sync-title]");
    const periodOutputs = demo.querySelectorAll("[data-sync-period]");
    const status = demo.querySelector("[data-sync-status]");
    if (!button) return;

    button.addEventListener("click", () => {
      const title = (titleInput?.value || "店舗からのお知らせ").trim();
      const start = formatDate(startInput?.value);
      const end = formatDate(endInput?.value);
      const period = start === end ? start : `${start}〜${end}`;

      titleOutputs.forEach((node) => { node.textContent = title; });
      periodOutputs.forEach((node) => { node.textContent = period; });

      demo.classList.remove("is-published");
      demo.classList.add("is-publishing");
      button.disabled = true;
      button.textContent = "各画面へ反映中…";
      if (status) status.textContent = "ホームページ・LINE案内・予約カレンダーへ反映しています。";

      window.setTimeout(() => {
        demo.classList.remove("is-publishing");
        demo.classList.add("is-published");
        button.disabled = false;
        button.textContent = "内容を更新して再公開";
        if (status) status.textContent = `${title}を各画面へ反映しました。`;
      }, 850);
    });
  });
})();
