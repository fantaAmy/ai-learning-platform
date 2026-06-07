import { ButtonLink } from "@/components/ui/Button";
import CourseCard from "@/components/course/CourseCard";
import { courses } from "@/lib/courses";

const FEATURES = [
  {
    emoji: "⚡",
    title: "45초 숏폼으로 시작",
    desc: "부담 없이 짧은 영상으로 핵심을 먼저 잡습니다.",
  },
  {
    emoji: "🧩",
    title: "4단계 몰입 학습",
    desc: "숏폼 → 마이크로러닝 → 적용 → 심화로 자연스럽게 깊어집니다.",
  },
  {
    emoji: "🛠️",
    title: "직접 해보는 실습",
    desc: "Teachable Machine, Hugging Face 등 실제 도구로 체험합니다.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-indigo-50 to-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-24">
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            코드 없이 AI 이해하기
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
            AI, 이제 <span className="text-indigo-600">영상으로</span> 가볍게
            배우세요
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            숏폼부터 심화까지, 하루 25분이면 충분합니다. 비개발자를 위한
            모바일 우선 AI 학습 플랫폼.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/courses" size="lg">
              강좌 둘러보기
            </ButtonLink>
            <ButtonLink href="/auth/signup" size="lg" variant="outline">
              무료로 시작하기
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="text-3xl">{f.emoji}</div>
              <h3 className="mt-3 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">인기 강좌 미리보기</h2>
          <ButtonLink href="/courses" variant="secondary" size="sm">
            전체 보기
          </ButtonLink>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
