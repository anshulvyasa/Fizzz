export function TemplateButtons({
  onTemplateClick,
}: {
  onTemplateClick: (text: string) => void;
}) {
  return (
    <div className="w-full flex flex-col justify-center align-middle items-center md:flex-row flex-wrap gap-2 py-8">
      <TemplateButton text="create a chat app" onClick={onTemplateClick} />
      <TemplateButton text="create a todo app" onClick={onTemplateClick} />
      <TemplateButton text="create a docs app" onClick={onTemplateClick} />
      <TemplateButton text="create a docs App" onClick={onTemplateClick} />
    </div>
  );
}

function TemplateButton({
  text,
  onClick,
}: {
  text: string;
  onClick: (text: string) => void;
}) {
  return (
    <span
      onClick={() => onClick(text)}
      onKeyDown={(e) => e.key == "enter" && onClick(text)}
      onKeyUp={(e) => e.key == "enter" && onClick(text)}
      className="w-fit cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-sm transition-theme"
    >
      {text}
    </span>
  );
}
