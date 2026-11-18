import type { Dictionary } from "@/i18n";

/** 周年数を表示文字列にする。0 は開園年度、節目でなければ none */
export function formatAnniversary(n: number | null, t: Dictionary): string {
  if (n === null) return t.table.none;
  return n === 0 ? t.table.open : t.table.anniversary(n);
}
