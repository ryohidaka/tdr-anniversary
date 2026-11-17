import { Temporal } from "@js-temporal/polyfill";
import { MILESTONE_INTERVAL, YEARS_AHEAD } from "./config";
import { toFiscalYear } from "./fiscal-year";
import { OPENING_DATES, PARKS, mapParks, type Park } from "./parks";

/** 周年数(0 = 開園した年度)。節目でない(または開園前の)場合は null */
export type Anniversary = number | null;

/** 年度ごとの1行。パークごとの値が null なら、その年度は節目ではない */
export type YearRow = { year: number } & Record<Park, Anniversary>;

const OPENING_FISCAL_YEARS = mapParks((park) => toFiscalYear(OPENING_DATES[park]));

/** 節目(開園年度、または MILESTONE_INTERVAL 年ごと)なら周年数を返す */
function getAnniversary(year: number, openingYear: number): Anniversary {
  const n = year - openingYear;
  return n >= 0 && n % MILESTONE_INTERVAL === 0 ? n : null;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function toYearRow(year: number): YearRow {
  return {
    year,
    ...mapParks((park) => getAnniversary(year, OPENING_FISCAL_YEARS[park])),
  };
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

  const isShown = (row: YearRow) =>
    row.year === currentYear || PARKS.some((park) => row[park] !== null);

  return range(firstYear, lastYear).map(toYearRow).filter(isShown);
}

/** 現在の年度より先の年度は、開園日からの計算による予測(公式発表ではない) */
export function isProjected(year: number, currentYear: number): boolean {
  return year > currentYear;
}
