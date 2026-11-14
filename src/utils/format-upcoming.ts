import type { Park, UpcomingAnniversary } from "@/lib/anniversary";

/** パーク名の表示ラベル。Park を足すと型エラーで漏れに気づける */
const PARK_LABELS = {
  land: "ディズニーランド",
  sea: "ディズニーシー",
} satisfies Record<Park, string>;

/**
 * 直近のアニバーサリーを文にする。
 * 今年度なら「今年は〜」、それ以降なら「n年後に〜」。
 * 同じ年度に複数のパークが節目なら「と」でつなぐ。
 */
export function formatUpcoming({ yearsUntil, items }: UpcomingAnniversary): string {
  const anniversaries = items.map(({ park, n }) => `${PARK_LABELS[park]}${n}周年`).join("と");
  return yearsUntil === 0 ? `今年は${anniversaries}` : `${yearsUntil}年後に${anniversaries}`;
}
