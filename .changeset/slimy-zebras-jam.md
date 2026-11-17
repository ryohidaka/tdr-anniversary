---
"tdr-anniversary": patch
---

可読性と保守性のためのリファクタリング。

- Google Tag Manager の初期化を修正し、`GoogleAnalytics` を `GoogleTagManager` に改名
- 和暦の変換をビルド環境のタイムゾーンに依存しないように修正
- 表示用ヘルパー(`formatAnniversary` / `isProjected` / `PARK_LABELS`)を切り出し、テストを追加
- `BaseLayout` と `config.ts` を切り出し、直近のアニバーサリーの文言をページごとに1回の計算に変更
- `MILESTONE_INTERVAL` / `YEARS_AHEAD` を `config.ts` に集約し、`buildSchedule` を小さな関数に分割
