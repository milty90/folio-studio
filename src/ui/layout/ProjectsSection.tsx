import { ProjectCard } from "../components/ProjectCard";
import type { Database } from "../../../types/database.types";
import { memo } from "react";

interface ProjectsSectionProps {
  projects: Database["public"]["Tables"]["portfolio-projects"]["Row"][];
}

function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="flex flex-col pt-10 gap-3">
      <div className="flex flex-row justify-between items-center gap-5">
        <p className=" uppercase pl-4 text-nowrap font-medium text-ink-soft tracking-wider mr-1 text-sm font-monospace">
          Projekte
        </p>
        <p className="flex flex-row items-center gap-2 cursor-pointer text-nowrap text-ink-soft tracking-wide mr-1 text-sm font-monospace">
          ↻ refresh
        </p>
        <div className="text-line border-b w-svw mr-4"></div>
      </div>
      <div className="bg-bg-alt border border-line rounded-2xl p-6 pb-4 justify-between items-center gap-5">
        <div className="flex flex-col divide-y divide-line/60 bp-6 justify-between items-center gap-5">
          {projects.map((project, index) => (
            <ProjectCard
             isDragging={false}
              key={project.id}
              position={index + 1}
              title={project.title || ""}
              description={project.descr || ""}
              tags={(project.tags as string[]) || []}
              imageUrl={project.img || ""}
              githubUrl={project.code || ""}
              liveDemoUrl={project.live || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default memo(ProjectsSection);
