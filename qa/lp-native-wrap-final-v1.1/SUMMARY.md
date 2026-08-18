# DPRO LP NATIVE WRAP FINAL AUDIT V1.1

- LP pages: 50
- Checks: 150
- HIGH checks: 14
- HIGH pages: 10
- Horizontal overflow checks: 0
- Load errors: 0
- Audit errors: 0
- Element audit errors: 0

## HIGH pages

### lp-btype.html
- desktop 1440px: fragmented-heading
  - H1: 相談から通所、作業、支援、工賃まで。 B型事業所の毎日を、ひとつにつなぐ。
    - lines: ["相談から通所、作","業、支援、工賃ま","で。","B型事業所の毎日","を、ひとつにつな","ぐ。"]
    - reasons: fragmented-heading
- laptop 1024px: fragmented-heading
  - H1: 相談から通所、作業、支援、工賃まで。 B型事業所の毎日を、ひとつにつなぐ。
    - lines: ["相談から通所、作","業、支援、工賃ま","で。","B型事業所の毎日","を、ひとつにつな","ぐ。"]
    - reasons: fragmented-heading

### lp-car.html
- laptop 1024px: fragmented-heading
  - H1: 査定・買取から、販売・納車、その後のフォローまで。 車とお客様を、ひとつの流れでつなぐ。
    - lines: ["査定・買取から、","販売・納車、その","後のフォローま","で。","車とお客様を、ひ","とつの流れでつな","ぐ。"]
    - reasons: fragmented-heading

### lp-caretaxi.html
- laptop 1024px: singleton-line
  - H1: 送迎依頼から、配車・運行・料金管理まで。 DPRO介護タクシーシステム
    - lines: ["送迎依頼から、配車・運","行・料金管理まで。","DPRO介護タクシーシステ","ム"]
    - reasons: singleton-line

### lp-funeral.html
- desktop 1440px: fragmented-heading
  - H1: 葬儀前の相談から、 葬儀後・法要まで。 ご家族との対応を、ひとつにつなぐ。
    - lines: ["葬儀前の相談か","ら、","葬儀後・法要ま","で。","ご家族との対応","を、ひとつにつ","なぐ。"]
    - reasons: fragmented-heading
- laptop 1024px: fragmented-heading
  - H1: 葬儀前の相談から、 葬儀後・法要まで。 ご家族との対応を、ひとつにつなぐ。
    - lines: ["葬儀前の相談か","ら、","葬儀後・法要ま","で。","ご家族との対応","を、ひとつにつな","ぐ。"]
    - reasons: fragmented-heading

### lp-green-rental.html
- desktop 1440px: fragmented-heading
  - H2: 今の巡回方法に合わせて、 使う画面から整理できます。
    - lines: ["今の巡回方法に合わせ","て、","使う画面から整理できま","す。"]
    - reasons: fragmented-heading

### lp-izakaya.html
- desktop 1440px: singleton-line, fragmented-heading
  - H1: 予約受付から、 営業中の確認まで 一つにつなぐ。
    - lines: ["予約受付から、","営業中の確認ま","で","一つにつなぐ。"]
    - reasons: singleton-line
  - H2: LINEだけでも、HPだけでもない。 3つの運用を月額5,500円（税込）で。
    - lines: ["LINEだけでも、HPだけでもな","い。","3つの運用を月額5,500円（税込）","で。"]
    - reasons: fragmented-heading
- laptop 1024px: fragmented-heading, singleton-line
  - H1: 予約受付から、 営業中の確認まで 一つにつなぐ。
    - lines: ["予約受付か","ら、","営業中の確認","まで","一つにつな","ぐ。"]
    - reasons: fragmented-heading
  - H2: お客様・管理PC・営業iPad・LINE通知を ひとつの流れに。
    - lines: ["お客様・管理PC・営業iPad・LINE通知","を","ひとつの流れに。"]
    - reasons: singleton-line

### lp-nail.html
- desktop 1440px: fragmented-heading
  - H1: 予約だけで終わらない。 次の来店までつながる。
    - lines: ["予約だけで終わらな","い。","次の来店までつなが","る。"]
    - reasons: fragmented-heading

### lp-stay.html
- laptop 1024px: singleton-line
  - H3: アクセス・駐車場など同じ案内を繰り返す
    - lines: ["アクセス・駐車場な","ど同じ案内を繰り返","す"]
    - reasons: singleton-line

### lp-takeout.html
- desktop 1440px: singleton-line
  - H1: 「注文を受ける」から 「次の注文」まで、 ひとつにつなぐ。
    - lines: ["「注文を受ける」か","ら","「次の注文」まで、","ひとつにつなぐ。"]
    - reasons: singleton-line
- laptop 1024px: singleton-line
  - H1: 「注文を受ける」から 「次の注文」まで、 ひとつにつなぐ。
    - lines: ["「注文を受ける」か","ら","「次の注文」まで、","ひとつにつなぐ。"]
    - reasons: singleton-line

### lp-yakiniku.html
- mobile 390px: overflow
  - BUTTON: オーナーPC
    - lines: ["オーナーPC"]
    - reasons: overflow

