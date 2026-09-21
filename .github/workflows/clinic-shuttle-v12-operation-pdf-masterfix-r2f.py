#!/usr/bin/env python3
from pathlib import Path
import json, os, re, sys, time, urllib.request, tempfile

ROOT=Path.cwd()
ASSET=ROOT/"assets/clinic-shuttle-next"
QR=ASSET/"qr"
SCREENS=ASSET/"screens"
EVID=ROOT/"release-evidence-v12-operation-pdf"
QHTML=ASSET/"quick-start.html"
DHTML=ASSET/"detailed-manual.html"
QPDF=ROOT/"DPRO_TUTORIAL_CLINIC_SHUTTLE_QUICK_START_V1.0.pdf"
DPDF=ROOT/"DPRO_TUTORIAL_CLINIC_SHUTTLE_DETAILED_MANUAL_V1.0.pdf"

SYSTEM_HEAD="3fc09f4b5c6781d6038dc280de5c58752ce60b51"
PARENT_HEAD="6a04230ec526d3ea589ffc42a5e777a355e95e46"

BASE="https://dpromstk2000-lab.github.io/dpro-line-systems-site/"
DEMO="https://dpromstk2000-lab.github.io/dpro-clinic-shuttle-line/"
MEMBER=DEMO+"member.html"
OWNER=DEMO+"owner.html"
IPAD=DEMO+"owner-ipad.html"
STAFF=DEMO+"staff.html"
CHECK=DEMO+"system-check.html"
GUIDE=DEMO+"guide-center.html"
PRODUCT=BASE+"systems/clinic-shuttle.html"
OFFICIAL="https://dpro-shop.com/systems/clinic-shuttle"
LINE="https://lin.ee/YxJGXV6D"

Q_PUBLIC=BASE+QPDF.name
D_PUBLIC=BASE+DPDF.name

def fetch(url,timeout=45):
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 DPRO-V12-R2F"})
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return r.status,r.read()

def api_head(repo):
    _,b=fetch(f"https://api.github.com/repos/{repo}/branches/main")
    return json.loads(b.decode())["commit"]["sha"]

def write(name,obj):
    EVID.mkdir(parents=True,exist_ok=True)
    p=EVID/name
    p.write_text(json.dumps(obj,ensure_ascii=False,indent=2) if isinstance(obj,(dict,list)) else str(obj),encoding="utf-8")

def make_qr(path,url):
    import qrcode
    qrcode.make(url).save(path)

def qr_decode(path,expected):
    import cv2,zxingcpp
    a=cv2.imread(str(path))
    if a is None: raise SystemExit(f"QR unreadable: {path}")
    got=[x.text for x in zxingcpp.read_barcodes(a) if x.text]
    if expected not in got: raise SystemExit(f"QR mismatch {path}: {got}")
    return {"file":str(path.relative_to(ROOT)),"expected":expected,"decoded":got}

def screen_check(path):
    import cv2
    a=cv2.imread(str(path))
    if a is None: raise SystemExit(f"screen unreadable: {path}")
    h,w=a.shape[:2]
    g=cv2.cvtColor(a,cv2.COLOR_BGR2GRAY)
    mean,var=float(g.mean()),float(g.var())
    if w<300 or h<300 or var<80 or mean<5 or mean>250:
        raise SystemExit(f"screen nonblank fail {path}: {w}x{h} mean={mean} var={var}")
    return {"file":str(path.relative_to(ROOT)),"w":w,"h":h,"mean":mean,"variance":var}

