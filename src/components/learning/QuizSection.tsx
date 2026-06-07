"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";

export default function QuizSection({
  quiz,
  onComplete,
}: {
  quiz: QuizQuestion[];
  onComplete?: () => void;
}) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  function choose(qi: number, oi: number) {
    if (checked[qi]) return;
    setSelected((s) => ({ ...s, [qi]: oi }));
  }

  function check(qi: number) {
    if (selected[qi] === undefined) return;
    const next = { ...checked, [qi]: true };
    setChecked(next);
    if (quiz.every((_, i) => next[i]) && onComplete) onComplete();
  }

  return (
    <div className="space-y-6">
      {quiz.map((item, qi) => {
        const isOX = item.options.length === 2 && item.options[0] === "O";
        const userPick = selected[qi];
        const isChecked = checked[qi];
        const correct = userPick === item.answer;
        return (
          <div
            key={qi}
            className="rounded-2xl border border-gray-100 bg-white p-4"
          >
            <p className="font-medium text-gray-900">
              Q{qi + 1}. {item.q}
            </p>
            <div
              className={`mt-3 grid gap-2 ${isOX ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {item.options.map((opt, oi) => {
                const picked = userPick === oi;
                let style = "border-gray-200 text-gray-700 hover:border-gray-300";
                if (isChecked) {
                  if (oi === item.answer)
                    style = "border-green-400 bg-green-50 text-green-700";
                  else if (picked)
                    style = "border-red-300 bg-red-50 text-red-600";
                  else style = "border-gray-200 text-gray-400";
                } else if (picked) {
                  style = "border-indigo-400 bg-indigo-50 text-indigo-700";
                }
                return (
                  <button
                    key={oi}
                    onClick={() => choose(qi, oi)}
                    disabled={isChecked}
                    className={`rounded-xl border px-4 py-2.5 text-left text-sm transition ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {!isChecked ? (
              <button
                onClick={() => check(qi)}
                disabled={userPick === undefined}
                className="mt-3 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-40"
              >
                정답 확인
              </button>
            ) : (
              <div
                className={`mt-3 rounded-xl p-3 text-sm ${
                  correct
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                <span className="font-semibold">
                  {correct ? "정답입니다! " : "아쉬워요. "}
                </span>
                {item.explain}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
