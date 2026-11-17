import { fiscalYearStart } from "@/lib/anniversary";

const eraFormatter = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
  era: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** 年度(4月始まり)の初日を基準に和暦へ変換する。例: 2026 → 令和8年 */
export function formatEra(fiscalYear: number): string {
  const { year, month, day } = fiscalYearStart(fiscalYear);
  return eraFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}
