import { describe, expect, it } from "vite-plus/test";
import { en } from "@/i18n/ui/en";
import { ja } from "@/i18n/ui/ja";
import type { UpcomingAnniversary } from "@/lib/anniversary";
import { formatUpcoming } from "./format-upcoming";

const both: UpcomingAnniversary = {
  year: 2030,
  yearsUntil: 0,
  items: [
    { park: "land", n: 50 },
    { park: "sea", n: 30 },
  ],
};

describe("formatUpcoming", () => {
  describe("ja", () => {
    it("今年度なら「今年は〜」と表示する", () => {
      expect(
        formatUpcoming({ year: 2026, yearsUntil: 0, items: [{ park: "sea", n: 25 }] }, ja),
      ).toBe("今年はディズニーシー25周年");
    });

    it("来年度以降なら「n年後に〜」と表示する", () => {
      expect(
        formatUpcoming({ year: 2028, yearsUntil: 2, items: [{ park: "land", n: 45 }] }, ja),
      ).toBe("2年後にディズニーランド45周年");
    });

    it("同じ年度に複数のパークが節目なら「と」でつなぐ", () => {
      expect(formatUpcoming(both, ja)).toBe("今年はディズニーランド50周年とディズニーシー30周年");
    });
  });

  describe("en", () => {
    it("今年度", () => {
      expect(
        formatUpcoming({ year: 2026, yearsUntil: 0, items: [{ park: "sea", n: 25 }] }, en),
      ).toBe("This year: Tokyo DisneySea 25th anniversary");
    });

    it("1年後は単数形、2年後以降は複数形", () => {
      const items: UpcomingAnniversary["items"] = [{ park: "land", n: 45 }];
      expect(formatUpcoming({ year: 2027, yearsUntil: 1, items }, en)).toBe(
        "In 1 year: Tokyo Disneyland 45th anniversary",
      );
      expect(formatUpcoming({ year: 2028, yearsUntil: 2, items }, en)).toBe(
        "In 2 years: Tokyo Disneyland 45th anniversary",
      );
    });

    it("複数パークは and でつなぐ", () => {
      expect(formatUpcoming(both, en)).toBe(
        "This year: Tokyo Disneyland 50th anniversary and Tokyo DisneySea 30th anniversary",
      );
    });
  });
});