CSS=r'''
@page{size:A4 portrait;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#eef3f1;color:#173129;font-family:"Noto Sans CJK JP","Yu Gothic",Meiryo,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{position:relative;width:210mm;height:297mm;padding:11mm 12mm 13mm;background:#fff;page-break-after:always;overflow:hidden}
.page:last-child{page-break-after:auto}
.ey{font-size:8px;font-weight:900;letter-spacing:.12em;color:#0f766e}
h1{font-size:27px;line-height:1.16;margin:3mm 0 3mm}h2{font-size:20px;margin:1mm 0 3mm}h3{font-size:12px;color:#0f766e;margin:2mm 0 1mm}
p,li{font-size:8.7px;line-height:1.48}.lead{font-size:10px;line-height:1.58}.url{font-size:6.7px;word-break:break-all;color:#47685e}
.box{padding:2.8mm;border:1px solid #d8e6df;border-radius:2.7mm;background:#f8fbfa}.safe{background:#eef8f4;border-color:#b9dfcf}.warn{background:#fff7e8;border-color:#eccb91}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:2.4mm}
.hero{display:grid;grid-template-columns:1.03fr .97fr;gap:4mm;align-items:start}
.screen{border:1px solid #d8e6df;border-radius:2.8mm;padding:1.8mm;background:#f4f8f6}.screen img{width:100%;height:auto;max-height:76mm;object-fit:contain;display:block;background:#fff}.screen.small img{max-height:52mm}
.cap{font-size:6.4px;color:#667a72;margin-top:.8mm}
.qrs{display:grid;grid-template-columns:repeat(3,1fr);gap:2.2mm;margin-top:3mm}.qrs.two{grid-template-columns:1fr 1fr}
.qr{display:grid;grid-template-columns:20mm 1fr;gap:2mm;align-items:center;border:1px solid #cfe3da;border-radius:2.7mm;padding:2mm;background:#fff}.qr img{width:20mm;height:20mm}.qr b{font-size:8.7px}.qr small{font-size:6.2px;line-height:1.3;color:#5d746b}
.steps{display:grid;grid-template-columns:1fr 1fr;gap:2mm}.step{border:1px solid #d8e6df;border-radius:2.4mm;padding:2.4mm;font-size:8.3px}.step b{display:inline-grid;place-items:center;width:6mm;height:6mm;border-radius:50%;background:#0f766e;color:#fff;margin-right:1.3mm}
.flow{display:grid;grid-template-columns:repeat(5,1fr);gap:1.4mm}.flow div{border:1px solid #d8e6df;border-radius:2.3mm;padding:2.2mm 1.2mm;text-align:center;font-size:7.4px}.flow b{display:block;color:#0f766e;font-size:8.3px}
table{width:100%;border-collapse:collapse;font-size:7.6px}th,td{border:1px solid #d8e6df;padding:1.6mm;text-align:left;vertical-align:top}th{background:#edf7f3}
.checks{display:grid;grid-template-columns:1fr 1fr;gap:2mm}.check{border:1px solid #d8e6df;border-radius:2.3mm;padding:2.2mm;font-size:7.7px;background:#fbfdfc}
ul,ol{margin:1.2mm 0;padding-left:5mm}.footer{position:absolute;bottom:5.8mm;right:10.5mm;font-size:7px;color:#7c8b85}
'''

def img(name,caption,small=False):
    cls="screen small" if small else "screen"
    return f'<div class="{cls}"><img src="screens/{name}" alt="{caption}"><div class="cap">{caption}</div></div>'

def qr(name,label,url):
    return f'<a class="qr" href="{url}"><img src="qr/{name}" alt="{label} QR"><div><b>{label}</b><small>{url}</small></div></a>'

def page(n,total,ey,title,body):
    return f'<section class="page"><div class="ey">{ey}</div><h2>{title}</h2>{body}<div class="footer">{n} / {total}</div></section>'

def doc(title,pages):
    return '<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>'+title+'</title><style>'+CSS+'</style></head><body>'+''.join(pages)+'</body></html>'

