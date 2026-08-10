interface InputFieldProps {
  label: string;
  type?: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}
export function InputField({
  label,
  type,
  hint,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col mb-1 gap-1">
      <label className="uppercase ml-2  text-nowrap font-medium text-ink-soft/80 tracking-wider mr-1 mb-1 text-[0.82rem] font-monospace">
        {label}
      </label>
      <input
        placeholder={hint}
        type={type}
        className="text-ink font-normal h-10 border bg-bg/30 border-line placeholder:text-[0.82rem] placeholder:text-ink-faint placeholder:pl-1.5  focus:border-blue focus:outline focus:outline-blue rounded-md px-2 py-1 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
