import { useGameStore } from "@/store/gameStore";
import { ProjectCard } from "./ProjectCard";

export function ProjectQueue() {
  const projects = useGameStore((state) => state.projects);
  const desks = useGameStore((state) => state.desks);

  // Filter to only show projects not assigned to any desk
  const assignedProjectIds = new Set(
    desks.map((d) => d.projectId).filter(Boolean)
  );
  const availableProjects = projects.filter(
    (p) => !assignedProjectIds.has(p.id)
  );

  return (
    <div className="flex flex-col h-full bg-gray-900/50 border-l border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Project Queue</h2>
        <p className="text-sm text-gray-400">
          {availableProjects.length} project
          {availableProjects.length !== 1 ? "s" : ""} pending
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {availableProjects.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No pending projects</p>
            <p className="text-sm mt-1">New projects will appear here</p>
          </div>
        ) : (
          availableProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
