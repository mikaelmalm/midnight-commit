import { useGameStore } from "@/store/gameStore";

export function TopBar() {
  const { money, revenue, ticks, isPlaying, setPaused } = useGameStore();

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (tickCount: number) => {
    const minutes = Math.floor(tickCount / 60);
    const seconds = tickCount % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-900/80 backdrop-blur border-b border-gray-800">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-white">Midnight Commit</h1>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Balance:</span>
          <span className="text-green-400 font-mono text-lg font-bold">
            {formatMoney(money)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Revenue:</span>
          <span className="text-emerald-400 font-mono">
            {formatMoney(revenue)}/s
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Time:</span>
          <span className="text-blue-400 font-mono">{formatTime(ticks)}</span>
        </div>

        <button
          onClick={() => setPaused(isPlaying)}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            isPlaying
              ? "bg-yellow-600 hover:bg-yellow-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
