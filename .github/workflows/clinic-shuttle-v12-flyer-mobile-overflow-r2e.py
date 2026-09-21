#!/usr/bin/env python3
from pathlib import Path
import json, os, re, sys, time, urllib.request

ROOT=Path.cwd()
EVID=ROOT/"release-evidence-v12"
FLYER=ROOT/"flyer-clinic-shuttle.html"

SYSTEM_HEAD="3fc09f4b5c6781d6038dc280de5c58752ce60b51"
PARENT_HEAD="3a09e8b8843f105e5ea5833c58fa36b7ba281127"
FLYER_URL="https://dpromstk2000-lab.github.io/dpro-line-systems-site/flyer-clinic-shuttle.html"
OFFICIAL_ROOT="https://dpro-shop.com/"

OLD="""@page{size:A4 portrait;margin:0}@media print{html,body{background:#fff}.toolbar{display:none!important}.sheet{margin:0;box-shadow:none}}@media screen and (max-width:900px){.sheet{transform-origin:top center;transform:scale(.72);margin-bottom:-76mm}}"""
NEW="""@page{size:A4 portrait;margin:0}
@media print{
  html,body{background:#fff}
  .toolbar{display:none!important}
  .sheet{margin:0;box-shadow:none;transform:none!important;zoom:1!important}
}
@media screen and (max-width:900px){
  .sheet{transform:none;zoom:.72;margin:12px auto}
}
@media screen and (max-width:600px){
  .sheet{zoom:.50}
}
@media screen and (max-width:400px){
  .sheet{zoom:.44}
}"""

def write(name,obj):
    EVID.mkdir(parents=True,exist_ok=True)
    p=EVID/name
    p.write_text(json.dumps(obj,ensure_ascii=False,indent=2) if isinstance(obj,(dict,list)) else str(obj),encoding="utf-8")

def fetch(url,timeout=45):
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 DPRO-V12-R2E"})
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return r.status,r.read()

def runs(repo):
    _,data=fetch(f"https://api.github.com/repos/{repo}/actions/runs?per_page=100")
    return json.loads(data.decode("utf-8"))["workflow_runs"]

def wait_pages(head,tries=50):
    for _ in range(tries):
        for x in runs("dpromstk2000-lab/dpro-line-systems-site"):
            if x.get("name")=="pages build and deployment" and x.get("head_sha")==head and x.get("status")=="completed" and x.get("conclusion")=="success":
                return {"id":x["id"],"head_sha":head,"html_url":x["html_url"],"conclusion":"success"}
        time.sleep(10)
    raise SystemExit("PRODUCT Pages did not succeed for final head")

def patch():
    s=FLYER.read_text(encoding="utf-8")
    if s.count(OLD)!=1:
        raise SystemExit(f"expected exact legacy responsive CSS once; got {s.count(OLD)}")
    s=s.replace(OLD,NEW,1)
    FLYER.write_text(s,encoding="utf-8")

    if "A4 FLYER MASTER V2.2" not in s:
        raise SystemExit("flyer master marker drift")
    if "https://dpro-shop.com/" not in s:
        raise SystemExit("official root URL missing")
    if "clinic-care-bright.png" not in s:
        raise SystemExit("bright hero image missing")

    report={
      "stage":"REL-B3 FLYER MOBILE OVERFLOW FIX R2E",
      "pass":True,
      "defect":{
        "id":"DEF-020",
        "severity":"high",
        "status":"CLOSED_PENDING_PUBLIC_VERIFY",
        "title":"Flyer HTML horizontal overflow on 375px mobile",
        "root_cause":"CSS transform scaled visual pixels but preserved the original 210mm layout footprint.",
        "fix":"Use screen-only CSS zoom breakpoints so the layout footprint scales; preserve zoom:1 for print."
      },
      "print_asset_modified":False,
      "system_reopen_required":False
    }
    write("REL_B3_FLYER_MOBILE_OVERFLOW_FIX_R2E.json",report)
    print("R2E source fix PASS")

