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
  const resumeStage = progress ? Math.min(progress.lastStage, total - 1) : 0;
  const hasStarted = progress ? progress.completedStages.length > 0 : false;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="overflow-hidden rounded-xl border border-[#333] bg-[#1f1f1f]">
        <div className="relative aspect-video w-full bg-[#111]">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-black text-white">{course.title}</h1>
          <p className="mt-2 text-gray-400">{course.description}</p>
          <p className="mt-3 text-sm text-gray-600">약 {course.estimatedMinutes}분 · {total}단계</p>

          {user && (
            <div className="mt-4 space-y-2">
              <ProgressBar percent={percent} showLabel />
              {complete && (
                <p className="text-sm font-semibold text-[#E50914]">🎉 완주 완료! 배지 획득</p>
              )}
            </div>
          )}

          <div className="mt-6">
            <ButtonLink href={`/courses/${course.courseId}/learn/${resumeStage}`} size="lg" fullWidth>
              {hasStarted ? "이어보기" : "지금 시작"}
            </ButtonLink>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-white">4단계 구성</h2>
        <StageNav
          courseId={course.courseId}
          stages={course.stages}
          completedStages={progress?.completedStages ?? []}
        />
      </section>
    </div>
  );
}
