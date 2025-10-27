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

const badges = {
  PANEL: "bg-orange-400 text-orange-950",
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
  isPanel,

  expanded = false,
  selectable = false,
  onSelect = () => {},
}) => {
  const t = useTranslations("Components.SessionCard");

  const badge = useMemo(() => {
    if (isPanel) return badges.PANEL;
    if (kids) return badges.YOUNG;
    if (age === "18") return badges.ADULT;

    return badges.YA;
  }, [age, kids]);

  const containerClassName = useMemo(() => {
    const base = "h-full";

    const selectableClassName =
      "card bg-base-200 shadow-xl cursor-pointer opacity-80 hover:opacity-100";

    const isPanelClassName = "bg-orange-200";

    return [
      base,
      selectable && selectableClassName,
      selectable && isPanel && isPanelClassName,
    ]
      .filter(Boolean)
      .join(" ");
  }, [isPanel, selectable]);

  return (
    <article
      className={containerClassName}
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

            <div className={`p-2 font-bold badge ${badge}`}>
              {isPanel ? "Panel!" : kids ? "Tavolo TPKids" : `Età ${age}+`}
            </div>
          </div>

          <h2 className="flex-1 card-title">
            {tableNumber} - {title}
          </h2>
        </div>

        {isPanel ? (
          <p className="font-semibold">Un panel per {maxPlayers} persone</p>
        ) : (
          <p>
            <span className="italic">{ruleset}</span>,{" "}
            <>{t("maxPlayers", { maxPlayers })}</>
          </p>
        )}
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
            <strong>{isPanel ? "Tenuto da " : `${t("master")}:`}</strong>{" "}
            {masterName}
          </p>
        </div>
        <p>
          <strong>{t("availableSeats")}:</strong> {availableSeats}
        </p>
      </div>
    </article>
  );
};
