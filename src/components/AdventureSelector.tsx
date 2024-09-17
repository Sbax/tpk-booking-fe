import { AdventureCard } from "@/components/AdventureCard";
import { Adventure } from "@/types";
import { useEffect, useState } from "react";

export const AdventureSelector: React.FC<{
  adventures: Adventure[];
  onAdventureSelect: (id: Adventure["id"]) => void;
  selectedAdventure?: Adventure;
}> = ({ adventures, onAdventureSelect, selectedAdventure }) => {
  const [filtered, setFiltered] = useState<Adventure[]>([]);
  const [timeSlot, setTimeSlot] = useState<Adventure["timeSlot"] | null>(null);

  useEffect(() => {
    if (timeSlot) {
      setFiltered(
        adventures.filter((adventure) => adventure.timeSlot === timeSlot)
      );
    } else {
      setFiltered(adventures);
    }
  }, [timeSlot]);

  return (
    <>
      <section className="flex md:flex-row flex-col md:space-x-2 space-y-4 md:space-y-0">
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
          <AdventureCard
            key={adventure.id}
            {...adventure}
            selectable
            onSelect={() => onAdventureSelect(adventure.id)}
          />
        ))}
      </section>
    </>
  );
};
