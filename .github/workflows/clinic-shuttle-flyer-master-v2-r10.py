#!/usr/bin/env python3
from pathlib import Path
import json, sys, subprocess, time, urllib.request

ROOT = Path.cwd()
HTML = ROOT / "flyer-clinic-shuttle.html"
PDF = ROOT / "flyer-clinic-shuttle.pdf"
EVID = ROOT / "assets" / "clinic-shuttle-next"

PUBLIC = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/flyer-clinic-shuttle.html"
PUBLIC_PDF = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/flyer-clinic-shuttle.pdf"
OFFICIAL = "https://dpro-shop.com/systems/clinic-shuttle"
DEMO = "https://dpromstk2000-lab.github.io/dpro-clinic-shuttle-line/"
LINE = "https://lin.ee/YxJGXV6D"

SYSTEM_HEAD = "3fc09f4b5c6781d6038dc280de5c58752ce60b51"
OFFICIAL_HEAD = "b92a4d6444375aefc481db267d626c5a712164a5"

PAGE = '<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>DPRO CLINIC SHUTTLE A4 FLYER MASTER V2.0</title>\n<style>\n:root{--ink:#0b211b;--deep:#071a15;--deep2:#0d3026;--mint:#18c98a;--mint2:#e5f8f0;--paper:#fff;--line:#d9e5df;--muted:#5f716a}\n*{box-sizing:border-box}\nhtml,body{margin:0;padding:0;background:#dde5e1;color:var(--ink);font-family:"Noto Sans CJK JP","Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}\n.toolbar{position:sticky;top:0;z-index:20;display:flex;gap:10px;justify-content:center;padding:12px;background:rgba(7,26,21,.95);box-shadow:0 6px 22px rgba(0,0,0,.18)}\n.toolbar button{border:0;border-radius:999px;padding:10px 18px;font-weight:800;cursor:pointer}.toolbar .primary{background:var(--mint);color:#052018}.toolbar .secondary{background:#fff;color:var(--deep)}\n.sheet{width:210mm;height:297mm;margin:12mm auto;background:#fff;box-shadow:0 14px 50px rgba(0,0,0,.18);position:relative;overflow:hidden}\n.hero{height:76mm;background:var(--deep);color:#fff;display:grid;grid-template-columns:1.36fr .82fr;overflow:hidden}\n.hero-copy{padding:8.5mm 7mm 6mm 12mm;position:relative;z-index:2}\n.hero-photo{position:relative;overflow:hidden}.hero-photo img{width:100%;height:100%;object-fit:cover;object-position:52% center;display:block}.hero-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,26,21,.82) 0%,rgba(7,26,21,.12) 36%,rgba(7,26,21,0) 68%)}\n.brand{display:flex;align-items:center;gap:3mm;font-size:2.85mm;font-weight:900;letter-spacing:.09em}.brandmark{width:7.2mm;height:7.2mm;border-radius:2.2mm;background:var(--mint);display:grid;place-items:center;font-size:3.6mm;font-weight:900}\n.eyebrow{margin-top:4.7mm;color:#69e7b8;font-size:2.85mm;font-weight:900;letter-spacing:.16em}\nh1{margin:2.4mm 0 2.3mm;font-size:8.25mm;line-height:1.12;letter-spacing:-.04em}\n.lead{margin:0;max-width:102mm;font-size:3.0mm;line-height:1.52;color:#dcebe5;font-weight:700}.lead-line{display:block;white-space:nowrap}\n.pillrow{display:flex;gap:1.5mm;flex-wrap:wrap;margin-top:3mm}.pill{border:1px solid rgba(255,255,255,.27);background:rgba(255,255,255,.075);padding:1.3mm 2.2mm;border-radius:999px;font-size:2.15mm;font-weight:800}\n.photo-label{position:absolute;right:4mm;bottom:4mm;z-index:3;background:rgba(7,26,21,.78);padding:1.5mm 2.4mm;border-radius:1.8mm;font-size:2.05mm;font-weight:900}\n.main{padding:4.7mm 10mm 0}.section-title{font-size:4.4mm;font-weight:900;letter-spacing:-.025em;margin:0 0 2.6mm}.section-title span{color:var(--mint)}\n.feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2.2mm}.feature{border:1px solid var(--line);border-radius:3mm;padding:2.7mm 3mm 2.6mm;min-height:25.5mm;background:#fff}\n.icon{width:6.7mm;height:6.7mm;border-radius:2mm;background:var(--mint2);display:grid;place-items:center;margin-bottom:1.3mm;color:#0c8d64;font-size:3.0mm;font-weight:900}\n.feature h3{margin:0 0 .9mm;font-size:2.82mm;line-height:1.22}.feature p{margin:0;color:var(--muted);font-size:2.12mm;line-height:1.34;font-weight:620}\n.ecosystem{margin-top:3mm;border-radius:3.2mm;background:linear-gradient(135deg,#071a15 0%,#0c2f25 100%);color:#fff;padding:3.2mm 3.5mm 3mm}\n.eco-head{display:grid;grid-template-columns:39mm 1fr;gap:3mm;align-items:end}.eco-kicker{font-size:1.75mm;color:#67e7b7;font-weight:900;letter-spacing:.13em;padding-bottom:.6mm}\n.eco-title{display:flex;align-items:baseline;gap:2.4mm;flex-wrap:nowrap}.eco-title h3{margin:0;font-size:3.92mm;line-height:1.08;white-space:nowrap}.eco-title p{margin:0;color:#cfe3dc;font-size:1.82mm;font-weight:700;white-space:nowrap}\n.eco-diagram{margin-top:2.3mm;display:grid;grid-template-columns:49mm 6mm 34mm 6mm 1fr;gap:1.6mm;align-items:stretch;height:16mm}\n.channels{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5mm;height:16mm}.channel{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.065);border-radius:2.1mm;padding:1.5mm 1.4mm;display:flex;flex-direction:column;justify-content:center}.channel .tag{font-size:1.18mm;color:#7be9c0;font-weight:900}.channel strong{margin-top:.7mm;font-size:1.85mm;line-height:1.2}.channel small{font-size:1.15mm;color:#bcd4cb;margin-top:.5mm;font-weight:700}\n.join{display:grid;place-items:center;color:#67e7b7;font-size:4.2mm}.hub{height:16mm;border-radius:2.4mm;background:#18c98a;color:#062218;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.hub small{font-size:1.4mm;font-weight:900}.hub strong{font-size:3.2mm;line-height:1;margin:.55mm 0}.hub span{font-size:1.35mm;font-weight:800}\n.management-panel{height:16mm;overflow:hidden;border-radius:2.4mm;border:1px solid rgba(103,231,183,.46);background:linear-gradient(135deg,#f8fffc 0%,#e8f9f2 100%);color:#0a2b22;padding:1.45mm 1.8mm 1.35mm;display:grid;grid-template-rows:auto 1fr;gap:.8mm}\n.management-head{display:flex;align-items:baseline;justify-content:space-between;gap:2mm;border-bottom:1px solid rgba(10,76,57,.12);padding-bottom:.65mm}.management-head .mk{font-size:1.08mm;font-weight:900;color:#0b8e66}.management-head strong{font-size:1.6mm;white-space:nowrap}\n.management-items{display:grid;grid-template-columns:repeat(4,1fr)}.management-item{padding:.32mm .7mm 0;display:flex;flex-direction:column;justify-content:center;min-width:0}.management-item+.management-item{border-left:1px solid rgba(10,76,57,.13)}.management-item b{font-size:1.55mm;white-space:nowrap}.management-item small{font-size:1.0mm;color:#5c776d;font-weight:750;margin-top:.28mm;white-space:nowrap}\n.strength-grid{margin-top:2.1mm;border-top:1px solid rgba(255,255,255,.15);padding-top:1.8mm;display:grid;grid-template-columns:1fr 1fr;gap:2mm}.strength{display:grid;grid-template-columns:19mm 1fr;grid-template-areas:"tag title" "tag body";column-gap:1.8mm}.strength+.strength{border-left:1px solid rgba(255,255,255,.13);padding-left:2.2mm}.strength span{grid-area:tag;font-size:1.45mm;color:#70e9bb;font-weight:900}.strength strong{grid-area:title;font-size:2.15mm;white-space:nowrap}.strength p{grid-area:body;margin:.62mm 0 0;color:#c9ddd5;font-size:1.48mm;line-height:1.28;font-weight:650}\n.cost-check{margin-top:3mm;border:1px solid #e4ddd1;border-radius:3.2mm;background:linear-gradient(90deg,#fbf8f2 0%,#fff 100%);padding:3mm 3.3mm;display:grid;grid-template-columns:49mm 1fr;gap:3mm;align-items:center}\n.cost-head .small{font-size:1.9mm;font-weight:900;color:#7c694b}.cost-head h3{margin:.8mm 0 0;font-size:3.48mm;line-height:1.16}.cost-head h3 span{color:#8b6530}\n.cost-items{display:grid;grid-template-columns:repeat(3,1fr);gap:1.8mm}.cost-item{background:#fff;border:1px solid #e7dfd3;border-radius:2.5mm;padding:2.1mm 2.2mm;min-height:16.5mm}.cost-item .label{font-size:1.76mm;font-weight:900;color:#78674f;margin-bottom:.75mm}.cost-item strong{display:block;font-size:2.62mm;color:#1b332c;white-space:nowrap}.cost-item small{display:block;font-size:1.5mm;line-height:1.25;color:#786f65;margin-top:.65mm;font-weight:650}\n.price{margin-top:3mm;border:1px solid #bfead8;border-radius:3.3mm;background:linear-gradient(135deg,#effbf6,#fff);padding:3.1mm 3.6mm;display:grid;grid-template-columns:1.24fr .96fr;gap:4mm;align-items:center}.price .top{font-size:2.05mm;font-weight:900;color:#16805f}.price h2{font-size:5.05mm;line-height:1.06;margin:.8mm 0 1.1mm}.price h2 strong{font-size:7.15mm;color:#0c8c64}.price h2 small{font-size:2.2mm}\n.breakdown{display:flex;gap:.8mm;flex-wrap:wrap}.breakdown span{font-size:1.8mm;font-weight:800;background:#fff;border:1px solid var(--line);padding:.8mm 1.35mm;border-radius:1.4mm}.price-message{font-size:2.08mm;line-height:1.38;font-weight:800;color:#315c50}.price-message strong{display:block;color:#0c8c64;font-size:2.5mm;margin-bottom:.75mm}.init{margin-top:1.1mm;font-size:1.7mm;color:#47695e;font-weight:800}\n.contact{margin-top:2.4mm;border-top:1px solid var(--line);padding-top:2.4mm}.contact-head{display:grid;grid-template-columns:1.15fr .85fr;gap:5mm;align-items:end;margin-bottom:1.8mm}.contact-head .brandline{font-size:2.15mm;color:#0c8c64;font-weight:900}.contact-head h3{font-size:3.9mm;line-height:1.15;margin:.75mm 0 0}.contact-head p{font-size:1.85mm;line-height:1.42;margin:0;color:var(--muted);font-weight:700;text-align:right}\n.action-grid{display:grid;grid-template-columns:.94fr 1.12fr .94fr;gap:2.2mm}.action-card{border:1px solid #cfe0d8;border-radius:3mm;padding:1.8mm 2mm;min-height:35.5mm;display:grid;grid-template-columns:minmax(0,1fr) 20.5mm;gap:1.6mm;align-items:center;background:#fff;overflow:hidden}.action-card.site{border-color:#64bc99;background:linear-gradient(135deg,#f1fcf7 0%,#fff 72%)}\n.action-copy{min-width:0;align-self:stretch;display:flex;flex-direction:column;justify-content:center}.action-kicker{display:flex;align-items:center;gap:1.2mm;margin-bottom:1mm;color:#0b7557;font-size:1.65mm;font-weight:900}.action-num{width:5.1mm;height:5.1mm;border-radius:50%;display:grid;place-items:center;background:var(--deep);color:#fff;font-size:1.7mm}.action-card h4{font-size:3.12mm;margin:0 0 1mm}.action-card p{font-size:1.62mm;line-height:1.35;margin:0;color:var(--muted);font-weight:700}.site-url{margin-top:auto;padding-top:1.1mm;border-top:1px solid #d3e7de;font-size:1.45mm;line-height:1.2;color:#063f30;font-weight:900;word-break:break-all}\n.action-qr{text-align:center}.action-qr img{width:19.2mm;height:19.2mm;display:block;margin:0 auto .8mm}.action-qr .qlabel{font-size:2.32mm;font-weight:900;color:#123c31}\n.footer{position:absolute;left:0;right:0;bottom:0;height:9.5mm;background:var(--deep);display:flex;align-items:center;justify-content:space-between;padding:0 10mm;color:#fff}.footer .fbrand{display:flex;align-items:center;gap:3mm;font-size:2.5mm;font-weight:900}.footer .shop{color:#68e7b8}.footer .note{font-size:1.7mm;color:#b8d2c9;text-align:right;line-height:1.3}\n@page{size:A4 portrait;margin:0}@media print{html,body{background:#fff}.toolbar{display:none!important}.sheet{margin:0;box-shadow:none}}@media screen and (max-width:900px){.sheet{transform-origin:top center;transform:scale(.72);margin-bottom:-72mm}}\n</style>\n</head>\n<body>\n<div class="toolbar"><button class="primary" onclick="window.print()">A4で印刷 / PDF保存</button><button class="secondary" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">先頭へ</button></div>\n<section class="sheet" aria-label="DPRO 診療所送迎予約 A4営業チラシ">\n<header class="hero">\n<div class="hero-copy">\n<div class="brand"><span class="brandmark">D</span><span>DPRO LINE SYSTEMS</span></div>\n<div class="eyebrow">CLINIC / SHUTTLE RESERVATION</div>\n<h1>通院送迎を、<br>予約から帰宅まで、一つに。</h1>\n<p class="lead"><span class="lead-line">患者・ご家族の予約、受付・配車、運転員の当日運行、診療後の帰宅まで。</span><span class="lead-line">ひとつの送迎情報でつなぐ、診療所向け送迎システム。</span></p>\n<div class="pillrow"><span class="pill">WEB・LINE予約</span><span class="pill">電話代理登録</span><span class="pill">配車管理</span><span class="pill">帰宅確認</span></div>\n</div>\n<div class="hero-photo"><img src="assets/clinic-shuttle-next/clinic-care.jpg" alt="診療所の通院送迎イメージ"><div class="photo-label">CLINIC / SHUTTLE</div></div>\n</header>\n\n<main class="main">\n<h2 class="section-title">通院送迎の業務を、<span>6つの仕組み</span>で整える。</h2>\n<section class="feature-grid">\n<article class="feature"><div class="icon">予</div><h3>WEB / LINE送迎予約</h3><p>患者・ご家族が、いつでも予約・変更。希望日・時間・乗降場所まで一元受付。</p></article>\n<article class="feature"><div class="icon">電</div><h3>電話代理登録</h3><p>受付が電話予約を代理で登録。オンラインが苦手な方にも対応できます。</p></article>\n<article class="feature"><div class="icon">覧</div><h3>予約・変更一覧</h3><p>送迎予定を一覧で確認。変更・キャンセルも履歴付きで把握。</p></article>\n<article class="feature"><div class="icon">車</div><h3>車両・運転員割当</h3><p>当日の便ごとに車両と担当を割当。運行漏れを防いで準備を標準化。</p></article>\n<article class="feature"><div class="icon">帰</div><h3>診療後・帰宅記録</h3><p>診療後の帰宅便、出発・到着の記録まで同じ履歴で管理。</p></article>\n<article class="feature"><div class="icon">連</div><h3>家族・院内連携</h3><p>ご家族連絡、院内共有、迎え状況の確認をまとめて一本化。</p></article>\n</section>\n\n<section class="ecosystem">\n<div class="eco-head"><div class="eco-kicker">CONNECTED EXPERIENCE</div><div class="eco-title"><h3>入口は自由。管理は、ひとつ。</h3><p>WEB・LINE・電話から、すべての送迎情報をDPROへ。</p></div></div>\n<div class="eco-diagram">\n<div class="channels">\n<div class="channel"><span class="tag">WEB</span><strong>WEB予約</strong><small>ホームページから受付</small></div>\n<div class="channel"><span class="tag">LINE</span><strong>LINE予約・変更</strong><small>LINEから簡単に受付</small></div>\n<div class="channel"><span class="tag">PHONE</span><strong>電話代理登録</strong><small>受付が代理入力</small></div>\n</div>\n<div class="join">→</div>\n<div class="hub"><small>DPRO</small><strong>CLINIC<br>SHUTTLE</strong><span>診療所送迎システム</span></div>\n<div class="join">→</div>\n<div class="management-panel">\n<div class="management-head"><span class="mk">ONE MANAGEMENT HUB</span><strong>すべての送迎業務を、ここから管理。</strong></div>\n<div class="management-items">\n<div class="management-item"><b>予約一覧</b><small>予定・変更</small></div>\n<div class="management-item"><b>配車</b><small>車両・担当</small></div>\n<div class="management-item"><b>当日運行</b><small>出発・到着</small></div>\n<div class="management-item"><b>帰宅確認</b><small>帰宅・履歴</small></div>\n</div></div></div>\n<div class="strength-grid">\n<div class="strength"><span>CUSTOM FIT</span><strong>診療所の運用に合わせて、柔軟に設定。</strong><p>WEB・LINE・電話からの予約を一元管理し、送迎業務につなげます。</p></div>\n<div class="strength"><span>LIVE SYNC</span><strong>予約から帰宅まで、シームレスにつなぐ。</strong><p>配車・運行・診療後の帰宅確認まで、同じ送迎情報で共有します。</p></div>\n</div>\n</section>\n\n<section class="cost-check">\n<div class="cost-head"><div class="small">MONTHLY COST CHECK</div><h3>LINE・HP・送迎管理、<br><span>別々に運用していませんか？</span></h3></div>\n<div class="cost-items">\n<div class="cost-item"><div class="label">LINE公式運用</div><strong>3,300円/月</strong><small>お知らせ配信・お問い合わせ・予約受付など</small></div>\n<div class="cost-item"><div class="label">ホームページ運用</div><strong>1,100円/月</strong><small>診療案内・お知らせ・予約の入口など</small></div>\n<div class="cost-item"><div class="label">DPROシステム運用</div><strong>1,100円/月</strong><small>予約・配車・運行・帰宅確認など</small></div>\n</div>\n</section>\n\n<section class="price">\n<div><div class="top">DPRO SHOP MONTHLY OPERATION</div><h2>3つまとめて月額 <strong>5,500円</strong> <small>（税込）</small></h2><div class="breakdown"><span>LINE公式運用 3,300円</span><span>ホームページ運用 1,100円</span><span>DPROシステム運用 1,100円</span></div></div>\n<div class="price-message"><strong>相談から導入まで、ひとつの窓口へ。</strong>LINE公式・ホームページ・DPROシステムを、つなげて低コストで運用します。<div class="init">初期設定費：33,000円（税込）</div></div>\n</section>\n\n<section class="contact">\n<div class="contact-head"><div><div class="brandline">DPRO SHOP / CHOOSE YOUR NEXT STEP</div><h3>相談する。知る。試す。DPROを、もっと近くに。</h3></div><p>詳しい情報は公式サイト、または担当まで。<br>デモのご相談もお気軽にどうぞ。</p></div>\n<div class="action-grid">\n<article class="action-card"><div class="action-copy"><div class="action-kicker"><span class="action-num">01</span> CONTACT</div><h4>相談する。</h4><p>送迎システムの導入について、LINEでご相談・お見積りを承ります。</p></div><div class="action-qr"><img src="assets/clinic-shuttle-next/qr/line.png" alt="LINE相談 QR"><div class="qlabel">LINEで相談</div></div></article>\n<article class="action-card site"><div class="action-copy"><div class="action-kicker"><span class="action-num">02</span> OFFICIAL SITE</div><h4>詳しく見る。</h4><p>機能・料金・導入条件など、詳しい情報をご覧いただけます。</p><div class="site-url">https://dpro-shop.com/systems/clinic-shuttle</div></div><div class="action-qr"><img src="assets/clinic-shuttle-next/qr/official.png" alt="DPRO SHOP公式 QR"><div class="qlabel">公式サイト</div></div></article>\n<article class="action-card"><div class="action-copy"><div class="action-kicker"><span class="action-num">03</span> LIVE DEMO</div><h4>体験する。</h4><p>家族・管理PC・iPad・スタッフの実際の公開デモを確認できます。</p></div><div class="action-qr"><img src="assets/clinic-shuttle-next/qr/demo.png" alt="LIVE DEMO QR"><div class="qlabel">DEMO体験</div></div></article>\n</div>\n</section>\n</main>\n\n<footer class="footer"><div class="fbrand"><span>DPRO LINE SYSTEMS</span><span class="shop">DPRO SHOP</span></div><div class="note">LINE公式・ホームページ・診療所送迎システム<br>診療所送迎予約 A4 MASTER V2.0</div></footer>\n</section>\n</body>\n</html>'

