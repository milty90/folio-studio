interface ColorButtonProps {
  color: string;
  text: string;
  border?: string;
  height?: string;
  onClick?: () => void;
}

export default function ColorButton({
  color,
  text,
  height,
  border,
  onClick,
}: ColorButtonProps) {
  return (
    <button
      className={`bg-${color} text-ink/80 px-5 ${height ?? "py-2"} ${border}
       font-semibold text-[0.85rem] rounded-full whitespace-nowrap  hover:bg-ink hover:text-bg transition-color duration-300 `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
