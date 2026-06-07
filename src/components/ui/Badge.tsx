import type { StageType } from "@/lib/types";

const STAGE_META: Record<StageType, { label: string; className: string }> = {
  shortform: { label: "숏폼", className: "bg-blue-100 text-blue-700" },
  microlearning: { label: "마이크로러닝", className: "bg-green-100 text-green-700" },
  apply: { label: "적용하기", className: "bg-orange-100 text-orange-700" },
  deepdive: { label: "심화", className: "bg-purple-100 text-purple-700" },
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
