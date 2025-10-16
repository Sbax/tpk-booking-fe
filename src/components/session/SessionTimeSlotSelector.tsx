import { TimeSlot, timeSlots } from "@/utils/timeSlots";
import { useTranslations } from "next-intl";
import { FC } from "react";

type SessionTimeSlotSelectorProps = {
  selectTimeSlot: (timeSlot?: TimeSlot) => void;
  selectedTimeSlot?: TimeSlot;
  exclude?: TimeSlot[];
};

export const SessionTimeSlotSelector: FC<SessionTimeSlotSelectorProps> = ({
  selectTimeSlot,
  selectedTimeSlot,
  exclude,
}) => {
  const t = useTranslations("Components.SessionTimeSlotSelector");

  const TimeSlotsRow: FC<{
    selectedTimeSlots: TimeSlot[];
  }> = ({ selectedTimeSlots }) => {
    return (
      <section className="flex flex-row flex-wrap -m-2 mt-2 first:mt-0">
        {selectedTimeSlots
          .map((timeSlot) => ({
            timeSlot: Number(timeSlot) as TimeSlot,
            details: timeSlots[timeSlot],
          }))
          .filter(({ timeSlot }) => {
            if (!exclude) return true;

            if (exclude.includes(timeSlot)) return false;
            return true;
          })
          .map(({ timeSlot, details }) => (
            <button
              key={timeSlot}
              onClick={() => selectTimeSlot(timeSlot)}
              className={`m-2 flex-1 md:flex-initial btn btn-timeslot ${
                details.className
              } ${selectedTimeSlot === timeSlot ? "" : "btn-timeslot-outline"}`}
            >
              {details.day} {details.time}
            </button>
          ))}
      </section>
    );
  };

  return (
    <>
      <section className="flex md:flex-row flex-col flex-wrap -m-2">
        <button
          onClick={() => selectTimeSlot(undefined)}
          className={`m-2 btn ${!selectedTimeSlot ? "" : "btn-outline"}`}
        >
          {t("allTimeSlots")}
        </button>
      </section>

      <TimeSlotsRow
        selectedTimeSlots={[
          TimeSlot.DAY_1_MORNING,
          TimeSlot.DAY_1_AFTERNOON,
          TimeSlot.DAY_1_EVENING,
        ]}
      />

      <TimeSlotsRow
        selectedTimeSlots={[TimeSlot.DAY_2_MORNING, TimeSlot.DAY_2_AFTERNOON]}
      />
    </>
  );
};
