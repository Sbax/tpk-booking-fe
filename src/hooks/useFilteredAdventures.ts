import { Adventure } from "@/types";
import { useEffect, useState } from "react";

export function useFilteredAdventures(
  adventures?: Adventure[],
  timeSlot?: Adventure["timeSlot"],
  search?: string
) {
  const [filteredAdventures, setFilteredAdventures] = useState<Adventure[]>([]);

  useEffect(() => {
    if (!adventures) return;

    const filterByTimeSlot = (adventureTimeSlot: Adventure["timeSlot"]) =>
      !timeSlot || adventureTimeSlot === timeSlot;

    const filterBySearch = ({
      title,
      description,
      ruleset,
      masterName,
    }: Pick<Adventure, "title" | "description" | "ruleset" | "masterName">) =>
      !search ||
      [title, description, ruleset, masterName].some((string) =>
        string.toLowerCase().includes(search.toLowerCase())
      );

    const filtered = adventures.filter(
      ({
        timeSlot: adventureTimeSlot,
        title,
        ruleset,
        description,
        masterName,
      }) =>
        filterByTimeSlot(adventureTimeSlot) &&
        filterBySearch({ title, description, ruleset, masterName })
    );

    setFilteredAdventures(filtered);
  }, [timeSlot, search, adventures]);

  return filteredAdventures;
}
