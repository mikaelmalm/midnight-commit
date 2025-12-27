import { useGameStore } from "@/store/gameStore";
import { ConsultantCard } from "./ConsultantCard";

export function Bench() {
  const consultants = useGameStore((state) => state.consultants);
  const desks = useGameStore((state) => state.desks);

  // Filter to only show consultants not assigned to any desk
  const assignedConsultantIds = new Set(
    desks.map((d) => d.consultantId).filter(Boolean)
  );
  const availableConsultants = consultants.filter(
    (c) => !assignedConsultantIds.has(c.id)
  );

  return (
    <div className="flex flex-col h-full bg-gray-900/50 border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">The Bench</h2>
        <p className="text-sm text-gray-400">
          {availableConsultants.length} consultant
          {availableConsultants.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {availableConsultants.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No consultants on the bench</p>
            <p className="text-sm mt-1">All are assigned to desks</p>
          </div>
        ) : (
          availableConsultants.map((consultant) => (
            <ConsultantCard key={consultant.id} consultant={consultant} />
          ))
        )}
      </div>
    </div>
  );
}
