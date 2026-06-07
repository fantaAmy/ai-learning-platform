"use client";

import Link from "next/link";
import { stageLabel } from "@/components/ui/Badge";
import type { Stage } from "@/lib/types";

const ACCENT: Record<Stage["type"], string> = {
  shortform: "bg-blue-600",
  microlearning: "bg-emerald-600",
  apply: "bg-orange-600",
  deepdive: "bg-purple-600",
};

export default function StageNav({
  courseId,
  stages,
  completedStages,
  currentStage,
}: {
  courseId: string;
  stages: Stage[];
  completedStages: number[];
  currentStage?: number;
}) {
  return (
    <ol className="space-y-2">
      {stages.map((stage, i) => {
        const done = completedStages.includes(i);
        const active = currentStage === i;
        return (
          <li key={i}>
            <Link
              href={`/courses/${courseId}/learn/${i}`}
              className={`flex items-center gap-3 rounded-lg border p-3 transition ${
                active
                  ? "border-[#E50914]/50 bg-[#E50914]/10"
                  : "border-[#333] bg-[#1f1f1f] hover:border-[#555] hover:bg-[#2a2a2a]"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ${
                  done ? "bg-[#E50914]" : ACCENT[stage.type]
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-white">{stage.title}</span>
                <span className="block text-xs text-gray-500">{stageLabel(stage.type)}</span>
              </span>
              {done && (
                <span className="text-xs font-medium text-[#E50914]">완료</span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
