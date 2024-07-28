import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 700) => {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const timout = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timout)
  }, [value, delay]);

  return debounce
};
