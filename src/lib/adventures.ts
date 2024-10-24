import { getBookings } from "@/lib/bookings";
import { getSheetData } from "@/lib/sheets";
import { Adventure, SheetRange } from "@/types";

const spreadsheetId = process.env.SHEET_ID as string;
const adventureRange = process.env.SHEET_ADVENTURE_RANGE as SheetRange;

type AdventureRow = [
  Adventure["id"],
  Adventure["timeSlot"],
  Adventure["tableNumber"],
  Adventure["title"],
  Adventure["ruleset"],
  Adventure["description"],
  Adventure["minPlayers"],
  Adventure["maxPlayers"],
  string, // table shape, unused on FE
  Adventure["masterName"],
  Adventure["age"]
];

export const getAdventures = async (): Promise<Adventure[]> => {
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
        tableNumber,
        title,
        ruleset,
        description,
        minPlayers,
        maxPlayers,
        ,
        masterName,
        age,
      ] = row as AdventureRow;

      const booked = bookings
        .filter(({ adventureId }) => adventureId === id)
        .reduce((total, { seats }) => total + seats, 0);

      const useMinPlayers = process.env.NEXT_PUBLIC_USE_MIN_PLAYERS;
      const availableSeats = Math.max(
        0,
        Number(useMinPlayers ? minPlayers : maxPlayers) - booked
      );

      return {
        id: id.replace(/\s+/g, ""), // sanification, removes all whitespace from ids
        timeSlot: Number(timeSlot) as Adventure["timeSlot"],
        tableNumber: Number(tableNumber),
        title,
        ruleset,
        description,
        minPlayers: Number(minPlayers),
        maxPlayers: Number(maxPlayers),
        masterName,
        availableSeats,
        age,
      };
    })
    .sort((a, b) => {
      if (a.timeSlot !== b.timeSlot) {
        return a.timeSlot - b.timeSlot;
      }

      if (a.tableNumber !== b.tableNumber) {
        return a.tableNumber - b.tableNumber;
      }

      return a.title.localeCompare(b.title);
    });

  return adventures;
};
