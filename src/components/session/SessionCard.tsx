"use client";

import { Session } from "@/types";
import { timeSlots } from "@/utils/timeSlots";
import { useTranslations } from "next-intl";
import { Fragment, useMemo } from "react";

interface SessionCardProps extends Session {
  expanded?: boolean;
  selectable?: boolean;
  onSelect?: (id: Session["id"]) => void;
}

const ageBadges = {
  YOUNG: "bg-lime-400 text-lime-900",
  YA: "bg-amber-500 text-amber-950",
  ADULT: "badge-error",
};

export const SessionCard: React.FC<SessionCardProps> = ({
  id,
  timeSlot,
  tableNumber,
  title,
  ruleset,
  masterName,
  description,
  maxPlayers,
  availableSeats,
  age,
  kids,

  expanded = false,
  selectable = false,
  onSelect = () => {},
}) => {
  const t = useTranslations("Components.SessionCard");

  const ageBadge = useMemo(() => {
    if (kids) return ageBadges.YOUNG;
    if (age === "18") return ageBadges.ADULT;

    return ageBadges.YA;
  }, [age, kids]);

  return (
    <article
      className={
        selectable
          ? "h-full card bg-base-200 shadow-xl cursor-pointer opacity-80 hover:opacity-100"
          : "h-full"
      }
      onClick={() => selectable && onSelect(id)}
    >
      <div className={selectable ? "card-body" : "space-y-2"}>
        <div className="flex-col space-y-2">
          <div className="flex flex-row items-center space-x-2">
            <div
              className={`${timeSlots[timeSlot].className} font-bold p-2 badge badge-timeslot`}
            >
              {timeSlots[timeSlot].label}
            </div>

            <div className={`p-2 font-bold badge ${ageBadge}`}>
              {kids ? "Tavolo TPKids" : `Età ${age}+`}
            </div>
          </div>

          <h2 className="flex-1 card-title">
            {tableNumber} - {title}
          </h2>
        </div>

        <p>
          <span className="italic">{ruleset}</span>,{" "}
          <>{t("maxPlayers", { maxPlayers })}</>
        </p>
        <p className="max-w-3xl">
          {(expanded ? description : `${description.slice(0, 200).trim()}...`)
            .split("\n")
            .map((text, key) => (
              <Fragment key={key}>
                {text}
                <br />
              </Fragment>
            ))}
        </p>
        <div className="flex space-x-2">
          <p>
            <strong>{t("master")}:</strong> {masterName}
          </p>
          <p></p>
        </div>
        <p>
          <strong>{t("availableSeats")}:</strong> {availableSeats}
        </p>
      </div>
    </article>
  );
};
