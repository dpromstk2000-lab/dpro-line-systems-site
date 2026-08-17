(()=>{
  'use strict';

  const TARGETS='h1,h2,h3,h4,button,a.btn,a.dpro-button,a[class*="btn"],[class*="cta"] a';
  const JP=/[ぁ-んァ-ヶ一-龠々ー]/;

  // R9 generic guards stay locked. V1.2 adds only nine-page residual fixes.
  const PHRASES=[
    '受付システム','ホームページ','診察券QR','LINE公式','マグネット',
    '取り置き','受け渡し','フォロー','メニュー','システム',
    'ありません','できます','じゃない','ひとつ','つなぐ','カルテ',
    'まで','から','ので','ため','ます','です','できる',
    '比べてください','ご相談ください','確認できる','いませんか',
    'ませんか','合うか','次回来店へ','購入後も','運用も','つながるか'
  ].sort((a,b)=>b.length-a.length);

  const V11_RULES={
    'compare-repitte.html':[
      {text:'「機能を追加する」か。 「業務の流れを設計する」か。',keep:['する」か。','設計する」か。']}
    ],
    'lp-btype.html':[
      {text:'LINE公式運用・ホームページ運用・B型専用システム運用まで。',keep:['ホームページ','システム']},
      {text:'まずは、今の運用に合うか確認してください。',keep:['ください。']}
    ],
    'lp-car.html':[
      {text:'今のお店の仕事が、 どこまで一つにつながるか。 まずは実際の画面を見ながらご相談ください。',keep:['ください。']}
    ],
    'lp-chosashi.html':[
      {text:'「今どうなっていますか？」を、 依頼者自身でも確認できる。',keep:['できる。']}
    ],
    'lp-cosmetics.html':[
      {text:'相談も、購入後も。 LINEでつながる化粧品店へ。',keep:['購入後も。']}
    ],
    'lp-gyosei.html':[
      {text:'今の事務所業務に合うか、 実際の画面を見ながらご相談ください。',keep:['合うか、']}
    ],
    'lp-haishoku.html':[
      {text:'DPRO 高齢者配食管理システム',keep:['システム']}
    ],
    'lp-homecare.html':[
      {text:'訪問の「今日どうなってる？」を、ひとつにつなぐ。',keep:['ひとつ']}
    ]
  };

  const escaped=PHRASES.map(
    s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
  );
  const phraseRe=new RegExp('('+escaped.join('|')+')','g');

  function norm(el){
    return (el.innerText||el.textContent||'').trim().replace(/\s+/g,' ');
  }

  function currentPage(){
    const parts=location.pathname.split('/').filter(Boolean);
    return parts.length ? parts[parts.length-1] : 'index.html';
  }

  function protectV11Phrase(el,phrase){
    const nodes=[];
    const walker=document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node){
          const p=node.parentElement;
          if(!p || p.closest('script,style,noscript,.dpro-jp-v11-keep')){
            return NodeFilter.FILTER_REJECT;
          }
          return (node.nodeValue||'').includes(phrase)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );
    let node;
    while((node=walker.nextNode())) nodes.push(node);

    for(const textNode of nodes){
      const text=textNode.nodeValue||'';
      const at=text.indexOf(phrase);
      if(at<0) continue;

      const frag=document.createDocumentFragment();
      if(at>0) frag.appendChild(document.createTextNode(text.slice(0,at)));

      frag.appendChild(document.createElement('wbr'));
      const span=document.createElement('span');
      span.className='dpro-jp-v11-keep';
      span.textContent=phrase;
      frag.appendChild(span);

      const tail=text.slice(at+phrase.length);
      if(tail) frag.appendChild(document.createTextNode(tail));
      textNode.replaceWith(frag);
      return true;
    }
    return false;
  }

  function applyV11Rules(){
    const rules=V11_RULES[currentPage()]||[];
    if(!rules.length) return;

    const targets=[...document.querySelectorAll(TARGETS)];
    for(const rule of rules){
      const el=targets.find(candidate=>norm(candidate)===rule.text);
      if(!el || el.dataset.dproJpV11==='1') continue;
      let applied=0;
      for(const phrase of rule.keep){
        if(protectV11Phrase(el,phrase)) applied++;
      }
      if(applied===rule.keep.length){
        el.dataset.dproJpV11='1';
        el.classList.add('dpro-jp-v11-target');
      }
    }
  }

  function protectTextNode(node){
    const text=node.nodeValue||'';
    if(!text || !JP.test(text)) return;

    phraseRe.lastIndex=0;
    if(!phraseRe.test(text)){
      phraseRe.lastIndex=0;
      return;
    }
    phraseRe.lastIndex=0;

    const frag=document.createDocumentFragment();
    let last=0;
    let match;

    while((match=phraseRe.exec(text))){
      if(match.index>last){
        frag.appendChild(document.createTextNode(text.slice(last,match.index)));
      }

      const span=document.createElement('span');
      span.className='dpro-jp-keep';
      span.textContent=match[0];
      frag.appendChild(span);
      last=match.index+match[0].length;
    }

    if(last<text.length){
      frag.appendChild(document.createTextNode(text.slice(last)));
    }
    node.replaceWith(frag);
  }

  function protectTarget(el){
    if(
      !el ||
      Boolean(el.dataset.dproJpWrapV1) ||
      !JP.test(el.textContent||'')
    ) return;

    el.dataset.dproJpWrapV1='1';
    el.classList.add('dpro-jp-wrap-target');

    const nodes=[];
    const walker=document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node){
          const p=node.parentElement;
          if(
            !p ||
            p.closest('script,style,noscript,.dpro-jp-keep,.dpro-jp-v11-keep')
          ){
            return NodeFilter.FILTER_REJECT;
          }
          return (
            node.nodeValue &&
            node.nodeValue.trim() &&
            JP.test(node.nodeValue)
          ) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    let node;
    while((node=walker.nextNode())) nodes.push(node);
    nodes.forEach(protectTextNode);
  }

  function pageOverflow(){
    const root=document.documentElement;
    return root.scrollWidth>root.clientWidth+4;
  }

  function targetOverflows(el){
    const root=document.documentElement;
    const r=el.getBoundingClientRect();
    const targetWidth=Math.max(el.clientWidth||0,r.width||0);
    const ownOverflow=(el.scrollWidth||0)>targetWidth+3;
    const viewportOverflow=r.right>root.clientWidth+4 || r.left<-4;
    return ownOverflow || viewportOverflow;
  }

  function spanOverflows(span){
    const root=document.documentElement;
    const target=span.closest('.dpro-jp-wrap-target');
    if(!target) return false;
    const sr=span.getBoundingClientRect();
    const tr=target.getBoundingClientRect();
    return (
      sr.right>Math.min(tr.right,root.clientWidth)+3 ||
      sr.left<Math.max(tr.left,0)-3 ||
      sr.width>Math.max(20,tr.width-2)
    );
  }

  function unwrapTarget(el){
    el.querySelectorAll('.dpro-jp-keep').forEach(span=>{
      span.replaceWith(document.createTextNode(span.textContent||''));
    });
    el.normalize();
    el.classList.remove('dpro-jp-wrap-target','dpro-jp-wrap-target--relax');
    el.dataset.dproJpWrapV1='rollback-local';
  }

  function recoverOverflow(){
    if(window.__DPRO_PRODUCT_JP_WRAP_BASE_OVERFLOW__) return;

    requestAnimationFrame(()=>{
      if(!pageOverflow()) return;

      document.querySelectorAll('.dpro-jp-keep').forEach(span=>{
        if(spanOverflows(span)) span.classList.add('dpro-jp-keep--relax');
      });

      requestAnimationFrame(()=>{
        if(!pageOverflow()) return;

        [...document.querySelectorAll('.dpro-jp-wrap-target')]
          .filter(targetOverflows)
          .forEach(el=>el.classList.add('dpro-jp-wrap-target--relax'));

        requestAnimationFrame(()=>{
          if(!pageOverflow()) return;
          [...document.querySelectorAll('.dpro-jp-wrap-target')]
            .filter(targetOverflows)
            .forEach(unwrapTarget);
        });
      });
    });
  }

  function run(){
    applyV11Rules();
    document.querySelectorAll(TARGETS).forEach(protectTarget);
    window.__DPRO_PRODUCT_JP_WRAP_V1__='V1.2';
    recoverOverflow();
  }

  function boot(){
    window.__DPRO_PRODUCT_JP_WRAP_BASE_OVERFLOW__=pageOverflow();
    run();

    let timer=0;
    const observer=new MutationObserver(()=>{
      clearTimeout(timer);
      timer=setTimeout(run,60);
    });
    observer.observe(document.body,{childList:true,subtree:true});

    setTimeout(run,300);
    setTimeout(run,1000);
    setTimeout(()=>observer.disconnect(),2600);
  }

  document.readyState==='loading'
    ? document.addEventListener('DOMContentLoaded',boot,{once:true})
    : boot();
})();
