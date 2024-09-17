import { Adventure } from "@/types";
import { useState, useEffect } from "react";

export const useAdventures = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdventures = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/adventures");
      if (!response.ok) {
        throw new Error("Errore nel recuperare le avventure");
      }
      const data = await response.json();
      setAdventures(data);
    } catch (error) {
      setError((error as Error).message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  return { adventures, loading, error, fetchAdventures };
};
