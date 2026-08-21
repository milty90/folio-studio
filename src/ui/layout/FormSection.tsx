import { InputField } from "../components/InputField";

import ColorButton from "../components/ColorButton";
import FileInput, { type FileInputHandler } from "../components/FileInput";

interface FormSectionProps {
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
  position: string;
  onFileChange: (file: File | null) => void;
  fileName?: string;
  ref?: React.Ref<FileInputHandler>;
  isLoggedIn: boolean | null;
  title: string;
  titleError?: boolean;
  description: string;
  descriptionError?: boolean;
  tags: string;
  tagsError?: boolean;
  githubRepo: string;
  githubRepoError?: boolean;
  liveDemo: string;
  liveDemoError?: boolean;
  fileError?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;

}

export function FormSection({
  onSave,
  onCancel,
  onChange,
  onFileChange,
  fileName,
  ref,
 isLoggedIn,
  title,
  description,
  tags,
  githubRepo,
  liveDemo,
  inputRef,
  titleError,
  descriptionError,
  tagsError,
  githubRepoError,
  fileError,
  liveDemoError,
}: FormSectionProps) {
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
            inputRef={inputRef}
            isActive={true}
            label="Titel"
            value={title}
            error={titleError}
       
            hint="z.B Portfolio website"
            onChange={(value) => onChange("title", value)}
          />
          
        
          <InputField
           isActive={true}
            label="Beschreibung"
            error={descriptionError}
            value={description}
            type="textarea"
            hint="Kurze Beschreibung des Projekts"
            onChange={(value) => onChange("description", value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <FileInput
          inputRef={inputRef}
          ref={ref}
          fileName={fileName}
          error={fileError}
          isActive={true}
          label="Hauptbild Hochladen"
          text="Bild auswählen"
          onFileSelect={onFileChange}
          />
          <InputField
            isActive={true}
            label="Tags"
            error={tagsError}
            value={tags}
            hint="React TailwindCSS TypeScript"
            onChange={(value) => onChange("tags", value)}
          />
          <InputField
            isActive={true}
            label="GitHub Repo"
            error={githubRepoError}
            value={githubRepo}
            hint="Link zum GitHub Repository"
            onChange={(value) => onChange("githubRepo", value)}
          />
          <InputField
            isActive={true}
            label="Live Demo"
            error={liveDemoError}
            value={liveDemo}
            hint="Link zur Live Demo"
            onChange={(value) => onChange("liveDemo", value)}
          />
        </div>
        <div className="flex flex-row pt-3 pr-1 justify-end gap-3">
          <ColorButton
            isActive={true}
            color="transparent"
            text="Entfernen"
            onClick={onCancel}
          />

          <ColorButton
            border={`border ${isLoggedIn ? "border-transparent" : "border-line"}`}
            isActive={isLoggedIn ? true : false}
            color={isLoggedIn ? "blue" : "transparent"}
            text="Speichern"
            onClick={onSave}
          />
        </div>
      </div>
    </section>
  );
}
