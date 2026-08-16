interface ColorButtonProps {
  color: "blue" | "transparent";
  text: string;
  border?: string;
  height?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export default function ColorButton({
  color,
  text,
  height,
  border,
  onClick,
  isActive,
}: ColorButtonProps) {
  return (
    <button
      disabled={!isActive}
      className={`bg-${color} text-ink/80 px-5 ${height ?? "py-2"} ${border}
       font-semibold text-[0.85rem] rounded-full whitespace-nowrap ${isActive ? "" : "opacity-70 cursor-not-allowed hover:bg-transparent hover:text-ink/80"} hover:bg-ink hover:text-bg transition-color duration-300 `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
