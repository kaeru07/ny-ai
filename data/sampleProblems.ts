import { QuizProblem } from "@/lib/types";

export const sampleProblems: QuizProblem[] = [
  {
    id: "sample-1",
    source: "MVP サンプル",
    round: "東1局",
    turn: 8,
    targetPlayer: 0,
    seatWind: "東",
    doraIndicators: ["3p"],
    players: [
      {
        hand: ["2m", "3m", "4m", "4m", "5m", "6m", "2p", "3p", "4p", "6s", "7s", "8s", "5z"],
        melds: [],
        discards: ["9m", "1p", "9s", "1z", "2z", "7p"]
      },
      { hand: [], melds: [], discards: ["1m", "9p", "3z", "8m", "5p", "9s"] },
      { hand: [], melds: [], discards: ["2m", "6m", "4z", "8p", "7s", "6z"] },
      { hand: [], melds: [], discards: ["3m", "7m", "9m", "2p", "4p", "5s"] }
    ],
    waits: ["1m", "7m"],
    winningTile: "7m",
    waitType: "両面",
    resultSummary: "東家がリーチ後に7mツモ",
    explanation: "345m-456mの形があり、2m3m4m4m5m6mから1m/7mの両面待ち。",
    difficulty: "beginner"
  },
  {
    id: "sample-2",
    source: "MVP サンプル",
    round: "東2局",
    turn: 11,
    targetPlayer: 2,
    seatWind: "西",
    doraIndicators: ["9s"],
    players: [
      { hand: [], melds: [], discards: ["4m", "1z", "7p", "9p", "2s", "6z", "8m"] },
      { hand: [], melds: [], discards: ["6m", "7m", "1p", "8p", "9m", "5z", "4s"] },
      {
        hand: ["3m", "4m", "5m", "6m", "7m", "8m", "2p", "3p", "4p", "3s", "4s", "5s", "2z"],
        melds: [],
        discards: ["1m", "9m", "9p", "1s", "7z", "5p", "6p"]
      },
      { hand: [], melds: [], discards: ["2m", "3m", "4p", "5p", "8s", "3z", "6s"] }
    ],
    waits: ["2z"],
    winningTile: "2z",
    waitType: "単騎",
    resultSummary: "西家が単騎待ちを和了",
    explanation: "面子は完成済みで最後は南(2z)単騎待ち。",
    difficulty: "beginner"
  },
  {
    id: "sample-3",
    source: "MVP サンプル",
    round: "東3局",
    turn: 10,
    targetPlayer: 1,
    seatWind: "南",
    doraIndicators: ["1m"],
    players: [
      { hand: [], melds: [], discards: ["7p", "8p", "9p", "1z", "9s", "5m"] },
      {
        hand: ["2m", "2m", "2m", "4m", "5m", "6m", "7m", "8m", "9m", "2p", "3p", "4p", "6z"],
        melds: [],
        discards: ["9m", "1p", "3s", "6s", "7z", "4z"]
      },
      { hand: [], melds: [], discards: ["1m", "2m", "3m", "4m", "5p", "6p"] },
      { hand: [], melds: [], discards: ["9m", "9p", "2s", "3s", "4s", "5s"] }
    ],
    waits: ["3m", "6m"],
    winningTile: "3m",
    waitType: "嵌張+両面複合",
    resultSummary: "南家が多面待ちでロン",
    explanation: "222m456m789m234pがあり、4m5m6m部分と対子処理で3m/6mの待ち。",
    difficulty: "intermediate"
  },
  {
    id: "sample-4",
    source: "MVP サンプル",
    round: "南1局",
    turn: 9,
    targetPlayer: 3,
    seatWind: "北",
    doraIndicators: ["5s"],
    players: [
      { hand: [], melds: [], discards: ["1z", "2z", "3z", "4z", "5z"] },
      { hand: [], melds: [], discards: ["9m", "8m", "7m", "6m", "5m"] },
      { hand: [], melds: [], discards: ["9p", "8p", "7p", "6p", "5p"] },
      {
        hand: ["2m", "3m", "4m", "5p", "6p", "7p", "3s", "4s", "5s", "7z"],
        melds: [["2s", "2s", "2s"], ["1p", "2p", "3p"]],
        discards: ["6z", "9s", "1m", "8s", "4m"]
      }
    ],
    waits: ["7z"],
    winningTile: "7z",
    waitType: "シャンポン",
    resultSummary: "北家が副露手で和了",
    explanation: "副露2組を含む上級問題。頭候補が7zのみで単騎に近い待ち。",
    difficulty: "advanced"
  },
  {
    id: "sample-5",
    source: "MVP サンプル",
    round: "南2局",
    turn: 12,
    targetPlayer: 0,
    seatWind: "東",
    doraIndicators: ["7m"],
    players: [
      {
        hand: ["1m", "2m", "3m", "3m", "4m", "5m", "5p", "6p", "7p", "4s", "5s", "6s", "9z"],
        melds: [],
        discards: ["9m", "1z", "2z", "3z", "8p", "8s", "6z"]
      },
      { hand: [], melds: [], discards: ["7m", "8m", "9m", "1p", "2p", "3p", "4p"] },
      { hand: [], melds: [], discards: ["6m", "6p", "6s", "7z", "5m", "5p", "5s"] },
      { hand: [], melds: [], discards: ["1s", "2s", "3s", "4s", "7p", "8p", "9p"] }
    ],
    waits: ["2m", "5m"],
    winningTile: "5m",
    waitType: "両面",
    resultSummary: "東家がリーチ後にツモ",
    explanation: "123m 345m 567p 456s + 3m4m5m付近の変化で2m/5m待ち。",
    difficulty: "intermediate"
  }
];
