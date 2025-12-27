import { useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useGameStore } from "@/store/gameStore";
import { useGameLoop } from "@/hooks/useGameLoop";
import { TopBar } from "@/components/game/TopBar";
import { Bench } from "@/components/game/Bench";
import { Office } from "@/components/game/Office";
import { ProjectQueue } from "@/components/game/ProjectQueue";
import { generateProject } from "@/lib/generator";
import { Link } from "react-router-dom";

export default function GamePage() {
  const {
    initializeGame,
    assignConsultantToDesk,
    assignProjectToDesk,
    addProject,
    processWorkTick,
    ticks,
    isPlaying,
  } = useGameStore();

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Use the game loop
  useGameLoop();

  // Process work each tick
  useEffect(() => {
    if (isPlaying && ticks > 0) {
      processWorkTick();
    }
  }, [ticks, isPlaying, processWorkTick]);

  // Generate new projects periodically
  useEffect(() => {
    if (isPlaying && ticks > 0 && ticks % 15 === 0) {
      // Generate a new project every 15 ticks
      const level = Math.min(3, 1 + Math.floor(ticks / 60)); // Scale difficulty
      addProject(generateProject(level));
    }
  }, [ticks, isPlaying, addProject]);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before drag starts
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Only handle drops onto desks
    if (overData?.type !== "desk") return;

    const deskId = overData.desk.id;

    if (activeData?.type === "consultant") {
      const consultantId = activeData.consultant.id;
      assignConsultantToDesk(consultantId, deskId);
    } else if (activeData?.type === "project") {
      const projectId = activeData.project.id;
      assignProjectToDesk(projectId, deskId);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-gray-950 text-white">
        <TopBar />

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - The Bench */}
          <div className="w-80 flex-shrink-0">
            <Bench />
          </div>

          {/* Center Panel - The Office */}
          <div className="flex-1 bg-gray-900/30">
            <Office />
          </div>

          {/* Right Panel - Project Queue */}
          <div className="w-80 flex-shrink-0">
            <ProjectQueue />
          </div>
        </div>

        {/* Debug link */}
        <div className="absolute bottom-4 right-4">
          <Link
            to="/debug"
            className="text-xs text-gray-600 hover:text-gray-400"
          >
            debug
          </Link>
        </div>
      </div>

      <DragOverlay>{/* Optional: render drag preview here */}</DragOverlay>
    </DndContext>
  );
}
