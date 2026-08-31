import ColorButton from "./ColorButton";
import { TagBudget } from "./TagBudget";

interface ProjectCardProps {
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  position: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveDemoUrl: string;
  isDragging: boolean;
  isDraggingOver: boolean;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, position: number) => void;
}

export function ProjectCard({
  handleEdit,
  handleDelete,
  position,
  title,
  tags,
  githubUrl,
  liveDemoUrl,

  isDragging,
  isDraggingOver,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragEnd,
  onDrop,
}: ProjectCardProps) {
  return (
    <div
      draggable={true}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragStart={(e) => {
        e.dataTransfer.setData("position", position.toString());
        onDragStart?.(e, position);
      }}
      className={`flex flex-row w-full bg-bg-alt px-3 py-2 justify-between items-start gap-5 transition-all duration-100 ${
        isDraggingOver
          ? "mt-8 border-2 border-dashed border-blue rounded-2xl"
          : ""
      } ${
        isDragging
          ? "opacity-90 border-2 rounded-2xl origin-top-left rotate-1  border-blue"
          : ""
      }`}
    >
      <p className="tracking-tight font-light text-ink-soft text-[0.9rem] font-inter">
        {(position + 1).toString().padStart(2, "0")}
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
          onClick={handleEdit ? () => handleEdit(position) : undefined}
          isActive={true}
        />
        <ColorButton
          border="border border-line"
          color="transparent"
          text="Löschen"
          onClick={handleDelete ? () => handleDelete(position) : undefined}
          isActive={true}
        />
      </div>
    </div>
  );
}
