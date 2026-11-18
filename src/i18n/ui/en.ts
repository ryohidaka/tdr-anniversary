import type { Dictionary } from "./types";

const ordinalRules = new Intl.PluralRules("en", { type: "ordinal" });
const ORDINAL_SUFFIXES: Record<Intl.LDMLPluralRule, string> = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  many: "th",
  other: "th",
};

/** 25 → "25th" */
function ordinal(n: number): string {
  return `${n}${ORDINAL_SUFFIXES[ordinalRules.select(n)]}`;
}

export const en: Dictionary = {
  showEra: false,
  site: {
    title: "Tokyo Disney Resort Anniversary Chart",
    description: (upcoming) =>
      `Opening dates and anniversaries of Tokyo Disneyland and Tokyo DisneySea. ${upcoming}.`,
  },
  parks: {
    land: "Tokyo Disneyland",
    sea: "Tokyo DisneySea",
  },
  table: {
    caption: "Anniversary milestones of Tokyo Disneyland and Tokyo DisneySea by fiscal year",
    fiscalYear: "Fiscal year",
    open: "Opening",
    none: "-",
    projected: "(projected)",
    anniversary: (n) => `${ordinal(n)} anniversary`,
  },
  upcoming: {
    thisYear: (anniversaries) => `This year: ${anniversaries}`,
    yearsLater: (years, anniversaries) =>
      `In ${years} year${years === 1 ? "" : "s"}: ${anniversaries}`,
    item: (park, anniversary) => `${park} ${anniversary}`,
    join: (items) => items.join(" and "),
  },
  notes: {
    label: "Notes",
    projected:
      "* Entries marked “projected” are dates calculated from the opening dates, not official announcements.",
    fiscalYear:
      "Fiscal years run from April to March (e.g. fiscal 2026 = April 2026 to March 2027).",
    unofficial:
      "This is an unofficial fan site run by an individual. It is not affiliated with Disney Enterprises, Inc. or Oriental Land Co., Ltd.",
  },
  footer: {
    updated: "Last updated",
  },
  languageSwitcher: "Language",
};
