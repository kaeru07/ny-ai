import { PlayerState, TileCode } from "@/lib/types";
import { tileLabel } from "@/lib/tile";

type PlayerBoardProps = {
  player: PlayerState;
  index: number;
  isTarget: boolean;
  revealHand: boolean;
};

function TileRow({ tiles }: { tiles: TileCode[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tiles.map((tile, idx) => (
        <span
          key={`${tile}-${idx}`}
          className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-xs"
        >
          {tileLabel(tile)}
        </span>
      ))}
    </div>
  );
}

export function PlayerBoard({ player, index, isTarget, revealHand }: PlayerBoardProps) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        isTarget ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white"
      }`}
    >
      <p className="mb-2 text-xs font-bold text-slate-600">
        プレイヤー {index} {isTarget ? "（対象）" : ""}
      </p>

      <div className="space-y-2 text-xs">
        <div>
          <p className="mb-1 font-semibold">手牌</p>
          {revealHand ? <TileRow tiles={player.hand} /> : <p className="text-slate-500">非公開</p>}
        </div>

        <div>
          <p className="mb-1 font-semibold">副露</p>
          <div className="space-y-1">
            {player.melds.length > 0 ? (
              player.melds.map((meld, idx) => <TileRow key={idx} tiles={meld} />)
            ) : (
              <p className="text-slate-500">なし</p>
            )}
          </div>
        </div>

        <div>
          <p className="mb-1 font-semibold">河</p>
          <TileRow tiles={player.discards} />
        </div>
      </div>
    </div>
  );
}
