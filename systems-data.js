/* DPRO PRODUCT SITE V3.0 — CANONICAL 54 PRODUCT DATA
 * CANONICAL SOURCE: 54 products / 2026-09-03
 * DPRO 訪問マッサージ・鍼灸 is product #52.
 * DPRO 造園・外構 is product #53.
 * DPRO ペストコントロール／環境衛生サービス is product #54.
 * All 54 product records are statically defined in this file.
 * No external 50/51-product runtime and no runtime catalog augmentation.
 */
(function (global) {
  "use strict";

  function deepFreeze(value) {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    Object.keys(value).forEach((key) => deepFreeze(value[key]));
    return Object.freeze(value);
  }

  const categories = deepFreeze({
  "beauty_health": {
    "label": "美容・健康",
    "description": "美容室、サロン、エステ、整体、ジム、ヨガなど"
  },
  "medical_pet": {
    "label": "医療・ペット",
    "description": "歯科、動物病院、ペットサロンなど"
  },
  "food_retail": {
    "label": "飲食・小売",
    "description": "パン、ケーキ、花、居酒屋、テイクアウト、焼肉など"
  },
  "buyback_reuse": {
    "label": "買取・リユース",
    "description": "総合買取、中古車買取・販売など"
  },
  "home_building": {
    "label": "住まい・建築",
    "description": "不動産、リフォームなど"
  },
  "education_life": {
    "label": "教育・生活サービス",
    "description": "教育、福祉、介護、生活サービス、宿泊、車両サービスなど"
  },
  "professional_business": {
    "label": "士業・企業支援",
    "description": "行政書士、司法書士、社労士、税理士、調査士、営業支援など"
  }
});
  const systems = deepFreeze([
  {
    "code": "HAIR",
    "assetSlug": "hair",
    "name": "美容室",
    "category": "beauty_health",
    "systemPage": "systems/hair-salon.html",
    "lpUrl": "lp-hair.html",
    "flyerHtml": "flyer-hair.html",
    "flyerPdf": "flyer-hair.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-hair-salon-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE予約・来店受付から施術カルテ・再来店フォローまでを、一つの流れにつなぐ。",
    "summary": "美容室向けに、LINE予約・再予約、写真付きメニュー、QR来店受付などの業務をまとめる業種特化型システム。",
    "targets": [
      "美容室"
    ],
    "features": [
      "LINE予約・再予約",
      "電話・店頭受付も一元化",
      "会員マイページ",
      "360°美容カルテ",
      "薬剤・写真履歴",
      "次回来店・再来店フォロー"
    ],
    "previewAsset": "flyer-hair.html",
    "experienceScreens": []
  },
  {
    "code": "NAIL",
    "assetSlug": "nail",
    "name": "ネイルサロン",
    "category": "beauty_health",
    "systemPage": "systems/nail.html",
    "lpUrl": "lp-nail.html",
    "flyerHtml": "flyer-nail.html",
    "flyerPdf": "flyer-nail.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/liff-nail-reserve/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真付きデザイン予約から再来店フォローまでを、一つの流れにつなぐ。",
    "summary": "ネイルサロン向けに、写真付きデザイン予約、前回と同じ予約、施術カルテなどの業務をまとめる業種特化型システム。",
    "targets": [
      "ネイルサロン"
    ],
    "features": [
      "写真付きデザイン予約",
      "前回と同じ内容での再予約",
      "施術カルテ",
      "施術写真管理",
      "店頭iPad運用",
      "次回来店フォロー"
    ],
    "previewAsset": "flyer-nail.html",
    "experienceScreens": []
  },
  {
    "code": "ESTHE",
    "assetSlug": "esthe",
    "name": "エステ",
    "category": "beauty_health",
    "systemPage": "systems/esthe.html",
    "lpUrl": "lp-esthe.html",
    "flyerHtml": "flyer-esthe.html",
    "flyerPdf": "flyer-esthe.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-esthe-relax-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "今日やることから再来店フォローまでを、一つの流れにつなぐ。",
    "summary": "エステ・リラクゼーション向けに、今日やること、予約・来店を統合、施術進捗ボードなどの業務をまとめる業種特化型システム。",
    "targets": [
      "エステ・リラクゼーション"
    ],
    "features": [
      "予約管理",
      "事前カウンセリング",
      "施術進捗管理",
      "顧客カルテ",
      "回数券管理",
      "再来店フォロー／次回予約"
    ],
    "previewAsset": "flyer-esthe.html",
    "experienceScreens": []
  },
  {
    "code": "SEITAI",
    "assetSlug": "seitai",
    "name": "整体・整骨院",
    "category": "beauty_health",
    "systemPage": "systems/osteopathic.html",
    "lpUrl": "lp-seitai.html",
    "flyerHtml": "flyer-seitai.html",
    "flyerPdf": "flyer-seitai.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-seitai-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE予約・来院受付から施術履歴・再来院フォローまでを、一つの流れにつなぐ。",
    "summary": "整骨院・整体向けに、会員ホーム、4段階の来院進捗、患者履歴などの業務をまとめる業種特化型システム。",
    "targets": [
      "整骨院・整体"
    ],
    "features": [
      "予約管理",
      "来院受付",
      "施術進捗管理",
      "患者履歴",
      "回数券管理",
      "再来院フォロー"
    ],
    "previewAsset": "flyer-seitai.html",
    "experienceScreens": []
  },
  {
    "code": "DENTAL",
    "assetSlug": "dental",
    "name": "歯科",
    "category": "medical_pet",
    "systemPage": "systems/dental.html",
    "lpUrl": "lp-dental.html",
    "flyerHtml": "flyer-dental.html",
    "flyerPdf": "flyer-dental.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/DEGITAL-QR/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "家族で使えるデジタル診察券から予約・受付管理までを、一つの流れにつなぐ。",
    "summary": "歯科医院向けに、家族で使えるデジタル診察券、30分単位の診療予約、変更・取消希望などの業務をまとめる業種特化型システム。",
    "targets": [
      "歯科医院"
    ],
    "features": [
      "家族デジタル診察券",
      "30分単位の診療予約",
      "当日急患受付",
      "来院チェックイン",
      "待ち列管理",
      "電話・窓口受付"
    ],
    "previewAsset": "flyer-dental.html",
    "experienceScreens": []
  },
  {
    "code": "MEDICAL",
    "assetSlug": "medical",
    "name": "DPRO MEDICAL",
    "category": "medical_pet",
    "systemPage": "systems/medical.html",
    "lpUrl": "systems/medical.html",
    "flyerHtml": "flyer-medical.html",
    "flyerPdf": "flyer-medical.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-medical-standard/medical-public-demo.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "予約・WEB問診・来院受付・院内進行・医院管理・医院HPまでを、ひとつの情報基盤につなぐ。",
    "summary": "医療機関向けに、患者スマホ、予約、WEB問診、受付、待ち状況、院内進行、医院管理PC、受付iPad、スタッフ画面、医院HPをひとつの流れでまとめるDPROシステム。",
    "targets": [
      "医療機関",
      "一般・内科",
      "眼科",
      "小児科",
      "整形外科",
      "美容医療",
      "婦人科・女性医療"
    ],
    "features": [
      "予約・当日受付",
      "WEB問診",
      "院内進行・待ち状況",
      "患者スマホ",
      "医院管理PC・受付iPad",
      "医院HP・6つの診療パターン"
    ],
    "previewAsset": "systems/medical.html",
    "experienceScreens": []
  },
  {
    "code": "VET",
    "assetSlug": "vet",
    "name": "動物病院",
    "category": "medical_pet",
    "systemPage": "systems/pet-care.html",
    "lpUrl": "lp-vet.html",
    "flyerHtml": "flyer-vet.html",
    "flyerPdf": "flyer-vet.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/DPRO-VET-QR/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE診察券から多頭・家族管理までを、一つの流れにつなぐ。",
    "summary": "動物病院向けに、LINE診察券、順番受付、受付PCなどの業務をまとめる業種特化型システム。",
    "targets": [
      "動物病院"
    ],
    "features": [
      "LINEペット診察券",
      "当日順番受付",
      "30分単位の日時指定予約",
      "QR来院受付",
      "獣医師向け診察進行画面",
      "会計待ちまでの進行管理"
    ],
    "previewAsset": "flyer-vet.html",
    "experienceScreens": []
  },
  {
    "code": "CLEANING",
    "assetSlug": "cleaning",
    "name": "クリーニング",
    "category": "education_life",
    "systemPage": "systems/cleaning.html",
    "lpUrl": "lp-cleaning.html",
    "flyerHtml": "flyer-cleaning.html",
    "flyerPdf": "flyer-cleaning.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-cleaning-line-liff/demo-guide.html?v=cleaning-18",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE会員証から印刷・未受取フォローまでを、一つの流れにつなぐ。",
    "summary": "クリーニング向けに、LINE会員証、店頭受付・顧客検索、品物・加工・写真などの業務をまとめる業種特化型システム。",
    "targets": [
      "クリーニング"
    ],
    "features": [
      "店頭受付",
      "品物写真管理",
      "作業工程管理",
      "LINE会員証",
      "受け渡し管理",
      "未受取フォロー"
    ],
    "previewAsset": "flyer-cleaning.html",
    "experienceScreens": []
  },
  {
    "code": "REPAIR",
    "assetSlug": "repair",
    "name": "修理受付",
    "category": "education_life",
    "systemPage": "systems/repair.html",
    "lpUrl": "lp-repair.html",
    "flyerHtml": "flyer-repair.html",
    "flyerPdf": "flyer-repair.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-repair-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE相談・仮受付から引渡し・保証までを、一つの流れにつなぐ。",
    "summary": "修理受付・修理店向けに、LINE相談・仮受付、電話・店頭も同じ受付へ、写真・預かりなどの業務をまとめる業種特化型システム。",
    "targets": [
      "修理受付・修理店"
    ],
    "features": [
      "修理相談受付",
      "電話・来店受付",
      "預かり写真",
      "診断・見積",
      "修理進捗管理",
      "引き取り・支払い記録・保証"
    ],
    "previewAsset": "flyer-repair.html",
    "experienceScreens": [],
    "foundationNote": "正式ページの複合表記「写真・預かり・見積り」を2項目へ分割してfeatures[6]へ正規化。"
  },
  {
    "code": "TAKEOUT",
    "assetSlug": "takeout",
    "name": "テイクアウト",
    "category": "food_retail",
    "systemPage": "systems/takeout.html",
    "lpUrl": "lp-takeout.html",
    "flyerHtml": "flyer-takeout.html",
    "flyerPdf": "flyer-takeout.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-takeout-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真付きモバイルオーダーから商品・受取枠・営業時間管理までを、一つの流れにつなぐ。",
    "summary": "テイクアウト向けに、写真付きモバイルオーダー、LINE・電話・店頭受付、調理ポイント・受取枠などの業務をまとめる業種特化型システム。",
    "targets": [
      "テイクアウト"
    ],
    "features": [
      "写真付き商品選択",
      "LINE・電話・店頭受付",
      "30分受取枠",
      "厨房進行管理",
      "マイページ",
      "再注文導線"
    ],
    "previewAsset": "flyer-takeout.html",
    "experienceScreens": []
  },
  {
    "code": "SALON",
    "assetSlug": "salon",
    "name": "美容サロン",
    "category": "beauty_health",
    "systemPage": "systems/salon.html",
    "lpUrl": "lp-salon.html",
    "flyerHtml": "flyer-salon.html",
    "flyerPdf": "flyer-salon.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/liff-salon-reserve/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE・電話・店頭予約からPC・iPadでの店舗管理までを、一つの流れにつなぐ。",
    "summary": "美容サロン向けに、予約を1か所に集約、顧客カルテ、回数券などの業務をまとめる業種特化型システム。",
    "targets": [
      "美容サロン"
    ],
    "features": [
      "LINE予約",
      "担当スタッフ選択",
      "電話・店頭受付",
      "スタッフ予約確認",
      "オーナーPC管理",
      "iPad管理"
    ],
    "previewAsset": "flyer-salon.html",
    "experienceScreens": []
  },
  {
    "code": "BAKERY",
    "assetSlug": "bakery",
    "name": "ベーカリー",
    "category": "food_retail",
    "systemPage": "systems/bakery.html",
    "lpUrl": "lp-bakery.html",
    "flyerHtml": "flyer-bakery.html",
    "flyerPdf": "flyer-bakery.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/bakery-line-system/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真付き商品管理からスタッフ受け渡しまでを、一つの流れにつなぐ。",
    "summary": "パン屋・ベーカリー向けに、写真付き商品管理、公開商品カタログ、カタログ取り置きなどの業務をまとめる業種特化型システム。",
    "targets": [
      "パン屋・ベーカリー"
    ],
    "features": [
      "写真付きパンカタログ",
      "取り置き受付",
      "店舗の準備ステータス",
      "QR来店確認・受け渡し",
      "受付条件・営業日管理",
      "QR会員証・いつものパン"
    ],
    "previewAsset": "flyer-bakery.html",
    "experienceScreens": []
  },
  {
    "code": "CAKE",
    "assetSlug": "cake",
    "name": "ケーキ・洋菓子",
    "category": "food_retail",
    "systemPage": "systems/cake.html",
    "lpUrl": "lp-cake.html",
    "flyerHtml": "flyer-cake.html",
    "flyerPdf": "flyer-cake.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-cake-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真付き公開カタログからオーナーPC商品管理までを、一つの流れにつなぐ。",
    "summary": "ケーキ・洋菓子店向けに、写真付き公開カタログ、商品ごとの受付方法、商品共有URLなどの業務をまとめる業種特化型システム。",
    "targets": [
      "ケーキ・洋菓子店"
    ],
    "features": [
      "写真付き商品カタログ",
      "当日取り置き",
      "事前予約・オーダー相談",
      "数量・締切管理",
      "製作管理",
      "支払い確認・受渡し"
    ],
    "previewAsset": "flyer-cake.html",
    "experienceScreens": []
  },
  {
    "code": "EYE",
    "assetSlug": "eye",
    "name": "まつげ・アイサロン",
    "category": "beauty_health",
    "systemPage": "systems/eye-salon.html",
    "lpUrl": "lp-eye.html",
    "flyerHtml": "flyer-eye.html",
    "flyerPdf": "flyer-eye.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-eye-salon-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE予約・前回と同じ内容での再予約から施術カルテ・再来店フォローまでを、一つの流れにつなぐ。",
    "summary": "まつげ・眉サロン向けに、LINE予約・前回と同じ内容、電話・店頭・Instagram受付、まつげ・眉専用カルテなどの業務をまとめる業種特化型システム。",
    "targets": [
      "まつげ・眉サロン"
    ],
    "features": [
      "LINEからかんたん予約",
      "電話・Instagram・店頭予約",
      "まつげ・眉専用カルテ",
      "施術前後写真",
      "次回来店・再来店フォロー",
      "予約確認・変更・再予約"
    ],
    "previewAsset": "flyer-eye.html",
    "experienceScreens": []
  },
  {
    "code": "YOGA",
    "assetSlug": "yoga",
    "name": "ヨガ",
    "category": "beauty_health",
    "systemPage": "systems/yoga.html",
    "lpUrl": "lp-yoga.html",
    "flyerHtml": "flyer-yoga.html",
    "flyerPdf": "flyer-yoga.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/liff-yoga-reserve/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "体験予約からPC・iPad管理までを、一つの流れにつなぐ。",
    "summary": "ヨガ・ピラティス向けに、体験予約、通常予約、振替・変更などの業務をまとめる業種特化型システム。",
    "targets": [
      "ヨガ・ピラティス"
    ],
    "features": [
      "LINE体験予約",
      "LINE通常予約",
      "電話・店頭受付",
      "当日のレッスン管理",
      "レッスン記録",
      "次回案内"
    ],
    "previewAsset": "flyer-yoga.html",
    "experienceScreens": []
  },
  {
    "code": "GYM",
    "assetSlug": "gym",
    "name": "パーソナルジム",
    "category": "beauty_health",
    "systemPage": "systems/gym.html",
    "lpUrl": "lp-gym.html",
    "flyerHtml": "flyer-gym.html",
    "flyerPdf": "flyer-gym.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/liff-gym-demo/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE予約から回数券・継続管理までを、一つの流れにつなぐ。",
    "summary": "パーソナルジム向けに、LINE予約、会員マイページ、PC総合管理などの業務をまとめる業種特化型システム。",
    "targets": [
      "パーソナルジム"
    ],
    "features": [
      "LINE体験・トレーニング予約",
      "電話・店頭予約",
      "会員マイページ",
      "回数券",
      "受付・セッション記録",
      "体験・入会・継続フォロー"
    ],
    "previewAsset": "flyer-gym.html",
    "experienceScreens": []
  },
  {
    "code": "ESTATE",
    "assetSlug": "estate",
    "name": "不動産・賃貸",
    "category": "home_building",
    "systemPage": "systems/estate.html",
    "lpUrl": "lp-estate.html",
    "flyerHtml": "flyer-estate.html",
    "flyerPdf": "flyer-estate.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-estate-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "希望条件・物件候補から再相談・内見後フォローまでを、一つの流れにつなぐ。",
    "summary": "不動産・賃貸内見向けに、希望条件・物件候補、物件詳細・内見予約、今日やることなどの業務をまとめる業種特化型システム。",
    "targets": [
      "不動産・賃貸内見"
    ],
    "features": [
      "内見予約",
      "顧客カルテ・希望条件",
      "物件管理",
      "案件進捗",
      "再相談・フォロー",
      "条件に合う物件提案"
    ],
    "previewAsset": "flyer-estate.html",
    "experienceScreens": []
  },
  {
    "code": "BUYBACK",
    "assetSlug": "buyback",
    "name": "買取・査定",
    "category": "buyback_reuse",
    "systemPage": "systems/buyback.html",
    "lpUrl": "lp-buyback.html",
    "flyerHtml": "flyer-buyback.html",
    "flyerPdf": "flyer-buyback.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-buyback-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真査定・複数商品の受付からPC・iPadでの査定管理までを、一つの流れにつなぐ。",
    "summary": "総合買取・査定向けに、複数商品を一括受付、カテゴリー別入力、非公開の商品写真などの業務をまとめる業種特化型システム。",
    "targets": [
      "総合買取・査定"
    ],
    "features": [
      "写真査定",
      "複数商品管理",
      "来店・出張・催事受付",
      "商品別査定額",
      "売却回答",
      "担当・フォロー"
    ],
    "previewAsset": "flyer-buyback.html",
    "experienceScreens": []
  },
  {
    "code": "PHOTO",
    "assetSlug": "photo",
    "name": "写真館",
    "category": "education_life",
    "systemPage": "systems/photo-studio.html",
    "lpUrl": "lp-photo.html",
    "flyerHtml": "flyer-photo.html",
    "flyerPdf": "flyer-photo.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-photo-studio-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "撮影プラン・空き枠予約から納品・再注文フォローまでを、一つの流れにつなぐ。",
    "summary": "写真館・フォトスタジオ向けに、撮影プラン・空き枠予約、撮影対象者・事前ヒアリング、電話・店頭予約と顧客検索などの業務をまとめる業種特化型システム。",
    "targets": [
      "写真館・フォトスタジオ"
    ],
    "features": [
      "撮影予約",
      "撮影対象者・事前希望",
      "当日の受付・撮影進行",
      "撮影カルテ",
      "写真セレクト・納品",
      "再注文相談"
    ],
    "previewAsset": "flyer-photo.html",
    "experienceScreens": []
  },
  {
    "code": "REFORM",
    "assetSlug": "reform",
    "name": "リフォーム・工務店",
    "category": "home_building",
    "systemPage": "systems/reform.html",
    "lpUrl": "lp-reform.html",
    "flyerHtml": "flyer-reform.html",
    "flyerPdf": "flyer-reform.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-reform-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真付き相談・現地調査から見積・工事進捗・お客様共有までを、一つの流れにつなぐ。",
    "summary": "リフォーム・工事管理向けに、相談・電話・LINE受付、現地調査管理、見積・契約管理などの業務をまとめる業種特化型システム。",
    "targets": [
      "リフォーム・工事管理"
    ],
    "features": [
      "写真付き相談",
      "施工先情報管理",
      "現地調査",
      "見積管理",
      "工事進捗",
      "写真報告・共有"
    ],
    "previewAsset": "flyer-reform.html",
    "experienceScreens": [],
    "foundationNote": "正式ページの業務フローに明記された工程をfeatures[6]へ正規化。新規機能の追加はしていない。"
  },
  {
    "code": "TAX",
    "assetSlug": "tax",
    "name": "税理士・会計",
    "category": "professional_business",
    "systemPage": "systems/tax-accounting.html",
    "lpUrl": "lp-tax.html",
    "flyerHtml": "flyer-tax.html",
    "flyerPdf": "flyer-tax.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-tax-accounting-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "顧問先マイページからタスク・期限と電話検索までを、一つの流れにつなぐ。",
    "summary": "税理士・会計事務所向けに、顧問先マイページ、資料依頼・安全な提出、案件・申告進捗などの業務をまとめる業種特化型システム。",
    "targets": [
      "税理士・会計事務所"
    ],
    "features": [
      "資料提出・回収",
      "申告・月次案件の進捗",
      "面談予約",
      "税務・会計相談",
      "タスク管理",
      "期限管理"
    ],
    "previewAsset": "flyer-tax.html",
    "experienceScreens": []
  },
  {
    "code": "SCHOOL",
    "assetSlug": "school",
    "name": "学習塾",
    "category": "education_life",
    "systemPage": "systems/school.html",
    "lpUrl": "lp-school.html",
    "flyerHtml": "flyer-school.html",
    "flyerPdf": "flyer-school.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-school-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "体験・欠席・振替のLINE受付から授業進捗・保護者連絡までを、一つの流れにつなぐ。",
    "summary": "学習塾向けに、体験・欠席・振替受付、授業予定、進捗確認、保護者連絡などをまとめる業種特化型システム。",
    "targets": [
      "学習塾"
    ],
    "features": [
      "体験予約",
      "欠席受付",
      "振替受付",
      "今日やること",
      "授業進捗",
      "保護者対応"
    ],
    "previewAsset": "flyer-school.html",
    "experienceScreens": []
  },
  {
    "code": "FUNERAL",
    "assetSlug": "funeral",
    "name": "葬儀・法要",
    "category": "education_life",
    "systemPage": "systems/funeral.html",
    "lpUrl": "lp-funeral.html",
    "flyerHtml": "flyer-funeral.html",
    "flyerPdf": "flyer-funeral.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-funeral-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "事前相談・会館見学からPC・スタッフ・受付iPadまでを、一つの流れにつなぐ。",
    "summary": "葬儀・法要サポート向けに、事前相談・会館見学、資料請求・一般相談、葬儀後サポートなどの業務をまとめる業種特化型システム。",
    "targets": [
      "葬儀・法要サポート"
    ],
    "features": [
      "事前相談・会館見学",
      "資料請求・相談受付",
      "電話・来館相談も同じ管理",
      "ご家族マイページ",
      "葬儀後フォロー",
      "法要確認"
    ],
    "previewAsset": "flyer-funeral.html",
    "experienceScreens": []
  },
  {
    "code": "STAY",
    "assetSlug": "stay",
    "name": "宿泊施設",
    "category": "education_life",
    "systemPage": "systems/stay.html",
    "lpUrl": "lp-stay.html",
    "flyerHtml": "flyer-stay.html",
    "flyerPdf": "flyer-stay.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-stay-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "予約確認・到着時間から清掃・忘れ物管理までを、一つの流れにつなぐ。",
    "summary": "小規模宿泊施設向けに、予約確認・到着時間、アクセス・滞在案内、宿泊前・滞在中の問い合わせなどの業務をまとめる業種特化型システム。",
    "targets": [
      "小規模宿泊施設"
    ],
    "features": [
      "予約確認",
      "到着案内",
      "当日運営",
      "清掃",
      "問い合わせ対応",
      "忘れ物対応"
    ],
    "previewAsset": "flyer-stay.html",
    "experienceScreens": []
  },
  {
    "code": "CAR",
    "assetSlug": "car",
    "name": "中古車買取・販売",
    "category": "buyback_reuse",
    "systemPage": "systems/used-car.html",
    "lpUrl": "lp-car.html",
    "flyerHtml": "flyer-car.html",
    "flyerPdf": "flyer-car.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-used-car-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "査定・買取・在庫管理から商談・販売・納車後フォローまでを、一つの流れにつなぐ。",
    "summary": "中古車買取・販売向けに、査定・買取・在庫化、公開在庫・商談・販売契約、納車・アフター管理などの業務をまとめる業種特化型システム。",
    "targets": [
      "中古車買取・販売"
    ],
    "features": [
      "買取査定",
      "下取り査定",
      "写真概算査定",
      "販売在庫",
      "来店相談",
      "試乗相談"
    ],
    "previewAsset": "flyer-car.html",
    "experienceScreens": []
  },
  {
    "code": "DAYCARE",
    "assetSlug": "daycare",
    "name": "デイサービス",
    "category": "education_life",
    "systemPage": "systems/dayservice.html",
    "lpUrl": "lp-daycare.html",
    "flyerHtml": "flyer-daycare.html",
    "flyerPdf": "flyer-daycare.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-dayservice-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "家族向けLINE連絡から日常確認・送迎管理までを、一つの流れにつなぐ。",
    "summary": "デイサービス向けに、家族向けLINE連絡、利用者カード、PC管理ダッシュボードなどの業務をまとめる業種特化型システム。",
    "targets": [
      "デイサービス"
    ],
    "features": [
      "家族向けLINE連絡",
      "利用者カード",
      "PC管理ダッシュボード",
      "利用予定・家族連絡管理",
      "スタッフiPad画面",
      "日常確認・送迎管理"
    ],
    "previewAsset": "flyer-daycare.html",
    "experienceScreens": []
  },
  {
    "code": "CARETAXI",
    "assetSlug": "caretaxi",
    "name": "介護タクシー",
    "category": "education_life",
    "systemPage": "systems/caretaxi.html",
    "lpUrl": "lp-caretaxi.html",
    "flyerHtml": "flyer-caretaxi.html",
    "flyerPdf": "flyer-caretaxi.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-caretaxi-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "送迎依頼フォームから料金・顧客台帳までを、一つの流れにつなぐ。",
    "summary": "介護タクシー向けに、送迎依頼フォーム、会員・家族ポータル、管理者PC・電話受付などの業務をまとめる業種特化型システム。",
    "targets": [
      "介護タクシー"
    ],
    "features": [
      "送迎依頼・電話受付",
      "利用者・介助・経路情報",
      "見積・予約確定",
      "車両・担当者の配車",
      "当日運行・状態共有",
      "料金・送迎履歴"
    ],
    "previewAsset": "flyer-caretaxi.html",
    "experienceScreens": []
  },
  {
    "code": "HAISHOKU",
    "assetSlug": "haishoku",
    "name": "高齢者配食",
    "category": "education_life",
    "systemPage": "systems/senior-meal-delivery.html",
    "lpUrl": "lp-haishoku.html",
    "flyerHtml": "flyer-haishoku.html",
    "flyerPdf": "flyer-haishoku.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-senior-meal-delivery-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "家族からのLINE申込から厨房・配達スタッフの管理までを、一つの流れにつなぐ。",
    "summary": "高齢者向け配食向けに、家族LINEから申込、家族マイページ、お届け先は最大5件などの業務をまとめる業種特化型システム。",
    "targets": [
      "高齢者向け配食"
    ],
    "features": [
      "利用者確認",
      "家族・受付",
      "事業所管理",
      "厨房連携",
      "配達管理",
      "結果・変更"
    ],
    "previewAsset": "flyer-haishoku.html",
    "experienceScreens": []
  },
  {
    "code": "HOUSEKEEP",
    "assetSlug": "housekeep",
    "name": "家事代行",
    "category": "education_life",
    "systemPage": "systems/housekeep.html",
    "lpUrl": "lp-housekeep.html",
    "flyerHtml": "flyer-housekeep.html",
    "flyerPdf": "flyer-housekeep.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-housekeep-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE予約・見積り相談から作業チェック・写真までを、一つの流れにつなぐ。",
    "summary": "ハウスクリーニング・家事代行向けに、LINE予約・見積り相談、リピーター自動入力、オーナーPC管理などの業務をまとめる業種特化型システム。",
    "targets": [
      "ハウスクリーニング・家事代行"
    ],
    "features": [
      "予約受付",
      "訪問情報管理",
      "担当・進捗管理",
      "作業チェック",
      "作業写真",
      "作業報告"
    ],
    "previewAsset": "flyer-housekeep.html",
    "experienceScreens": []
  },
  {
    "code": "DISPOSAL",
    "assetSlug": "disposal",
    "name": "不用品回収",
    "category": "education_life",
    "systemPage": "systems/disposal.html",
    "lpUrl": "lp-disposal.html",
    "flyerHtml": "flyer-disposal.html",
    "flyerPdf": "flyer-disposal.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-disposal-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "7段階の相談受付から現場スタッフ画面までを、一つの流れにつなぐ。",
    "summary": "不用品回収・片付け向けに、7段階の相談受付、写真概算・現地見積り、正式見積り・買取相殺などの業務をまとめる業種特化型システム。",
    "targets": [
      "不用品回収・片付け"
    ],
    "features": [
      "写真付き相談",
      "案件管理",
      "見積り",
      "訪問・作業予定",
      "現場進捗",
      "お客様への報告"
    ],
    "previewAsset": "flyer-disposal.html",
    "experienceScreens": []
  },
  {
    "code": "GYOSEI",
    "assetSlug": "gyosei",
    "name": "行政書士",
    "category": "professional_business",
    "systemPage": "systems/gyosei.html",
    "lpUrl": "lp-gyosei.html",
    "flyerHtml": "flyer-gyosei.html",
    "flyerPdf": "flyer-gyosei.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-gyosei-permit-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "相談分野別受付から安全な書類案内までを、一つの流れにつなぐ。",
    "summary": "行政書士・許認可申請向けに、相談分野別受付、面談予約、顧客マイページなどの業務をまとめる業種特化型システム。",
    "targets": [
      "行政書士・許認可申請"
    ],
    "features": [
      "相談受付",
      "面談・相談対応",
      "案件管理",
      "必要書類管理",
      "申請・補正対応",
      "期限・更新管理"
    ],
    "previewAsset": "flyer-gyosei.html",
    "experienceScreens": []
  },
  {
    "code": "SHIHO",
    "assetSlug": "shiho",
    "name": "司法書士・相続登記",
    "category": "professional_business",
    "systemPage": "systems/shiho.html",
    "lpUrl": "lp-shiho.html",
    "flyerHtml": "flyer-shiho.html",
    "flyerPdf": "flyer-shiho.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-shiho-inheritance-line-liff/owner.html?demo=1",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "相談受付から面談・必要書類・進捗・期限管理までを、一つの流れにつなぐ。",
    "summary": "司法書士向けに、相談を分岐、面談日程を整理、必要書類を安全に案内などの業務をまとめる業種特化型システム。",
    "targets": [
      "司法書士"
    ],
    "features": [
      "相談受付",
      "案件管理",
      "必要書類管理",
      "進捗管理",
      "依頼者対応",
      "LINE連携 顧客マイページ"
    ],
    "previewAsset": "flyer-shiho.html",
    "experienceScreens": []
  },
  {
    "code": "CHOSASHI",
    "assetSlug": "chosashi",
    "name": "土地家屋調査士",
    "category": "professional_business",
    "systemPage": "systems/chosashi.html",
    "lpUrl": "lp-chosashi.html",
    "flyerHtml": "flyer-chosashi.html",
    "flyerPdf": "flyer-chosashi.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-chosashi-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "相談受付から現地調査・書類・案件進捗までを、一つの流れにつなぐ。",
    "summary": "土地家屋調査士向けに、相談内容別受付、依頼者・物件登録、お客様マイページなどの業務をまとめる業種特化型システム。",
    "targets": [
      "土地家屋調査士"
    ],
    "features": [
      "相談の入口を、ひとつに。",
      "人と土地を、案件でつなぐ。",
      "進み具合を、見失わない。",
      "書類も、案件の中へ。",
      "境界情報を、同じ流れで。",
      "現場の情報を、案件へ戻す。"
    ],
    "previewAsset": "flyer-chosashi.html",
    "experienceScreens": []
  },
  {
    "code": "COSMETICS",
    "assetSlug": "cosmetics",
    "name": "化粧品・コスメ販売",
    "category": "beauty_health",
    "systemPage": "systems/cosmetics.html",
    "lpUrl": "lp-cosmetics.html",
    "flyerHtml": "flyer-cosmetics.html",
    "flyerPdf": "flyer-cosmetics.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-cosmetics-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE会員・既存顧客照合から問合せ・再購入・販促管理までを、一つの流れにつなぐ。",
    "summary": "化粧品店向けに、LINE会員・既存顧客照合、美容相談予約、商品取り置き・再購入などの業務をまとめる業種特化型システム。",
    "targets": [
      "化粧品店"
    ],
    "features": [
      "美容相談",
      "商品取り置き",
      "購入履歴",
      "再購入支援",
      "顧客カルテ",
      "店舗運用"
    ],
    "previewAsset": "flyer-cosmetics.html",
    "experienceScreens": []
  },
  {
    "code": "FLOWER",
    "assetSlug": "flower",
    "name": "花屋・フラワーショップ",
    "category": "food_retail",
    "systemPage": "systems/flower-shop.html",
    "lpUrl": "lp-flower.html",
    "flyerHtml": "flyer-flower.html",
    "flyerPdf": "flyer-flower.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-flower-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真付き商品カタログから配達ボード・配達履歴までを、一つの流れにつなぐ。",
    "summary": "フラワーショップ向けに、写真付き商品カタログ、カタログ注文・オーダーメイド、電話・店頭・LINE注文の統合などの業務をまとめる業種特化型システム。",
    "targets": [
      "フラワーショップ"
    ],
    "features": [
      "写真付き商品カタログ",
      "相談注文",
      "LINE・電話・店頭注文",
      "制作管理",
      "店頭受取管理",
      "配達管理"
    ],
    "previewAsset": "flyer-flower.html",
    "experienceScreens": []
  },
  {
    "code": "HOMENURSING",
    "assetSlug": "homenursing",
    "name": "訪問看護",
    "category": "education_life",
    "systemPage": "systems/home-nursing.html",
    "lpUrl": "lp-homenursing.html",
    "flyerHtml": "flyer-homenursing.html",
    "flyerPdf": "flyer-homenursing.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-home-nursing-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "新規相談・LINE連携から家族連絡・承認までを、一つの流れにつなぐ。",
    "summary": "訪問看護ステーション向けに、新規相談・LINE連携、本人・家族ページ、管理者PCなどの業務をまとめる業種特化型システム。",
    "targets": [
      "訪問看護ステーション"
    ],
    "features": [
      "新規相談",
      "本人・家族LINE連携",
      "訪問予定",
      "スタッフ配置",
      "訪問開始・終了",
      "家族報告承認"
    ],
    "previewAsset": "flyer-homenursing.html",
    "experienceScreens": []
  },
  {
    "code": "CAREPLAN",
    "assetSlug": "careplan",
    "name": "居宅介護支援・ケアマネ",
    "category": "education_life",
    "systemPage": "systems/careplan.html",
    "lpUrl": "lp-careplan.html",
    "flyerHtml": "flyer-careplan.html",
    "flyerPdf": "flyer-careplan.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-careplan-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "新規相談・利用者台帳からケアプラン・モニタリング・期限管理までを、一つの流れにつなぐ。",
    "summary": "居宅介護支援・ケアマネ向けに、新規相談・利用者台帳、認定・ケアプラン期限、モニタリング・担当者会議などの業務をまとめる業種特化型システム。",
    "targets": [
      "居宅介護支援・ケアマネ"
    ],
    "features": [
      "介護相談",
      "利用者情報",
      "予定管理",
      "記録管理",
      "期限確認",
      "本人・家族連携"
    ],
    "previewAsset": "flyer-careplan.html",
    "experienceScreens": []
  },
  {
    "code": "WELFARE",
    "assetSlug": "welfare",
    "name": "福祉用具レンタル・販売",
    "category": "education_life",
    "systemPage": "systems/welfare-equipment.html",
    "lpUrl": "lp-welfare.html",
    "flyerHtml": "flyer-welfare.html",
    "flyerPdf": "flyer-welfare.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-welfare-equipment-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "相談・利用者管理から契約・配送・モニタリング・請求までを、一つの流れにつなぐ。",
    "summary": "福祉用具貸与・販売向けに、相談・紹介・利用者管理、商品・在庫・用具個体、アセスメント・選定・計画などの業務をまとめる業種特化型システム。",
    "targets": [
      "福祉用具貸与・販売"
    ],
    "features": [
      "LINE相談受付",
      "利用者管理",
      "アセスメント・計画",
      "契約・配送",
      "モニタリング・保守",
      "請求管理"
    ],
    "previewAsset": "flyer-welfare.html",
    "experienceScreens": []
  },
  {
    "code": "YAKINIKU",
    "assetSlug": "yakiniku",
    "name": "焼肉店",
    "category": "food_retail",
    "systemPage": "systems/yakiniku.html",
    "lpUrl": "lp-yakiniku.html",
    "flyerHtml": "flyer-yakiniku.html",
    "flyerPdf": "flyer-yakiniku.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-yakiniku-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "日時予約・順番受付から着席・会計・卓回転までを、一つの流れにつなぐ。",
    "summary": "焼肉店向けに、日時予約・予約変更、当日順番受付・呼び出し、電話・店頭・既存顧客受付などの業務をまとめる業種特化型システム。",
    "targets": [
      "焼肉店"
    ],
    "features": [
      "日時予約",
      "当日順番受付",
      "呼び出し・到着",
      "着席管理",
      "会計・退店",
      "清掃・卓回転"
    ],
    "previewAsset": "flyer-yakiniku.html",
    "experienceScreens": []
  },
  {
    "code": "HOUKAGO",
    "assetSlug": "houkago",
    "name": "放課後等デイサービス",
    "category": "education_life",
    "systemPage": "systems/houkago-dayservice.html",
    "lpUrl": "lp-houkago.html",
    "flyerHtml": "flyer-houkago.html",
    "flyerPdf": "flyer-houkago.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-houkago-dayservice-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "保護者LINE連絡から支援プログラム公開までを、一つの流れにつなぐ。",
    "summary": "放課後等デイサービス向けに、保護者LINE連絡、保護者マイページ、施設管理者PCなどの業務をまとめる業種特化型システム。",
    "targets": [
      "放課後等デイサービス"
    ],
    "features": [
      "保護者LINE連絡",
      "利用予定",
      "送迎管理",
      "日常確認",
      "5領域付き活動記録",
      "支援計画期限"
    ],
    "previewAsset": "flyer-houkago.html",
    "experienceScreens": []
  },
  {
    "code": "GAKUDO",
    "assetSlug": "gakudo",
    "name": "学童保育・放課後児童クラブ",
    "category": "education_life",
    "systemPage": "systems/gakudo.html",
    "lpUrl": "lp-gakudo.html",
    "flyerHtml": "flyer-gakudo.html",
    "flyerPdf": "flyer-gakudo.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-gakudo-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "欠席・利用・お迎え連絡から安全警告までを、一つの流れにつなぐ。",
    "summary": "学童保育・放課後児童クラブ向けに、欠席・利用・お迎え連絡、入退室・安全確認、児童・保護者台帳などの業務をまとめる業種特化型システム。",
    "targets": [
      "学童保育・放課後児童クラブ"
    ],
    "features": [
      "欠席・利用変更",
      "お迎え変更",
      "入退室管理",
      "代理お迎え・一人帰り確認",
      "長期休暇申請",
      "日別定員・待機管理"
    ],
    "previewAsset": "flyer-gakudo.html",
    "experienceScreens": [],
    "foundationNote": "正式製品ページは5件の機能カード＋空の6枠。5件目の表記「通知・安全警告」を2項目に分割してfeatures[6]へ正規化。CENTRAL確認対象。"
  },
  {
    "code": "PETSALON",
    "assetSlug": "pet-salon",
    "name": "ペットサロン",
    "category": "medical_pet",
    "systemPage": "systems/pet-salon.html",
    "lpUrl": "lp-pet-salon.html",
    "flyerHtml": "flyer-pet-salon.html",
    "flyerPdf": "flyer-pet-salon.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-pet-salon-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE予約からiPad画面までを、一つの流れにつなぐ。",
    "summary": "ペットサロン向けに、LINE予約、ペット情報管理、写真登録などの業務をまとめる業種特化型システム。",
    "targets": [
      "ペットサロン"
    ],
    "features": [
      "WEB / LINE予約・空き枠管理",
      "多頭予約・変更 / キャンセル",
      "写真付きペット会員証",
      "次回来店につながる案内",
      "電話・店頭予約も、まとめて管理",
      "ペットホテル申込・管理"
    ],
    "previewAsset": "flyer-pet-salon.html",
    "experienceScreens": []
  },
  {
    "code": "BTYPE",
    "assetSlug": "btype",
    "name": "就労継続支援B型",
    "category": "education_life",
    "systemPage": "systems/btype.html",
    "lpUrl": "lp-btype.html",
    "flyerHtml": "flyer-btype.html",
    "flyerPdf": "flyer-btype.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-btype-line-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "利用相談・見学・体験から出欠・支援記録・個別支援計画までを、一つの流れにつなぐ。",
    "summary": "就労継続支援B型向けに、利用相談・見学・体験、利用者・家族ポータル、受付・出欠・送迎iPadなどの業務をまとめる業種特化型システム。",
    "targets": [
      "就労継続支援B型"
    ],
    "features": [
      "利用相談・見学・体験",
      "利用者・家族ポータル",
      "出欠・送迎",
      "作業・支援記録",
      "工賃管理",
      "個別支援計画"
    ],
    "previewAsset": "flyer-btype.html",
    "experienceScreens": []
  },
  {
    "code": "KSH",
    "assetSlug": "car-service",
    "name": "車検・整備工場",
    "category": "education_life",
    "systemPage": "systems/car-service.html",
    "lpUrl": "lp-car-service.html",
    "flyerHtml": "flyer-car-service.html",
    "flyerPdf": "flyer-car-service.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/line-shaken-liff/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE・電話・店頭受付から整備進捗・履歴・次回フォローまでを、一つの流れにつなぐ。",
    "summary": "車検・整備工場向けに、受付経路を統合、車両単位の入庫管理、整備進捗タイムラインなどの業務をまとめる業種特化型システム。",
    "targets": [
      "車検・整備工場"
    ],
    "features": [
      "LINE・電話・店頭受付",
      "車両別入庫管理",
      "整備進捗",
      "見積確認・承認",
      "車両別整備履歴",
      "次回車検・オイル交換フォロー"
    ],
    "previewAsset": "flyer-car-service.html",
    "experienceScreens": []
  },
  {
    "code": "GREEN",
    "assetSlug": "green-rental",
    "name": "観葉植物レンタル・グリーンレンタル",
    "category": "education_life",
    "systemPage": "systems/green-rental.html",
    "lpUrl": "lp-green-rental.html",
    "flyerHtml": "flyer-green-rental.html",
    "flyerPdf": "flyer-green-rental.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-green-rental-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "写真相談・現地確認から交換・回収・養生までを、一つの流れにつなぐ。",
    "summary": "グリーンレンタル向けに、写真相談・現地確認、顧客・拠点・設置場所、植物・鉢・現在地などの業務をまとめる業種特化型システム。",
    "targets": [
      "グリーンレンタル"
    ],
    "features": [
      "写真相談・現地確認",
      "顧客・拠点・設置場所",
      "植物・鉢・現在地",
      "定期巡回・担当・順番",
      "作業・状態・写真報告",
      "交換・回収・養生"
    ],
    "previewAsset": "flyer-green-rental.html",
    "experienceScreens": []
  },
  {
    "code": "HOMECARE",
    "assetSlug": "homecare",
    "name": "訪問介護",
    "category": "education_life",
    "systemPage": "systems/homecare.html",
    "lpUrl": "lp-homecare.html",
    "flyerHtml": "flyer-homecare.html",
    "flyerPdf": "flyer-homecare.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-homecare-family-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "本人・家族LINE連携から訪問予定・スタッフ記録・家族報告までを、一つの流れにつなぐ。",
    "summary": "訪問介護・家族連絡向けに、本人・家族LINE連携、訪問予定・定期予定、スタッフ訪問記録などの業務をまとめる業種特化型システム。",
    "targets": [
      "訪問介護・家族連絡"
    ],
    "features": [
      "訪問予定管理",
      "スタッフ訪問記録",
      "本人・家族ポータル",
      "家族報告",
      "申し送り",
      "事故・問い合わせ管理"
    ],
    "previewAsset": "flyer-homecare.html",
    "experienceScreens": []
  },
  {
    "code": "IZAKAYA",
    "assetSlug": "izakaya",
    "name": "居酒屋",
    "category": "food_retail",
    "systemPage": "systems/izakaya.html",
    "lpUrl": "lp-izakaya.html",
    "flyerHtml": "flyer-izakaya.html",
    "flyerPdf": "flyer-izakaya.pdf",
    "demoUrl": "https://izakaya-liff-demo.pages.dev/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "LINE仮予約から営業日設定までを、一つの流れにつなぐ。",
    "summary": "居酒屋向けに、LINE仮予約、変更・キャンセル、予約確定管理などの業務をまとめる業種特化型システム。",
    "targets": [
      "居酒屋"
    ],
    "features": [
      "LINE仮予約",
      "変更・キャンセル",
      "人数・席希望・要望",
      "日別予約一覧・人数集計",
      "店舗営業状況",
      "予約状態・リマインド"
    ],
    "previewAsset": "flyer-izakaya.html",
    "experienceScreens": []
  },
  {
    "code": "CONSULT",
    "assetSlug": "sharoushi",
    "name": "社労士・顧問先対応",
    "category": "professional_business",
    "systemPage": "systems/sharoushi.html",
    "lpUrl": "lp-sharoushi.html",
    "flyerHtml": "flyer-sharoushi.html",
    "flyerPdf": "flyer-sharoushi.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-consult-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "相談受付から顧問先対応・手続進捗・期限管理までを、一つの流れにつなぐ。",
    "summary": "社会保険労務士向けに、相談を分岐、面談日程を整理、必要書類を安全に案内などの業務をまとめる業種特化型システム。",
    "targets": [
      "社会保険労務士"
    ],
    "features": [
      "労務相談受付",
      "手続き依頼",
      "面談予約",
      "顧問先マイページ",
      "期限・必要書類管理",
      "担当者ワーク"
    ],
    "previewAsset": "flyer-sharoushi.html",
    "experienceScreens": []
  },
  {
    "code": "SODAN",
    "assetSlug": "sodan",
    "name": "相談支援事業所",
    "category": "education_life",
    "systemPage": "systems/sodan.html",
    "lpUrl": "lp-sodan.html",
    "flyerHtml": "flyer-sodan.html",
    "flyerPdf": "flyer-sodan.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-sodan-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "初回相談・面談から計画・モニタリング・書類管理までを、一つの流れにつなぐ。",
    "summary": "相談支援事業所向けに、初回相談・面談希望、本人・家族ポータル、事業所PC管理などの業務をまとめる業種特化型システム。",
    "targets": [
      "相談支援事業所"
    ],
    "features": [
      "初回相談・面談希望",
      "本人・家族ポータル",
      "利用者・案件管理",
      "アセスメント管理",
      "計画・提出管理",
      "モニタリング・書類管理"
    ],
    "previewAsset": "flyer-sodan.html",
    "experienceScreens": []
  },
  {
    "code": "SHUTTLE",
    "assetSlug": "welfare-shuttle",
    "name": "福祉施設送迎",
    "category": "education_life",
    "systemPage": "systems/welfare-shuttle.html",
    "lpUrl": "lp-welfare-shuttle.html",
    "flyerHtml": "flyer-welfare-shuttle.html",
    "flyerPdf": "flyer-welfare-shuttle.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-welfare-shuttle-line/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "利用開始ポータルから変更依頼・履歴管理までを、一つの流れにつなぐ。",
    "summary": "福祉送迎向けに、利用開始ポータル、管理・配車PC、iPad管理画面などの業務をまとめる業種特化型システム。",
    "targets": [
      "福祉送迎"
    ],
    "features": [
      "利用者・家族情報",
      "定期送迎予定",
      "当日運行生成",
      "車両・スタッフ管理",
      "変更依頼・承認",
      "運行イベント・履歴"
    ],
    "previewAsset": "flyer-welfare-shuttle.html",
    "experienceScreens": []
  },
  {
    "code": "SALESNAVI",
    "assetSlug": "salesnavi",
    "name": "営業支援・外回り営業",
    "category": "professional_business",
    "systemPage": "systems/salesnavi.html",
    "lpUrl": "lp-salesnavi.html",
    "flyerHtml": "flyer-salesnavi.html",
    "flyerPdf": "flyer-salesnavi.pdf",
    "demoUrl": "https://dpro-salesnavi-demo.pages.dev/demo-guide.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "営業先の検索から訪問ルート・営業結果・再訪管理までを、一つの流れにつなぐ。",
    "summary": "営業ナビ・訪問営業管理向けに、営業先検索、今日の営業先への追加、地図・ナビ連携、訪問結果・再訪管理などの業務をまとめる営業支援システム。",
    "targets": [
      "営業ナビ・訪問営業管理"
    ],
    "features": [
      "Google営業先検索",
      "今日の営業先",
      "おすすめルート",
      "営業結果・履歴",
      "次回予定・再訪管理",
      "複数スタッフ共有"
    ],
    "previewAsset": "flyer-salesnavi.html",
    "experienceScreens": []
  },
  {
    "code": "VISIT_AHAKI",
    "assetSlug": "visit-ahaki",
    "name": "訪問マッサージ・鍼灸",
    "category": "medical_pet",
    "systemPage": "systems/visit-ahaki.html",
    "lpUrl": "systems/visit-ahaki.html",
    "flyerHtml": "systems/visit-ahaki.html#documents",
    "flyerPdf": "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/DPRO_VISIT_AHAKI_A4_FLYER_V1.0_20260902.pdf",
    "demoUrl": "https://dpromstk2000-lab.github.io/dpro-visit-ahaki/demo.html",
    "status": "AVAILABLE",
    "verificationStatus": "VERIFIED",
    "tagline": "毎日の訪問予定・患者・施術者・施術記録・家族連絡を、一つの流れで回す。",
    "summary": "訪問マッサージ・訪問鍼灸向けに、新規問い合わせ、患者情報、訪問予定、施術者割当、継続予約、施術記録、家族連絡、変更・キャンセル、担当引継ぎを役割別権限でまとめるDPROシステム。",
    "targets": [
      "訪問マッサージ事業所",
      "訪問鍼灸事業所",
      "在宅施術事業者"
    ],
    "features": [
      "問い合わせ・患者情報",
      "訪問予定・継続予約",
      "施術者割当・訪問ルート",
      "施術記録・担当引継ぎ",
      "家族連絡・変更受付",
      "権限分離・監査・Demo/Production Guard"
    ],
    "previewAsset": "systems/visit-ahaki.html",
    "experienceScreens": []
  }  ,{
  "code": "LANDSCAPE_EXTERIOR",
  "assetSlug": "landscape-exterior",
  "name": "造園・外構",
  "category": "home_building",
  "systemPage": "systems/landscape-exterior.html",
  "lpUrl": "https://dpromstk2000-lab.github.io/dpro-landscape-exterior-standard/lp.html",
  "flyerHtml": "systems/landscape-exterior.html#documents",
  "flyerPdf": "https://dpromstk2000-lab.github.io/dpro-landscape-exterior-standard/DPRO_LANDSCAPE_EXTERIOR_A4_FLYER_V1.0_20260902.pdf",
  "demoUrl": "https://dpromstk2000-lab.github.io/dpro-landscape-exterior-standard/",
  "status": "AVAILABLE",
  "verificationStatus": "VERIFIED",
  "tagline": "写真相談から現調・見積・施工・Before→After完了承認・季節アフターまでを、一つの現場カルテでつなぐ。",
  "summary": "造園・外構向けに、写真相談、現地調査、見積、施工予定、担当者、作業前後写真、進捗、完了承認、季節フォローまでを案件単位でまとめるDPROシステム。",
  "targets": ["造園会社","外構・エクステリア事業者","庭・植栽メンテナンス事業者"],
  "features": ["写真相談・現地調査","見積・案件管理","施工予定・担当者管理","Before→After写真","完了承認","季節フォロー・再依頼"],
  "previewAsset": "systems/landscape-exterior.html",
  "experienceScreens": []
},
{
  "code": "DPRO_PEST_ENV",
  "assetSlug": "pest-env",
  "name": "ペストコントロール／環境衛生サービス",
  "category": "education_life",
  "systemPage": "systems/pest-env.html",
  "lpUrl": "https://dpromstk2000-lab.github.io/dpro-pest-env-line/lp.html",
  "flyerHtml": "systems/pest-env.html#documents",
  "flyerPdf": "https://dpromstk2000-lab.github.io/dpro-pest-env-line/DPRO_PEST_ENV_A4_FLYER_FINAL_V1.1_G8.pdf",
  "demoUrl": "https://dpromstk2000-lab.github.io/dpro-pest-env-line/demo-prepare.html?demo=1",
  "status": "AVAILABLE",
  "verificationStatus": "VERIFIED",
  "tagline": "最初の相談写真から、調査・施工・報告・次回点検までをEvidence Chainで一つにつなぐ。",
  "summary": "害虫・害獣の単発相談から飲食店・施設・管理物件の定期防除まで、受付、写真、現地調査、施工、安全確認、報告、再訪・次回点検を一つの現場カルテで管理するDPROシステム。",
  "targets": ["ペストコントロール事業者","害虫・害獣駆除事業者","環境衛生・定期防除事業者"],
  "features": ["WEB・LINE相談受付","写真・PDF Evidence","現地調査・施工記録","Field Map・Trap PIN","薬剤・安全確認","報告・再訪・定期点検"],
  "previewAsset": "systems/pest-env.html",
  "experienceScreens": []
}

]);
  const byCode = new Map(systems.map(item => [String(item.code || "").toUpperCase(), item]));

  global.DPROSystemsData = Object.freeze({
    categories,
    systems,
    systemCount: systems.length,
    getByCode(code) {
      return byCode.get(String(code == null ? "" : code).trim().toUpperCase()) || null;
    },
    getByCategory(category) {
      const key = String(category || "").trim();
      return systems.filter(item => item.category === key);
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
