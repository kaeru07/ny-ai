export type TileCode = string; // "1m", "9p", "5s", "7z"

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type PlayerState = {
  hand: TileCode[];
  melds: TileCode[][];
  discards: TileCode[];
};

export type QuizProblem = {
  id: string;
  source: string;
  round: string;
  honba?: number;
  riichiSticks?: number;
  turn: number;
  targetPlayer: number;
  seatWind?: string;
  doraIndicators: TileCode[];
  players: PlayerState[];
  waits: TileCode[];
  winningTile: TileCode;
  waitType?: string;
  resultSummary?: string;
  explanation?: string;
  difficulty: Difficulty;
};
