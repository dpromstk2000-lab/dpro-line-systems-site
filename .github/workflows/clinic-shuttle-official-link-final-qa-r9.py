#!/usr/bin/env python3
from pathlib import Path
import json, urllib.request, time

ROOT = Path.cwd()
EVID = ROOT / "assets" / "clinic-shuttle-next"

SYSTEMS_URL = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/systems.html"
PROPOSAL_URL = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/proposal.html?code=CLINIC_SHUTTLE#proposals"
DETAIL_URL = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/systems/clinic-shuttle.html"
OFFICIAL_URL = "https://dpro-shop.com/systems/clinic-shuttle"
WRONG_URL = "https://dpro-shop.com/systems/clinic_shuttle"

SYSTEM_HEAD = "3fc09f4b5c6781d6038dc280de5c58752ce60b51"
OFFICIAL_HEAD = "b92a4d6444375aefc481db267d626c5a712164a5"
PRODUCT_R8_HEAD = "fd3d18716ad4cfb57121ed240d7c2dc9f61bbd76"

def write(path, obj):
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")

def get(url, timeout=40):
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 DPRO-R9-LINK-QA"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()

def wait_runtime(tries=36, sleep=10):
    last = None
    url = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/product-v3.6.js?v=r9"
    for i in range(tries):
        try:
            status, data = get(url)
            text = data.decode("utf-8", "ignore")
            ok = "CLINIC_SHUTTLE:'clinic-shuttle'" in text
            if status == 200 and ok:
                return {"status":status, "attempt":i+1, "marker":True}
            last = {"status":status, "marker":ok}
        except Exception as e:
            last = repr(e)
        time.sleep(sleep)
    raise SystemExit("R9 runtime not ready: " + repr(last))

def main():
    from playwright.sync_api import sync_playwright

    report = {
        "stage":"R9_OFFICIAL_LINK_FINAL_QA",
        "status":"PENDING",
        "runtime":wait_runtime(),
        "systemFinalLock":SYSTEM_HEAD,
        "systemProtected":True,
        "officialHead":OFFICIAL_HEAD,
        "productR8Head":PRODUCT_R8_HEAD,
        "checks":{},
        "blockers":[]
    }

    status, data = get(OFFICIAL_URL)
    text = data.decode("utf-8","ignore")
    report["checks"]["officialTarget"] = {
        "url":OFFICIAL_URL,
        "status":status,
        "contentPass":"DPRO 診療所送迎予約" in text
    }
    if status != 200 or "DPRO 診療所送迎予約" not in text:
        report["blockers"].append({"error":"official target invalid"})

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)

        # 1) Exact catalog card only.
        p = browser.new_page(viewport={"width":1440,"height":1000})
        p.goto(SYSTEMS_URL, wait_until="networkidle", timeout=60000)
        p.wait_for_timeout(800)
        card = p.locator("article, .p36-system-card, .p36-card, .p36-catalog-card").filter(has_text="CLINIC_SHUTTLE")
        if card.count() == 0:
            # Fall back to closest ancestor of the visible code.
            code = p.get_by_text("CLINIC_SHUTTLE", exact=True)
            if code.count():
                card = code.first.locator("xpath=ancestor::*[self::article or contains(@class,'card')][1]")
        links = []
        if card.count():
            links = card.first.locator("a.is-official").evaluate_all(
                "(els)=>els.map(a=>({href:a.href,text:(a.textContent||'').trim()}))"
            )
        report["checks"]["catalogCard"] = {"url":SYSTEMS_URL, "links":links}
        if len(links) != 1 or links[0]["href"] != OFFICIAL_URL:
            report["blockers"].append({"error":"catalog card link mismatch","links":links})
        p.screenshot(path=str(EVID/"r9-catalog-clinic-shuttle.png"), full_page=True)
        p.close()

        # 2) Exact proposal card only.
        p = browser.new_page(viewport={"width":1440,"height":1000})
        p.goto(PROPOSAL_URL, wait_until="networkidle", timeout=60000)
        p.wait_for_timeout(800)
        proposal = p.locator(".p36-proposal-card").filter(has_text="CLINIC_SHUTTLE")
        plinks = []
        if proposal.count():
            plinks = proposal.first.locator("a.is-official").evaluate_all(
                "(els)=>els.map(a=>({href:a.href,text:(a.textContent||'').trim()}))"
            )
        report["checks"]["proposalCard"] = {"url":PROPOSAL_URL, "links":plinks}
        if len(plinks) != 1 or plinks[0]["href"] != OFFICIAL_URL:
            report["blockers"].append({"error":"proposal card link mismatch","links":plinks})
        p.screenshot(path=str(EVID/"r9-proposal-clinic-shuttle.png"), full_page=True)
        p.close()

        # 3) Detail page official links.
        p = browser.new_page(viewport={"width":1440,"height":1000})
        p.goto(DETAIL_URL, wait_until="networkidle", timeout=60000)
        p.wait_for_timeout(500)
        dlinks = p.locator('a[href*="dpro-shop.com/systems/"]').evaluate_all(
            "(els)=>els.map(a=>({href:a.href,text:(a.textContent||'').trim()}))"
        )
        report["checks"]["detailPage"] = {"url":DETAIL_URL, "links":dlinks}
        if not dlinks or any(x["href"] != OFFICIAL_URL for x in dlinks):
            report["blockers"].append({"error":"detail page official link mismatch","links":dlinks})
        p.close()

        browser.close()

    serialized = json.dumps(report["checks"], ensure_ascii=False)
    if WRONG_URL in serialized:
        report["blockers"].append({"error":"known wrong underscore route still present"})

    report["status"] = "PASS" if not report["blockers"] else "FAIL"
    write("assets/clinic-shuttle-next/R9_OFFICIAL_LINK_FINAL_QA.json", report)

    print(json.dumps({
        "status":report["status"],
        "blockerCount":len(report["blockers"]),
        "blockers":report["blockers"]
    }, ensure_ascii=False, indent=2))

    if report["blockers"]:
        raise SystemExit("R9 blockers remain")

    final = {
        "status":"PRODUCT RELEASE COMPLETE",
        "releaseRevision":"R9_OFFICIAL_LINK_VERIFIED",
        "product":"DPRO 診療所送迎予約",
        "systemCode":"CLINIC_SHUTTLE",
        "productNumber":55,
        "officialUrl":OFFICIAL_URL,
        "catalogBlueButton":"PASS",
        "proposalBlueButton":"PASS",
        "detailOfficialLinks":"PASS",
        "wrongUnderscoreRoutePresent":False,
        "systemFinalLock":SYSTEM_HEAD,
        "systemProtected":True,
        "blockers":[]
    }
    write("assets/clinic-shuttle-next/PRODUCT_RELEASE_COMPLETE_R9_LINK_VERIFIED.json", final)
    print("R9 OFFICIAL LINK FINAL QA PASS")

if __name__ == "__main__":
    main()