def quick_html():
    p1=page(1,3,"DPRO CLINIC SHUTTLE / QUICK START V1.0 / MASTER V1.2","全体像と公開デモ",
      '<p class="lead">患者・ご家族、管理・配車PC、iPad、スタッフの4役で、予約から帰宅完了まで同じ送迎情報を共有します。</p>'
      '<div class="hero"><div><div class="box safe"><b>公開デモ</b><div class="url">'+DEMO+'</div></div>'
      '<div class="grid2" style="margin-top:3mm"><div class="box"><b>患者・ご家族</b><p>予定・状況・変更依頼</p></div><div class="box"><b>管理・配車PC</b><p>予約・変更・配車</p></div><div class="box"><b>iPad配車</b><p>当日運行を大きく確認</p></div><div class="box"><b>スタッフ</b><p>担当便・乗降・完了</p></div></div></div>'+img("portal.png","現行公開デモポータル")+'</div>'
      '<div class="qrs">'+qr("demo.png","LIVE DEMO",DEMO)+qr("guide.png","GUIDE CENTER",GUIDE)+qr("line.png","LINE相談",LINE)+'</div>'
      '<div class="box warn" style="margin-top:3mm"><b>安全範囲：</b>実在患者情報を公開デモへ入力しない。電子カルテ・診断・検査・薬剤・請求・医療判断は標準範囲外。</div>')
    steps=''.join(f'<div class="step"><b>{i}</b>{t}</div>' for i,t in enumerate([
      "デモポータルを開く","安全案内を確認","患者・ご家族画面を開く","送迎予定と状況を見る","変更依頼の入口を見る",
      "管理・配車PCを開く","当日運行と変更依頼を見る","iPad配車を確認","スタッフ画面で担当便を見る","Guide Centerを確認"
    ],1))
    p2=page(2,3,"FIRST10 / EXACTLY 10","First10 - 最初の10操作",
      '<div class="hero"><div class="steps">'+steps+'</div><div>'+img("owner.png","管理・配車PCの現行画面",True)+'<div class="box safe" style="margin-top:3mm"><b>Guide Center</b><div class="url">'+GUIDE+'</div></div><p>First10は説明・画面移動・ハイライトのみ。業務データ変更は自動実行しません。</p></div></div>')
    p3=page(3,3,"DAILY FLOW / SYSTEM CHECK / SUPPORT","日々の基本フローと困った時",
      '<div class="flow"><div><b>1 予約</b>WEB/LINE/電話</div><div><b>2 確認</b>日時/場所</div><div><b>3 配車</b>車両/担当</div><div><b>4 通院</b>乗車/到着</div><div><b>5 帰宅</b>自宅/完了</div></div>'
      '<div class="grid2" style="margin-top:3mm">'+img("member.png","患者・ご家族の現行画面",True)+img("staff.png","スタッフの現行画面",True)+'</div>'
      '<div class="grid2" style="margin-top:3mm"><div class="box safe"><b>System Check</b><div class="url">'+CHECK+'</div><p>表示・API・必要設定を一括確認。</p></div><div class="box"><b>困った時</b><ol><li>Guide Center</li><li>System Check</li><li>LINE相談</li></ol></div></div>'
      '<div class="qrs two">'+qr("system-check.png","SYSTEM CHECK",CHECK)+qr("line.png","LINE相談",LINE)+'</div>')
    return doc("DPRO 診療所送迎予約 Quick Start V1.0",[p1,p2,p3])

