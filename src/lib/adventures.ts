import { getBookings } from "@/lib/bookings";
import { getSheetData } from "@/lib/sheets";
import { Adventure, SheetRange } from "@/types";
import { unstable_cache } from "next/cache";

const spreadsheetId = process.env.SHEET_ID as string;
const adventureRange = process.env.SHEET_ADVENTURE_RANGE as SheetRange;

type AdventureRow = [
  Adventure["id"],
  Adventure["timeSlot"],
  Adventure["title"],
  Adventure["rules"],
  Adventure["description"],
  Adventure["minPlayers"],
  Adventure["maxPlayers"],
  string, // table shape, unused on FE
  Adventure["masterName"]
];

export const getAdventures = unstable_cache(
  async (): Promise<Adventure[]> => {
    const adventuresResponse = await getSheetData({
      spreadsheetId,
      range: adventureRange,
    });

    if (!adventuresResponse || adventuresResponse.length === 0) {
      throw new Error("No data found");
    }

    const bookings = await getBookings();

    const adventures: Adventure[] = adventuresResponse
      .slice(1)
      .map((row) => {
        const [
          id,
          timeSlot,
          title,
          rules,
          description,
          minPlayers,
          maxPlayers,
          ,
          masterName,
        ] = row as AdventureRow;

        const booked = bookings
          .filter(({ adventureId }) => adventureId === id)
          .reduce((total, { seats }) => total + seats, 0);

        return {
          id,
          timeSlot: Number(timeSlot) as Adventure["timeSlot"],
          title,
          rules,
          description,
          minPlayers: Number(minPlayers),
          maxPlayers: Number(maxPlayers),
          masterName,
          availableSeats: Number(maxPlayers) - booked,
        };
      })
      .sort((a, b) => {
        if (a.timeSlot === b.timeSlot) {
          return a.title.localeCompare(b.title);
        } else {
          return a.timeSlot - b.timeSlot;
        }
      });

    console.log({ adventures });

    return adventures;
  },
  ["get-adventures"],
  {
    revalidate: 5 * 60 * 1000, // 5 minutes
  }
);
