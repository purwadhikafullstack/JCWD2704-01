"use client";
import { useState, useEffect } from "react";
type DebounceOptions = {
  delay?: number;
  triggerValues?: any[];
};
export default function useDebounce<T>(
  callback: () => void,
  { delay = 500, triggerValues = [] }: DebounceOptions,
) {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(callback, delay));
  }, [...triggerValues]);
}

//example
// function willTrigger(){}
// const [state,setState] = useState(0)
// useDebounce(willtrigger,{triggerValues:[state]})
