import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(async (res) => {
        const response = await res.json();
        setData(response);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
};
