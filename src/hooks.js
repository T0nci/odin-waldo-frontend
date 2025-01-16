import { useState, useEffect } from "react";

export const useData = (url) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (!isActive) return;

        setState(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [url]);

  return [state, loading, error];
};
