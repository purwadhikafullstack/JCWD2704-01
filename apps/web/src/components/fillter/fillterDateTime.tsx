"use client";
import { Input } from "@/components/ui/input";
import useSP from "@/hooks/useSP";
import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  queryKey: string;
  redirect?: "push" | "replace";
}

export default function FillerDateTime({ queryKey, redirect = "replace", ...props }: SearchInputProps) {
  const { push, replace, sp } = useSP();
  const fn = { push, replace };
  const defaultDate = new Date(Number(sp.get(queryKey))).toISOString().slice(0, 16);
  return (
    <Input
      {...props}
      type="datetime-local"
      defaultValue={defaultDate || undefined}
      onChange={(e) => {
        const value = new Date(e.target.value).getTime();
        fn[redirect]({ key: queryKey, value: isNaN(value) ? undefined : String(value) });
      }}
    />
  );
}
