import { describe, expect, it } from "vite-plus/test";
import { formatUpcoming } from "./format-upcoming";

describe("formatUpcoming", () => {
  it("今年度なら「今年は〜」と表示する", () => {
    expect(formatUpcoming({ year: 2026, yearsUntil: 0, items: [{ park: "sea", n: 25 }] })).toBe(
      "今年はディズニーシー25周年",
    );
  });

  it("来年度以降なら「n年後に〜」と表示する", () => {
    expect(formatUpcoming({ year: 2028, yearsUntil: 2, items: [{ park: "land", n: 45 }] })).toBe(
      "2年後にディズニーランド45周年",
    );
  });

  it("同じ年度に複数のパークが節目なら「と」でつなぐ", () => {
    expect(
      formatUpcoming({
        year: 2030,
        yearsUntil: 0,
        items: [
          { park: "land", n: 50 },
          { park: "sea", n: 30 },
        ],
      }),
    ).toBe("今年はディズニーランド50周年とディズニーシー30周年");
  });
});
