import { describe, expect, it } from "vite-plus/test";
import { formatEra } from "./format-era";

describe("formatEra", () => {
  it("年度初日の元号で表示する", () => {
    expect(formatEra(2026)).toBe("令和8年");
    expect(formatEra(1983)).toBe("昭和58年");
  });

  it("元号またぎの年度は4月1日時点の元号を使う", () => {
    expect(formatEra(2019)).toBe("平成31年");
    expect(formatEra(2020)).toBe("令和2年");
  });
});
