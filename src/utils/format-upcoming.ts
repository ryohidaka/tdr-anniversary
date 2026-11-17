import type { UpcomingAnniversary } from "@/lib/anniversary";
import { PARK_LABELS } from "./park-labels";

/**
 * 直近のアニバーサリーを文にする。
 * 今年度なら「今年は〜」、それ以降なら「n年後に〜」。
 * 同じ年度に複数のパークが節目なら「と」でつなぐ。
 */
export function formatUpcoming({ yearsUntil, items }: UpcomingAnniversary): string {
  const anniversaries = items.map(({ park, n }) => `${PARK_LABELS[park]}${n}周年`).join("と");
  return yearsUntil === 0 ? `今年は${anniversaries}` : `${yearsUntil}年後に${anniversaries}`;
}
