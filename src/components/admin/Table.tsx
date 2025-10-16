import { Booking, Session } from "@/types";

import { TimeSlot, timeSlots } from "@/utils/timeSlots";
import { useTranslations } from "next-intl";
import { FC, Fragment } from "react";

const DEFAULT_FIELDS: (keyof Session)[] = [
  "tableNumber",
  "title",
  "masterName",
  "ruleset",
  "maxPlayers",
];

export const Table: FC<{
  sessions: Session[];
  bookings: Booking[];
  currentTimeSlot: TimeSlot;
  fields?: (keyof Session)[];
  prefix?: string;
}> = ({
  sessions,
  bookings,
  currentTimeSlot,
  fields = DEFAULT_FIELDS,
  prefix,
}) => {
  const t = useTranslations("Components.Table");

  const title = [prefix && `${prefix} - `, timeSlots[currentTimeSlot].label]
    .filter(Boolean)
    .join("");

  return (
    <table className="table">
      <thead>
        <tr>
          <td colSpan={fields.length} className="text-center">
            {title}
          </td>
        </tr>
        <tr>
          {fields.map((key) => (
            <th key={key}>{t(key)}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sessions
          .filter(({ timeSlot }) => timeSlot === currentTimeSlot)
          .map((session) => {
            const bookingsForSession = bookings
              .filter(({ sessionId }) => sessionId === session.id)
              .flatMap(({ name, seats }) => {
                return Array.from(
                  { length: seats },
                  (_, index) =>
                    `${name}${seats > 1 ? `(${index + 1}/${seats})` : ""}`
                );
              });

            return (
              <Fragment key={session.id}>
                <tr className="bg-base-200">
                  {fields.map((key, index) => (
                    <td
                      className="px-4"
                      key={key}
                      rowSpan={index === 0 ? 2 : 1}
                    >
                      {String(session[key]).length > 50
                        ? String(session[key]).slice(0, 50) + "..."
                        : session[key]}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td colSpan={fields.length - 1}>
                    <div className="flex flex-row flex-wrap min-h-[1.5em]">
                      {bookingsForSession.map((booking, index) => (
                        <div className="p-1" key={booking}>
                          {booking}
                          {index < bookingsForSession.length - 1 && ", "}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
      </tbody>
    </table>
  );
};
