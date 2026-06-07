"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/layout/RequireAuth";
import ProgressBar from "@/components/course/ProgressBar";
import { ButtonLink } from "@/components/ui/Button";
import { courses } from "@/lib/courses";
import { useAuth } from "@/contexts/AuthContext";
import {
  getProgress,
  getProgressPercent,
  isCourseComplete,
} from "@/lib/progress";

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
        <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
        <p className="mt-1 text-sm text-gray-500">
          {user?.name}님, 환영합니다 ({user?.email})
        </p>
      </header>

      <div className="mb-8 grid grid-cols-3 gap-3">
        <Stat label="수강 중" value={started.length} />
        <Stat label="완주" value={badges.length} />
        <Stat label="전체 강좌" value={rows.length} />
      </div>

      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">완주 배지</h2>
        {badges.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-400">
            아직 완주한 강좌가 없어요. 첫 배지를 획득해 보세요!
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {badges.map((b) => (
              <div
                key={b.courseId}
                className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-center"
              >
                <div className="text-2xl">🏅</div>
                <p className="mt-1 text-sm font-medium text-indigo-700">
                  {b.title}
                </p>
                {b.completedAt && (
                  <p className="text-xs text-indigo-400">
                    {new Date(b.completedAt).toLocaleDateString("ko-KR")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">수강 이력</h2>
        {started.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center">
            <p className="text-sm text-gray-400">아직 시작한 강좌가 없어요.</p>
            <div className="mt-3">
              <ButtonLink href="/courses" size="sm">
                강좌 둘러보기
              </ButtonLink>
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {started.map((r) => (
              <li key={r.courseId}>
                <Link
                  href={`/courses/${r.courseId}`}
                  className="block rounded-2xl border border-gray-100 bg-white p-4 hover:border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {r.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {r.completedCount}/{r.total} 단계
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar percent={r.percent} />
                  </div>
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
    <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center">
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}
