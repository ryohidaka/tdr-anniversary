import { Temporal } from "@js-temporal/polyfill";

/** ビルド基準日。サイト全体で同じタイムゾーン(日本)を使う */
export const SITE_TIME_ZONE = "Asia/Tokyo";

export function getToday(): Temporal.PlainDate {
  return Temporal.Now.plainDateISO(SITE_TIME_ZONE);
}
