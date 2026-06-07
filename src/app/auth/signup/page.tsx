"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 4) { setError("비밀번호는 4자 이상이어야 합니다."); return; }
    const result = signup(email, password, name);
    if (result.ok) router.push("/courses");
    else setError(result.error ?? "가입에 실패했습니다.");
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-20">
      <div className="mb-8 text-center">
        <span className="text-3xl font-black text-[#E50914]">NOVA</span>
        <h1 className="mt-4 text-xl font-bold text-white">AI를 내 편으로 만들 시간</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="이름 (선택)" type="text" value={name} onChange={setName} placeholder="홍길동" required={false} />
        <Field label="이메일" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Field label="비밀번호" type="password" value={password} onChange={setPassword} placeholder="4자 이상" />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" size="lg" fullWidth>무료 가입하기</Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        이미 계정이 있나요?{" "}
        <Link href="/auth/login" className="font-semibold text-[#E50914] hover:text-red-400">
          로그인
        </Link>
      </p>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, required = true }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-400">{label}</span>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        className="w-full rounded-lg border border-[#333] bg-[#1f1f1f] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E50914]/50 focus:ring-1 focus:ring-[#E50914]/30"
      />
    </label>
  );
}
