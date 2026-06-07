import type { User } from "./types";

// localStorage 기반 mock 인증.
// 추후 Supabase 등 실제 백엔드로 교체할 수 있도록 함수 단위로 추상화한다.

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export type PublicUser = Omit<User, "password">;

function readUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublic(user: User): PublicUser {
  const { password: _password, ...rest } = user;
  void _password;
  return rest;
}

export function signUp(
  email: string,
  password: string,
  name: string
): { ok: true; user: PublicUser } | { ok: false; error: string } {
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "이미 가입된 이메일입니다." };
  }
  const user: User = {
    id: `user_${Date.now()}`,
    email,
    password,
    name: name || email.split("@")[0],
  };
  users.push(user);
  writeUsers(users);
  setCurrentUser(toPublic(user));
  return { ok: true, user: toPublic(user) };
}

export function logIn(
  email: string,
  password: string
): { ok: true; user: PublicUser } | { ok: false; error: string } {
  const users = readUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    return { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }
  const pub = toPublic(found);
  setCurrentUser(pub);
  return { ok: true, user: pub };
}

export function logOut(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): PublicUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? (JSON.parse(raw) as PublicUser) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: PublicUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}
