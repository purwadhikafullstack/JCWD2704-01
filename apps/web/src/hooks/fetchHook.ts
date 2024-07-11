"use client";
import { useState, useRef } from "react";

export default function useFetch<T>(fetchFunction: () => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const abort = useRef<AbortController | null>(null);

  const fetchfn = () => {
    abort.current?.abort();
    abort.current = new AbortController();
    setLoading(true);
    fetchFunction().finally(() => setLoading(false));
  };

  return { fetchfn, loading };
}
