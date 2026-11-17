import type { Park } from "@/lib/anniversary";

/** パーク名の表示ラベル。Park を足すと型エラーで漏れに気づける */
export const PARK_LABELS = {
  land: "ディズニーランド",
  sea: "ディズニーシー",
} satisfies Record<Park, string>;
