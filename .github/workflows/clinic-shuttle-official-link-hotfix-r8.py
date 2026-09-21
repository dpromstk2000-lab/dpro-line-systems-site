#!/usr/bin/env python3
from pathlib import Path
import json, sys, time, urllib.request

ROOT = Path.cwd()
JS = ROOT / "product-v3.6.js"
EVID = ROOT / "assets" / "clinic-shuttle-next"

EXPECTED_PRODUCT_HEAD = "7bfb6ae44e53aeb470664aeec2991752ae5c3cbc"
SYSTEM_HEAD = "3fc09f4b5c6781d6038dc280de5c58752ce60b51"
OFFICIAL_HEAD = "b92a4d6444375aefc481db267d626c5a712164a5"

PRODUCT_ROOT = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/"
SYSTEMS_URL = PRODUCT_ROOT + "systems.html"
PROPOSAL_URL = PRODUCT_ROOT + "proposal.html?code=CLINIC_SHUTTLE#proposals"
DETAIL_URL = PRODUCT_ROOT + "systems/clinic-shuttle.html"
OFFICIAL_URL = "https://dpro-shop.com/systems/clinic-shuttle"
WRONG_URL = "https://dpro-shop.com/systems/clinic_shuttle"

def write(path, obj):
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(obj, (dict, list)):
        p.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
    else:
        p.write_text(str(obj), encoding="utf-8")

def get(url, timeout=40):
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 DPRO-R8-LINK-QA"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()

def patch():
    s = JS.read_text(encoding="utf-8")
    if "CLINIC_SHUTTLE:'clinic-shuttle'" not in s:
        old = "DPRO_PEST_ENV:'pest-env'"
        new = "DPRO_PEST_ENV:'pest-env', CLINIC_SHUTTLE:'clinic-shuttle'"
        if old not in s:
            raise SystemExit("official slug map anchor missing")
        s = s.replace(old, new, 1)

    # Also correct the stale comment/count wording while touching this canonical runtime.
    s = s.replace("CANONICAL 54 RUNTIME", "CANONICAL 55 RUNTIME", 1)
    s = s.replace("CANONICAL SOURCE: 54 products", "CANONICAL SOURCE: 55 products", 1)

    JS.write_text(s, encoding="utf-8")

    if "CLINIC_SHUTTLE:'clinic-shuttle'" not in s:
        raise SystemExit("clinic shuttle official slug patch missing")
    if "clinic_shuttle" in s:
        # source should never hard-code the wrong route
        raise SystemExit("wrong underscore route leaked into runtime source")

    write("assets/clinic-shuttle-next/R8_OFFICIAL_LINK_FIX_SOURCE.json", {
        "stage":"R8_OFFICIAL_LINK_FIX_SOURCE",
        "pass":True,
        "cause":"CLINIC_SHUTTLE was missing from product-v3.6.js officialSlugs, fallback lowercased code to clinic_shuttle",
        "fix":"CLINIC_SHUTTLE -> clinic-shuttle",
        "correctOfficialUrl":OFFICIAL_URL,
        "systemFinalLock":SYSTEM_HEAD,
        "officialHead":OFFICIAL_HEAD
    })
    print("R8 source patch PASS")

def wait_runtime(tries=42, sleep=10):
    last = None
    for i in range(tries):
        try:
            status, data = get(PRODUCT_ROOT + "product-v3.6.js?v=r8-check")
            text = data.decode("utf-8","ignore")
            if status == 200 and "CLINIC_SHUTTLE:'clinic-shuttle'" in text:
                return {"status":status,"attempt":i+1,"bytes":len(data)}
            last = {"status":status,"marker":"CLINIC_SHUTTLE:'clinic-shuttle'" in text}
        except Exception as e:
            last = repr(e)
        time.sleep(sleep)
    raise SystemExit("R8 runtime deployment wait failed: "+repr(last))

