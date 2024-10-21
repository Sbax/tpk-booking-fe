"use client";

import { AdventureCard } from "@/components/AdventureCard";
import { Loader } from "@/components/Loader";
import { useAdventures } from "@/hooks/useAdventures";
import { Adventure } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AdventureSelector: React.FC<{
  baseUrl?: string;
}> = ({ baseUrl = "/adventure" }) => {
  const [filtered, setFiltered] = useState<Adventure[]>([]);
  const [timeSlot, setTimeSlot] = useState<Adventure["timeSlot"] | null>(null);

  const { data: adventures, loading, error } = useAdventures();

  useEffect(() => {
    if (!adventures) return;

    if (timeSlot) {
      setFiltered(
        adventures.filter((adventure) => adventure.timeSlot === timeSlot)
      );
    } else {
      setFiltered(adventures);
    }
  }, [timeSlot, adventures]);

  if (loading) return <Loader />;

  if (!adventures || error)
    return <p>Qualcosa è andato storto, prova a ricaricare la pagina</p>;

  return (
    <>
      <section className="flex md:flex-row flex-col md:space-x-2 space-y-4 md:space-y-0 my-4">
        <button
          onClick={() => setTimeSlot(null)}
          className={`btn ${timeSlot === null ? "" : "btn-outline"}`}
        >
          Tutte le fasce orarie
        </button>

        <button
          onClick={() => setTimeSlot(1)}
          className={`btn btn-primary ${timeSlot === 1 ? "" : "btn-outline"}`}
        >
          10.00 - 14.00
        </button>

        <button
          onClick={() => setTimeSlot(2)}
          className={`btn btn-accent ${timeSlot === 2 ? "" : "btn-outline"}`}
        >
          16.00 - 20.00
        </button>
      </section>

      <section className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {filtered.map((adventure: Adventure) => (
          <Link key={adventure.id} href={`${baseUrl}/${adventure.id}`}>
            <AdventureCard {...adventure} selectable />
          </Link>
        ))}
      </section>
    </>
  );
};
