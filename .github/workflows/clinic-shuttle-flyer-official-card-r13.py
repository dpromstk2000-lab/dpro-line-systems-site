#!/usr/bin/env python3
from pathlib import Path
import json, sys, subprocess, time, urllib.request, re

ROOT = Path.cwd()
HTML = ROOT / "flyer-clinic-shuttle.html"
PDF = ROOT / "flyer-clinic-shuttle.pdf"
QR = ROOT / "assets" / "clinic-shuttle-next" / "qr" / "official.png"
EVID = ROOT / "assets" / "clinic-shuttle-next"

PUBLIC = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/flyer-clinic-shuttle.html"
PUBLIC_PDF = "https://dpromstk2000-lab.github.io/dpro-line-systems-site/flyer-clinic-shuttle.pdf"

LINE = "https://lin.ee/YxJGXV6D"
OFFICIAL_ROOT = "https://dpro-shop.com/"
DEMO = "https://dpromstk2000-lab.github.io/dpro-clinic-shuttle-line/"

SYSTEM_HEAD = "3fc09f4b5c6781d6038dc280de5c58752ce60b51"
OFFICIAL_HEAD = "b92a4d6444375aefc481db267d626c5a712164a5"
PRODUCT_PARENT = "42f6cb648023a95d42c107a9294bc0d0bdac335d"

def write(path, obj):
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(obj, (dict, list)):
        p.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
    else:
        p.write_text(str(obj), encoding="utf-8")

def patch():
    import qrcode

    QR.parent.mkdir(parents=True, exist_ok=True)
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=12,
        border=4
    )
    qr.add_data(OFFICIAL_ROOT)
    qr.make(fit=True)
    qr.make_image(fill_color="black", back_color="white").save(QR)

    s = HTML.read_text(encoding="utf-8")

    s = s.replace("A4 FLYER MASTER V2.1", "A4 FLYER MASTER V2.2")
    s = s.replace("診療所送迎予約 A4 MASTER V2.1", "診療所送迎予約 A4 MASTER V2.2")

    s = s.replace(
        ".action-grid{display:grid;grid-template-columns:.95fr 1.1fr .95fr;gap:2.0mm}",
        ".action-grid{display:grid;grid-template-columns:.92fr 1.16fr .92fr;gap:2.0mm}"
    )

    old_css = ".site-url{margin-top:.8mm;font-size:1.15mm;line-height:1.15;color:#0b7557;font-weight:800;word-break:break-all}"
    new_css = (
        ".official-web{margin-top:auto;padding-top:1.1mm;border-top:1px solid #cfe3da}"
        ".official-web .ow-label{font-size:1.35mm;line-height:1.15;color:#5a7b70;font-weight:900;"
        "letter-spacing:.035em;margin-bottom:.7mm}"
        ".official-web .ow-url{display:flex;align-items:center;min-height:7.8mm;padding:.45mm 1.4mm;"
        "border:1px solid #9fd9c1;border-radius:2.2mm;background:#ecfaf4;color:#0b5844;"
        "font-size:3.95mm;line-height:1;font-weight:950;letter-spacing:-.045em;white-space:nowrap}"
    )
    if old_css not in s:
        raise SystemExit("old .site-url CSS not found")
    s = s.replace(old_css, new_css, 1)

    new_card = (
        '<article class="action-card site">'
        '<div class="action-copy">'
        '<div class="action-kicker"><span class="action-num">02</span> OFFICIAL SITE</div>'
        '<h4>詳しく見る。</h4>'
        '<p>サービス・料金・導入条件など、DPRO SHOPの情報を公式サイトで確認。</p>'
        '<div class="official-web">'
        '<div class="ow-label">OFFICIAL WEB ADDRESS / PCから直接アクセス</div>'
        '<div class="ow-url">https://dpro-shop.com/</div>'
        '</div></div>'
        '<div class="action-qr">'
        '<img src="assets/clinic-shuttle-next/qr/official.png" alt="DPRO SHOP公式サイト QR">'
        '<div class="qlabel">公式サイト</div>'
        '</div></article>'
    )

    pattern = r'<article class="action-card site">.*?</article>'
    s2, n = re.subn(pattern, new_card, s, count=1, flags=re.S)
    if n != 1:
        raise SystemExit(f"center OFFICIAL card replacement count={n}")
    s = s2

    HTML.write_text(s, encoding="utf-8")

    if "https://dpro-shop.com/systems/clinic-shuttle" in s:
        raise SystemExit("product-specific URL still displayed in flyer")
    if "https://dpro-shop.com/" not in s:
        raise SystemExit("base official URL missing")
    if "OFFICIAL WEB ADDRESS / PCから直接アクセス" not in s:
        raise SystemExit("official address label missing")

    write("assets/clinic-shuttle-next/R13_FLYER_OFFICIAL_CARD_SOURCE.json", {
        "stage": "R13_FLYER_OFFICIAL_CARD_SOURCE",
        "pass": True,
        "displayedOfficialUrl": OFFICIAL_ROOT,
        "officialQrTarget": OFFICIAL_ROOT,
        "productSpecificUrlRemovedFromFlyerCard": True,
        "master": "DPRO A4 FLYER MASTER V2.2",
        "systemFinalLock": SYSTEM_HEAD,
        "officialHead": OFFICIAL_HEAD
    })
    print("R13 source PASS")

