import { ProjectCard } from "../components/ProjectCard";
import type { Database } from "../../../types/database.types";
import { memo, useState } from "react";

interface ProjectsSectionProps {
  projects: Database["public"]["Tables"]["portfolio-projects"]["Row"][];
  onRefresh?: () => void;
}

function ProjectsSection({ projects, onRefresh }: ProjectsSectionProps) {
  const [draggedPos, setDraggedPos] = useState<number | null>(null);
  const [dragOverPos, setDragOverPos] = useState<number | null>(null);

  return (
    <section className="flex flex-col pt-10 gap-3">
      <div className="flex flex-row justify-between items-center gap-5">
        <p className=" uppercase pl-4 text-nowrap font-medium text-ink-soft tracking-wider mr-1 text-sm font-monospace">
          Projekte
        </p>
        <p
          onClick={onRefresh}
          className="flex flex-row items-center gap-2 cursor-pointer text-nowrap text-ink-soft tracking-wide mr-1 text-sm font-monospace"
        >
          ↻ refresh
        </p>
        <div className="text-line border-b w-svw mr-4"></div>
      </div>
      <div className="bg-bg-alt border border-line rounded-2xl p-6 pb-4 justify-between items-center gap-5">
        {/* <div
          className={`flex flex-col divide-y divide-line/60 pb-6 justify-between items-center gap-5`}
        > */}
        <div className="flex flex-col gap-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              position={index + 1}
              title={project.title || ""}
              description={project.descr || ""}
              tags={(project.tags as string[]) || []}
              imageUrl={project.img || ""}
              githubUrl={project.code || ""}
              liveDemoUrl={project.live || ""}
              isDragging={draggedPos === index}
              isDraggingOver={dragOverPos === index && draggedPos !== index}
              onDragStart={() => setDraggedPos(index)}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOverPos(index);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDraggedPos(null);
                setDragOverPos(null);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default memo(ProjectsSection);
