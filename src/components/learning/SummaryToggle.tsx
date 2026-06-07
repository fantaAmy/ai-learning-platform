"use client";

import { useState } from "react";

export default function SummaryToggle({ summary }: { summary: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-100 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900"
      >
        <span>텍스트 요약 보기</span>
        <span className="text-gray-400">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="border-t border-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-600">
          {summary}
        </p>
      )}
    </div>
  );
}
