(() => {
  "use strict";

  // GREEN追加前のDPRO LINE SYSTEMS共通処理を固定コミットから読み込み、
  // 読み込み完了後にGREEN追加処理を実行します。
  const originalSources = [
    "https://cdn.jsdelivr.net/gh/dpromstk2000-lab/dpro-line-systems-site@2749bb15742634b675895aa685dc0c51ddcac777/script.js",
    "https://raw.githack.com/dpromstk2000-lab/dpro-line-systems-site/2749bb15742634b675895aa685dc0c51ddcac777/script.js"
  ];

  const currentScriptUrl =
    document.currentScript && document.currentScript.src
      ? document.currentScript.src
      : new URL("script.js", window.location.href).href;

  const addonUrl = new URL("green-rental-addon.js?v=2", currentScriptUrl).href;

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error(`読み込み失敗: ${src}`));
      document.head.appendChild(script);
    });

  const loadOriginal = async () => {
    let lastError = null;
    for (const src of originalSources) {
      try {
        await loadScript(src);
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error("既存共通処理を読み込めませんでした。");
  };

  loadOriginal()
    .catch((error) => {
      console.error("[DPRO] 既存共通処理の読み込みに失敗しました。", error);
    })
    .finally(() => {
      loadScript(addonUrl).catch((error) => {
        console.error("[DPRO GREEN] 追加処理の読み込みに失敗しました。", error);
      });
    });
})();
