"use client";
import { useEffect, useLayoutEffect } from "react";
import useAuthStore from "@/stores/auth.store";
import { useCheckout } from "@/stores/checkout";
import { axiosInstanceCSR } from "@/lib/axios.client-config";

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const { keepLogin, user } = useAuthStore((s) => s);

  useLayoutEffect(() => {
    keepLogin();
  }, []);
  return children;
}
