interface InputFieldProps {
  label: string;
  type?: string;
  hint?: string;
  value: string;
  isActive?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  error?: boolean;
  onChange: (value: string) => void;
}
export function InputField({
  label,
  type,
  hint,
  value,
  isActive,
  inputRef,
  error,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col mb-1 gap-1">
      <label className="uppercase ml-2  text-nowrap font-medium text-ink-soft/80 tracking-wider mr-1 mb-1 text-[0.82rem] font-monospace">
        {label}
      </label>
      <input
        disabled={!isActive}
        placeholder={hint}
        type={type}
        ref={inputRef}
        className={`text-ink pl-3 
        font-normal ${type === "textarea" ? "h-20" : "h-10"} border bg-bg/30 border-line 
        placeholder:text-[0.82rem]  placeholder:pl-1 
        focus:outline rounded-md px-2 py-1 text-sm font-monospace 
        ${
          error
            ? "border-red-900 placeholder:text-red-800/90 focus:border-red-900 focus:ring focus:ring-red-500"
            : "border-line placeholder:text-ink-faint focus:border-blue focus:ring focus:ring-blue-500"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
