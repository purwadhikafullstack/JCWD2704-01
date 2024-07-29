"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const ButtonBack = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={cn("flex items-center gap-0.5 text-lg font-medium sm:text-xl", className)}>
      <ChevronLeft />
      <span className="inline-block">{children}</span>
    </button>
  );
};
