import { forwardRef } from "react";

interface FileInputProps {
  color?: "blue" | "transparent";
  text?: string;
  border?: string;
  height?: string;
  onFileSelect?: (file: File | null) => void;
  fileName?: string;
  isActive?: boolean;
  label?: string;
  error?: boolean;
  ref?: React.RefObject<{ reset: () => void }>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export interface FileInputHandler {
  reset: () => void;
}

const FileInput = forwardRef<FileInputHandler, FileInputProps>(({
  color = "blue",
  text = "file auswählen",
  border = "",
  height,
  fileName,
  label,
  error,
  onFileSelect,
  isActive = true,
  inputRef,
} ) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileSelect?.(file);
  };

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
          onChange={handleChange}
        />
        <span className={`${error ? "text-red-800" : "text-ink/90"} text-[0.82rem] font-monospace`}>
          {fileName || "Keine ausgewählt"}
        </span>
        <button
          type="button"
          className={`bg-${color} text-ink/80 px-5 ${height ?? "py-2"} ${border} font-semibold text-[0.85rem] rounded-full whitespace-nowrap ${isActive ? "" : "opacity-70 cursor-not-allowed hover:bg-transparent hover:text-ink/80"} hover:bg-ink hover:text-bg transition-color duration-300`}
          onClick={() => {
            if (isActive) {
              inputRef?.current?.click();
            }
          }}
        >
          {text}
        </button>
      </div>
    </div>
  );
});

FileInput.displayName = "FileInput";
export default FileInput;
