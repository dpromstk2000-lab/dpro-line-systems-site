#!/usr/bin/env python3
from pathlib import Path
import json, os, re, sys, time, urllib.request

ROOT=Path.cwd()
EVID=ROOT/"release-evidence-v12"
RUNTIME=ROOT/"product-v3.6.js"
PRODUCT_URL="https://dpromstk2000-lab.github.io/dpro-line-systems-site/systems/clinic-shuttle.html"
SYSTEMS_URL="https://dpromstk2000-lab.github.io/dpro-line-systems-site/systems.html"
SYSTEM_HEAD="3fc09f4b5c6781d6038dc280de5c58752ce60b51"
PARENT_HEAD="357f01ca3d2d0596e57af8e893cc7e76eff5f3b1"
OFFICIAL_URL="https://dpro-shop.com/systems/clinic-shuttle"
DEMO_URL="https://dpromstk2000-lab.github.io/dpro-clinic-shuttle-line/"

def write(name,obj):
    EVID.mkdir(parents=True,exist_ok=True)
    p=EVID/name
    p.write_text(json.dumps(obj,ensure_ascii=False,indent=2) if isinstance(obj,(dict,list)) else str(obj),encoding="utf-8")

def patch():
    s=RUNTIME.read_text(encoding="utf-8")
    old1="const count = DATA().systems.length || 54;"
    new1="const count = DATA().systems.length || 55;"
    old2="name:'DPRO LINE SYSTEMS 54製品'"
    new2="name:'DPRO LINE SYSTEMS 55製品'"
    if s.count(old1)!=1:
        raise SystemExit(f"expected exactly one stale fallback count; got {s.count(old1)}")
    if s.count(old2)!=1:
        raise SystemExit(f"expected exactly one stale JSON-LD name; got {s.count(old2)}")
    s=s.replace(old1,new1,1).replace(old2,new2,1)
    RUNTIME.write_text(s,encoding="utf-8")

    files=["index.html","systems.html","proposal.html","product-v3.6.js","systems-data.js","sitemap.xml"]
    pattern=re.compile(r"(54システム|54製品|54の業種別|\|\|\s*54|numberOfItems[^0-9]{0,30}54)")
    hits=[]
    for name in files:
        text=(ROOT/name).read_text(encoding="utf-8",errors="ignore")
        for m in pattern.finditer(text):
            hits.append({"file":name,"line":text.count("\n",0,m.start())+1,"match":m.group(0)})
    if hits:
        raise SystemExit("semantic stale 54 remains: "+json.dumps(hits,ensure_ascii=False))

    report={
      "stage":"REL-B1 PRODUCT FACT STATIC FIX",
      "pass":True,
      "defect":{
        "id":"DEF-017",
        "severity":"high",
        "status":"CLOSED_PENDING_PUBLIC_VERIFY",
        "title":"PRODUCT runtimeに旧商品件数54が残存",
        "affected_file":"product-v3.6.js",
        "fixes":[
          "fallback count 54 -> 55",
          "ItemList JSON-LD name 54製品 -> 55製品"
        ],
        "system_reopen_required":False
      },
      "static_scan_files":files,
      "stale_hits":[]
    }
    write("REL_B1_PRODUCT_FACT_FIX.json",report)
    print("REL-B1 PRODUCT FACT FIX PASS")

def fetch(url,timeout=40):
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 DPRO-V12-R2A"})
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return r.status,r.read()

def github_runs(repo):
    status,data=fetch(f"https://api.github.com/repos/{repo}/actions/runs?per_page=100")
    return json.loads(data.decode("utf-8"))["workflow_runs"]

def wait_pages(head,tries=50):
    last=[]
    for _ in range(tries):
        runs=github_runs("dpromstk2000-lab/dpro-line-systems-site")
        last=[{"id":x["id"],"head":x.get("head_sha"),"status":x.get("status"),"conclusion":x.get("conclusion")}
              for x in runs if x.get("name")=="pages build and deployment"][:5]
        for x in runs:
            if x.get("name")=="pages build and deployment" and x.get("head_sha")==head and x.get("status")=="completed" and x.get("conclusion")=="success":
                return {"id":x["id"],"head_sha":head,"html_url":x["html_url"],"conclusion":"success"}
        time.sleep(10)
    raise SystemExit("Pages did not succeed for final head: "+json.dumps(last))

