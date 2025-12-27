import { Consultant } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface ConsultantCardProps {
  consultant: Consultant;
  compact?: boolean;
}

const roleIcons: Record<string, string> = {
  Frontend: "🖥️",
  Backend: "⚙️",
  DevOps: "☁️",
  Design: "🎨",
};

const rankColors: Record<string, string> = {
  Junior: "text-gray-400",
  Mid: "text-blue-400",
  Senior: "text-purple-400",
  Lead: "text-orange-400",
  Architect: "text-yellow-400",
};

export function ConsultantCard({
  consultant,
  compact = false,
}: ConsultantCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `consultant-${consultant.id}`,
      data: { type: "consultant", consultant },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const energyPercent = (consultant.energy / consultant.maxEnergy) * 100;
  const energyColor =
    energyPercent > 50
      ? "bg-green-500"
      : energyPercent > 25
      ? "bg-yellow-500"
      : "bg-red-500";

  if (compact) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="p-2 bg-gray-800 rounded border border-gray-700 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <span>{roleIcons[consultant.role]}</span>
          <span className="text-white text-sm truncate">{consultant.name}</span>
        </div>
        <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${energyColor} transition-all`}
            style={{ width: `${energyPercent}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-gray-800 rounded-lg border border-gray-700 cursor-grab active:cursor-grabbing hover:border-gray-600 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{roleIcons[consultant.role]}</span>
          <div>
            <div className="text-white font-medium">{consultant.name}</div>
            <div className={`text-xs ${rankColors[consultant.rank]}`}>
              {consultant.rank}
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-xs">${consultant.salary}/t</div>
      </div>

      {/* Stats */}
      <div className="space-y-1 mb-3">
        {(["frontend", "backend", "devops", "design"] as const).map((stat) => (
          <div key={stat} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-16 capitalize">
              {stat}
            </span>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${consultant.stats[stat]}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-8 text-right">
              {consultant.stats[stat]}
            </span>
          </div>
        ))}
      </div>

      {/* Energy */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Energy</span>
        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${energyColor} transition-all`}
            style={{ width: `${energyPercent}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">
          {Math.round(consultant.energy)}
        </span>
      </div>
    </div>
  );
}
