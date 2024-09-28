import { getBookings } from "@/lib/bookings";
import { getSheetData } from "@/lib/sheets";
import { Adventure, SheetRange } from "@/types";
import crypto from "crypto";

const spreadsheetId = process.env.SHEET_ID as string;
const adventureRange = process.env.SHEET_ADVENTURE_RANGE as SheetRange;

function generateAdventureId(
  title: Adventure["title"],
  masterName: Adventure["masterName"],
  timeSlot: Adventure["timeSlot"]
): Adventure["id"] {
  const hash = crypto.createHash("sha256");
  hash.update(`${title}-${masterName}-${timeSlot}`);

  return hash.digest("hex");
}

export async function getAdventures(): Promise<Adventure[]> {
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
    .map((row: string[]) => {
      const [
        timeSlot,
        title,
        rules,
        description,
        minPlayers,
        maxPlayers,
        tableShape,
        masterName,
      ] = row;

      const id = generateAdventureId(
        title,
        masterName,
        Number(timeSlot) as Adventure["timeSlot"]
      );

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
        tableShape,
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

  return adventures;
}
