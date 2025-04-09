import { Prompts } from "@/components/Prompts";

export default function Workspace() {
  return (
    <div className="flex h-[90vh] justify-center items-center">
      <div className="max-w-[70vw] min-w-[70vw]">
        <Prompts />
      </div>
    </div>
  );
}
