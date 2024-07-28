import { useEffect, useState } from "react";

export const useMediaQueries = (breakPoint: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(breakPoint);
    setMatches(mediaQuery.matches);
    const handleChange = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakPoint]);

  return { matches };
};
