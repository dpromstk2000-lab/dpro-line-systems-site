/* DPRO LINE SYSTEMS PRODUCT SITE V3.6 — ROLE ALIGNMENT / STAGE 1 */
(() => {
  'use strict';
  const DATA = () => window.DPROSystemsData || { systems: [], categories: {} };
  const OFFICIAL_BASE = 'https://dpro-shop.com/';
  const PROPOSAL_PAGE = 'proposal.html';
  const officialSlugs = Object.freeze({
    HAIR:'hair', NAIL:'nail', ESTHE:'esthe', SEITAI:'osteopathic', DENTAL:'dental', VET:'vet',
    CLEANING:'cleaning', REPAIR:'repair', TAKEOUT:'takeout', SALON:'salon', BAKERY:'bakery', CAKE:'cake',
    EYE:'eye-salon', YOGA:'yoga', GYM:'gym', ESTATE:'estate', BUYBACK:'buyback', PHOTO:'photo-studio',
    REFORM:'reform', TAX:'tax-accounting', SCHOOL:'school', FUNERAL:'funeral', STAY:'stay', CAR:'used-car',
    DAYCARE:'dayservice', CARETAXI:'caretaxi', HAISHOKU:'senior-meal-delivery', HOUSEKEEP:'housekeep',
    DISPOSAL:'disposal', GYOSEI:'gyosei', SHIHO:'shiho', CHOSASHI:'chosashi', COSMETICS:'cosmetics',
    FLOWER:'flower-shop', HOMENURSING:'home-nursing', CAREPLAN:'careplan', WELFARE:'welfare-equipment',
    YAKINIKU:'yakiniku', HOUKAGO:'houkago-dayservice', GAKUDO:'gakudo', PETSALON:'pet-salon', BTYPE:'btype',
    KSH:'car-service', GREEN:'green-rental', HOMECARE:'homecare', IZAKAYA:'izakaya', CONSULT:'sharoushi',
    SODAN:'sodan', SHUTTLE:'shuttle', SALESNAVI:'salesnavi'
  });

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const officialUrl = (code) => `${OFFICIAL_BASE}systems/${officialSlugs[code] || String(code || '').toLowerCase()}`;
  const proposalUrl = (code) => `${PROPOSAL_PAGE}?code=${encodeURIComponent(String(code || ''))}#proposals`;
  const norm = (value) => String(value || '').normalize('NFKC').toLocaleLowerCase('ja');

  function initMenu(){
    const button = document.querySelector('.p36-menu');
    const nav = document.querySelector('.p36-nav');
    if (!button || !nav) return;
    const close = () => { nav.classList.remove('is-open'); button.setAttribute('aria-expanded','false'); };
    button.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function fillCounts(){
    const count = DATA().systems.length || 50;
    document.querySelectorAll('[data-p36-count]').forEach(node => node.textContent = String(count));
    document.querySelectorAll('[data-p36-year]').forEach(node => node.textContent = String(new Date().getFullYear()));
  }

  function categoryLabel(key){ return DATA().categories?.[key]?.label || key; }

  function renderCategories(){
    document.querySelectorAll('[data-p36-category-count]').forEach(node => {
      const key = node.getAttribute('data-p36-category-count');
      node.textContent = String(DATA().systems.filter(s => s.category === key).length);
    });
  }

  function renderFeatured(){
    const grid = document.querySelector('[data-p36-featured]');
    if (!grid) return;
    const wanted = ['PETSALON','VET','BAKERY'];
    const systems = wanted.map(code => DATA().systems.find(s => s.code === code)).filter(Boolean);
    grid.innerHTML = systems.map(s => `
      <article class="p36-demo-card">
        <small>${esc(s.code)} / LIVE PRODUCT</small>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.tagline)}</p>
        <div class="p36-demo-card__tags">${(s.features || []).slice(0,3).map(f=>`<span>${esc(f)}</span>`).join('')}</div>
        <div class="p36-demo-card__actions">
          <a href="${esc(s.systemPage)}">製品ページ</a>
          ${s.demoUrl ? `<a class="is-demo" href="${esc(s.demoUrl)}" target="_blank" rel="noopener">LIVE DEMO ↗</a>` : ''}
        </div>
      </article>`).join('');
  }

  function injectItemListJsonLd(systems){
    const old = document.getElementById('p36-itemlist-jsonld');
    if (old) old.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'p36-itemlist-jsonld';
    script.textContent = JSON.stringify({
      '@context':'https://schema.org', '@type':'ItemList', name:'DPRO LINE SYSTEMS 50製品',
      numberOfItems: systems.length,
      itemListElement: systems.map((s,i)=>({'@type':'ListItem', position:i+1, name:s.name, url:new URL(s.systemPage, /^https?:$/.test(location.protocol) ? location.href : 'https://dpromstk2000-lab.github.io/dpro-line-systems-site/').href}))
    });
    document.head.appendChild(script);
  }

  function renderCatalog(){
    const grid = document.querySelector('[data-p36-catalog]');
    if (!grid) return;
    const systems = DATA().systems || [];
    const categories = DATA().categories || {};
    injectItemListJsonLd(systems);
    grid.innerHTML = systems.map(s => `
      <article class="p36-system-card" data-p36-system-card data-code="${esc(s.code)}" data-category="${esc(s.category)}" data-search="${esc([s.code,s.name,s.tagline,s.summary,...(s.targets||[]),...(s.features||[])].join(' '))}">
        <div class="p36-system-card__top"><span class="p36-code">${esc(s.code)}</span><span class="p36-available">公開中</span></div>
        <p class="p36-system-card__category">${esc(categories[s.category]?.label || s.category)}</p>
        <h3>${esc(s.name)}</h3>
        <p class="p36-system-card__tagline">${esc(s.tagline)}</p>
        <ul class="p36-feature-list">${(s.features||[]).slice(0,3).map(f=>`<li>${esc(f)}</li>`).join('')}</ul>
        <div class="p36-card-actions">
          <a class="is-product" href="${esc(s.systemPage)}">製品ページを見る</a>
          ${s.demoUrl ? `<a class="is-demo" href="${esc(s.demoUrl)}" target="_blank" rel="noopener">LIVE DEMO ↗</a>` : '<span></span>'}
          <a class="is-official" href="${esc(officialUrl(s.code))}" target="_blank" rel="noopener">青OFFICIALで詳しく ↗</a>
        </div>
        ${`<div class="p36-card-resource"><a class="is-proposal-link" href="${esc(proposalUrl(s.code))}">業種別提案を開く →</a>${s.flyerHtml ? `<a href="${esc(s.flyerHtml)}" target="_blank" rel="noopener">A4チラシ ↗</a>` : ""}</div>`}
      </article>`).join('');

    const categoryFilterHost = document.querySelector('[data-p36-filters]');
    if (categoryFilterHost) {
      const items = Object.entries(categories);
      categoryFilterHost.innerHTML = `<label class="p36-filter"><input type="radio" name="p36-category" value="all" checked><span>すべて</span></label>` +
        items.map(([key,val])=>`<label class="p36-filter"><input type="radio" name="p36-category" value="${esc(key)}"><span>${esc(val.label)}</span></label>`).join('');
      const requested = new URLSearchParams(location.search).get('category');
      if (requested && categories[requested]) {
        const target = categoryFilterHost.querySelector(`input[value="${CSS.escape(requested)}"]`);
        if (target) target.checked = true;
      }
    }

    const industry = document.querySelector('[data-p36-finder-industry]');
    if (industry) industry.innerHTML = `<option value="">業種を選択</option>` + systems.map(s=>`<option value="${esc(s.code)}">${esc(s.name)}（${esc(s.code)}）</option>`).join('');

    const input = document.querySelector('[data-p36-search]');
    const visible = document.querySelector('[data-p36-visible]');
    const empty = document.querySelector('[data-p36-empty]');
    const filterHost = document.querySelector('[data-p36-filters]');
    let finderCodes = null;

    const apply = () => {
      const query = norm(input?.value);
      const category = filterHost?.querySelector('input:checked')?.value || 'all';
      let shown = 0;
      grid.querySelectorAll('[data-p36-system-card]').forEach(card => {
        const hay = norm(card.dataset.search);
        const okText = !query || hay.includes(query);
        const okCat = category === 'all' || card.dataset.category === category;
        const okFinder = !finderCodes || finderCodes.has(card.dataset.code);
        const show = okText && okCat && okFinder;
        card.hidden = !show;
        if (show) shown++;
      });
      if (visible) visible.textContent = String(shown);
      empty?.classList.toggle('is-visible', shown === 0);
    };
    input?.addEventListener('input', apply);
    filterHost?.addEventListener('change', apply);

    const finderIndustry = document.querySelector('[data-p36-finder-industry]');
    const finderNeed = document.querySelector('[data-p36-finder-need]');
    const finderButton = document.querySelector('[data-p36-finder-button]');
    const finderResult = document.querySelector('[data-p36-finder-result]');
    finderButton?.addEventListener('click', () => {
      const code = finderIndustry?.value || '';
      const need = norm(finderNeed?.value || '');
      const matches = systems.filter(s => {
        if (code && s.code !== code) return false;
        if (!need) return true;
        return norm([s.tagline,s.summary,...(s.features||[])].join(' ')).includes(need);
      });
      finderCodes = matches.length ? new Set(matches.map(s=>s.code)) : new Set();
      if (finderResult) finderResult.textContent = matches.length ? `${matches.length}件の候補を表示しました。` : '該当候補がありません。検索語を変えてお試しください。';
      apply();
      document.querySelector('#catalog')?.scrollIntoView({behavior:'smooth',block:'start'});
    });

    document.querySelector('[data-p36-finder-reset]')?.addEventListener('click', () => {
      finderCodes = null;
      if (finderIndustry) finderIndustry.value = '';
      if (finderNeed) finderNeed.value = '';
      if (finderResult) finderResult.textContent = '業種だけでも絞り込めます。';
      apply();
    });
    apply();
  }


  function proposalMatchKey(value){
    return norm(value).replace(/dpro|system|システム|業種別|提案|向け|・|\/|　|\s+/g,'');
  }

  function copyText(value, button){
    const done = () => {
      if (!button) return;
      const before = button.dataset.before || button.textContent;
      button.dataset.before = before;
      button.textContent = 'コピーしました';
      button.classList.add('is-copied');
      window.setTimeout(() => { button.textContent = before; button.classList.remove('is-copied'); }, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(done).catch(() => {});
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = value; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (_) {}
    ta.remove();
  }

  function absoluteUrl(value){
    try { return new URL(value, location.href).href; } catch (_) { return value || ''; }
  }

  function renderProposalHub(){
    const grid = document.querySelector('[data-p36-proposals]');
    if (!grid) return;
    const systems = DATA().systems || [];
    const categories = DATA().categories || {};
    const params = new URLSearchParams(location.search);
    const requestedCode = String(params.get('code') || '').trim().toUpperCase();
    const requestedName = String(params.get('name') || '').trim();
    const source = String(params.get('source') || '').trim().toLowerCase();

    const sourceBar = document.querySelector('[data-p36-proposal-source]');
    const sourceText = document.querySelector('[data-p36-proposal-source-text]');
    if (source === 'salesnavi' && sourceBar) {
      sourceBar.hidden = false;
      if (sourceText) sourceText.textContent = requestedName ? `「${requestedName}」に近い業種別提案を表示します。` : '営業先に合う業種別提案を表示します。';
    }

    grid.innerHTML = systems.map(s => `
      <article class="p36-proposal-card" data-p36-proposal-card data-code="${esc(s.code)}" data-category="${esc(s.category)}" data-search="${esc([s.code,s.name,s.tagline,s.summary,...(s.targets||[]),...(s.features||[])].join(' '))}">
        <div class="p36-proposal-card__top"><span class="p36-code">${esc(s.code)}</span><span>${esc(categories[s.category]?.label || s.category)}</span></div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.tagline)}</p>
        <div class="p36-proposal-card__actions">
          ${s.lpUrl ? `<a class="is-primary" href="${esc(s.lpUrl)}" target="_blank" rel="noopener">提案ページを見る ↗</a>` : ''}
          ${s.lpUrl ? `<button type="button" data-p36-copy-url="${esc(absoluteUrl(s.lpUrl))}">URLをコピー</button>` : ''}
          ${s.flyerHtml ? `<a href="${esc(s.flyerHtml)}" target="_blank" rel="noopener">A4チラシ ↗</a>` : ''}
          ${s.demoUrl ? `<a class="is-demo" href="${esc(s.demoUrl)}" target="_blank" rel="noopener">LIVE DEMO ↗</a>` : ''}
        </div>
        <div class="p36-proposal-card__foot"><a href="${esc(s.systemPage)}">PRODUCTを見る</a><a class="is-official" href="${esc(officialUrl(s.code))}" target="_blank" rel="noopener">青OFFICIALで詳しく ↗</a></div>
      </article>`).join('');

    const filterHost = document.querySelector('[data-p36-proposal-filters]');
    if (filterHost) {
      filterHost.innerHTML = `<label class="p36-filter"><input type="radio" name="p36-proposal-category" value="all" checked><span>すべて</span></label>` +
        Object.entries(categories).map(([key,val]) => `<label class="p36-filter"><input type="radio" name="p36-proposal-category" value="${esc(key)}"><span>${esc(val.label)}</span></label>`).join('');
    }

    const search = document.querySelector('[data-p36-proposal-search]');
    const visible = document.querySelector('[data-p36-proposal-visible]');
    const empty = document.querySelector('[data-p36-proposal-empty]');
    let directCodes = null;

    if (requestedCode && systems.some(s => s.code === requestedCode)) {
      directCodes = new Set([requestedCode]);
    } else if (requestedName) {
      const q = proposalMatchKey(requestedName);
      const hits = systems.filter(s => {
        const values = [s.code,s.name,s.assetSlug,...(s.targets||[])].map(proposalMatchKey).filter(Boolean);
        return values.some(v => v === q || v.includes(q) || q.includes(v));
      });
      if (hits.length) directCodes = new Set(hits.map(s => s.code));
      else if (search) search.value = requestedName;
    }

    const apply = () => {
      const q = norm(search?.value);
      const category = filterHost?.querySelector('input:checked')?.value || 'all';
      let shown = 0;
      grid.querySelectorAll('[data-p36-proposal-card]').forEach(card => {
        const okText = !q || norm(card.dataset.search).includes(q);
        const okCat = category === 'all' || card.dataset.category === category;
        const okDirect = !directCodes || directCodes.has(card.dataset.code);
        const show = okText && okCat && okDirect;
        card.hidden = !show;
        if (show) shown++;
      });
      if (visible) visible.textContent = String(shown);
      empty?.classList.toggle('is-visible', shown === 0);
    };

    search?.addEventListener('input', () => { directCodes = null; apply(); });
    filterHost?.addEventListener('change', () => { directCodes = null; apply(); });
    grid.addEventListener('click', e => {
      const button = e.target.closest('[data-p36-copy-url]');
      if (!button) return;
      copyText(button.getAttribute('data-p36-copy-url') || '', button);
    });
    apply();

    if ((requestedCode || requestedName) && grid.querySelector('[data-p36-proposal-card]:not([hidden])')) {
      window.setTimeout(() => document.querySelector('#proposals')?.scrollIntoView({behavior:'smooth',block:'start'}), 100);
    }
  }

  function init(){
    initMenu(); fillCounts(); renderCategories(); renderFeatured(); renderCatalog(); renderProposalHub();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
