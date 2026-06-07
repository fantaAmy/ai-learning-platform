"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  logIn as authLogIn,
  logOut as authLogOut,
  signUp as authSignUp,
  type PublicUser,
} from "@/lib/auth";

interface AuthContextValue {
  user: PublicUser | null;
  loading: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (
    email: string,
    password: string,
    name: string
  ) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  function login(email: string, password: string) {
    const result = authLogIn(email, password);
    if (result.ok) setUser(result.user);
    return { ok: result.ok, error: result.ok ? undefined : result.error };
  }

  function signup(email: string, password: string, name: string) {
    const result = authSignUp(email, password, name);
    if (result.ok) setUser(result.user);
    return { ok: result.ok, error: result.ok ? undefined : result.error };
  }

  function logout() {
    authLogOut();
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
