"use client";
import { useEffect, useState, useRef } from "react";
import serverFetch, { FetchOption } from "@/action/fetchAction";

export default function useFetch<T>(option: FetchOption, alt?: T) {
  const [loading, setLoading] = useState(false);
  const [{ data, error }, setData] = useState<{ data?: T; error?: Error }>({
    data: alt,
  });
  const abort = useRef<AbortController | null>(null);

  const refetch = async () => {
    abort.current?.abort();
    abort.current = new AbortController();
    setLoading(true);
    await serverFetch(option)
      .then((res) => setData({ data: res?.data.data }))
      .catch((error) => setData({ error }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [option]);
  return { refetch, data, loading };
}
