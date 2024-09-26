"use client";

import { Adventure } from "@/types";
import { Fragment } from "react";

interface AdventureCardProps extends Adventure {
  expanded?: boolean;
  selectable?: boolean;
  onSelect?: (id: Adventure["id"]) => void;
}

export const AdventureCard: React.FC<AdventureCardProps> = ({
  id,
  title,
  rules,
  description,
  minPlayers,
  maxPlayers,
  timeSlot,
  masterName,
  availableSeats,

  expanded = false,
  selectable = false,
  onSelect = () => {},
}) => {
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
        <div className="md:flex items-center md:space-x-2">
          <div
            className={`font-bold p-2 badge ${
              timeSlot === 1 ? "badge-primary" : "badge-accent"
            }`}
          >
            {timeSlot === 1 ? "10.00 - 14.00" : "16.00 - 20.00"}
          </div>
          <h2 className="card-title">{title}</h2>
        </div>

        <p>
          <span className="italic">{rules}</span>,{" "}
          <>
            per {minPlayers} - {maxPlayers} avventurierɜ
          </>
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
            <strong>Arbitrə:</strong> {masterName}
          </p>
          <p></p>
        </div>
        <p>
          <strong>Posti disponibili:</strong> {availableSeats} su {maxPlayers}
        </p>
      </div>
    </article>
  );
};
