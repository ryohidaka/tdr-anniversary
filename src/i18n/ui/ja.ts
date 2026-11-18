import type { Dictionary } from "./types";

export const ja: Dictionary = {
  showEra: true,
  site: {
    title: "東京ディズニーリゾート アニバーサリー早見表",
    description: (upcoming) =>
      `東京ディズニーランドとディズニーシーの開園日およびアニバーサリーの一覧表。${upcoming}。`,
  },
  parks: {
    land: "ディズニーランド",
    sea: "ディズニーシー",
  },
  table: {
    caption: "東京ディズニーランドと東京ディズニーシーの節目の周年(年度別)",
    fiscalYear: "年度",
    open: "オープン",
    none: "-",
    projected: "（予定）",
    anniversary: (n) => `${n}周年`,
  },
  upcoming: {
    thisYear: (anniversaries) => `今年は${anniversaries}`,
    yearsLater: (years, anniversaries) => `${years}年後に${anniversaries}`,
    item: (park, anniversary) => `${park}${anniversary}`,
    join: (items) => items.join("と"),
  },
  notes: {
    label: "注意事項",
    projected:
      "※「予定」と記載されている内容は計算上の予測日であり、公式に発表された確定情報ではありません。",
    unofficial:
      "当サイトは個人が運営する非公式のファンサイトです。ディズニー・エンタプライゼズ・インク、株式会社オリエンタルランドとは一切の関わりはありません。",
  },
  footer: {
    updated: "最終更新日",
  },
  languageSwitcher: "言語",
};
