export const LOCALES = ["ja", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE = "ja" satisfies Locale;

/** BCP 47 の言語タグ(hreflang / sitemap / Intl 用) */
export const LOCALE_TAGS = {
  ja: "ja-JP",
  en: "en-US",
} satisfies Record<Locale, string>;

/** 言語切り替えに表示する名前(各言語の自称) */
export const LOCALE_NAMES = {
  ja: "日本語",
  en: "English",
} satisfies Record<Locale, string>;

/** og:locale 用の表記。例: ja-JP → ja_JP */
export function toOgLocale(locale: Locale): string {
  return LOCALE_TAGS[locale].replace("-", "_");
}
