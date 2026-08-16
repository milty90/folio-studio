import { useState, useRef } from "react";

interface FileInputProps {
  color?: "blue" | "transparent";
  text?: string;
  border?: string;
  height?: string;
  onClick?: () => void;
  isActive?: boolean;
  label?: string;
}

function FileInput({
  color = "blue",
  text = "file auswählen",
  border = "",
  height,

  label,
  isActive = true,
}: FileInputProps) {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col mt-0.5 gap-1">
      <label className="uppercase ml-2  text-nowrap font-medium text-ink-soft/80 tracking-wider mr-1 mb-1 text-[0.82rem] font-monospace">
        {label}
      </label>
      <div className="flex flex-row gap-1 justify-between px-2.5 items-center">
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={(e) =>
            setFileName(e.target.files ? e.target.files[0].name : "")
          }
        />
        <span className="text-ink/90 text-[0.82rem] font-monospace">
          {fileName || "Keine ausgewählt"}
        </span>
        <button
          type="button"
          className={`bg-${color} text-ink/80 px-5 ${height ?? "py-2"} ${border} font-semibold text-[0.85rem] rounded-full whitespace-nowrap ${isActive ? "" : "opacity-70 cursor-not-allowed hover:bg-transparent hover:text-ink/80"} hover:bg-ink hover:text-bg transition-color duration-300`}
          onClick={() => {
            if (isActive && inputRef.current) {
              inputRef.current.click();
            }
          }}
        >
          {text}
        </button>
      </div>
    </div>
  );
}
export default FileInput;
