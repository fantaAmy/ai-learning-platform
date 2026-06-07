"use client";

import { use, useCallback, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import VideoPlayer from "@/components/learning/VideoPlayer";
import SummaryToggle from "@/components/learning/SummaryToggle";
import QuizSection from "@/components/learning/QuizSection";
import MissionChecklist from "@/components/learning/MissionChecklist";
import RequireAuth from "@/components/layout/RequireAuth";
import { getCourse } from "@/lib/courses";
import { useAuth } from "@/contexts/AuthContext";
import {
  getProgress,
  getProgressPercent,
  markStageComplete,
  setLastStage,
} from "@/lib/progress";
import type { Course } from "@/lib/types";

export default function LearnPage({
  params,
}: {
  params: Promise<{ id: string; stage: string }>;
}) {
  const { id, stage } = use(params);
  const course = getCourse(id);
  const stageIndex = Number(stage);

  if (!course || Number.isNaN(stageIndex) || !course.stages[stageIndex]) {
    notFound();
  }

  return (
    <RequireAuth>
      <LearnInner course={course} stageIndex={stageIndex} />
    </RequireAuth>
  );
}

function LearnInner({
  course,
  stageIndex,
}: {
  course: Course;
  stageIndex: number;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const total = course.stages.length;
  const stage = course.stages[stageIndex];
  const isLast = stageIndex === total - 1;

  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    if (!user) return;
    setLastStage(user.id, course.courseId, stageIndex);
    setCompletedStages(getProgress(user.id, course.courseId).completedStages);
  }, [user, course.courseId, stageIndex]);

  const complete = useCallback(() => {
    if (!user) return;
    const next = markStageComplete(
      user.id,
      course.courseId,
      stageIndex,
      total
    );
    setCompletedStages(next.completedStages);
  }, [user, course.courseId, stageIndex, total]);

  function handleNext() {
    complete();
    if (isLast) {
      router.push(`/courses/${course.courseId}`);
    } else {
      router.push(`/courses/${course.courseId}/learn/${stageIndex + 1}`);
    }
  }

  const liveCompleted = completedStages.includes(stageIndex)
    ? completedStages
    : [...completedStages, stageIndex];
  const percent = getProgressPercent(
    { completedStages: liveCompleted, lastStage: stageIndex },
    total
  );

  return (
    <div>
      {/* 상단 진행 바 (항상 표시) */}
      <div className="sticky top-14 z-30 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <Link
              href={`/courses/${course.courseId}`}
              className="text-gray-400 hover:text-gray-700"
            >
              ← {course.title}
            </Link>
            <span className="text-gray-400">
              {stageIndex + 1} / {total}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
        <div className="flex items-center gap-2">
          <Badge type={stage.type} />
          <h1 className="text-xl font-bold text-gray-900">{stage.title}</h1>
        </div>

        {stage.type === "shortform" && (
          <ShortformStage videoUrl={stage.videoUrl!} title={stage.title} />
        )}
        {stage.type === "microlearning" && (
          <MicrolearningStage
            videoUrl={stage.videoUrl!}
            title={stage.title}
            summary={stage.summary ?? ""}
          />
        )}
        {stage.type === "apply" && (
          <ApplyStage stage={stage} onQuizComplete={complete} />
        )}
        {stage.type === "deepdive" && <DeepdiveStage stage={stage} />}

        <div className="pt-2">
          <Button onClick={handleNext} size="lg" fullWidth>
            {stage.type === "shortform" && stage.cta
              ? stage.cta
              : isLast
                ? "강좌 완료하기"
                : "다음 단계로"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ShortformStage({
  videoUrl,
  title,
}: {
  videoUrl: string;
  title: string;
}) {
  return (
    <div>
      <VideoPlayer url={videoUrl} title={title} vertical />
      <p className="mt-3 text-center text-sm text-gray-400">
        45초 안에 핵심만! 다 봤다면 학습을 시작하세요.
      </p>
    </div>
  );
}

function MicrolearningStage({
  videoUrl,
  title,
  summary,
}: {
  videoUrl: string;
  title: string;
  summary: string;
}) {
  return (
    <div className="space-y-4">
      <VideoPlayer url={videoUrl} title={title} />
      {summary && <SummaryToggle summary={summary} />}
    </div>
  );
}

function ApplyStage({
  stage,
  onQuizComplete,
}: {
  stage: Course["stages"][number];
  onQuizComplete: () => void;
}) {
  return (
    <div className="space-y-6">
      {stage.quiz && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-700">퀴즈</h2>
          <QuizSection quiz={stage.quiz} onComplete={onQuizComplete} />
        </div>
      )}
      {stage.mission && <MissionChecklist mission={stage.mission} />}
    </div>
  );
}

function DeepdiveStage({ stage }: { stage: Course["stages"][number] }) {
  return (
    <div className="space-y-4">
      <VideoPlayer url={stage.videoUrl!} title={stage.title} />

      {stage.chapters && stage.chapters.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-gray-900">챕터</p>
          <ul className="space-y-1.5">
            {stage.chapters.map((ch, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="w-12 shrink-0 font-mono text-indigo-600">
                  {ch.time}
                </span>
                <span className="text-gray-600">{ch.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {stage.references && stage.references.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-gray-900">
            더 알아보기
          </p>
          <ul className="space-y-2">
            {stage.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  {ref.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
