#!/usr/bin/env python3
from pathlib import Path
import json, os, re, sys, time, urllib.request

ROOT=Path.cwd()
TARGET=ROOT/"systems/clinic-shuttle.html"
EVID=ROOT/"release-evidence-ha-product-r1"

SYSTEM_HEAD="3fc09f4b5c6781d6038dc280de5c58752ce60b51"
PRODUCT_PARENT="4dba31e5daa62e1966afcf293a3094d98acab243"
URL="https://dpromstk2000-lab.github.io/dpro-line-systems-site/systems/clinic-shuttle.html"

REMOVE_BEFORE='''<section class="section soft"><div class="dpro-container"><div class="head"><div class="ey">BEFORE / AFTER</div><h2>電話・紙・口頭連絡が分かれる運用から。</h2></div><div class="grid3"><article class="card before"><b>BEFORE</b><h3>予約が別々</h3><p>電話・WEB・LINEの内容を転記して確認。</p></article><article class="card after"><b>AFTER</b><h3>予約台帳へ集約</h3><p>入口が違っても送迎予定を同じ場所で確認。</p></article><article class="card before"><b>BEFORE</b><h3>当日の確認が口頭</h3><p>車両・担当・変更を複数人で再確認。</p></article><article class="card after"><b>AFTER</b><h3>当日運行を共有</h3><p>管理PC・iPad・スタッフ画面で同じ対象を確認。</p></article><article class="card before"><b>BEFORE</b><h3>帰宅便が個別連絡</h3><p>診療終了後の迎え調整がばらつく。</p></article><article class="card after"><b>AFTER</b><h3>帰宅完了まで記録</h3><p>帰宅便、自宅到着、完了まで同じ履歴へ。</p></article></div></div></section>'''

REMOVE_MAP='''<section class="section"><div class="dpro-container"><div class="head"><div class="ey">CONNECTED EXPERIENCE</div><h2>入口は自由。管理は、ひとつ。</h2><p>予約入口が違っても、診療所では同じDPRO SYSTEMへまとめます。</p></div><div class="map"><div class="channels"><div class="box"><small>WEB</small><strong>送迎予約</strong></div><div class="box"><small>LINE</small><strong>予約・変更</strong></div><div class="box"><small>PHONE</small><strong>受付が代理登録</strong></div><div class="box"><small>FAMILY</small><strong>予定・状況確認</strong></div></div><div class="arrow">→</div><div class="hub"><small>DPRO</small><strong>CLINIC SHUTTLE</strong></div><div class="arrow">→</div><div class="manage"><div class="box"><small>01</small><strong>予約一覧</strong></div><div class="box"><small>02</small><strong>配車</strong></div><div class="box"><small>03</small><strong>当日運行</strong></div><div class="box"><small>04</small><strong>帰宅便・履歴</strong></div></div></div></div></section>'''

OLD_FLOW='''<div class="head"><div class="ey">OPERATING FLOW</div><h2>予約から帰宅完了まで、同じ送迎情報で。</h2></div>'''
NEW_FLOW='''<div class="head"><div class="ey">OPERATING FLOW</div><h2>入口は自由。予約から帰宅完了まで、管理はひとつ。</h2><p>WEB・LINE・電話・家族連絡の入口が違っても、診療所では同じDPROの送迎情報として確認します。</p></div>'''

OLD_LIVE_HEAD='''<div class="head"><div class="ey">LIVE PRODUCT EXPERIENCE</div><h2>説明画像ではなく、本物の画面を体験。</h2><p>公開デモは架空データのみ。実在する患者情報は入力しないでください。</p></div>'''
NEW_LIVE_HEAD='''<div class="head"><div class="ey">LIVE PRODUCT EXPERIENCE</div><h2>現在の実画面を、そのまま公開デモで。</h2><p>最初に実画面プレビューを表示します。必要な時だけ、このページ内でLIVE DEMOを読み込めます。公開デモは架空データのみです。</p></div>'''

