import type { StageType } from "@/lib/types";

const STAGE_META: Record<StageType, { label: string; className: string }> = {
  shortform:     { label: "훑어보기",   className: "bg-blue-900/60 text-blue-300 border border-blue-700/50" },
  microlearning: { label: "파고들기",   className: "bg-emerald-900/60 text-emerald-300 border border-emerald-700/50" },
  apply:         { label: "써먹기",     className: "bg-orange-900/60 text-orange-300 border border-orange-700/50" },
  deepdive:      { label: "제대로 파기", className: "bg-purple-900/60 text-purple-300 border border-purple-700/50" },
};

export function stageLabel(type: StageType): string {
  return STAGE_META[type].label;
}

export default function Badge({
  type,
  className = "",
}: {
  type: StageType;
  className?: string;
}) {
  const meta = STAGE_META[type];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className} ${className}`}
    >
      {meta.label}
    </span>
  );
}
