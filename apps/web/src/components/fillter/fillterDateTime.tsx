"use client";
import useSP from "@/hooks/useSP";
import { InputHTMLAttributes } from "react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Matcher } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  queryKey: string;
  redirect?: "push" | "replace";
}

export default function FillerDateTime({ queryKey, redirect = "replace", ...props }: SearchInputProps) {
  const { push, replace, sp } = useSP();
  const fn = { push, replace };
  const defaultDate:Matcher  = new Date(Number(sp.get(queryKey)||new Date()));
  return (
    <Popover>
    <PopoverTrigger asChild><Button>APA</Button></PopoverTrigger>
    <PopoverContent>
    <Calendar 
    mode="single" 
    captionLayout="dropdown-buttons" 
    fromYear={2020} 
    toYear={new Date().getFullYear()}
    selected={defaultDate}
    onSelect={(e) => {
      const value = e?.getTime()
      fn[redirect]({ key: queryKey, value: !value? undefined : String(value) });
    }}
    />
    </PopoverContent>
    </Popover>
  );
}
