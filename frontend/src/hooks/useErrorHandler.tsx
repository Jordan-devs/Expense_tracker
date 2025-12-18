import { useEffect, useState } from "react";

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  return { error, setError };
};
