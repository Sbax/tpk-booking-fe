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
  Adventure["rules"],
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
        rules,
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

      return {
        id,
        timeSlot: Number(timeSlot) as Adventure["timeSlot"],
        tableNumber: Number(tableNumber),
        title,
        rules,
        description,
        minPlayers: Number(minPlayers),
        maxPlayers: Number(maxPlayers),
        masterName,
        availableSeats: Number(maxPlayers) - booked,
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
