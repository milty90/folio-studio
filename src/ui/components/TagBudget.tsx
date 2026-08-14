interface TagBudgetProps {
  tag: string;
}
export function TagBudget({ tag }: TagBudgetProps) {
  return (
    <div className="flex flex-col w-fit bg-blue/50 rounded-full px-2 items-center justify-center">
      <p className="uppercase text-nowrap mt-0.5 font-medium text-ink/90 tracking-wider  text-[0.7rem] font-monospace">
        {tag}
      </p>
    </div>
  );
}
