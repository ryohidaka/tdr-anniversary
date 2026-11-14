import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vite-plus/test";
import { buildSchedule } from "./schedule";

const scheduleAt = (today: string) => buildSchedule(Temporal.PlainDate.from(today));

describe("buildSchedule", () => {
  const rows = scheduleAt("2026-11-14");

  it("最も早い開園年度(0周年)から始まる", () => {
    expect(rows[0]).toEqual({ year: 1983, land: 0, sea: null });
  });

  it("もう一方のパークの開園年度も含む", () => {
    expect(rows.find((r) => r.year === 2001)).toEqual({
      year: 2001,
      land: null,
      sea: 0,
    });
  });

  it("5年ごとの節目を含む", () => {
    expect(rows.find((r) => r.year === 2028)?.land).toBe(45);
    expect(rows.find((r) => r.year === 2026)?.sea).toBe(25);
  });

  it("どのパークにも節目がない年度は含まない(今年度を除く)", () => {
    expect(rows.some((r) => r.year === 1984)).toBe(false);
    expect(
      rows.filter((r) => r.year !== 2026).every((r) => r.land !== null || r.sea !== null),
    ).toBe(true);
  });

  it("今年度に節目があれば、その内容のまま含む", () => {
    expect(rows.find((r) => r.year === 2026)).toEqual({ year: 2026, land: null, sea: 25 });
  });

  it("今年度に節目がなくても、今年度の行を含む", () => {
    // 2027-06-01 は2027年度で、どのパークにも節目がない
    expect(scheduleAt("2027-06-01").find((r) => r.year === 2027)).toEqual({
      year: 2027,
      land: null,
      sea: null,
    });
  });

  it("年度の昇順に並んでいる", () => {
    const years = rows.map((r) => r.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it("今日から30年度先まで含む", () => {
    expect(rows.at(-1)).toEqual({ year: 2056, land: null, sea: 55 });
  });

  it("`today` の年度を基準にする", () => {
    // 2026-03-31 は2025年度 → 範囲は2055年度まで。最後の節目は2053年度
    expect(scheduleAt("2026-03-31").at(-1)?.year).toBe(2053);
    // 2026-04-01 は2026年度 → 範囲は2056年度まで。最後の節目は2056年度
    expect(scheduleAt("2026-04-01").at(-1)?.year).toBe(2056);
  });
});
