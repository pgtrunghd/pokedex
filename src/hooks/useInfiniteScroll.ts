import { useCallback, useEffect, useRef, useState } from "react";

export const useInfiniteScroll = () => {
  const [items, setItems] = useState<NamedAPIResource[]>();
  const [isLoading, setIsLoading] = useState(false);
  // const [index, setIndex] = useState(0);
  const loadRef = useRef(null);
  const next = useRef("");

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    fetch(next.current)
      .then(async (res) => {
        const response: NamedAPIResourceList = await res.json();
        next.current = response.next;
        setItems((prevItems: any) => [...prevItems, ...response.results]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        // setIndex((prev) => prev + 1);
        setIsLoading(false);
      });
  }, [isLoading]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/pokemon`);
        const data: NamedAPIResourceList = await response.json();
        next.current = data.next;
        setItems(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        // setIndex((prev) => prev + 1);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) {
        observer.unobserve(loadRef.current);
      }
    };
  }, [fetchData]);

  return { loadRef, items, isLoading };
};
