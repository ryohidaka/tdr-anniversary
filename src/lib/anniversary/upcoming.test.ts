import { describe, expect, it } from "vite-plus/test";
import type { YearRow } from "./schedule";
import { findUpcoming } from "./upcoming";

const rows: YearRow[] = [
  { year: 2023, land: 40, sea: null },
  { year: 2026, land: null, sea: 25 },
  { year: 2027, land: null, sea: null },
  { year: 2028, land: 45, sea: null },
  { year: 2031, land: null, sea: 30 },
];

describe("findUpcoming", () => {
  it("今年度に節目があれば yearsUntil = 0 で返す", () => {
    expect(findUpcoming(rows, 2026)).toEqual({
      year: 2026,
      yearsUntil: 0,
      items: [{ park: "sea", n: 25 }],
    });
  });

  it("今年度に節目がなければ、次の節目の年度を返す", () => {
    expect(findUpcoming(rows, 2027)).toEqual({
      year: 2028,
      yearsUntil: 1,
      items: [{ park: "land", n: 45 }],
    });
  });

  it("過去の年度は無視する", () => {
    expect(findUpcoming(rows, 2024)).toMatchObject({ year: 2026, yearsUntil: 2 });
  });

  it("同じ年度に複数のパークが節目なら、すべて返す(パークの定義順)", () => {
    const both: YearRow[] = [{ year: 2030, land: 50, sea: 30 }];
    expect(findUpcoming(both, 2030).items).toEqual([
      { park: "land", n: 50 },
      { park: "sea", n: 30 },
    ]);
  });

  it("今年度以降に節目がなければエラーにする", () => {
    expect(() => findUpcoming(rows, 2032)).toThrow();
  });
});
