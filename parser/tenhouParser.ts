import { QuizProblem } from "@/lib/types";

/**
 * 将来的に天鳳XML/JSONを QuizProblem[] に変換するための入口。
 * MVPでは「変換済みJSON」を優先対応し、XMLは未実装エラーとする。
 */
export function parseTenhouToQuizProblems(input: string): QuizProblem[] {
  const trimmed = input.trim();

  if (trimmed.startsWith("<")) {
    throw new Error(
      "天鳳XMLの直接パースは未実装です。いったん変換済みJSONを利用してください。"
    );
  }

  const parsed: unknown = JSON.parse(trimmed);

  if (!Array.isArray(parsed)) {
    throw new Error("QuizProblem配列(JSON)をアップロードしてください。");
  }

  return parsed.map(validateQuizProblem);
}

function validateQuizProblem(problem: unknown): QuizProblem {
  if (!problem || typeof problem !== "object") {
    throw new Error("問題データが不正です。");
  }

  const candidate = problem as Partial<QuizProblem>;
  const requiredKeys: Array<keyof QuizProblem> = [
    "id",
    "source",
    "round",
    "turn",
    "targetPlayer",
    "doraIndicators",
    "players",
    "waits",
    "winningTile",
    "difficulty"
  ];

  for (const key of requiredKeys) {
    if (candidate[key] === undefined) {
      throw new Error(`必須キーが不足しています: ${key}`);
    }
  }

  return candidate as QuizProblem;
}
