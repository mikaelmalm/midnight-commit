import { useGameStore } from "@/store/gameStore";
import { useGameLoop } from "@/hooks/useGameLoop";

export default function DebugPage() {
  const store = useGameStore();
  useGameLoop();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Debug Panel</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h2 className="text-xl mb-2">State</h2>
          <pre className="text-xs overflow-auto max-h-96">
            {JSON.stringify(store, null, 2)}
          </pre>
        </div>

        <div className="p-4 border rounded space-y-2">
          <h2 className="text-xl mb-2">Actions</h2>
          <button
            onClick={() => store.addMoney(1000)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 block w-full"
          >
            Add $1000
          </button>
          <button
            onClick={() => store.tick()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 block w-full"
          >
            Manual Tick
          </button>
          <button
            onClick={() => store.setPaused(store.isPlaying)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 block w-full"
          >
            {store.isPlaying ? "Pause" : "Resume"}
          </button>
          <button
            onClick={() => store.reset()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 block w-full"
          >
            Reset Game
          </button>
        </div>
      </div>

      <a href="/" className="inline-block mt-4 text-blue-500 hover:underline">
        &larr; Back to Game
      </a>
    </div>
  );
}
