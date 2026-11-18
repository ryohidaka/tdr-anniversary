# tdr-anniversary

## 0.1.2

### Patch Changes

- [`94574ce`](https://github.com/ryohidaka/tdr-anniversary/commit/94574cec251b07e17cecbeb13b5229cedf5f8091) Thanks [@ryohidaka](https://github.com/ryohidaka)! - 可読性と保守性のためのリファクタリング。
  
  - Google Tag Manager の初期化を修正し、`GoogleAnalytics` を `GoogleTagManager` に改名
  - 和暦の変換をビルド環境のタイムゾーンに依存しないように修正
  - 表示用ヘルパー(`formatAnniversary` / `isProjected` / `PARK_LABELS`)を切り出し、テストを追加
  - `BaseLayout` と `config.ts` を切り出し、直近のアニバーサリーの文言をページごとに1回の計算に変更
  - `MILESTONE_INTERVAL` / `YEARS_AHEAD` を `config.ts` に集約し、`buildSchedule` を小さな関数に分割

## 0.1.1

### Patch Changes

- [`deee61d`](https://github.com/ryohidaka/tdr-anniversary/commit/deee61d2ac9fadef686fcf089174b11b8b2dd83a) Thanks [@ryohidaka](https://github.com/ryohidaka)! - upgrade vite-plus

## 0.1.0

### Minor Changes

- [`7a4f883`](https://github.com/ryohidaka/tdr-anniversary/commit/7a4f88314b66cfcbfa0b410da95855093147545d) Thanks [@ryohidaka](https://github.com/ryohidaka)! - 初版リリース
  
  - 東京ディズニーランド・ディズニーシーのアニバーサリー早見表を追加(開園年度と5年ごとの節目、年度は4月始まり)
  - 年度に和暦を併記し、現在の年度の行を強調して表示する
  - 将来の節目に「（予定）」を付ける(開園日からの計算による予測で、公式発表ではない)
  - 直近のアニバーサリーを、表の上のバナーで案内する
  - ランド・シーごとの色分けと、ダークモード(ブラウザの設定に追従)に対応
  - 注意文言、フッター(最終更新日)、メタタグ(OGP・canonical・JSON-LD)、サイトマップを追加