def write(path, obj):
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(obj, (dict, list)):
        p.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
    else:
        p.write_text(str(obj), encoding="utf-8")

def patch():
    HTML.write_text(PAGE, encoding="utf-8")
    write("assets/clinic-shuttle-next/R10_FLYER_MASTER_V2_SOURCE.json", {
        "stage":"R10_FLYER_MASTER_V2_SOURCE","pass":True,
        "master":"DPRO A4 FLYER MASTER V2.0","product":"DPRO 診療所送迎予約",
        "officialUrl":OFFICIAL,"demoUrl":DEMO,"systemFinalLock":SYSTEM_HEAD,"officialHead":OFFICIAL_HEAD
    })
    print("R10 flyer source PASS")

def build_pdf():
    from playwright.sync_api import sync_playwright
    proc = subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1"],
                            cwd=str(ROOT), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(1.0)
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True)
            p = browser.new_page(viewport={"width":1440,"height":1200})
            p.goto("http://127.0.0.1:8765/flyer-clinic-shuttle.html", wait_until="networkidle", timeout=60000)
            p.wait_for_timeout(700)
            p.screenshot(path=str(EVID/"r10-flyer-master-v2-screen.png"), full_page=True)
            qa = p.evaluate("""() => {
              const sheet=document.querySelector('.sheet');
              const r=sheet.getBoundingClientRect();
              const broken=[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src);
              return {sheet:{width:r.width,height:r.height},brokenImages:broken,bodyTextChars:(document.body.innerText||'').length};
            }""")
            if qa["brokenImages"] or qa["bodyTextChars"] < 1000:
                raise SystemExit("screen flyer QA failed: "+json.dumps(qa,ensure_ascii=False))
            p.pdf(path=str(PDF), format="A4", print_background=True, prefer_css_page_size=True,
                  margin={"top":"0","right":"0","bottom":"0","left":"0"})
            browser.close()
        write("assets/clinic-shuttle-next/R10_FLYER_SCREEN_QA.json", qa)
    finally:
        proc.terminate()
        try: proc.wait(timeout=3)
        except Exception: proc.kill()
    print("R10 PDF build PASS")

