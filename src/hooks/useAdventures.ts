import { useState, useEffect } from "react";
import { Adventure } from "@/types";

const adventureCache = new Map<string, Adventure[]>();
const cacheKey = "adventures";

export const useAdventures = () => {
  const [data, setData] = useState<Adventure[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (adventureCache.has(cacheKey)) {
      setData(adventureCache.get(cacheKey) || null);
      setLoading(false);
      return;
    }

    const fetchAdventures = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/adventures");
        if (!response.ok) {
          throw new Error("Failed to fetch adventures");
        }
        const adventures = await response.json();
        adventureCache.set(cacheKey, adventures);
        setData(adventures);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  return { data, loading, error };
};