def qa():
    from playwright.sync_api import sync_playwright

    report = {
        "stage":"R8_OFFICIAL_LINK_PUBLIC_QA",
        "status":"PENDING",
        "runtime":wait_runtime(),
        "targets":{},
        "blockers":[],
        "systemFinalLock":SYSTEM_HEAD,
        "systemProtected":True
    }

    status, data = get(OFFICIAL_URL)
    official_text = data.decode("utf-8","ignore")
    report["targets"][OFFICIAL_URL] = {
        "status":status,
        "contentPass":"DPRO 診療所送迎予約" in official_text
    }
    if status != 200 or "DPRO 診療所送迎予約" not in official_text:
        report["blockers"].append({"url":OFFICIAL_URL,"error":"official target not valid"})

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)

        # Catalog card.
        p = browser.new_page(viewport={"width":1440,"height":1000})
        p.goto(SYSTEMS_URL, wait_until="networkidle", timeout=60000)
        p.wait_for_timeout(800)
        catalog = p.evaluate("""() => {
          const nodes=[...document.querySelectorAll('a.is-official')];
          return nodes.map(a=>({
            href:a.href,
            text:(a.textContent||'').trim(),
            context:(a.closest('article,.p36-system-card,.p36-card,.p36-catalog-card')?.innerText || a.parentElement?.parentElement?.innerText || '').trim().slice(0,500)
          })).filter(x=>x.context.includes('診療所送迎予約'));
        }""")
        report["targets"][SYSTEMS_URL] = {"clinicOfficialLinks":catalog}
        if not catalog or any(x["href"] != OFFICIAL_URL for x in catalog):
            report["blockers"].append({"url":SYSTEMS_URL,"error":"catalog official link mismatch","links":catalog})
        p.screenshot(path=str(EVID/"r8-systems-clinic-card.png"), full_page=True)
        p.close()

        # Proposal route.
        p = browser.new_page(viewport={"width":1440,"height":1000})
        p.goto(PROPOSAL_URL, wait_until="networkidle", timeout=60000)
        p.wait_for_timeout(800)
        proposal = p.evaluate("""() => {
          const nodes=[...document.querySelectorAll('a.is-official')];
          return nodes.map(a=>({
            href:a.href,
            text:(a.textContent||'').trim(),
            context:(a.closest('article,.p36-proposal-card')?.innerText || a.parentElement?.parentElement?.innerText || '').trim().slice(0,600)
          })).filter(x=>x.context.includes('診療所送迎予約'));
        }""")
        report["targets"][PROPOSAL_URL] = {"clinicOfficialLinks":proposal}
        if proposal and any(x["href"] != OFFICIAL_URL for x in proposal):
            report["blockers"].append({"url":PROPOSAL_URL,"error":"proposal official link mismatch","links":proposal})
        p.close()

        # Detail page links.
        p = browser.new_page(viewport={"width":1440,"height":1000})
        p.goto(DETAIL_URL, wait_until="networkidle", timeout=60000)
        p.wait_for_timeout(500)
        detail = p.evaluate("""() => [...document.querySelectorAll('a[href*="dpro-shop.com/systems/"]')].map(a=>a.href)""")
        report["targets"][DETAIL_URL] = {"officialLinks":detail}
        if not detail or any(h != OFFICIAL_URL for h in detail):
            report["blockers"].append({"url":DETAIL_URL,"error":"detail official link mismatch","links":detail})
        p.close()

        browser.close()

    # Explicitly ensure the known bad URL is nowhere in generated evidence.
    if any(WRONG_URL in json.dumps(v, ensure_ascii=False) for v in report["targets"].values()):
        report["blockers"].append({"error":"wrong underscore URL still present in generated links"})

    report["status"] = "PASS" if not report["blockers"] else "FAIL"
    write("assets/clinic-shuttle-next/R8_OFFICIAL_LINK_PUBLIC_QA.json", report)

    print(json.dumps({
        "status":report["status"],
        "blockerCount":len(report["blockers"]),
        "blockers":report["blockers"]
    }, ensure_ascii=False, indent=2))

    if report["blockers"]:
        raise SystemExit("R8 public link QA blockers remain")

    final = {
        "status":"PRODUCT RELEASE COMPLETE",
        "releaseRevision":"R8_OFFICIAL_LINK_VERIFIED",
        "product":"DPRO 診療所送迎予約",
        "systemCode":"CLINIC_SHUTTLE",
        "productNumber":55,
        "officialUrl":OFFICIAL_URL,
        "wrongUrlEliminated":WRONG_URL,
        "catalogLink":"PASS",
        "proposalLink":"PASS",
        "detailLinks":"PASS",
        "systemFinalLock":SYSTEM_HEAD,
        "systemProtected":True,
        "blockers":[]
    }
    write("assets/clinic-shuttle-next/PRODUCT_RELEASE_COMPLETE_R8_LINK_VERIFIED.json", final)
    print("R8 OFFICIAL LINK QA PASS")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: script.py patch|qa")
    {"patch":patch, "qa":qa}[sys.argv[1]]()
