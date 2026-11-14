import { PARKS, type Park } from "./parks";
import type { YearRow } from "./schedule";

export interface UpcomingAnniversary {
  /** アニバーサリーを迎える年度 */
  year: number;
  /** 現在の年度からの年数(0 = 今年度) */
  yearsUntil: number;
  /** その年度に節目を迎えるパークと周年数 */
  items: { park: Park; n: number }[];
}

/** 行のうち、節目があるパークだけを取り出す */
function toItems(row: YearRow): UpcomingAnniversary["items"] {
  return PARKS.flatMap((park) => {
    const n = row[park];
    return n === null ? [] : [{ park, n }];
  });
}

/**
 * `currentYear` 以降で最も近いアニバーサリーを返す(今年度を含む)。
 * `rows` は年度の昇順を前提とする(buildSchedule の戻り値)。
 * buildSchedule の範囲には必ず節目が含まれるため、該当がない場合は
 * 想定外の入力としてエラーにする。
 */
export function findUpcoming(rows: YearRow[], currentYear: number): UpcomingAnniversary {
  const upcoming = rows
    .filter((row) => row.year >= currentYear)
    .map((row) => ({
      year: row.year,
      yearsUntil: row.year - currentYear,
      items: toItems(row),
    }))
    .find(({ items }) => items.length > 0);

  if (!upcoming) {
    throw new Error(`No anniversary found on or after fiscal year ${currentYear}`);
  }
  return upcoming;
}
