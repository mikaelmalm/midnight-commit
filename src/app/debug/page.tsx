"use client";

import { useGameStore } from "@/store/gameStore";
import { useGameLoop } from "@/hooks/useGameLoop";
import { generateConsultant, generateProject } from "@/lib/generator";
import { useState } from "react";
import { Consultant, Project } from "@/types";

export default function DebugPage() {
  const { money, ticks, revenue, isPlaying, tick, setPaused, addMoney, reset } =
    useGameStore();
  useGameLoop();

  const [generatedConsultants, setGeneratedConsultants] = useState<
    Consultant[]
  >([]);
  const [generatedProjects, setGeneratedProjects] = useState<Project[]>([]);

  const handleGenerateConsultant = () => {
    setGeneratedConsultants((prev) => [...prev, generateConsultant(1)]);
  };

  const handleGenerateProject = () => {
    setGeneratedProjects((prev) => [...prev, generateProject(1)]);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Debug Console</h1>

      <div className="grid grid-cols-2 gap-8">
        <section className="space-y-4 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Game State</h2>
          <div className="grid grid-cols-2 gap-2">
            <div>Running:</div>
            <div
              className={
                isPlaying
                  ? "text-green-500 font-bold"
                  : "text-red-500 font-bold"
              }
            >
              {isPlaying.toString()}
            </div>
            <div>Money:</div>
            <div>${money}</div>
            <div>Ticks:</div>
            <div>{ticks}</div>
            <div>Revenue/Tick:</div>
            <div>${revenue}</div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setPaused(isPlaying)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={tick}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Manual Tick
            </button>
            <button
              onClick={() => addMoney(1000)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add $1000
            </button>
            <button
              onClick={reset}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset State
            </button>
          </div>
        </section>

        <section className="space-y-4 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Generator Test</h2>
          <div className="flex gap-2">
            <button
              onClick={handleGenerateConsultant}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Gen Consultant
            </button>
            <button
              onClick={handleGenerateProject}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Gen Project
            </button>
          </div>

          <div className="space-y-4 h-64 overflow-auto border p-2">
            <div>
              <h3 className="font-bold">Latest Consultant</h3>
              <pre className="text-xs bg-gray-100 p-2 rounded">
                {generatedConsultants.length > 0
                  ? JSON.stringify(
                      generatedConsultants[generatedConsultants.length - 1],
                      null,
                      2
                    )
                  : "None"}
              </pre>
            </div>
            <div>
              <h3 className="font-bold">Latest Project</h3>
              <pre className="text-xs bg-gray-100 p-2 rounded">
                {generatedProjects.length > 0
                  ? JSON.stringify(
                      generatedProjects[generatedProjects.length - 1],
                      null,
                      2
                    )
                  : "None"}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
