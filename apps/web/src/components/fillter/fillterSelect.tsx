"use client";
import useSP from "@/hooks/useSP";
import { SelectHTMLAttributes } from "react";

interface FillterSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  queryKey: string;
  redirect?: "push" | "replace";
}

export default function FillterSelect({ queryKey, children, redirect = "replace", ...props }: FillterSelectProps) {
  const { push, replace, sp } = useSP();
  const fn = { push, replace };
  return (
    <select
      {...props}
      defaultValue={sp.get(queryKey) || undefined}
      onChange={(e) => fn[redirect]({ key: queryKey, value: e.target.value })}
    >
      {children}
    </select>
  );
}
