import type { Temporal } from "@js-temporal/polyfill";

const FISCAL_YEAR_START_MONTH = 4;

/** 日付を年度(4月始まり)に変換する。例: 2026-03-31 → 2025 */
export function toFiscalYear({ year, month }: Temporal.PlainDate): number {
  return month < FISCAL_YEAR_START_MONTH ? year - 1 : year;
}
