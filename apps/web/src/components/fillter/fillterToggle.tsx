"use client";
import { Input } from "@/components/ui/input";
import useSP from "@/hooks/useSP";
import { InputHTMLAttributes, useState } from "react";

interface FillterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  queryKey: string;
  redirect?: "push" | "replace";
  trueValue: string;
  falseValue?: string;
}

export default function FillterToggle({ queryKey, redirect = "replace", trueValue, falseValue, ...props }: FillterInputProps) {
  const { push, replace, sp } = useSP();
  const fn = { push, replace };
  return (
    <Input
      {...props}
      type="checkbox"
      checked={sp.get(queryKey) == trueValue}
      onClick={(e) => {
        fn[redirect]({ key: queryKey, value: e.currentTarget.checked ? trueValue : falseValue });
      }}
    />
  );
}
