"use client";

import Link from "next/link";
import { stageLabel } from "@/components/ui/Badge";
import type { Stage } from "@/lib/types";

const ACCENT: Record<Stage["type"], string> = {
  shortform: "bg-blue-500",
  microlearning: "bg-green-500",
  apply: "bg-orange-500",
  deepdive: "bg-purple-500",
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
              className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                active
                  ? "border-indigo-300 bg-indigo-50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ${
                  done ? "bg-indigo-500" : ACCENT[stage.type]
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-gray-900">
                  {stage.title}
                </span>
                <span className="block text-xs text-gray-400">
                  {stageLabel(stage.type)}
                </span>
              </span>
              {done && (
                <span className="text-xs font-medium text-indigo-600">완료</span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