def detailed_html():
    pages=[]
    pages.append(page(1,9,"DETAILED MANUAL V1.0 / MASTER V1.2","はじめに・全体像",
      '<p class="lead">予約・配車・当日運行・帰宅便・家族連絡までを安全に操作する保存版ガイドです。</p>'
      '<div class="hero"><div><div class="box safe"><b>公開デモ</b><div class="url">'+DEMO+'</div></div><div class="box warn" style="margin-top:3mm"><b>範囲外：</b>電子カルテ、診療記録、病名、検査、処方、医療費請求・レセプト、医療判断。</div></div>'+img("portal.png","現行公開デモポータル",True)+'</div>'
      '<div class="qrs two">'+qr("demo.png","LIVE DEMO",DEMO)+qr("line.png","LINE相談",LINE)+'</div>'))
    pages.append(page(2,9,"CHAPTER 1 / CUSTOMER & MEMBER","患者・ご家族",
      '<div class="hero"><div><ol><li>送迎予定を確認</li><li>現在状況を確認</li><li>欠席・時間変更・片道利用を依頼</li><li>確認結果を見る</li></ol><div class="box warn">公開デモには実在情報を入力しません。</div><div class="url">'+MEMBER+'</div></div>'+img("member.png","患者・ご家族の現行画面")+'</div>'
      '<div class="qrs two">'+qr("member.png","MEMBER",MEMBER)+'<div class="box safe"><b>本番LIFF</b><p>公開デモと本番LINE認証は分離し、導入時に正式接続します。</p></div></div>'))
    pages.append(page(3,9,"CHAPTER 2 / OWNER BASICS","管理・配車PC 基本",
      '<div class="hero"><div><div class="checks"><div class="check"><b>当日運行</b><br>今日の進行</div><div class="check"><b>変更依頼</b><br>欠席・時間変更</div><div class="check"><b>予約一覧</b><br>対象日の予定</div><div class="check"><b>患者・家族</b><br>送迎に必要な情報</div></div><div class="url" style="margin-top:3mm">'+OWNER+'</div></div>'+img("owner.png","管理・配車PCの現行画面")+'</div>'
      '<div class="qrs two">'+qr("owner.png","OWNER",OWNER)+'<div class="box safe"><b>確認順</b><p>変更依頼 → 当日運行 → 配車 → 帰宅便・完了。</p></div></div>'))
    pages.append(page(4,9,"CHAPTER 3 / OWNER CORE WORK","管理・配車PC 主要業務",
      '<table><tr><th>項目</th><th>確認</th></tr><tr><td>日時</td><td>過去日時不可、基本30分単位。</td></tr><tr><td>乗降場所</td><td>送迎に必要な場所。</td></tr><tr><td>利用区分</td><td>往復 / 行きのみ / 帰りのみ。</td></tr><tr><td>変更</td><td>欠席 / 時間変更 / 片道。</td></tr><tr><td>配車</td><td>車両と運転員を割り当て。</td></tr><tr><td>帰宅便</td><td>自宅到着・完了まで確認。</td></tr></table>'
      '<div class="flow" style="margin-top:4mm"><div><b>予約</b>受付</div><div><b>確認</b>条件</div><div><b>配車</b>車両/担当</div><div><b>通院</b>乗降</div><div><b>帰宅</b>完了</div></div>'
      '<div class="grid2" style="margin-top:4mm">'+img("owner.png","予約・変更・配車の現行画面",True)+'<div class="box warn"><b>医療情報最小化</b><p>診察内容・病名・検査・薬剤等は送迎管理の標準項目にしません。</p></div></div>'))
    pages.append(page(5,9,"CHAPTER 4 / STAFF & FIELD","運転員・スタッフ",
      '<div class="hero"><div><ol><li>担当便・乗降場所を確認</li><li>迎車へ出発</li><li>乗車を記録</li><li>診療所到着・引渡し</li><li>帰宅便を確認</li><li>自宅到着・完了</li></ol><div class="url">'+STAFF+'</div></div>'+img("staff.png","運転員・スタッフの現行画面")+'</div>'
      '<div class="qrs two">'+qr("staff.png","STAFF",STAFF)+'<div class="box safe"><b>現場操作</b><p>対象患者・便・時刻を確認してから更新します。</p></div></div>'))
    pages.append(page(6,9,"CHAPTER 5 / IPAD","iPad配車",
      '<div class="hero"><div><ul><li>当日運行を大きな操作で確認</li><li>受付・配車場所でタッチ操作</li><li>不要な横スクロールを抑える</li><li>共用端末は離席時に閉じる</li></ul><div class="url">'+IPAD+'</div></div>'+img("ipad.png","iPad配車の現行画面")+'</div>'
      '<div class="qrs two">'+qr("ipad.png","iPAD",IPAD)+'<div class="box safe"><b>画面確認</b><p>主要操作が見切れない状態で利用します。</p></div></div>'))
    pages.append(page(7,9,"CHAPTER 6 / DAILY FLOW","日次フロー・業務確認",
      '<div class="flow"><div><b>1 予約</b>WEB/LINE/電話</div><div><b>2 確認</b>日時/場所</div><div><b>3 配車</b>車両/担当</div><div><b>4 通院</b>乗車/到着</div><div><b>5 帰宅</b>自宅/完了</div></div>'
      '<h3>開始前</h3><div class="checks"><div class="check">変更依頼</div><div class="check">車両・運転員</div><div class="check">乗降場所</div><div class="check">帰宅便予定</div></div>'
      '<h3>終了前</h3><div class="checks"><div class="check">未完了便なし</div><div class="check">帰宅到着反映</div><div class="check">変更処理済み</div><div class="check">共用端末を閉じる</div></div>'
      '<div class="grid2" style="margin-top:4mm">'+img("member.png","家族側の予定・状況",True)+img("staff.png","現場側の担当便・進行",True)+'</div>'))
    pages.append(page(8,9,"CHAPTER 7 / SYSTEM CHECK · DEMO PREPARE · SAFETY","System Check / Safety / Accessibility / Trouble Recovery",
      '<div class="grid2"><div><div class="box safe"><b>System Check</b><div class="url">'+CHECK+'</div><p>表示・API・必要設定を一括確認。</p></div><div class="box" style="margin-top:3mm"><b>Demo Prepare</b><p>公開デモは架空データのみ。実在患者情報を投入せず、デモ状態を確認して開始します。</p></div><div class="box" style="margin-top:3mm"><b>Trouble Recovery</b><ol><li>再読み込み</li><li>Guide Center</li><li>System Check</li><li>LINE相談</li></ol></div></div>'
      '<div><div class="box"><b>Safety</b><ul><li>公開デモは架空データのみ</li><li>本番情報を貼り付けない</li><li>共用端末へ認証を残さない</li></ul></div><div class="box" style="margin-top:3mm"><b>Accessibility</b><ul><li>キーボード移動を妨げない</li><li>タッチ可能な大きさ</li><li>色だけで状態を伝えない</li><li>拡大しても主要操作を失わない</li></ul></div></div></div>'
      '<div class="qrs two">'+qr("system-check.png","SYSTEM CHECK",CHECK)+qr("guide.png","GUIDE CENTER",GUIDE)+'</div>'))
    pages.append(page(9,9,"CHAPTER 8 / FAQ · READY · SUPPORT","FAQ / 本番前READY / 保存版チェック",
      '<div class="grid2"><div><h3>FAQ</h3><div class="box"><b>電話予約は？</b><p>受付が同じ予約台帳へ代理登録。</p></div><div class="box" style="margin-top:2mm"><b>片道利用は？</b><p>往復・行きのみ・帰りのみを扱います。</p></div><div class="box" style="margin-top:2mm"><b>医療情報は？</b><p>診断・検査・薬剤・レセプト等は範囲外。</p></div></div>'
      '<div><h3>READY CHECK</h3><div class="checks"><div class="check">権限・管理コード</div><div class="check">API / 保存先</div><div class="check">LINE認証</div><div class="check">System Check</div><div class="check">PC / iPad / mobile</div><div class="check">デモと本番分離</div></div><div class="box safe" style="margin-top:3mm"><b>Guide Center</b><div class="url">'+GUIDE+'</div></div></div></div>'
      '<div class="qrs">'+qr("guide.png","GUIDE",GUIDE)+qr("product.png","PRODUCT",PRODUCT)+qr("line.png","LINE相談",LINE)+'</div>'
      '<div class="box" style="margin-top:3mm"><b>DPRO SHOP公式</b><div class="url">'+OFFICIAL+'</div><p>DPRO追加：初期33,000円 + 月額1,100円（税込）。LINE構築・運用は別途。</p></div>'))
    return doc("DPRO 診療所送迎予約 詳細操作マニュアル V1.0",pages)

