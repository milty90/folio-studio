import { forwardRef } from "react";
import ColorButton from "./ColorButton";

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
  isLoggedIn?: boolean;
  ref?: React.RefObject<{ reset: () => void }>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export interface FileInputHandler {
  reset: () => void;
}

const FileInput = forwardRef<FileInputHandler, FileInputProps>(
  ({
    isLoggedIn,
    fileName,
    label,
    error,
    onFileSelect,
    isActive,
    inputRef,
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      onFileSelect?.(file);
    };

    return (
      <div className="flex flex-col mt-0.5 gap-1">
        <label className="uppercase ml-2 text-nowrap font-medium text-ink-soft/80 tracking-wider mr-1 mb-1 text-[0.82rem] font-monospace">
          {label}
        </label>
        <div className="flex flex-row gap-1 justify-between px-2.5 items-center">
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={handleChange}
          />
          <span
            className={`${error ? "text-red-800/90" : "text-ink/80"} text-[0.82rem] font-monospace text-wrap overflow-hidden whitespace-nowrap overflow-ellipsis`}
          >
            {fileName || "Keine ausgewählt"}
          </span>

          <ColorButton
            border={`border ${isLoggedIn ? "border-transparent" : "border-line"}`}
            isActive={isLoggedIn ? true : false}
            color={isLoggedIn ? "blue" : "transparent"}
            text="Bild auswählen"
            onClick={() => {
              if (isActive) {
                inputRef?.current?.click();
              }
            }}
          />
        </div>
      </div>
    );
  },
);

FileInput.displayName = "FileInput";
export default FileInput;
