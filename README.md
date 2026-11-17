# 東京ディズニーリゾート アニバーサリー早見表

東京ディズニーランドと東京ディズニーシーの、開園年度と5年ごとの節目の周年を、年度別に一覧できる早見表です。

🔗 https://tdr-anniversary.pages.dev

> [!NOTE]
> 個人が運営する非公式のファンサイトです。ディズニー・エンタプライゼズ・インク、株式会社オリエンタルランドとは一切の関わりはありません。

## 特徴

- 年度(4月始まり)ごとに、ランド・シーの節目の周年を表示
- 年度に和暦を併記し、現在の年度の行を強調
- 現在の年度より先の節目には「（予定）」を表示(開園日からの計算による予測で、公式発表ではありません)
- 直近のアニバーサリーを、表の上のバナーで案内
- ダークモード(ブラウザの設定に追従)に対応

## 仕様

| 項目       | 内容                                         |
| :--------- | :------------------------------------------- |
| 開園日     | ランド: 1983-04-15 / シー: 2001-09-04        |
| 年度       | 4月始まり(例: 2026-03-31 は2025年度)         |
| 節目       | 開園年度(0周年)と、5年ごとの周年             |
| 表示範囲   | 最も早い開園年度から、現在の年度の30年後まで |
| 基準の日付 | ビルド時の日付(`Asia/Tokyo`)                 |

節目がない年度の行は表示しませんが、現在の年度の行は、節目の有無にかかわらず表示します。

節目の間隔(`MILESTONE_INTERVAL`)と表示範囲(`YEARS_AHEAD`)は `src/lib/anniversary/config.ts` で定義しています。

## 技術構成

- [Astro](https://astro.build)(静的ビルド)
- TypeScript / [@js-temporal/polyfill](https://github.com/js-temporal/temporal-polyfill)
- [Vite+](https://viteplus.dev)(`vp check` / `vp test`)
- [Changesets](https://github.com/changesets/changesets)(バージョンとタグの管理)
- [Cloudflare Pages](https://pages.cloudflare.com)(配信)
- [@astrojs/partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/)(Google タグを Web Worker で実行)

## ディレクトリ構成

```text
/
├── .changeset/               # Changesets の設定と、未リリースの変更
├── .github/workflows/        # リリースと定期ビルド
├── public/
└── src/
    ├── components/           # 表示用のコンポーネント(表・バナーなど)
    ├── lib/anniversary/      # 周年の計算(UI に依存しないロジックとテスト)
    ├── pages/                # ページ
    └── styles/               # 共通のスタイル(テーマ)
```

`src/lib/anniversary` は、UI から独立しています。UI は、`@/lib/anniversary` の公開 API(`buildSchedule` / `findUpcoming` など)だけを参照します。

## 開発

### 必要な環境

- Node.js 22.23.4 以上
- pnpm

### コマンド

すべて、プロジェクトのルートで実行します。

| コマンド         | 内容                                 |
| :--------------- | :----------------------------------- |
| `pnpm install`   | 依存関係をインストール               |
| `pnpm dev`       | 開発サーバーを起動(`localhost:4321`) |
| `pnpm build`     | 本番用のサイトを `./dist/` に出力    |
| `pnpm preview`   | ビルド結果をローカルで確認           |
| `pnpm vp check`  | フォーマット・リント・型チェック     |
| `pnpm vp test`   | テストを実行                         |
| `pnpm changeset` | 変更内容(changeset)を追加            |

### 環境変数

`.env` に設定します。ローカルでは未設定で構いません。

| 変数            | 内容                                                                                  |
| :-------------- | :------------------------------------------------------------------------------------ |
| `PUBLIC_GTM_ID` | Google タグの ID(`GTM-` で始まる値)。本番ビルドで、設定されている場合のみ読み込みます |

## デプロイ

Cloudflare Pages の Git 連携で、`main` へのプッシュごとにデプロイします。

| 項目                   | 値                              |
| :--------------------- | :------------------------------ |
| Framework preset       | Astro                           |
| Build command          | `npm run build`                 |
| Build output directory | `dist`                          |
| 環境変数               | `PUBLIC_GTM_ID`、`NODE_VERSION` |

### 定期ビルド

表の内容(現在の年度の行、バナー、最終更新日)は、**ビルド時の日付**で決まります。年度が切り替わる4月などに反映されるよう、GitHub Actions から Cloudflare Pages の Deploy Hook を呼び、毎月再ビルドします。

- ワークフロー: `.github/workflows/rebuild.yml`
- Secret: `CLOUDFLARE_DEPLOY_HOOK_URL`

## リリース

[Changesets](https://github.com/changesets/changesets) で、バージョンと変更履歴(`CHANGELOG.md`)を管理します。npm には公開せず、git タグ(`vX.Y.Z`)と GitHub の Release だけを作ります。

1. 変更をまとめたブランチで、`pnpm changeset` を実行し、変更内容(changeset)を追加する
2. PR を `main` にマージする
3. `chore(release): version packages` の PR が自動で作られるので、内容を確認してマージする
4. GitHub Actions が、タグと Release を作る

バージョンの更新とタグの作成は、GitHub Actions(`.github/workflows/release.yml`)が行います。手元では実行しません。

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org) に従います。

```text
feat(anniversary): add upcoming banner
```