def preflight_html(path,count):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b=pw.chromium.launch(headless=True)
        p=b.new_page(viewport={"width":1440,"height":1200})
        p.goto(path.resolve().as_uri(),wait_until="networkidle",timeout=60000)
        r=p.evaluate('''()=>({pages:[...document.querySelectorAll(".page")].map((x,i)=>({i:i+1,ch:x.clientHeight,sh:x.scrollHeight})),imgs:[...document.images].map(x=>({src:x.getAttribute("src"),ok:x.complete&&x.naturalWidth>0&&x.naturalHeight>0}))})''')
        b.close()
    if len(r["pages"])!=count: raise SystemExit(f"HTML page count {len(r['pages'])}!={count}")
    bad=[x for x in r["pages"] if x["sh"]>x["ch"]+2]
    if bad: raise SystemExit("HTML clipping: "+json.dumps(bad))
    badimg=[x for x in r["imgs"] if not x["ok"]]
    if badimg: raise SystemExit("HTML broken images: "+json.dumps(badimg))
    return r

def make_pdf(html,pdf,title):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b=pw.chromium.launch(headless=True)
        p=b.new_page()
        p.goto(html.resolve().as_uri(),wait_until="networkidle",timeout=60000)
        p.pdf(path=str(pdf),print_background=True,prefer_css_page_size=True,margin={"top":"0","right":"0","bottom":"0","left":"0"})
        b.close()
    import fitz
    d=fitz.open(pdf)
    meta=dict(d.metadata or {})
    meta.update({"title":title,"author":"DPRO SHOP","subject":"DPRO 診療所送迎予約 操作資料","keywords":"DPRO, 診療所送迎, 操作マニュアル"})
    t=pdf.with_suffix(".meta.pdf")
    d.set_metadata(meta); d.save(t,garbage=4,deflate=True); d.close(); t.replace(pdf)

