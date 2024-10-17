import {
  appendDataToSheet,
  deleteRowById,
  getSheetData,
  updateRowById,
} from "@/lib/sheets";
import { Booking, SheetRange } from "@/types";

const spreadsheetId = process.env.SHEET_ID as string;
const range = process.env.SHEET_BOOKINGS_RANGE as SheetRange;

type BookingRow = [
  Booking["id"],
  Booking["name"],
  Booking["email"],
  Booking["seats"],
  Booking["adventureId"]
];

export async function getBookings(): Promise<Booking[]> {
  const bookingsResponse = await getSheetData({
    spreadsheetId,
    range,
  });

  const bookingsRows = bookingsResponse ? bookingsResponse : [];

  const bookings = bookingsRows.map((row) => {
    const [, id, name, email, seats, adventureId] = row as [
      string,
      ...BookingRow
    ];

    return {
      id,
      name,
      email,
      seats: Number(seats),
      adventureId,
    };
  });

  return bookings;
}

export async function getBookingById(
  id: Booking["id"]
): Promise<Booking | null> {
  const data = await getBookings();

  const booking = data.find((booking) => booking.id === id);

  if (!booking) {
    return null;
  }

  return booking;
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
    data: [id, name, email, seats, adventureId] as BookingRow,
  });
}

export async function updateBooking({
  id,
  name,
  seats,
  adventureId,
}: Omit<Booking, "email">) {
  const newData = [
    id,
    name,
    undefined,
    seats,
    adventureId,
  ] as Partial<BookingRow>;

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
