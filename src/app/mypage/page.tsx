"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/layout/RequireAuth";
import ProgressBar from "@/components/course/ProgressBar";
import { ButtonLink } from "@/components/ui/Button";
import { courses } from "@/lib/courses";
import { useAuth } from "@/contexts/AuthContext";
import { getProgress, getProgressPercent, isCourseComplete } from "@/lib/progress";

interface Row {
  courseId: string;
  title: string;
  total: number;
  completedCount: number;
  percent: number;
  complete: boolean;
  completedAt?: string;
}

export default function MyPage() {
  return (
    <RequireAuth>
      <MyPageInner />
    </RequireAuth>
  );
}

function MyPageInner() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!user) return;
    setRows(
      courses.map((course) => {
        const progress = getProgress(user.id, course.courseId);
        const total = course.stages.length;
        return {
          courseId: course.courseId,
          title: course.title,
          total,
          completedCount: progress.completedStages.length,
          percent: getProgressPercent(progress, total),
          complete: isCourseComplete(progress, total),
          completedAt: progress.completedAt,
        };
      })
    );
  }, [user]);

  const started = rows.filter((r) => r.completedCount > 0);
  const badges = rows.filter((r) => r.complete);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white">내 활동</h1>
        <p className="mt-1 text-gray-500">{user?.name || user?.email}님</p>
      </header>

      <div className="mb-10 grid grid-cols-3 gap-3">
        <Stat label="진행 중" value={started.length} />
        <Stat label="완주" value={badges.length} />
        <Stat label="전체" value={rows.length} />
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-white">완주 배지</h2>
        {badges.length === 0 ? (
          <p className="rounded-lg border border-dashed border-[#333] bg-[#1f1f1f] p-6 text-center text-sm text-gray-600">
            아직 완주한 콘텐츠가 없어요. 첫 배지를 노려봐요!
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {badges.map((b) => (
              <div key={b.courseId} className="rounded-lg border border-[#E50914]/30 bg-[#E50914]/10 px-4 py-3 text-center">
                <div className="text-2xl">🏅</div>
                <p className="mt-1 text-sm font-bold text-[#E50914]">{b.title}</p>
                {b.completedAt && (
                  <p className="text-xs text-gray-600">{new Date(b.completedAt).toLocaleDateString("ko-KR")}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-white">진행 현황</h2>
        {started.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#333] bg-[#1f1f1f] p-6 text-center">
            <p className="text-sm text-gray-600">아직 시작한 콘텐츠가 없어요.</p>
            <div className="mt-3">
              <ButtonLink href="/courses" size="sm">콘텐츠 보러 가기</ButtonLink>
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {started.map((r) => (
              <li key={r.courseId}>
                <Link href={`/courses/${r.courseId}`}
                  className="block rounded-lg border border-[#333] bg-[#1f1f1f] p-4 hover:border-[#555] hover:bg-[#2a2a2a] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{r.title}</span>
                    <span className="text-xs text-gray-600">{r.completedCount}/{r.total} 단계</span>
                  </div>
                  <ProgressBar percent={r.percent} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#333] bg-[#1f1f1f] p-4 text-center">
      <p className="text-3xl font-black text-[#E50914]">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}
