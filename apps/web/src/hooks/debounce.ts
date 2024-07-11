"use client";
import { useState, useEffect } from "react";
export default function useDebounce<T>(
  callback: () => void,
  initalValue: T,
  delay: number = 500,
) {
  const [triggerValue, setTriggerValue] = useState(initalValue);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(callback, delay));
  }, [triggerValue]);
  return { triggerValue, setTriggerValue };
}
