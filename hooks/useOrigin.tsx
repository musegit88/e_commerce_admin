import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [started, setStarted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setStarted(true);
  }, []);
  if (!started) {
    return null;
  }
  return origin;
};
