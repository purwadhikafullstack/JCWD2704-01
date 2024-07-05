"use client";
import { useState, useEffect } from "react";
export default function useDebounce<T>(
  callback: () => void,
  initialValue: T | undefined = undefined,
  delay: number = 500,
) {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(callback, delay));
  }, []);
  return { setValue, value };
}
