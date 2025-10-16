import { Session } from "@/types";
import { useEffect, useState } from "react";

export function useFilteredSessions(
  sessions?: Session[],
  timeSlot?: Session["timeSlot"],
  search?: string
) {
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (!sessions) return;

    const filterByTimeSlot = (sessionTimeSlot: Session["timeSlot"]) =>
      !timeSlot || sessionTimeSlot === timeSlot;

    const filterBySearch = ({
      title,
      description,
      ruleset,
      masterName,
    }: Pick<Session, "title" | "description" | "ruleset" | "masterName">) =>
      !search ||
      [title, description, ruleset, masterName].some((string) =>
        string.toLowerCase().includes(search.toLowerCase())
      );

    const filtered = sessions.filter(
      ({
        timeSlot: sessionTimeSlot,
        title,
        ruleset,
        description,
        masterName,
      }) =>
        filterByTimeSlot(sessionTimeSlot) &&
        filterBySearch({ title, description, ruleset, masterName })
    );

    setFilteredSessions(filtered);
  }, [timeSlot, search, sessions]);

  return filteredSessions;
}
