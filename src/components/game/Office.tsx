import { useGameStore } from "@/store/gameStore";
import { DeskSlot } from "./DeskSlot";

export function Office() {
  const desks = useGameStore((state) => state.desks);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">The Office</h2>
        <p className="text-sm text-gray-400">
          {desks.length} desk{desks.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {desks.map((desk) => (
            <DeskSlot key={desk.id} desk={desk} />
          ))}
        </div>

        {desks.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-2xl mb-2">🏢</p>
            <p>No desks available</p>
            <p className="text-sm mt-1">
              Upgrade your office to add more desks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