def pdfqa():
    import fitz, cv2, numpy as np, zxingcpp
    doc = fitz.open(PDF)
    if doc.page_count != 1:
        raise SystemExit(f"PDF page count {doc.page_count} != 1")
    if PDF.stat().st_size < 100000:
        raise SystemExit(f"PDF too small: {PDF.stat().st_size}")
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(3.0,3.0), alpha=False)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height,pix.width,pix.n)
    if pix.n == 4:
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
    vals = sorted(set(r.text for r in zxingcpp.read_barcodes(img) if r.text))
    expected = [LINE, OFFICIAL, DEMO]
    missing = [u for u in expected if u not in vals]
    if missing:
        raise SystemExit("PDF QR decode missing: "+repr(missing)+" got="+repr(vals))
    write("assets/clinic-shuttle-next/R10_FLYER_PDF_QA.json", {
        "stage":"R10_FLYER_PDF_QA","pass":True,"pages":1,"bytes":PDF.stat().st_size,
        "qrDecoded":vals,"expected":expected
    })
    print("R10 PDF/QR QA PASS")

def get(url, timeout=40):
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 DPRO-R10-FLYER-QA"})
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return r.status,r.read()

def publicqa():
    from playwright.sync_api import sync_playwright
    last=None
    for i in range(42):
        try:
            status,data=get(PUBLIC)
            text=data.decode("utf-8","ignore")
            if status==200 and "DPRO CLINIC SHUTTLE A4 FLYER MASTER V2.0" in text:
                break
            last=(status,"MASTER V2.0" in text)
        except Exception as e:
            last=repr(e)
        time.sleep(10)
    else:
        raise SystemExit("public HTML not ready: "+repr(last))
    status_pdf,data_pdf=get(PUBLIC_PDF)
    if status_pdf != 200 or len(data_pdf) < 100000:
        raise SystemExit("public PDF invalid")
    report={"stage":"R10_FLYER_PUBLIC_QA","pass":True,"html":{},"pdf":{"status":status_pdf,"bytes":len(data_pdf)}}
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)
        for w in [390,1440]:
            p=browser.new_page(viewport={"width":w,"height":1000})
            p.goto(PUBLIC,wait_until="networkidle",timeout=60000)
            p.wait_for_timeout(500)
            broken=p.locator("img").evaluate_all("(els)=>els.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)")
            title=p.title()
            if broken or "MASTER V2.0" not in title:
                raise SystemExit(f"public visual QA failed width={w} title={title} broken={broken}")
            p.screenshot(path=str(EVID/f"r10-public-{w}.png"),full_page=True)
            report["html"][str(w)]={"title":title,"brokenImages":broken}
            p.close()
        browser.close()
    write("assets/clinic-shuttle-next/R10_FLYER_PUBLIC_QA.json",report)
    print("R10 PUBLIC QA PASS")

if __name__=="__main__":
    if len(sys.argv)!=2:
        raise SystemExit("usage: script.py patch|build|pdfqa|publicqa")
    {"patch":patch,"build":build_pdf,"pdfqa":pdfqa,"publicqa":publicqa}[sys.argv[1]]()
