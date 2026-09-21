#!/usr/bin/env python3
from pathlib import Path
import json, sys, time, urllib.request

ROOT = Path.cwd()
LP = ROOT / "lp-clinic-shuttle.html"
EVID = ROOT / "assets" / "clinic-shuttle-next"

PUBLIC = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/lp-clinic-shuttle.html"
BRIGHT_IMG = "assets/clinic-shuttle-next/clinic-care-bright.png"
OLD_IMG = "assets/clinic-shuttle-next/clinic-care.jpg"

SYSTEM_HEAD = "3fc09f4b5c6781d6038dc280de5c58752ce60b51"
OFFICIAL_HEAD = "b92a4d6444375aefc481db267d626c5a712164a5"
PRODUCT_PARENT = "cba6245ec4fa22ed3f4fc725dde3dffe0519de0e"

def write(path, obj):
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")

def patch():
    s = LP.read_text(encoding="utf-8")
    if OLD_IMG not in s:
        raise SystemExit("old clinic-care.jpg reference not found in LP")

    s = s.replace(OLD_IMG, BRIGHT_IMG)

    # Brighten hero overlay while preserving legibility.
    s = s.replace(
        'linear-gradient(90deg,rgba(7,42,35,.94),rgba(7,42,35,.74) 55%,rgba(7,42,35,.30))',
        'linear-gradient(90deg,rgba(12,65,52,.90),rgba(12,65,52,.58) 55%,rgba(12,65,52,.14))'
    )

    # Remove obsolete Pexels credit after replacing the source image.
    s = s.replace('<div class="photo-credit">Photo: Pexels / Tima Miroshnichenko</div>', '')
    s = s.replace('Photo: Pexels / Tima Miroshnichenko', '')

    LP.write_text(s, encoding="utf-8")

    if OLD_IMG in s:
        raise SystemExit("old photo reference remains")
    if BRIGHT_IMG not in s:
        raise SystemExit("bright photo reference missing")
    if "Pexels / Tima Miroshnichenko" in s:
        raise SystemExit("obsolete Pexels credit remains")

    write("assets/clinic-shuttle-next/R12_LP_PHOTO_UNIFY_SOURCE.json", {
        "stage":"R12_LP_PHOTO_UNIFY_SOURCE",
        "pass":True,
        "oldImage":OLD_IMG,
        "newImage":BRIGHT_IMG,
        "obsoleteCreditRemoved":True,
        "heroOverlayBrightened":True,
        "systemFinalLock":SYSTEM_HEAD,
        "officialHead":OFFICIAL_HEAD
    })
    print("R12 LP source patch PASS")

def get(url, timeout=40):
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 DPRO-R12-LP-QA"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()

def publicqa():
    from playwright.sync_api import sync_playwright

    last=None
    for i in range(42):
        try:
            status,data=get(PUBLIC)
            text=data.decode("utf-8","ignore")
            if status==200 and BRIGHT_IMG in text and OLD_IMG not in text:
                break
            last={"status":status,"bright":BRIGHT_IMG in text,"old":OLD_IMG in text}
        except Exception as e:
            last=repr(e)
        time.sleep(10)
    else:
        raise SystemExit("LP deployment wait failed: "+repr(last))

    report={
        "stage":"R12_LP_PHOTO_UNIFY_PUBLIC_QA",
        "status":"PENDING",
        "publicUrl":PUBLIC,
        "viewports":{},
        "blockers":[]
    }

    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)
        for w in [390,768,1440]:
            p=browser.new_page(viewport={"width":w,"height":1000})
            p.goto(PUBLIC, wait_until="networkidle", timeout=60000)
            p.wait_for_timeout(600)

            qa=p.evaluate("""() => {
              const hero=document.querySelector('.hero');
              const cs=getComputedStyle(hero);
              return {
                title:document.title,
                backgroundImage:cs.backgroundImage,
                brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),
                overflow:document.documentElement.scrollWidth > window.innerWidth + 2,
                heroHeight:hero.getBoundingClientRect().height,
                h1:document.querySelector('h1')?.innerText||'',
                hasPexels:(document.body.innerText||'').includes('Pexels')
              };
            }""")

            if BRIGHT_IMG not in qa["backgroundImage"]:
                report["blockers"].append({"width":w,"error":"bright image not active","qa":qa})
            if OLD_IMG in qa["backgroundImage"]:
                report["blockers"].append({"width":w,"error":"old image still active","qa":qa})
            if qa["brokenImages"]:
                report["blockers"].append({"width":w,"error":"broken images","qa":qa})
            if qa["overflow"]:
                report["blockers"].append({"width":w,"error":"horizontal overflow","qa":qa})
            if qa["hasPexels"]:
                report["blockers"].append({"width":w,"error":"obsolete Pexels credit visible","qa":qa})
            if "通院送迎" not in qa["h1"]:
                report["blockers"].append({"width":w,"error":"LP h1 mismatch","qa":qa})

            p.screenshot(path=str(EVID/f"r12-lp-bright-{w}.png"), full_page=True)
            report["viewports"][str(w)]=qa
            p.close()
        browser.close()

    report["status"]="PASS" if not report["blockers"] else "FAIL"
    write("assets/clinic-shuttle-next/R12_LP_PHOTO_UNIFY_PUBLIC_QA.json", report)

    print(json.dumps({
        "status":report["status"],
        "blockerCount":len(report["blockers"]),
        "blockers":report["blockers"]
    }, ensure_ascii=False, indent=2))

    if report["blockers"]:
        raise SystemExit("R12 LP photo QA blockers remain")

    write("assets/clinic-shuttle-next/PRODUCT_RELEASE_COMPLETE_R12_IMAGE_UNIFIED.json", {
        "status":"PRODUCT RELEASE COMPLETE",
        "releaseRevision":"R12_IMAGE_UNIFIED",
        "product":"DPRO 診療所送迎予約",
        "systemCode":"CLINIC_SHUTTLE",
        "productNumber":55,
        "flyerHero":"clinic-care-bright.png",
        "lpHero":"clinic-care-bright.png",
        "productDetail":"real system screenshot retained",
        "officialPage":"real system screenshots retained",
        "systemFinalLock":SYSTEM_HEAD,
        "systemProtected":True,
        "blockers":[]
    })
    print("R12 IMAGE UNIFY QA PASS")

if __name__=="__main__":
    if len(sys.argv)!=2:
        raise SystemExit("usage: script.py patch|publicqa")
    {"patch":patch,"publicqa":publicqa}[sys.argv[1]]()
