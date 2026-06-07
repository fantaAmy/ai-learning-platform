"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import ProgressBar from "@/components/course/ProgressBar";
import StageNav from "@/components/course/StageNav";
import { getCourse } from "@/lib/courses";
import { useAuth } from "@/contexts/AuthContext";
import {
  getProgress,
  getProgressPercent,
  isCourseComplete,
} from "@/lib/progress";
import type { Progress } from "@/lib/types";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const course = getCourse(id);
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    if (user && course) setProgress(getProgress(user.id, course.courseId));
    else setProgress(null);
  }, [user, course]);

  if (!course) notFound();

  const total = course.stages.length;
  const percent = progress ? getProgressPercent(progress, total) : 0;
  const complete = progress ? isCourseComplete(progress, total) : false;
  const resumeStage = progress
    ? Math.min(progress.lastStage, total - 1)
    : 0;
  const hasStarted = progress ? progress.completedStages.length > 0 : false;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="relative aspect-video w-full bg-gray-100">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          <p className="mt-2 text-gray-600">{course.description}</p>
          <p className="mt-3 text-sm text-gray-400">
            약 {course.estimatedMinutes}분 · {total}단계 구성
          </p>

          {user && (
            <div className="mt-4 space-y-2">
              <ProgressBar percent={percent} showLabel />
              {complete && (
                <p className="text-sm font-medium text-indigo-600">
                  🎉 완주했어요! 배지를 획득했습니다.
                </p>
              )}
            </div>
          )}

          <div className="mt-5">
            <ButtonLink
              href={`/courses/${course.courseId}/learn/${resumeStage}`}
              size="lg"
              fullWidth
            >
              {hasStarted ? "이어보기" : "학습 시작하기"}
            </ButtonLink>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          학습 단계
        </h2>
        <StageNav
          courseId={course.courseId}
          stages={course.stages}
          completedStages={progress?.completedStages ?? []}
        />
      </section>
    </div>
  );
}
