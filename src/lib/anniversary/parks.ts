import { Temporal } from "@js-temporal/polyfill";

/** 各パークの実際の開園日 */
export const OPENING_DATES = {
  land: Temporal.PlainDate.from("1983-04-15"),
  sea: Temporal.PlainDate.from("2001-09-04"),
} as const satisfies Record<string, Temporal.PlainDate>;

export type Park = keyof typeof OPENING_DATES;

export const PARKS = Object.keys(OPENING_DATES) as Park[];

/**
 * 各パークに対して `fn` を呼び、Record<Park, T> を組み立てる。
 * Object.fromEntries は Record<string, T> を返すため、型は `as` で絞っている。
 */
export function mapParks<T>(fn: (park: Park) => T): Record<Park, T> {
  return Object.fromEntries(PARKS.map((park) => [park, fn(park)])) as Record<Park, T>;
}
