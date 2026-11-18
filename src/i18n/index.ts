import type { Locale } from "./config";
import { en } from "./ui/en";
import { ja } from "./ui/ja";
import type { Dictionary } from "./ui/types";

export * from "./config";
export type { Dictionary } from "./ui/types";

/** Locale を足すと、ここで型エラーになり辞書の追加漏れに気づける */
const dictionaries = { ja, en } satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
