import { QuizProblem } from "./types";

export type ExtractPattern = "A_TENPAI_BEFORE_WIN" | "B_AFTER_LAST_DISCARD";

export type WinLog = {
  source: string;
  round: string;
  winner: number;
  winningTile: string;
  turn: number;
};

/**
 * 将来的な自動抽出ロジックの設計用スタブ。
 * - Pattern A: 和了直前テンパイ
 * - Pattern B: 最終打牌後に待ち確定
 */
export function extractQuizProblemsFromWinningLog(
  _log: WinLog,
  _pattern: ExtractPattern
): QuizProblem[] {
  // TODO: 実牌譜イベント列(配牌/ツモ/打/副露/和了)をもとに
  // 対象プレイヤーの局面スナップショットを構築する。
  return [];
}
