import { TileCode } from "./types";

const suitToSymbol: Record<string, string> = {
  m: "萬",
  p: "筒",
  s: "索",
  z: "字"
};

const honors: Record<string, string> = {
  "1": "東",
  "2": "南",
  "3": "西",
  "4": "北",
  "5": "白",
  "6": "發",
  "7": "中"
};

export function getAllTileTypes(): TileCode[] {
  const suited = ["m", "p", "s"].flatMap((suit) =>
    Array.from({ length: 9 }, (_, index) => `${index + 1}${suit}`)
  );
  const honorsTiles = Array.from({ length: 7 }, (_, index) => `${index + 1}z`);
  return [...suited, ...honorsTiles];
}

export function tileLabel(tile: TileCode): string {
  if (!/^([1-9][mps]|[1-7]z)$/.test(tile)) {
    return tile;
  }

  const num = tile[0];
  const suit = tile[1];

  if (suit === "z") {
    return honors[num] ?? tile;
  }

  return `${num}${suitToSymbol[suit]}`;
}

export function compareTile(a: TileCode, b: TileCode): number {
  const suitOrder = { m: 0, p: 1, s: 2, z: 3 } as const;
  const suitA = a[1] as keyof typeof suitOrder;
  const suitB = b[1] as keyof typeof suitOrder;
  if (suitA !== suitB) {
    return suitOrder[suitA] - suitOrder[suitB];
  }
  return Number(a[0]) - Number(b[0]);
}
