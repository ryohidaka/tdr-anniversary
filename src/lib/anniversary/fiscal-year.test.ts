import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vite-plus/test";
import { fiscalYearStart, toFiscalYear } from "./fiscal-year";

const fiscalYearOf = (date: string) => toFiscalYear(Temporal.PlainDate.from(date));

describe("toFiscalYear", () => {
  it("1月〜3月は前年度として扱う", () => {
    expect(fiscalYearOf("2026-01-01")).toBe(2025);
    expect(fiscalYearOf("2026-03-31")).toBe(2025);
  });

  it("4月〜12月は同じ年の年度として扱う", () => {
    expect(fiscalYearOf("2026-04-01")).toBe(2026);
    expect(fiscalYearOf("2026-12-31")).toBe(2026);
  });
});

describe("fiscalYearStart", () => {
  it("年度の初日(4月1日)を返す", () => {
    expect(fiscalYearStart(2026).toString()).toBe("2026-04-01");
  });
});
