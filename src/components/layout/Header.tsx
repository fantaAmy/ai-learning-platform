"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-500 text-sm text-white">
            AI
          </span>
          <span>러닝랩</span>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link href="/courses" className="text-gray-600 hover:text-gray-900">
            강좌
          </Link>
          {loading ? null : user ? (
            <>
              <Link href="/mypage" className="text-gray-600 hover:text-gray-900">
                마이페이지
              </Link>
              <button
                onClick={logout}
                className="rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-lg bg-indigo-500 px-3 py-1.5 font-medium text-white hover:bg-indigo-600"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
