import { Project } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `project-${project.id}`,
      data: { type: "project", project },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const progressPercent = project.progress;

  if (compact) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="p-2 bg-gray-800 rounded border border-gray-700 cursor-grab active:cursor-grabbing"
      >
        <div className="text-white text-sm truncate">{project.name}</div>
        <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all"
            style={{ width: `${progressPercent}%` }}
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
        <div className="text-white font-medium">{project.name}</div>
        <div className="text-green-400 text-sm font-mono">
          ${project.budget}
        </div>
      </div>

      {/* Required Stats */}
      <div className="space-y-1 mb-3">
        <div className="text-xs text-gray-500 mb-1">Requirements</div>
        {(["frontend", "backend", "devops", "design"] as const).map((stat) => (
          <div key={stat} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-16 capitalize">
              {stat}
            </span>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${project.requiredStats[stat]}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-8 text-right">
              {project.requiredStats[stat]}
            </span>
          </div>
        ))}
      </div>

      {/* Progress */}
      {progressPercent > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Progress</span>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">
            {Math.round(progressPercent)}%
          </span>
        </div>
      )}

      {/* Time limit */}
      <div className="mt-2 text-xs text-gray-500">
        Time limit: {project.timeLimit} ticks
      </div>
    </div>
  );
}
