"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-[#141414] to-transparent backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-2xl font-black tracking-tight text-[#E50914]">NOVA</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
            콘텐츠
          </Link>
          {loading ? null : user ? (
            <>
              <Link href="/mypage" className="text-gray-300 hover:text-white transition-colors">
                내 활동
              </Link>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-white transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="rounded px-4 py-1.5 bg-[#E50914] font-semibold text-white hover:bg-[#f40612] transition-colors"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
