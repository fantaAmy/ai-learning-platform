import CourseCard from "@/components/course/CourseCard";
import { courses } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">전체 강좌</h1>
        <p className="mt-1 text-sm text-gray-500">
          관심 있는 강좌를 골라 4단계로 완주해 보세요.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
}
