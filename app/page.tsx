"use client";

import { useMemo, useState } from "react";
import { PlayerBoard } from "@/components/PlayerBoard";
import { TileChip } from "@/components/TileChip";
import { sampleProblems } from "@/data/sampleProblems";
import { compareTile, getAllTileTypes, tileLabel } from "@/lib/tile";
import { Difficulty, QuizProblem } from "@/lib/types";
import { parseTenhouToQuizProblems } from "@/parser/tenhouParser";

const difficultyLabel: Record<Difficulty, string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級"
};

export default function Home() {
  const [problems, setProblems] = useState<QuizProblem[]>(sampleProblems);
  const [index, setIndex] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [hintEnabled, setHintEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");

  const currentProblems = useMemo(
    () => (difficulty === "all" ? problems : problems.filter((p) => p.difficulty === difficulty)),
    [difficulty, problems]
  );

  const problem = currentProblems[index];
  const allTiles = useMemo(() => getAllTileTypes(), []);

  const isCorrect = useMemo(() => {
    if (!problem) return false;
    const answer = [...problem.waits].sort(compareTile);
    const selected = [...selectedTiles].sort(compareTile);
    return answer.length === selected.length && answer.every((tile, idx) => tile === selected[idx]);
  }, [problem, selectedTiles]);

  function toggleTile(tile: string) {
    if (showAnswer) return;

    setSelectedTiles((prev) =>
      prev.includes(tile) ? prev.filter((value) => value !== tile) : [...prev, tile]
    );
  }

  function clearSelection() {
    if (showAnswer) return;
    setSelectedTiles([]);
  }

  function submitAnswer() {
    if (!problem || showAnswer) return;
    setShowAnswer(true);
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  }

  function nextProblem() {
    if (currentProblems.length === 0) return;
    setShowAnswer(false);
    setSelectedTiles([]);
    setIndex((prev) => (prev + 1) % currentProblems.length);
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    try {
      const parsed = parseTenhouToQuizProblems(text);
      setProblems(parsed);
      setIndex(0);
      setSelectedTiles([]);
      setShowAnswer(false);
      setScore({ correct: 0, total: 0 });
      alert(`${parsed.length}問を読み込みました。`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "読み込みに失敗しました。");
    } finally {
      event.target.value = "";
    }
  }

  if (!problem) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center p-4">
        <p className="text-center text-sm text-slate-700">該当する難易度の問題がありません。</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-3 pb-10 sm:p-6">
      <header className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold">麻雀 待ち牌当てクイズ</h1>
        <p className="mt-1 text-sm text-slate-600">牌譜局面から待ち牌を当てよう</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <label className="inline-flex items-center gap-2">
            難易度
            <select
              className="rounded border border-slate-300 bg-white px-2 py-1"
              value={difficulty}
              onChange={(event) => {
                setDifficulty(event.target.value as Difficulty | "all");
                setIndex(0);
                setSelectedTiles([]);
                setShowAnswer(false);
              }}
            >
              <option value="all">全て</option>
              <option value="beginner">初級</option>
              <option value="intermediate">中級</option>
              <option value="advanced">上級</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={hintEnabled}
              onChange={(event) => setHintEnabled(event.target.checked)}
            />
            ヒントON
          </label>

          <label className="inline-flex items-center gap-2">
            JSON取込
            <input type="file" accept="application/json,.json,.txt" onChange={handleUpload} />
          </label>

          <p className="rounded bg-indigo-50 px-2 py-1 font-semibold text-indigo-700">
            成績: {score.correct} / {score.total}
          </p>
        </div>
      </header>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-slate-700">
            {problem.round} / {problem.turn}巡目 / 対象: プレイヤー{problem.targetPlayer}({problem.seatWind ?? "-"})
          </p>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
            {difficultyLabel[problem.difficulty]}
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          ドラ表示牌: {problem.doraIndicators.map(tileLabel).join(" ")}
        </p>

        {hintEnabled && (
          <p className="mt-2 rounded bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
            ヒント: {problem.waitType ? `待ちタイプは「${problem.waitType}」` : "待ちの形を面子構成から考えてみよう"}
          </p>
        )}

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {problem.players.map((player, playerIndex) => (
            <PlayerBoard
              key={playerIndex}
              player={player}
              index={playerIndex}
              isTarget={playerIndex === problem.targetPlayer}
              revealHand={playerIndex === problem.targetPlayer}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">回答候補 (34種)</p>
        <div className="mt-2 grid grid-cols-7 gap-1 sm:grid-cols-10">
          {allTiles.map((tile) => (
            <TileChip
              key={tile}
              tile={tile}
              selected={selectedTiles.includes(tile)}
              onClick={toggleTile}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={clearSelection}
            className="rounded bg-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700"
          >
            クリア
          </button>
          <button
            type="button"
            onClick={submitAnswer}
            className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white disabled:bg-indigo-300"
            disabled={showAnswer}
          >
            回答
          </button>
          <button
            type="button"
            onClick={nextProblem}
            className="rounded bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white"
          >
            次へ
          </button>
        </div>

        {showAnswer && (
          <div className="mt-4 rounded border border-slate-200 bg-slate-50 p-3 text-sm">
            <p className={`font-bold ${isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
              {isCorrect ? "正解！" : "不正解"}
            </p>
            <p className="mt-1">正解待ち牌: {problem.waits.map(tileLabel).join(" / ")}</p>
            <p>実際の和了牌: {tileLabel(problem.winningTile)}</p>
            {problem.explanation && <p className="mt-1 text-slate-700">解説: {problem.explanation}</p>}
            {problem.resultSummary && <p className="mt-1 text-xs text-slate-500">{problem.resultSummary}</p>}
          </div>
        )}
      </section>
    </main>
  );
}
