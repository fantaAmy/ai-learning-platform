"use client";

import { useState } from "react";
import type { Mission } from "@/lib/types";

export default function MissionChecklist({ mission }: { mission: Mission }) {
  const [done, setDone] = useState<boolean[]>(
    () => mission.checklist.map(() => false)
  );

  function toggle(i: number) {
    setDone((d) => d.map((v, idx) => (idx === i ? !v : v)));
  }

  const completed = done.filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">실습 미션</p>
          <p className="text-xs text-gray-400">
            도구: {mission.tool} · {completed}/{mission.checklist.length} 완료
          </p>
        </div>
        <a
          href={mission.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-indigo-500 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
        >
          {mission.tool} 열기 ↗
        </a>
      </div>
      <ul className="mt-4 space-y-2">
        {mission.checklist.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm hover:bg-gray-50"
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-md border text-xs ${
                  done[i]
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-gray-300 text-transparent"
                }`}
              >
                ✓
              </span>
              <span
                className={done[i] ? "text-gray-400 line-through" : "text-gray-700"}
              >
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