def build():
    from playwright.sync_api import sync_playwright

    proc = subprocess.Popen(
        [sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1"],
        cwd=str(ROOT),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    try:
        time.sleep(1.0)
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True)
            p = browser.new_page(viewport={"width": 1440, "height": 1200})
            p.goto(
                "http://127.0.0.1:8765/flyer-clinic-shuttle.html",
                wait_until="networkidle",
                timeout=60000
            )
            p.wait_for_timeout(700)

            qa = p.evaluate('''() => {
              const footer=document.querySelector('.footer').getBoundingClientRect();
              const cards=[...document.querySelectorAll('.action-card')].map((el,i)=>{
                const r=el.getBoundingClientRect();
                return {index:i,top:r.top,bottom:r.bottom,height:r.height};
              });
              const site=document.querySelector('.action-card.site').getBoundingClientRect();
              const url=document.querySelector('.ow-url');
              const ur=url.getBoundingClientRect();
              return {
                title:document.title,
                cards,
                cardHeightSpread:Math.max(...cards.map(x=>x.height))-Math.min(...cards.map(x=>x.height)),
                footerOverlap:Math.max(0,site.bottom-footer.top),
                urlText:url.textContent.trim(),
                urlFontPx:parseFloat(getComputedStyle(url).fontSize),
                urlWidth:ur.width,
                brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)
              };
            }''')

            if qa["brokenImages"]:
                raise SystemExit("broken images: " + repr(qa["brokenImages"]))
            if qa["footerOverlap"] > 0:
                raise SystemExit("OFFICIAL card overlaps footer: " + repr(qa))
            if qa["cardHeightSpread"] > 1.5:
                raise SystemExit("bottom cards not aligned: " + repr(qa["cards"]))
            if qa["urlText"] != OFFICIAL_ROOT:
                raise SystemExit("display URL mismatch: " + repr(qa["urlText"]))
            if qa["urlFontPx"] < 14:
                raise SystemExit("display URL not emphasized enough: " + repr(qa["urlFontPx"]))

            p.screenshot(path=str(EVID / "r13-flyer-official-card-screen.png"), full_page=True)
            p.pdf(
                path=str(PDF),
                format="A4",
                print_background=True,
                prefer_css_page_size=True,
                margin={"top":"0","right":"0","bottom":"0","left":"0"}
            )
            browser.close()

        write("assets/clinic-shuttle-next/R13_FLYER_OFFICIAL_CARD_SCREEN_QA.json", qa)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()

    print("R13 screen/PDF build PASS")

def pdfqa():
    import fitz, cv2, numpy as np, zxingcpp

    doc = fitz.open(PDF)
    if doc.page_count != 1:
        raise SystemExit("PDF must be exactly 1 page")

    pix = doc[0].get_pixmap(matrix=fitz.Matrix(3.2, 3.2), alpha=False)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    if pix.n == 4:
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)

    vals = sorted(set(r.text for r in zxingcpp.read_barcodes(img) if r.text))
    expected = [LINE, OFFICIAL_ROOT, DEMO]
    missing = [x for x in expected if x not in vals]
    if missing:
        raise SystemExit("QR decode missing: " + repr(missing) + " got=" + repr(vals))

    text = "\n".join(page.get_text("text") for page in doc)
    if OFFICIAL_ROOT not in text:
        raise SystemExit("base official URL missing from PDF text")
    if "dpro-shop.com/systems/clinic-shuttle" in text:
        raise SystemExit("product-specific URL still appears in final flyer PDF")

    write("assets/clinic-shuttle-next/R13_FLYER_OFFICIAL_CARD_PDF_QA.json", {
        "stage": "R13_FLYER_OFFICIAL_CARD_PDF_QA",
        "pass": True,
        "pages": 1,
        "bytes": PDF.stat().st_size,
        "displayedOfficialUrl": OFFICIAL_ROOT,
        "qrDecoded": vals
    })
    print("R13 PDF/QR QA PASS")