def pdf_qa(path,count,expected):
    import fitz,numpy as np,cv2,zxingcpp
    d=fitz.open(path)
    if d.page_count!=count: raise SystemExit(f"PDF pages {d.page_count}!={count}: {path.name}")
    decoded=set(); pages=[]
    for i,p in enumerate(d):
        rect=p.rect
        for block in p.get_text("blocks"):
            x0,y0,x1,y1=block[:4]
            if x0<-1 or y0<-1 or x1>rect.width+1 or y1>rect.height+1:
                raise SystemExit(f"PDF block out of bounds p{i+1}: {block[:4]}")
        pix=p.get_pixmap(matrix=fitz.Matrix(300/72,300/72),alpha=False)
        a=np.frombuffer(pix.samples,dtype=np.uint8).reshape(pix.height,pix.width,pix.n)
        if pix.n==4: a=cv2.cvtColor(a,cv2.COLOR_RGBA2RGB)
        gray=cv2.cvtColor(a,cv2.COLOR_RGB2GRAY)
        nonwhite=int((gray<248).sum())
        if nonwhite<20000: raise SystemExit(f"near blank page {i+1}")
        found=[x.text for x in zxingcpp.read_barcodes(a) if x.text]
        decoded.update(found)
        pages.append({"page":i+1,"qr":found,"nonwhitePixels":nonwhite})
    missing=sorted(set(expected)-decoded)
    if missing: raise SystemExit(f"Final rendered PDF QR missing {missing}; got={sorted(decoded)}")
    return {"file":path.name,"pages":d.page_count,"bytes":path.stat().st_size,"decoded":sorted(decoded),"pageEvidence":pages}

def build():
    EVID.mkdir(parents=True,exist_ok=True); QR.mkdir(parents=True,exist_ok=True)
    make_qr(QR/"guide.png",GUIDE); make_qr(QR/"system-check.png",CHECK)

    qrs=[]
    for f,u in [("demo.png",DEMO),("guide.png",GUIDE),("line.png",LINE),("member.png",MEMBER),("owner.png",OWNER),("ipad.png",IPAD),("staff.png",STAFF),("system-check.png",CHECK),("product.png",PRODUCT)]:
        qrs.append(qr_decode(QR/f,u))
    screens=[screen_check(SCREENS/f) for f in ["portal.png","member.png","owner.png","ipad.png","staff.png"]]

    QHTML.write_text(quick_html(),encoding="utf-8")
    DHTML.write_text(detailed_html(),encoding="utf-8")
    qh=preflight_html(QHTML,3); dh=preflight_html(DHTML,9)
    make_pdf(QHTML,QPDF,"DPRO 診療所送迎予約 Quick Start V1.0")
    make_pdf(DHTML,DPDF,"DPRO 診療所送迎予約 詳細操作マニュアル V1.0")
    qp=pdf_qa(QPDF,3,{DEMO,GUIDE,CHECK,LINE})
    dp=pdf_qa(DPDF,9,{DEMO,MEMBER,OWNER,IPAD,STAFF,CHECK,GUIDE,PRODUCT,LINE})

    write("REL_B3_OPERATION_PDF_MASTERFIX_R2F.json",{
      "stage":"REL-B3 OPERATION PDF MASTERFIX R2F","pass":True,
      "releaseMaster":"DPRO PRODUCT RELEASE MASTER V1.2",
      "defects":[
        {"id":"DEF-021","severity":"high","status":"CLOSED_PENDING_PUBLIC_VERIFY","title":"Quick Start lacked required QR/current screenshots"},
        {"id":"DEF-022","severity":"high","status":"CLOSED_PENDING_PUBLIC_VERIFY","title":"Detailed Manual lacked required screenshots/QR/trouble recovery/FAQ-READY coverage"}
      ],
      "sourceQr":qrs,"screens":screens,"quickHtml":qh,"detailedHtml":dh,"quickPdf":qp,"detailedPdf":dp,
      "systemReopenRequired":False
    })
    print("R2F LOCAL MASTERFIX PASS")

