import ColorButton from "./ColorButton";
import { TagBudget } from "./TagBudget";

interface ProjectCardProps {
  position: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveDemoUrl: string;
  isDragging: boolean;
}

export function ProjectCard({
  position,
  title,
  tags,
  githubUrl,
  liveDemoUrl,
  isDragging ,
}: ProjectCardProps) {
  return (
    <div draggable={true} className={`flex flex-row w-full bg-bg-alt px-3 py-2 justify-between items-start gap-5 ${isDragging ? "opacity-50 border  border-line" : ""}`}>
      <p className="tracking-tight   font-light text-ink-soft text-[0.9rem] font-inter">
        {position.toString().padStart(2, "0")}
      </p>
      <div className="flex flex-col w-full gap-1">
        <p className="tracking-tight text-nowrap font-medium text-ink/80 text-[0.94rem] font-inter">
          {title}
        </p>
        <div className="flex flex-row flex-wrap -ml-1 pt-1 gap-2">
          {tags.map((tag) => (
            <TagBudget key={tag} tag={tag} />
          ))}
        </div>
        <div className="text-ink-soft tracking-wide mr-1 gap-5 text-sm pb-3 pt-2 font-monospace flex flex-row items-center">
          <a href={githubUrl}>Code ⤍ </a>
          <a href={liveDemoUrl}>Link ⤍ </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <ColorButton
          border="border border-line"
          color="transparent"
          text="Bearbeiten"
          onClick={() => {}}
        />
        <ColorButton
          border="border border-line"
          color="transparent"
          text="Löschen"
          onClick={() => {}}
        /></div>
        
    </div>
  );
}
