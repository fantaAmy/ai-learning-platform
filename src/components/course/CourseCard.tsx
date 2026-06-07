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
    if (!user) { setPercent(0); return; }
    const progress = getProgress(user.id, course.courseId);
    setPercent(getProgressPercent(progress, course.stages.length));
  }, [user, course.courseId, course.stages.length]);

  return (
    <Link
      href={`/courses/${course.courseId}`}
      className="netflix-card group flex flex-col overflow-hidden rounded-lg bg-[#1f1f1f] border border-[#333]"
    >
      <div className="relative aspect-video w-full bg-[#111] overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {course.stages.map((stage, i) => (
            <Badge key={i} type={stage.type} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold text-white text-base leading-snug">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-400">{course.description}</p>
        <div className="mt-auto space-y-2 pt-2">
          <p className="text-xs text-gray-600">약 {course.estimatedMinutes}분 · {course.stages.length}단계</p>
          {user && percent > 0 && <ProgressBar percent={percent} showLabel />}
        </div>
      </div>
    </Link>
  );
}