def publicqa():
    from playwright.sync_api import sync_playwright
    final_head=os.environ.get("FINAL_PRODUCT_HEAD","").strip()
    if not re.fullmatch(r"[0-9a-f]{40}",final_head):
        raise SystemExit("FINAL_PRODUCT_HEAD missing")

    pages=wait_pages(final_head)
    widths=[375,390,430,768,1280,1440]
    qa={}

    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)

        for w in widths:
            p=browser.new_page(viewport={"width":w,"height":1000})
            p.goto(FLYER_URL,wait_until="networkidle",timeout=60000)
            p.wait_for_timeout(400)

            rec=p.evaluate("""()=> {
              const sheet=document.querySelector('.sheet');
              const r=sheet.getBoundingClientRect();
              const cards=[...document.querySelectorAll('.action-card')].map(x=>x.getBoundingClientRect());
              const footer=document.querySelector('.footer').getBoundingClientRect();
              const broken=[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src);
              return {
                innerWidth:window.innerWidth,
                scrollWidth:document.documentElement.scrollWidth,
                sheet:{left:r.left,right:r.right,width:r.width,height:r.height},
                zoom:getComputedStyle(sheet).zoom,
                brokenImages:broken,
                overflow:document.documentElement.scrollWidth > window.innerWidth + 2,
                cardHeightSpread:Math.max(...cards.map(x=>x.height))-Math.min(...cards.map(x=>x.height)),
                footerOverlap:Math.max(0,Math.max(...cards.map(x=>x.bottom))-footer.top),
                officialUrl:document.querySelector('.ow-url')?.textContent.trim()||''
              };
            }""")

            if rec["overflow"]:
                raise SystemExit(f"horizontal overflow remains at {w}: "+json.dumps(rec))
            if rec["sheet"]["left"] < -1 or rec["sheet"]["right"] > w + 1:
                raise SystemExit(f"sheet outside viewport at {w}: "+json.dumps(rec))
            if rec["brokenImages"]:
                raise SystemExit(f"broken images at {w}: "+json.dumps(rec))
            if rec["cardHeightSpread"] > 1.5 or rec["footerOverlap"] > 0:
                raise SystemExit(f"flyer layout regression at {w}: "+json.dumps(rec))
            if rec["officialUrl"] != OFFICIAL_ROOT:
                raise SystemExit(f"official URL regression at {w}: "+json.dumps(rec))

            if w in (375,390,430,768):
                p.screenshot(path=str(EVID/f"flyer-mobile-{w}.png"),full_page=True)
            qa[str(w)]=rec
            p.close()

        p=browser.new_page(viewport={"width":1440,"height":1200})
        p.emulate_media(media="print")
        p.goto(FLYER_URL,wait_until="networkidle",timeout=60000)
        p.wait_for_timeout(250)
        print_rec=p.evaluate("""()=> {
          const s=document.querySelector('.sheet'),r=s.getBoundingClientRect();
          return {
            zoom:getComputedStyle(s).zoom,
            width:r.width,height:r.height,
            toolbarDisplay:getComputedStyle(document.querySelector('.toolbar')).display
          };
        }""")
        if str(print_rec["zoom"]) not in ("1","normal"):
            raise SystemExit("print zoom regression: "+json.dumps(print_rec))
        if print_rec["toolbarDisplay"]!="none":
            raise SystemExit("print toolbar visible: "+json.dumps(print_rec))
        if not (790 <= print_rec["width"] <= 800 and 1118 <= print_rec["height"] <= 1128):
            raise SystemExit("print A4 dimensions drift: "+json.dumps(print_rec))
        p.close()
        browser.close()

    _,data=fetch("https://api.github.com/repos/dpromstk2000-lab/dpro-clinic-shuttle-line/branches/main")
    system_head=json.loads(data.decode("utf-8"))["commit"]["sha"]
    if system_head!=SYSTEM_HEAD:
        raise SystemExit("SYSTEM FINAL LOCK drift")

    result={
      "stage":"REL-B3 FLYER MOBILE OVERFLOW PUBLIC QA R2E",
      "pass":True,
      "final_product_head":final_head,
      "pages":pages,
      "screen_qa":qa,
      "print_media":print_rec,
      "system_final_lock":system_head,
      "defect":{"id":"DEF-020","severity":"high","status":"CLOSED"}
    }
    write("REL_B3_FLYER_MOBILE_OVERFLOW_PUBLIC_QA_R2E.json",result)
    print("V12_FLYER_MOBILE_R2E_SUMMARY="+json.dumps({
      "status":"PASS",
      "defect":"DEF-020 CLOSED",
      "final_product_head":final_head,
      "pages_run":pages["id"],
      "system_final_lock":system_head
    },ensure_ascii=False))

if __name__=="__main__":
    if len(sys.argv)!=2:
        raise SystemExit("usage: runner.py patch|publicqa")
    {"patch":patch,"publicqa":publicqa}[sys.argv[1]]()