OLD_HOLDER='''<div class="live-frame" id="demoHolder"><div style="display:grid;place-items:center;height:100%;min-height:405px;color:#52645d;text-align:center;padding:24px"><div><strong>LIVE DEMO</strong><p>ボタンを押した時だけ実画面を読み込みます。</p></div></div></div>'''
NEW_HOLDER='''<div class="live-frame" id="demoHolder"><div class="live-placeholder"><img src="../assets/clinic-shuttle-next/screens/portal.png" alt="DPRO 診療所送迎予約 公開デモポータルの実画面"><div class="live-placeholder-note"><strong>現在の公開デモ画面</strong><span>「このページ内で開く」で操作デモへ切り替わります。</span></div></div></div>'''

CSS_MARKER="/* CLINIC SHUTTLE HUMAN ACCEPTANCE PRODUCT R1 */"
CSS_BLOCK=r'''
/* CLINIC SHUTTLE HUMAN ACCEPTANCE PRODUCT R1 */
.section{padding:68px 0}
.dark#live{padding-top:22px}
.live-frame{position:relative;overflow:hidden}
.live-placeholder{
  position:relative;
  min-height:405px;
  height:100%;
  border-radius:12px;
  overflow:hidden;
  background:#eef6f2;
}
.live-placeholder img{
  display:block;
  width:100%;
  height:405px;
  object-fit:cover;
  object-position:top;
}
.live-placeholder-note{
  position:absolute;
  left:14px;
  right:14px;
  bottom:14px;
  padding:12px 14px;
  border-radius:12px;
  background:rgba(6,31,25,.9);
  color:#fff;
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:center;
}
.live-placeholder-note strong{font-size:13px}
.live-placeholder-note span{
  font-size:11px;
  color:#d4e7df;
  text-align:right;
}
@media(max-width:560px){
  .section{padding:50px 0}
  .dark#live{padding-top:14px}
  .live-placeholder,.live-placeholder img{min-height:320px;height:320px}
  .live-placeholder-note{display:block}
  .live-placeholder-note span{display:block;text-align:left;margin-top:4px}
}
'''

def write(name,obj):
    EVID.mkdir(parents=True,exist_ok=True)
    (EVID/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding="utf-8")

def fetch(url,timeout=45):
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 DPRO-HA-PRODUCT-R1"})
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return r.status,r.read()

def api_head(repo):
    _,b=fetch(f"https://api.github.com/repos/{repo}/branches/main")
    return json.loads(b.decode())["commit"]["sha"]

def replace_once(s,old,new,label):
    c=s.count(old)
    if c!=1:
        raise SystemExit(f"{label} expected exactly once, got {c}")
    return s.replace(old,new,1)

def patch():
    s=TARGET.read_text(encoding="utf-8")
    s=replace_once(s,REMOVE_BEFORE,"","BEFORE/AFTER duplicate section")
    s=replace_once(s,REMOVE_MAP,"","CONNECTED EXPERIENCE duplicate section")
    s=replace_once(s,OLD_FLOW,NEW_FLOW,"merged flow heading")
    s=replace_once(s,OLD_LIVE_HEAD,NEW_LIVE_HEAD,"live heading")
    s=replace_once(s,OLD_HOLDER,NEW_HOLDER,"live preview placeholder")

    if CSS_MARKER not in s:
        anchor='@media(max-width:860px)'
        if anchor not in s:
            raise SystemExit("CSS media anchor missing")
        s=s.replace(anchor,CSS_BLOCK+"\n"+anchor,1)

    TARGET.write_text(s,encoding="utf-8")

    checks={
      "before_after_removed":"BEFORE / AFTER" not in s,
      "connected_section_removed":"CONNECTED EXPERIENCE" not in s,
      "merged_flow":"入口は自由。予約から帰宅完了まで、管理はひとつ。" in s,
      "preview_image":"clinic-shuttle-next/screens/portal.png" in s,
      "old_blank_placeholder":"ボタンを押した時だけ実画面を読み込みます。" not in s,
      "live_button":'id="loadDemo"' in s,
      "official_link":"https://dpro-shop.com/systems/clinic-shuttle" in s,
      "price":"33,000円" in s and "1,100円" in s
    }
    if not all(checks.values()):
        raise SystemExit("source checks failed "+json.dumps(checks,ensure_ascii=False))

    write("HA_PRODUCT_SOURCE_R1.json",{
      "pass":True,
      "humanAcceptanceDefects":["HA-04","HA-05","HA-06"],
      "changes":[
        "Removed duplicated BEFORE/AFTER explanation section",
        "Merged CONNECTED EXPERIENCE meaning into operating flow",
        "Replaced blank LIVE DEMO waiting box with current portal screenshot",
        "Reduced vertical spacing and visually joined adjacent role/live dark sections"
      ],
      "checks":checks,
      "systemReopenRequired":False
    })
    print("HA PRODUCT SOURCE R1 PASS")

