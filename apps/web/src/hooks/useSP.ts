"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useSP() {
  const router = useRouter();
  const sp = useSearchParams();
  const setRoute = (...searchQuery: { key: string; value?: string }[]) => {
    searchQuery;
    const fillter = new URLSearchParams(sp);
    searchQuery.forEach(({ key, value }) => {
      fillter.delete(key);
      value ? fillter.append(key, value) : null;
    });
    return fillter;
  };
  const push = (...searchQuery: { key: string; value?: string }[]) => {
    const fillter = setRoute(...searchQuery);
    router.push(`?${fillter.toString()}`);
  };
  const replace = (...searchQuery: { key: string; value?: string }[]) => {
    const fillter = setRoute(...searchQuery);
    router.replace(`?${fillter.toString()}`);
  };

  return { push, replace, sp };
}
