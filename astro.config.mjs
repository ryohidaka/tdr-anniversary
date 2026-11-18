// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import { DEFAULT_LOCALE, LOCALE_TAGS, LOCALES } from "./src/i18n/config.ts";

// https://astro.build/config
export default defineConfig({
  integrations: [
    // hreflang 付きの sitemap(xhtml:link)を生成する
    sitemap({ i18n: { defaultLocale: DEFAULT_LOCALE, locales: LOCALE_TAGS } }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
  site: "https://tdr-anniversary.pages.dev/",
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
});