def publicqa():
    from playwright.sync_api import sync_playwright
    final_head=os.environ.get("FINAL_PRODUCT_HEAD","")
    if not re.fullmatch(r"[0-9a-f]{40}",final_head):
        raise SystemExit("FINAL_PRODUCT_HEAD missing")
    pages=wait_pages(final_head)

    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)
        p=browser.new_page(viewport={"width":1440,"height":1000})
        p.goto(SYSTEMS_URL,wait_until="networkidle",timeout=60000)
        p.wait_for_timeout(700)

        result=p.evaluate("""()=> {
          const data=[...document.querySelectorAll('[data-p36-count]')].map(x=>x.textContent.trim());
          const script=document.getElementById('p36-itemlist-jsonld');
          const ld=script?JSON.parse(script.textContent):null;
          const card=document.querySelector('[data-p36-system-card][data-code="CLINIC_SHUTTLE"]');
          const off=card?.querySelector('.is-official')?.href||'';
          const prop=card?.querySelector('.is-proposal-link')?.href||'';
          return {counts:data,jsonldName:ld?.name||'',numberOfItems:ld?.numberOfItems||0,official:off,proposal:prop};
        }""")
        if not result["counts"] or any(x!="55" for x in result["counts"]):
            raise SystemExit("public count mismatch: "+json.dumps(result,ensure_ascii=False))
        if result["jsonldName"]!="DPRO LINE SYSTEMS 55製品" or result["numberOfItems"]!=55:
            raise SystemExit("public JSON-LD count mismatch: "+json.dumps(result,ensure_ascii=False))
        if result["official"]!=OFFICIAL_URL:
            raise SystemExit("clinic official URL mismatch: "+json.dumps(result,ensure_ascii=False))
        if "proposal.html?code=CLINIC_SHUTTLE" not in result["proposal"]:
            raise SystemExit("clinic proposal URL mismatch: "+json.dumps(result,ensure_ascii=False))

        p.goto(PRODUCT_URL,wait_until="networkidle",timeout=60000)
        p.wait_for_timeout(400)
        title=p.title()
        if "DPRO 診療所送迎予約" not in title:
            raise SystemExit("product detail signature missing")
        if p.locator(f'a[href="{OFFICIAL_URL}"]').count()<1:
            raise SystemExit("product -> official CTA missing")
        if p.locator(f'a[href="{DEMO_URL}"]').count()<1:
            raise SystemExit("product -> demo CTA missing")
        p.close()
        browser.close()

    # SYSTEM FINAL LOCK must still match after PRODUCT change.
    status,data=fetch("https://api.github.com/repos/dpromstk2000-lab/dpro-clinic-shuttle-line/branches/main")
    system_head=json.loads(data.decode("utf-8"))["commit"]["sha"]
    if system_head!=SYSTEM_HEAD:
        raise SystemExit("SYSTEM FINAL LOCK drift after PRODUCT fix")

    report={
      "stage":"REL-B1 PRODUCT FACT PUBLIC VERIFY",
      "pass":True,
      "final_product_head":final_head,
      "pages":pages,
      "public_result":result,
      "product_detail_title":title,
      "system_final_lock":system_head,
      "defect":{"id":"DEF-017","severity":"high","status":"CLOSED"}
    }
    write("REL_B1_PRODUCT_FACT_PUBLIC_QA.json",report)
    print("V12_PRODUCT_FACT_FIX_SUMMARY="+json.dumps({
      "status":"PASS","defect":"DEF-017 CLOSED","final_product_head":final_head,
      "pages_run":pages["id"],"system_final_lock":system_head
    },ensure_ascii=False))

if __name__=="__main__":
    if len(sys.argv)!=2:
        raise SystemExit("usage: runner.py patch|publicqa")
    {"patch":patch,"publicqa":publicqa}[sys.argv[1]]()
