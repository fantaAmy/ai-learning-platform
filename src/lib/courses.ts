import coursesData from "@/data/courses.json";
import type { Course } from "./types";

export const courses = coursesData as Course[];

export function getCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.courseId === courseId);
}
