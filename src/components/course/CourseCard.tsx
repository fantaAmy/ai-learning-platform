"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "./ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
import { getProgress, getProgressPercent } from "@/lib/progress";
import type { Course } from "@/lib/types";

export default function CourseCard({ course }: { course: Course }) {
  const { user } = useAuth();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!user) {
      setPercent(0);
      return;
    }
    const progress = getProgress(user.id, course.courseId);
    setPercent(getProgressPercent(progress, course.stages.length));
  }, [user, course.courseId, course.stages.length]);

  return (
    <Link
      href={`/courses/${course.courseId}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-video w-full bg-gray-100">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {course.stages.map((stage, i) => (
            <Badge key={i} type={stage.type} />
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{course.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {course.description}
          </p>
        </div>
        <div className="mt-auto space-y-2">
          <p className="text-xs text-gray-400">
            약 {course.estimatedMinutes}분 · {course.stages.length}단계
          </p>
          {user && percent > 0 && <ProgressBar percent={percent} showLabel />}
        </div>
      </div>
    </Link>
  );
}