def get(url, timeout=40):
    req = urllib.request.Request(
        url,
        headers={"User-Agent":"Mozilla/5.0 DPRO-R13-FLYER-QA"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()

def publicqa():
    from playwright.sync_api import sync_playwright

    last = None
    for i in range(42):
        try:
            status, data = get(PUBLIC)
            text = data.decode("utf-8", "ignore")
            if (
                status == 200
                and "A4 FLYER MASTER V2.2" in text
                and "OFFICIAL WEB ADDRESS / PCから直接アクセス" in text
            ):
                break
            last = {
                "status": status,
                "v22": "V2.2" in text,
                "label": "OFFICIAL WEB ADDRESS" in text
            }
        except Exception as e:
            last = repr(e)
        time.sleep(10)
    else:
        raise SystemExit("public flyer not ready: " + repr(last))

    status_pdf, pdf_data = get(PUBLIC_PDF)
    if status_pdf != 200 or len(pdf_data) < 100000:
        raise SystemExit("public PDF invalid")

    report = {
        "stage": "R13_FLYER_OFFICIAL_CARD_PUBLIC_QA",
        "status": "PENDING",
        "viewports": {},
        "blockers": []
    }

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        for w in [390, 1440]:
            p = browser.new_page(viewport={"width": w, "height": 1000})
            p.goto(PUBLIC, wait_until="networkidle", timeout=60000)
            p.wait_for_timeout(500)

            qa = p.evaluate('''() => {
              const footer=document.querySelector('.footer').getBoundingClientRect();
              const cards=[...document.querySelectorAll('.action-card')].map(el=>el.getBoundingClientRect());
              const site=document.querySelector('.action-card.site').getBoundingClientRect();
              const url=document.querySelector('.ow-url');
              return {
                title:document.title,
                displayedUrl:url.textContent.trim(),
                urlFontPx:parseFloat(getComputedStyle(url).fontSize),
                brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),
                footerOverlap:Math.max(0,site.bottom-footer.top),
                cardHeightSpread:Math.max(...cards.map(x=>x.height))-Math.min(...cards.map(x=>x.height))
              };
            }''')

            if qa["displayedUrl"] != OFFICIAL_ROOT:
                report["blockers"].append({"width":w, "error":"display URL mismatch", "qa":qa})
            if qa["brokenImages"]:
                report["blockers"].append({"width":w, "error":"broken image", "qa":qa})
            if qa["footerOverlap"] > 0:
                report["blockers"].append({"width":w, "error":"footer overlap", "qa":qa})
            if qa["cardHeightSpread"] > 1.5:
                report["blockers"].append({"width":w, "error":"card alignment mismatch", "qa":qa})

            p.screenshot(path=str(EVID / f"r13-public-{w}.png"), full_page=True)
            report["viewports"][str(w)] = qa
            p.close()

        browser.close()

    report["status"] = "PASS" if not report["blockers"] else "FAIL"
    report["publicPdf"] = {"status": status_pdf, "bytes": len(pdf_data)}
    write("assets/clinic-shuttle-next/R13_FLYER_OFFICIAL_CARD_PUBLIC_QA.json", report)

    if report["blockers"]:
        raise SystemExit(
            "R13 public QA blockers: "
            + json.dumps(report["blockers"], ensure_ascii=False)
        )

    write("assets/clinic-shuttle-next/PRODUCT_RELEASE_COMPLETE_R13_FLYER_CARD_VERIFIED.json", {
        "status": "PRODUCT RELEASE COMPLETE",
        "releaseRevision": "R13_FLYER_OFFICIAL_CARD_VERIFIED",
        "product": "DPRO 診療所送迎予約",
        "officialDisplayUrl": OFFICIAL_ROOT,
        "officialQrTarget": OFFICIAL_ROOT,
        "flyerMaster": "V2.2",
        "blockers": []
    })
    print("R13 PUBLIC QA PASS")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: script.py patch|build|pdfqa|publicqa")
    {
        "patch": patch,
        "build": build,
        "pdfqa": pdfqa,
        "publicqa": publicqa
    }[sys.argv[1]]()
