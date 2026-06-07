import CourseCard from "@/components/course/CourseCard";
import { courses } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white">전체 콘텐츠</h1>
        <p className="mt-2 text-gray-500">4단계로 완주하면 AI가 내 편이 됩니다.</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
}
