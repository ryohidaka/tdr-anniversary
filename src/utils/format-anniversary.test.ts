import { describe, expect, it } from "vite-plus/test";
import { en } from "@/i18n/ui/en";
import { ja } from "@/i18n/ui/ja";
import { formatAnniversary } from "./format-anniversary";

describe("formatAnniversary", () => {
  it("ja", () => {
    expect(formatAnniversary(0, ja)).toBe("オープン");
    expect(formatAnniversary(25, ja)).toBe("25周年");
    expect(formatAnniversary(null, ja)).toBe("-");
  });

  it("en: 序数を正しく付ける", () => {
    expect(formatAnniversary(0, en)).toBe("Opening");
    expect(formatAnniversary(25, en)).toBe("25th anniversary");
    expect(formatAnniversary(30, en)).toBe("30th anniversary");
    expect(formatAnniversary(null, en)).toBe("-");
  });
});
