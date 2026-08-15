/* DPRO PRODUCT SITE — VET HP INTEGRATION ADDON
 * Existing V3.6 core is pinned to the last known stable commit, then this file adds
 * animal-hospital HP × LINE × DPRO promotion without replacing the VET system demo.
 */
(() => {
  'use strict';
  const CORE = 'https://cdn.jsdelivr.net/gh/dpromstk2000-lab/dpro-line-systems-site@f2953496b470370783c663de484d875376d83c81/product-v3.6.js';
  const HP_DEMO = 'https://dpromstk2000-lab.github.io/DPRO-PET-CARE-HP-DEMO/';
  const VET_PRODUCT = 'systems/pet-care.html';
  const VET_OFFICIAL = 'https://dpro-shop.com/systems/vet';

  function loadCore(done){
    const script = document.createElement('script');
    script.src = CORE;
    script.async = false;
    script.dataset.dproProductCore = 'v3.6-pinned';
    script.onload = () => done?.();
    script.onerror = () => {
      console.error('DPRO PRODUCT core could not be loaded.');
      done?.();
    };
    (document.currentScript?.parentNode || document.head || document.documentElement).appendChild(script);
  }

  function addStyles(){
    if (document.getElementById('p36-vet-hp-style')) return;
    const style = document.createElement('style');
    style.id = 'p36-vet-hp-style';
    style.textContent = `
      .p36-vet-hp{padding:clamp(64px,8vw,110px) 0;background:linear-gradient(135deg,#171016 0%,#29101a 48%,#102a26 100%);color:#fff;overflow:hidden}
      .p36-vet-hp__grid{display:grid;grid-template-columns:minmax(0,.88fr) minmax(420px,1.12fr);gap:clamp(28px,5vw,68px);align-items:center}
      .p36-vet-hp__eyebrow{margin:0 0 12px;color:#ff9ab9;font-size:12px;font-weight:1000;letter-spacing:.14em}
      .p36-vet-hp__eyebrow span{display:inline-block;margin-right:8px;padding:4px 7px;border-radius:999px;background:#a51743;color:#fff;font-size:9px}
      .p36-vet-hp h2{margin:0;font-size:clamp(32px,4.6vw,58px);line-height:1.15;letter-spacing:-.055em}
      .p36-vet-hp h2 em{display:block;color:#7de6c7;font-style:normal}
      .p36-vet-hp__lead{margin:18px 0 0;max-width:640px;color:#d9cfD5;font-size:16px;line-height:1.95}
      .p36-vet-hp__flow{display:flex;flex-wrap:wrap;gap:8px;margin-top:21px}
      .p36-vet-hp__flow span{padding:8px 10px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.06);font-size:12px;font-weight:900}
      .p36-vet-hp__flow i{display:grid;place-items:center;color:#74d9bd;font-style:normal;font-weight:1000}
      .p36-vet-hp__actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:25px}
      .p36-vet-hp__actions a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 17px;border-radius:11px;text-decoration:none;font-weight:1000}
      .p36-vet-hp__actions .is-hp{background:#0c806f;color:#fff}
      .p36-vet-hp__actions .is-product{background:#a51743;color:#fff}
      .p36-vet-hp__actions .is-official{border:1px solid rgba(255,255,255,.23);background:#fff;color:#19221f}
      .p36-vet-hp__browser{border:1px solid rgba(255,255,255,.15);border-radius:22px;background:#0a1715;box-shadow:0 30px 80px rgba(0,0,0,.38);overflow:hidden}
      .p36-vet-hp__bar{height:40px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;color:#cbe6de;font-size:10px;font-weight:1000;letter-spacing:.08em}
      .p36-vet-hp__bar span:before{content:'● ● ●';margin-right:10px;color:#e05a80;letter-spacing:2px}
      .p36-vet-hp__viewport{position:relative;height:clamp(380px,47vw,600px);overflow:hidden;background:#fff}
      .p36-vet-hp__viewport iframe{width:1280px;height:1800px;border:0;transform:scale(.54);transform-origin:0 0;pointer-events:none;background:#fff}
      .p36-vet-hp__viewport b{position:absolute;right:12px;bottom:12px;padding:7px 10px;border-radius:999px;background:rgba(12,52,46,.92);color:#fff;font-size:10px}
      .p36-vet-hp-link{display:inline-flex!important;align-items:center;justify-content:center;background:#0b7d6d!important;color:#fff!important;border-color:#0b7d6d!important;text-decoration:none!important;font-weight:900!important}
      .p36-vet-hp-mini{margin-top:10px;padding:10px 12px;border:1px solid #bddfd5;border-radius:10px;background:#eff9f6;color:#0b5c50;font-size:12px;font-weight:900}
      @media(max-width:980px){.p36-vet-hp__grid{grid-template-columns:1fr}.p36-vet-hp__viewport{height:500px}.p36-vet-hp__viewport iframe{transform:scale(.5)}}
      @media(max-width:640px){.p36-vet-hp{padding:52px 0}.p36-vet-hp__actions a{width:100%}.p36-vet-hp__viewport{height:380px}.p36-vet-hp__viewport iframe{width:960px;height:1700px;transform:scale(.4)}}
    `;
    document.head.appendChild(style);
  }

  function injectHomeSpotlight(){
    if (!document.body?.classList.contains('product-v36-home')) return;
    if (document.querySelector('.p36-vet-hp')) return;
    const target = document.getElementById('live-demo') || document.getElementById('proposal-entry');
    if (!target) return;
    const section = document.createElement('section');
    section.className = 'p36-vet-hp';
    section.setAttribute('aria-label','動物病院ホームページ統合デモ');
    section.innerHTML = `
      <div class="p36-shell p36-vet-hp__grid">
        <div>
          <p class="p36-vet-hp__eyebrow"><span>NEW</span>ANIMAL HOSPITAL / HP × LINE × DPRO</p>
          <h2>ホームページから、<em>受付システムまで一続きで体験。</em></h2>
          <p class="p36-vet-hp__lead">DPRO VETは業務画面だけではありません。飼い主が見るホームページで本日の診療状況を確認し、順番受付・日時指定予約・LINE診察券へ。その先の受付・診察進行まで、表側と裏側の両方を確認できます。</p>
          <div class="p36-vet-hp__flow"><span>ホームページ</span><i>→</i><span>受付・予約</span><i>→</i><span>LINE診察券</span><i>→</i><span>DPRO受付・診察</span></div>
          <div class="p36-vet-hp__actions"><a class="is-hp" href="${HP_DEMO}" target="_blank" rel="noopener">HP統合デモを開く ↗</a><a class="is-product" href="${VET_PRODUCT}">VET製品ページ</a><a class="is-official" href="${VET_OFFICIAL}" target="_blank" rel="noopener">青OFFICIALで詳しく ↗</a></div>
        </div>
        <div class="p36-vet-hp__browser"><div class="p36-vet-hp__bar"><span>LIVE WEBSITE</span><strong>DPRO PET CARE</strong></div><div class="p36-vet-hp__viewport"><iframe loading="lazy" tabindex="-1" title="DPROどうぶつ病院ホームページ統合デモ" src="${HP_DEMO}"></iframe><b>実際の操作はデモを開く</b></div></div>
      </div>`;
    target.before(section);
  }

  function enhanceVetCards(){
    const vetCard = document.querySelector('[data-p36-system-card][data-code="VET"]');
    if (vetCard && !vetCard.querySelector('[data-vet-hp-demo]')) {
      const host = vetCard.querySelector('.p36-card-resource') || vetCard.querySelector('.p36-card-actions');
      if (host) {
        const link = document.createElement('a');
        link.href = HP_DEMO;
        link.target = '_blank';
        link.rel = 'noopener';
        link.dataset.vetHpDemo = 'catalog';
        link.className = 'p36-vet-hp-link';
        link.textContent = 'HP統合デモ ↗';
        host.appendChild(link);
      }
      const tagline = vetCard.querySelector('.p36-system-card__tagline');
      if (tagline && !vetCard.querySelector('.p36-vet-hp-mini')) {
        const note = document.createElement('div');
        note.className = 'p36-vet-hp-mini';
        note.textContent = 'NEW：飼い主向けホームページから受付・LINE診察券まで体験できます。';
        tagline.after(note);
      }
    }

    document.querySelectorAll('.p36-demo-card').forEach(card => {
      if (card.querySelector('h3')?.textContent?.trim() !== '動物病院' || card.querySelector('[data-vet-hp-demo]')) return;
      const host = card.querySelector('.p36-demo-card__actions');
      if (!host) return;
      const link = document.createElement('a');
      link.href = HP_DEMO; link.target = '_blank'; link.rel = 'noopener';
      link.dataset.vetHpDemo = 'featured'; link.className = 'p36-vet-hp-link'; link.textContent = 'HP統合デモ ↗';
      host.appendChild(link);
    });

    const proposal = document.querySelector('[data-p36-proposal-card][data-code="VET"]');
    if (proposal && !proposal.querySelector('[data-vet-hp-demo]')) {
      const host = proposal.querySelector('.p36-proposal-card__actions');
      if (host) {
        const link = document.createElement('a');
        link.href = HP_DEMO; link.target = '_blank'; link.rel = 'noopener';
        link.dataset.vetHpDemo = 'proposal'; link.className = 'is-demo p36-vet-hp-link'; link.textContent = 'HP統合デモ ↗';
        host.appendChild(link);
      }
    }
  }

  function runAddon(){
    addStyles();
    injectHomeSpotlight();
    enhanceVetCards();
    const observer = new MutationObserver(() => enhanceVetCards());
    observer.observe(document.documentElement,{subtree:true,childList:true});
    window.setTimeout(() => observer.disconnect(), 8000);
  }

  loadCore(() => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runAddon,{once:true});
    else runAddon();
  });
})();
