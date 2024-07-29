"use client";
import useSP from "@/hooks/useSP";
import { SelectHTMLAttributes } from "react";
import { Select } from "../ui/select";

interface FillterSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  queryKey: string;
  redirect?: "push" | "replace";
}

export default function FillterSelect({ queryKey, children, redirect = "replace", ...props }: FillterSelectProps) {
  const { push, replace, sp } = useSP();
  const fn = { push, replace };
  return (
    <Select
      {...props}
      defaultValue={sp.get(queryKey) || undefined}
      onValueChange={(e) => {
        
      }}
    >
      {children}
    </Select>
  );
}
