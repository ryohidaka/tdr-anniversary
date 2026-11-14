import { Temporal } from "@js-temporal/polyfill";
import { toFiscalYear } from "./fiscal-year";
import { OPENING_DATES, PARKS, mapParks, type Park } from "./parks";

export const MILESTONE_INTERVAL = 5;
const YEARS_AHEAD = 30;

/** 周年数(0 = 開園した年度)。節目でない場合は null */
export type Anniversary = number | null;

/** 年度ごとの1行 */
export type YearRow = { year: number } & Record<Park, Anniversary>;

const OPENING_FISCAL_YEARS = mapParks((park) => toFiscalYear(OPENING_DATES[park]));

/** 節目(開園年度、または MILESTONE_INTERVAL 年ごと)なら周年数を返す */
function getAnniversary(year: number, openingYear: number): Anniversary {
  const n = year - openingYear;
  return n >= 0 && n % MILESTONE_INTERVAL === 0 ? n : null;
}

/**
 * 最も早い開園年度から、`today` の YEARS_AHEAD 年度先までの
 * アニバーサリー早見表を生成する。
 * どのパークにも節目がない年度は含めないが、`today` の年度の行は必ず含める。
 */
export function buildSchedule(today: Temporal.PlainDate = Temporal.Now.plainDateISO()): YearRow[] {
  const currentYear = toFiscalYear(today);
  const firstYear = Math.min(...Object.values(OPENING_FISCAL_YEARS));
  const lastYear = currentYear + YEARS_AHEAD;

  return Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i)
    .map((year) => ({
      year,
      ...mapParks((park) => getAnniversary(year, OPENING_FISCAL_YEARS[park])),
    }))
    .filter((row) => row.year === currentYear || PARKS.some((park) => row[park] !== null));
}
