import { InputField } from "../components/InputField";

import ColorButton from "../components/ColorButton";

interface FormSectionProps {
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;

  title: string;
  description: string;
  mainImage: File | null;
  tags: string;
  githubRepo: string;
  liveDemo: string;
}

export function FormSection({
  onSave,
  onCancel,
  onChange,

  title,
  description,
  mainImage,
  tags,
  githubRepo,
  liveDemo,
}: FormSectionProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
    }
  };

  return (
    <section className="flex flex-col pt-10 gap-3">
      <div className="flex flex-row justify-between items-center gap-5">
        <p className=" uppercase pl-4 text-nowrap font-medium text-ink-soft tracking-wider mr-1 text-sm font-monospace">
          Neues Projekt
        </p>
        <div className="text-line border-b w-svw mr-4"></div>
      </div>
      <div className="bg-bg-alt border border-line rounded-2xl p-6 pb-5.5 justify-between items-center gap-5">
        <div className="flex flex-col mb-5 gap-3">
          <InputField
            label="Titel"
            value={title}
            hint="z.B Portfolio website"
            onChange={(value) => onChange("title", value)}
          />
          <InputField
            label="Beschreibung"
            value={description}
            type="textarea"
            hint="Kurze Beschreibung des Projekts"
            onChange={(value) => onChange("description", value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex flex-row gap-1">
            <InputField
              label="Hauptbild"
              value={mainImage ? mainImage.name : ""}
              onChange={() => {}}
              hint="Hauptbild des Projekts"
              type="file"
            />
          </div>
          <InputField
            label="Tags"
            value={tags}
            hint="React, TailwindCSS, TypeScript"
            onChange={(value) => onChange("tags", value)}
          />
          <InputField
            label="GitHub Repo"
            value={githubRepo}
            hint="Link zum GitHub Repository"
            onChange={(value) => onChange("githubRepo", value)}
          />
          <InputField
            label="Live Demo"
            value={liveDemo}
            hint="Link zur Live Demo"
            onChange={(value) => onChange("liveDemo", value)}
          />
        </div>
        <div className="flex flex-row pt-3 pr-1 justify-end gap-3">
          <ColorButton
            color="transparent"
            text="Entfernen"
            onClick={onCancel}
          />
          <ColorButton color="blue" text="Speichern" onClick={onSave} />
        </div>
      </div>
    </section>
  );
}
