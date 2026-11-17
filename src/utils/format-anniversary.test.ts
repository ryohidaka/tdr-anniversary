import { describe, expect, it } from "vite-plus/test";
import { formatAnniversary } from "./format-anniversary";

describe("formatAnniversary", () => {
  it("0 は「オープン」", () => expect(formatAnniversary(0)).toBe("オープン"));
  it("節目は「n周年」", () => expect(formatAnniversary(25)).toBe("25周年"));
  it("節目でなければ「-」", () => expect(formatAnniversary(null)).toBe("-"));
});