def runs(repo):
    _,b=fetch(f"https://api.github.com/repos/{repo}/actions/runs?per_page=100")
    return json.loads(b.decode())["workflow_runs"]

def wait_pages(head):
    for _ in range(50):
        for x in runs("dpromstk2000-lab/dpro-line-systems-site"):
            if x.get("name")=="pages build and deployment" and x.get("head_sha")==head and x.get("status")=="completed" and x.get("conclusion")=="success":
                return {"id":x["id"],"url":x["html_url"],"head_sha":head}
        time.sleep(10)
    raise SystemExit("PRODUCT Pages success not found")

def publicqa():
    from playwright.sync_api import sync_playwright
    head=os.environ.get("FINAL_PRODUCT_HEAD","").strip()
    if not re.fullmatch(r"[0-9a-f]{40}",head):
        raise SystemExit("FINAL_PRODUCT_HEAD missing")
    pages=wait_pages(head)

    qa={}
    with sync_playwright() as pw:
        b=pw.chromium.launch(headless=True)
        for w in [375,390,768,1440]:
            p=b.new_page(viewport={"width":w,"height":1000})
            p.goto(URL,wait_until="networkidle",timeout=60000)
            p.wait_for_timeout(350)

            rec=p.evaluate('''()=>({
              scrollWidth:document.documentElement.scrollWidth,
              innerWidth:window.innerWidth,
              height:document.documentElement.scrollHeight,
              broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),
              beforeAfter:document.body.innerText.includes("BEFORE / AFTER"),
              connected:document.body.innerText.includes("CONNECTED EXPERIENCE"),
              placeholder:document.querySelectorAll(".live-placeholder").length,
              placeholderImage:document.querySelector(".live-placeholder img")?.naturalWidth||0,
              iframe:document.querySelectorAll("#demoHolder iframe").length,
              sections:document.querySelectorAll("main > section").length
            })''')

            if rec["scrollWidth"]>w+2 or rec["broken"] or rec["beforeAfter"] or rec["connected"] or rec["placeholder"]!=1 or rec["placeholderImage"]<=0 or rec["iframe"]!=0:
                raise SystemExit(f"PRODUCT initial QA fail width={w}: "+json.dumps(rec,ensure_ascii=False))

            p.locator("#loadDemo").click()
            p.wait_for_timeout(650)
            if p.locator("#demoHolder iframe").count()!=1:
                raise SystemExit(f"LIVE DEMO swap failed width={w}")

            if w in (390,1440):
                p.reload(wait_until="networkidle")
                p.wait_for_timeout(250)
                p.screenshot(path=str(EVID/f"product-ha-r1-{w}.png"),full_page=True)

            qa[str(w)]=rec
            p.close()
        b.close()

    if api_head("dpromstk2000-lab/dpro-clinic-shuttle-line")!=SYSTEM_HEAD:
        raise SystemExit("SYSTEM FINAL LOCK drift")

    write("HA_PRODUCT_PUBLIC_QA_R1.json",{
      "pass":True,
      "finalProductHead":head,
      "pages":pages,
      "viewports":qa,
      "systemFinalLock":SYSTEM_HEAD,
      "officialHeadObserved":api_head("dpromstk2000-lab/dpro-shop-official-site"),
      "humanAcceptanceStatus":"READY_FOR_REVIEW"
    })
    print("HA_PRODUCT_R1_SUMMARY="+json.dumps({
      "status":"PASS",
      "final_product_head":head,
      "pages_run":pages["id"],
      "system_final_lock":SYSTEM_HEAD,
      "human_acceptance":"READY_FOR_REVIEW"
    },ensure_ascii=False))

if __name__=="__main__":
    if len(sys.argv)!=2:
        raise SystemExit("usage: patch|publicqa")
    {"patch":patch,"publicqa":publicqa}[sys.argv[1]]()
