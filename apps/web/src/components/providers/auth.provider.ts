"use client";
import { useEffect } from "react";
import useAuthStore from "@/stores/auth.store";

type Props = { children: React.ReactNode };
export default function AuthProvider({ children }: Props) {
  const keepLogin = useAuthStore((s) => s.keepLogin);
  useEffect(() => {
    keepLogin();
  }, []);
  return children;
}
