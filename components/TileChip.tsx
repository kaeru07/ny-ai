import { TileCode } from "@/lib/types";
import { tileLabel } from "@/lib/tile";

type TileChipProps = {
  tile: TileCode;
  selected?: boolean;
  onClick?: (tile: TileCode) => void;
};

export function TileChip({ tile, selected = false, onClick }: TileChipProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(tile)}
      className={`min-w-11 rounded-md border px-2 py-1 text-sm font-semibold ${
        selected
          ? "border-indigo-700 bg-indigo-600 text-white"
          : "border-slate-300 bg-white text-slate-800"
      }`}
    >
      {tileLabel(tile)}
    </button>
  );
}
