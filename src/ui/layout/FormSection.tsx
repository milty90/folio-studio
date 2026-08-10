import { InputField } from "../componenets/InputField";
import ColorButton from "../componenets/ColorButton";

export function FormSection() {
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
            value=""
            hint="z.B Portfolio website"
            onChange={() => {}}
          />
          <InputField
            label="Beschreibung"
            value=""
            type="textarea"
            hint="Kurze Beschreibung des Projekts"
            onChange={() => {}}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <InputField
            label="Hauptbild"
            value=""
            hint="Hauptbild des Projekts"
            type="text"
            onChange={() => {}}
          />
          <InputField
            label="Tags"
            value=""
            hint="React, TailwindCSS, TypeScript"
            onChange={() => {}}
          />
          <InputField
            label="GitHub Repo"
            value=""
            hint="Link zum GitHub Repository"
            onChange={() => {}}
          />
          <InputField
            label="Live Demo"
            value=""
            hint="Link zur Live Demo"
            onChange={() => {}}
          />
        </div>
        <div className="flex flex-row pt-3 pr-1 justify-end gap-3">
          <ColorButton
            color="transparent"
            text="Abbrechen"
            onClick={() => {}}
          />
          <ColorButton color="blue" text="Speichern" onClick={() => {}} />
        </div>
      </div>
    </section>
  );
}
