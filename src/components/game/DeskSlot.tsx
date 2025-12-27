import { useDroppable } from "@dnd-kit/core";
import { useGameStore } from "@/store/gameStore";
import { ConsultantCard } from "./ConsultantCard";
import { ProjectCard } from "./ProjectCard";
import { Desk } from "@/types";

interface DeskSlotProps {
  desk: Desk;
}

export function DeskSlot({ desk }: DeskSlotProps) {
  const consultants = useGameStore((state) => state.consultants);
  const projects = useGameStore((state) => state.projects);
  const removeConsultantFromDesk = useGameStore(
    (state) => state.removeConsultantFromDesk
  );
  const removeProjectFromDesk = useGameStore(
    (state) => state.removeProjectFromDesk
  );

  const consultant = consultants.find((c) => c.id === desk.consultantId);
  const project = projects.find((p) => p.id === desk.projectId);

  const { setNodeRef, isOver, active } = useDroppable({
    id: `desk-${desk.id}`,
    data: { type: "desk", desk },
  });

  // Determine if this is a valid drop target
  const activeType = active?.data?.current?.type;
  const canDropConsultant = activeType === "consultant" && !desk.consultantId;
  const canDropProject = activeType === "project" && !desk.projectId;
  const isValidDrop = canDropConsultant || canDropProject;

  const isWorking = consultant && project;

  return (
    <div
      ref={setNodeRef}
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-200
        ${
          isOver && isValidDrop
            ? "border-green-500 bg-green-500/10 scale-105"
            : ""
        }
        ${isOver && !isValidDrop ? "border-red-500 bg-red-500/10" : ""}
        ${!isOver && isWorking ? "border-emerald-600 bg-emerald-900/20" : ""}
        ${!isOver && !isWorking ? "border-gray-700 bg-gray-800/50" : ""}
      `}
    >
      {/* Desk label */}
      <div className="absolute -top-3 left-4 px-2 bg-gray-900 text-xs text-gray-400">
        {desk.id.replace("-", " ").toUpperCase()}
      </div>

      {/* Working indicator */}
      {isWorking && (
        <div className="absolute -top-3 right-4 px-2 bg-emerald-600 text-xs text-white rounded animate-pulse">
          WORKING
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 min-h-[200px]">
        {/* Consultant slot */}
        <div className="relative">
          {consultant ? (
            <div className="relative">
              <ConsultantCard consultant={consultant} compact />
              <button
                onClick={() => removeConsultantFromDesk(desk.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full text-white text-xs flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              className={`
              h-full flex items-center justify-center border-2 border-dashed rounded-lg
              ${
                canDropConsultant && isOver
                  ? "border-green-500 text-green-400"
                  : "border-gray-600 text-gray-500"
              }
            `}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">👤</div>
                <div className="text-xs">Drop Consultant</div>
              </div>
            </div>
          )}
        </div>

        {/* Project slot */}
        <div className="relative">
          {project ? (
            <div className="relative">
              <ProjectCard project={project} compact />
              <button
                onClick={() => removeProjectFromDesk(desk.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full text-white text-xs flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              className={`
              h-full flex items-center justify-center border-2 border-dashed rounded-lg
              ${
                canDropProject && isOver
                  ? "border-green-500 text-green-400"
                  : "border-gray-600 text-gray-500"
              }
            `}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">📋</div>
                <div className="text-xs">Drop Project</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
