import type { Progress } from "./types";

// key: `progress_${userId}_${courseId}`
// value: { completedStages: number[], lastStage: number, completedAt?: string }

function key(userId: string, courseId: string): string {
  return `progress_${userId}_${courseId}`;
}

const EMPTY: Progress = { completedStages: [], lastStage: 0 };

export function getProgress(userId: string, courseId: string): Progress {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = localStorage.getItem(key(userId, courseId));
    return raw ? (JSON.parse(raw) as Progress) : { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

function save(userId: string, courseId: string, progress: Progress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key(userId, courseId), JSON.stringify(progress));
}

export function markStageComplete(
  userId: string,
  courseId: string,
  stageIndex: number,
  totalStages: number
): Progress {
  const current = getProgress(userId, courseId);
  const completedStages = current.completedStages.includes(stageIndex)
    ? current.completedStages
    : [...current.completedStages, stageIndex].sort((a, b) => a - b);
  const next: Progress = {
    completedStages,
    lastStage: Math.max(current.lastStage, stageIndex),
  };
  if (completedStages.length >= totalStages) {
    next.completedAt = current.completedAt ?? new Date().toISOString();
  }
  save(userId, courseId, next);
  return next;
}

export function setLastStage(
  userId: string,
  courseId: string,
  stageIndex: number
): Progress {
  const current = getProgress(userId, courseId);
  const next: Progress = { ...current, lastStage: stageIndex };
  save(userId, courseId, next);
  return next;
}

export function getProgressPercent(progress: Progress, totalStages: number): number {
  if (totalStages === 0) return 0;
  return Math.round((progress.completedStages.length / totalStages) * 100);
}

export function isCourseComplete(progress: Progress, totalStages: number): boolean {
  return totalStages > 0 && progress.completedStages.length >= totalStages;
}
