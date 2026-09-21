#!/usr/bin/env python3
from pathlib import Path
import json, os, re, sys, time, urllib.request

ROOT=Path.cwd()
EVID=ROOT/"release-evidence-v12"
SYSTEM_HEAD="3fc09f4b5c6781d6038dc280de5c58752ce60b51"
PARENT_HEAD="f79c170776d6354166eb9dcc10468f971964a25d"

PUBLIC_URLS={
  "line":"https://dpromstk2000-lab.github.io/dpro-line-systems-site/line.html",
  "website":"https://dpromstk2000-lab.github.io/dpro-line-systems-site/website.html",
  "dpro_system":"https://dpromstk2000-lab.github.io/dpro-line-systems-site/dpro-system.html",
  "landscape":"https://dpromstk2000-lab.github.io/dpro-line-systems-site/systems/landscape-exterior.html",
  "systems":"https://dpromstk2000-lab.github.io/dpro-line-systems-site/systems.html"
}

SAFE_REPLACEMENTS=[
  ("54システム","55システム"),
  ("54製品","55製品"),
  ("54の業種別","55の業種別"),
  ("canonical54","canonical55")
]

def write(name,obj):
    EVID.mkdir(parents=True,exist_ok=True)
    p=EVID/name
    p.write_text(json.dumps(obj,ensure_ascii=False,indent=2) if isinstance(obj,(dict,list)) else str(obj),encoding="utf-8")

def public_runtime_files():
    for p in ROOT.rglob("*"):
        if not p.is_file(): continue
        if ".git" in p.parts or ".github" in p.parts: continue
        if p.suffix.lower() not in {".html",".js",".css",".xml"}: continue
        yield p

def scan():
    patterns=[
      re.compile(r"54システム"),
      re.compile(r"54製品"),
      re.compile(r"54の業種別"),
    ]
    hits=[]
    for p in public_runtime_files():
        s=p.read_text(encoding="utf-8",errors="ignore")
        for rx in patterns:
            for m in rx.finditer(s):
                hits.append({
                  "path":str(p.relative_to(ROOT)),
                  "line":s.count("\n",0,m.start())+1,
                  "text":m.group(0)
                })
    return hits

def patch():
    before=scan()
    if not before:
        raise SystemExit("Expected stale PRODUCT count phrases but none found; baseline drift")

    changed=[]
    for p in public_runtime_files():
        s=p.read_text(encoding="utf-8",errors="ignore")
        ns=s
        for a,b in SAFE_REPLACEMENTS:
            ns=ns.replace(a,b)
        if ns!=s:
            p.write_text(ns,encoding="utf-8")
            changed.append(str(p.relative_to(ROOT)))

    after=scan()
    if after:
        raise SystemExit("stale PRODUCT count remains: "+json.dumps(after,ensure_ascii=False))

    # Protect product #54 identity: do not rewrite PRODUCT 54 or actual code/asset records.
    pest=(ROOT/"systems-data.js").read_text(encoding="utf-8",errors="ignore")
    if '"code": "DPRO_PEST_ENV"' not in pest:
        raise SystemExit("PRODUCT 54 identity unexpectedly missing")

    report={
      "stage":"REL-B1 PRODUCT SITE-WIDE COUNT SWEEP R2B",
      "pass":True,
      "fact_lock_product_count":55,
      "before_hits":before,
      "changed_files":changed,
      "after_hits":after,
      "safe_replacements":[{"from":a,"to":b} for a,b in SAFE_REPLACEMENTS],
      "system_reopen_required":False,
      "defect":{
        "id":"DEF-018",
        "severity":"high",
        "status":"CLOSED_PENDING_PUBLIC_VERIFY",
        "title":"PRODUCT公開面に旧商品件数54が残存"
      }
    }
    write("REL_B1_PRODUCT_COUNT_SWEEP_R2B.json",report)
    print("R2B source sweep PASS changed="+json.dumps(changed,ensure_ascii=False))

def fetch(url,timeout=40):
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 DPRO-V12-R2B"})
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return r.status,r.read()

def runs(repo):
    _,data=fetch(f"https://api.github.com/repos/{repo}/actions/runs?per_page=100")
    return json.loads(data.decode("utf-8"))["workflow_runs"]

def wait_pages(head,tries=50):
    for _ in range(tries):
        rr=runs("dpromstk2000-lab/dpro-line-systems-site")
        for x in rr:
            if x.get("name")=="pages build and deployment" and x.get("head_sha")==head and x.get("status")=="completed" and x.get("conclusion")=="success":
                return {"id":x["id"],"head_sha":head,"html_url":x["html_url"],"conclusion":"success"}
        time.sleep(10)
    raise SystemExit("PRODUCT Pages did not succeed for final head")

def publicqa():
    from playwright.sync_api import sync_playwright
    final_head=os.environ.get("FINAL_PRODUCT_HEAD","").strip()
    if not re.fullmatch(r"[0-9a-f]{40}",final_head):
        raise SystemExit("FINAL_PRODUCT_HEAD missing")
    pages=wait_pages(final_head)

    public={}
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)
        for name,url in PUBLIC_URLS.items():
            p=browser.new_page(viewport={"width":1440,"height":1000})
            p.goto(url,wait_until="networkidle",timeout=60000)
            p.wait_for_timeout(400)
            body=p.locator("body").inner_text()
            html=p.content()
            stale=[x for x in ("54システム","54製品","54の業種別") if x in body or x in html]
            if stale:
                raise SystemExit(f"public stale count {stale} @ {url}")
            if name=="systems":
                counts=p.locator("[data-p36-count]").all_text_contents()
                if not counts or any(x.strip()!="55" for x in counts):
                    raise SystemExit("systems public count !=55: "+repr(counts))
            public[name]={"url":url,"title":p.title(),"stale":[]}
            p.close()
        browser.close()

    # Check raw public runtime files via GitHub API at main are clean.
    remaining=scan()
    if remaining:
        raise SystemExit("local checkout stale after commit: "+json.dumps(remaining,ensure_ascii=False))

    _,data=fetch("https://api.github.com/repos/dpromstk2000-lab/dpro-clinic-shuttle-line/branches/main")
    system_head=json.loads(data.decode("utf-8"))["commit"]["sha"]
    if system_head!=SYSTEM_HEAD:
        raise SystemExit("SYSTEM FINAL LOCK drift")

    report={
      "stage":"REL-B1 PRODUCT COUNT PUBLIC VERIFY R2B",
      "pass":True,
      "final_product_head":final_head,
      "pages":pages,
      "public":public,
      "system_final_lock":system_head,
      "defect":{"id":"DEF-018","severity":"high","status":"CLOSED"}
    }
    write("REL_B1_PRODUCT_COUNT_PUBLIC_QA_R2B.json",report)
    print("V12_PRODUCT_COUNT_SWEEP_R2B_SUMMARY="+json.dumps({
      "status":"PASS","defect":"DEF-018 CLOSED","final_product_head":final_head,
      "pages_run":pages["id"],"system_final_lock":system_head
    },ensure_ascii=False))

if __name__=="__main__":
    if len(sys.argv)!=2:
        raise SystemExit("usage: runner.py patch|publicqa")
    {"patch":patch,"publicqa":publicqa}[sys.argv[1]]()