def runs(repo):
    _,b=fetch(f"https://api.github.com/repos/{repo}/actions/runs?per_page=100")
    return json.loads(b.decode())["workflow_runs"]

def wait_pages(head):
    for _ in range(50):
        for x in runs("dpromstk2000-lab/dpro-line-systems-site"):
            if x.get("name")=="pages build and deployment" and x.get("head_sha")==head and x.get("status")=="completed" and x.get("conclusion")=="success":
                return {"id":x["id"],"html_url":x["html_url"],"head_sha":head}
        time.sleep(10)
    raise SystemExit("Pages success not found")

def public_pdf(url,count,expected,label):
    s,b=fetch(url)
    if s!=200: raise SystemExit(f"{label} HTTP {s}")
    p=Path(tempfile.gettempdir())/(label+".pdf"); p.write_bytes(b)
    r=pdf_qa(p,count,expected); r["url"]=url; r["status"]=s
    return r

def publicqa():
    head=os.environ.get("FINAL_PRODUCT_HEAD","").strip()
    if not re.fullmatch(r"[0-9a-f]{40}",head): raise SystemExit("FINAL_PRODUCT_HEAD missing")
    pages=wait_pages(head)
    q=public_pdf(Q_PUBLIC,3,{DEMO,GUIDE,CHECK,LINE},"quick-public")
    d=public_pdf(D_PUBLIC,9,{DEMO,MEMBER,OWNER,IPAD,STAFF,CHECK,GUIDE,PRODUCT,LINE},"detailed-public")
    _,html=fetch(PRODUCT); t=html.decode("utf-8","ignore")
    if QPDF.name not in t or DPDF.name not in t: raise SystemExit("Product PDF links missing")
    if api_head("dpromstk2000-lab/dpro-clinic-shuttle-line")!=SYSTEM_HEAD: raise SystemExit("SYSTEM FINAL LOCK drift")
    write("REL_B3_OPERATION_PDF_PUBLIC_QA_R2F.json",{
      "stage":"REL-B3 OPERATION PDF PUBLIC QA R2F","pass":True,"finalProductHead":head,"pages":pages,
      "quick":q,"detailed":d,"productLinks":True,"systemFinalLock":SYSTEM_HEAD,
      "closed":[{"id":"DEF-021","severity":"high","status":"CLOSED"},{"id":"DEF-022","severity":"high","status":"CLOSED"}]
    })
    print("V12_OPERATION_PDF_R2F_SUMMARY="+json.dumps({
      "status":"PASS","defects":["DEF-021 CLOSED","DEF-022 CLOSED"],"final_product_head":head,
      "pages_run":pages["id"],"quick_qr":q["decoded"],"detailed_qr":d["decoded"],"system_final_lock":SYSTEM_HEAD
    },ensure_ascii=False))

if __name__=="__main__":
    if len(sys.argv)!=2: raise SystemExit("usage: runner.py build|publicqa")
    {"build":build,"publicqa":publicqa}[sys.argv[1]]()
