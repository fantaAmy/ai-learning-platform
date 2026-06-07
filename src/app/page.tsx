import { ButtonLink } from "@/components/ui/Button";
import CourseCard from "@/components/course/CourseCard";
import { courses } from "@/lib/courses";

const FEATURES = [
  {
    icon: "⚡",
    title: "45초 훑어보기",
    desc: "핵심만 쏙. 부담 없이 첫 발을 뗍니다.",
  },
  {
    icon: "🔥",
    title: "4단계 몰입 구조",
    desc: "훑어보기 → 파고들기 → 써먹기 → 제대로 파기. 자연스럽게 깊어집니다.",
  },
  {
    icon: "🛠️",
    title: "바로 써먹는 실습",
    desc: "Teachable Machine, Hugging Face로 직접 AI를 다뤄봅니다.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E50914]/5 via-[#141414] to-[#141414]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-36 text-center">
          <span className="inline-block rounded-full border border-[#E50914]/40 bg-[#E50914]/10 px-4 py-1 text-xs font-medium text-[#E50914] mb-6">
            코드 제로 · 부담 제로
          </span>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            AI, 이제<br />
            <span className="text-[#E50914]">당신 차례</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-gray-400">
            모르면 손해잖아. 하루 25분이면 AI가 내 편이 됩니다.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/courses" size="lg">
              지금 바로 시작
            </ButtonLink>
            <ButtonLink href="/auth/signup" size="lg" variant="outline">
              무료 가입
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-[#333] bg-[#1f1f1f] p-6"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course preview */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">지금 뜨는 콘텐츠</h2>
          <ButtonLink href="/courses" variant="secondary" size="sm">
            전체 보기
          </ButtonLink>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
