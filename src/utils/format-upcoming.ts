import type { Dictionary } from "@/i18n";
import type { UpcomingAnniversary } from "@/lib/anniversary";

/**
 * 直近のアニバーサリーを文にする。
 * 文型・連結の仕方は言語ごとの辞書に委ねる。
 */
export function formatUpcoming({ yearsUntil, items }: UpcomingAnniversary, t: Dictionary): string {
  const anniversaries = t.upcoming.join(
    items.map(({ park, n }) => t.upcoming.item(t.parks[park], t.table.anniversary(n))),
  );
  return yearsUntil === 0
    ? t.upcoming.thisYear(anniversaries)
    : t.upcoming.yearsLater(yearsUntil, anniversaries);
}
