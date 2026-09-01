import { ProjectCard } from "../components/ProjectCard";
import type { Database } from "../../../types/database.types";
import { memo, useMemo, useState } from "react";

interface ProjectsSectionProps {
  projects: Database["public"]["Tables"]["portfolio-projects"]["Row"][];
  handleDragAndDrop?: (draggedPos: number, dragOverPos: number) => void;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

function ProjectsSection({
  projects,
  handleDragAndDrop,
  onRefresh,
  handleEdit,
  handleDelete,
  isLoading,
}: ProjectsSectionProps) {
  const [draggedPos, setDraggedPos] = useState<number | null>(null);
  const [dragOverPos, setDragOverPos] = useState<number | null>(null);

  const sortedProjects = useMemo(
    () =>
      [...projects].sort(
        (a, b) =>
          (a.position ?? projects.length) - (b.position ?? projects.length),
      ),
    [projects],
  );

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
          <span className={`tracking-wide  ${isLoading ? "animate-spin" : ""}`}>
            ↻
          </span>
          refresh
        </p>
        <div className="text-line border-b w-svw mr-4"></div>
      </div>
      <div className="bg-bg-alt border border-line rounded-2xl p-6 pb-4 justify-between items-center gap-5">
        <div
          className={`flex flex-col divide-y divide-line/60 justify-between items-center gap-7`}
        >
          {sortedProjects.map((project, index) => (
            <ProjectCard
              id={project.id}
              handleEdit={handleEdit ? () => handleEdit(project.id) : undefined}
              handleDelete={
                handleDelete ? () => handleDelete(project.id) : undefined
              }
              key={project.id}
              position={project.position}
              title={project.title || ""}
              description={project.desc || ""}
              tags={(project.tags as string[]) || []}
              imageUrl={project.img || ""}
              githubUrl={project.code || ""}
              liveDemoUrl={project.live || ""}
              isDragging={draggedPos === index}
              isDraggingOver={dragOverPos === index && draggedPos !== index}
              onDragStart={(e) => {
                e.dataTransfer.setData("position", index.toString());
                setDraggedPos(index);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOverPos(index);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedPos !== null && handleDragAndDrop) {
                  handleDragAndDrop(draggedPos, index);
                }
                setDraggedPos(null);
                setDragOverPos(null);
              }}
              onDragEnd={() => {
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
