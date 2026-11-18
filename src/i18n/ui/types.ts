import type { Park } from "@/lib/anniversary";

/** 画面に表示する文言。語順や活用が言語で異なるものは関数にする */
export interface Dictionary {
  /** 年度の行に和暦を併記するか(日本語向け) */
  showEra: boolean;
  site: {
    title: string;
    description: (upcoming: string) => string;
  };
  parks: Record<Park, string>;
  table: {
    /** スクリーンリーダーやエージェント向けの表の説明 */
    caption: string;
    fiscalYear: string;
    /** 0周年(開園年度)の表示 */
    open: string;
    /** 節目でないセルの表示 */
    none: string;
    projected: string;
    anniversary: (n: number) => string;
  };
  upcoming: {
    thisYear: (anniversaries: string) => string;
    yearsLater: (years: number, anniversaries: string) => string;
    /** 1パーク分。例: ディズニーシー + 25周年 */
    item: (park: string, anniversary: string) => string;
    /** 同じ年度に複数のパークが節目のときの連結 */
    join: (items: string[]) => string;
  };
  notes: {
    label: string;
    projected: string;
    /** 年度の説明。年度の概念が一般的でない言語向け(任意) */
    fiscalYear?: string;
    unofficial: string;
  };
  footer: {
    updated: string;
  };
  languageSwitcher: string;
}
