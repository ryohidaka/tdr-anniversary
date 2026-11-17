/** 周年数を表示文字列にする。0 は「オープン」、節目でなければ「-」 */
export function formatAnniversary(n: number | null): string {
  if (n === null) return "-";
  return n === 0 ? "オープン" : `${n}周年`;
}
