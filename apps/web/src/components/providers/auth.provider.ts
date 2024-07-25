"use client";
import { useLayoutEffect } from "react";
import useAuthStore from "@/stores/auth.store";
import { getCookie } from "cookies-next";

type Props = { children: React.ReactNode };
export default function AuthProvider({ children }: Props) {
  const { keepLogin } = useAuthStore((s) => s);
  const cookie = getCookie("access_token") || "";
  useLayoutEffect(() => {
    keepLogin();
  }, [cookie]);
  return children;
}
