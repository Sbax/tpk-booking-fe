import {
  appendDataToSheet,
  deleteRowById,
  getSheetData,
  updateRowById,
} from "@/lib/sheets";
import { Booking, SheetRange } from "@/types";

const spreadsheetId = process.env.SHEET_ID as string;
const range = process.env.SHEET_BOOKINGS_RANGE as SheetRange;

export async function getBookingById(
  id: Booking["id"]
): Promise<Booking | null> {
  const data = await getSheetData({
    spreadsheetId,
    range,
  });

  const bookingRow = data.find(([, bookingId]) => bookingId === id);

  if (!bookingRow) {
    return null;
  }

  const [, bookingId, name, email, seats, adventureId] = bookingRow;
  return {
    id: bookingId,
    name,
    email,
    seats: Number(seats),
    adventureId,
  };
}

export async function addBooking({
  id,
  name,
  email,
  seats,
  adventureId,
}: Booking) {
  await appendDataToSheet({
    spreadsheetId,
    range,
    data: [id, name, email, seats, adventureId],
  });
}

export async function updateBooking({
  id,
  name,
  seats,
  adventureId,
}: Omit<Booking, "email">) {
  const newData = [id, name, null, seats, adventureId];

  return updateRowById({
    spreadsheetId,
    range,
    id,
    newData,
  });
}

export async function deleteBooking(id: Booking["id"]) {
  return deleteRowById({
    spreadsheetId,
    range,
    id,
  });
}
