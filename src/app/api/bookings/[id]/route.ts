import { NextResponse } from "next/server";
import { getBookingById } from "@/lib/bookings";
import { Booking } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { id: Booking["id"] } }
) {
  const { id } = params;

  try {
    const booking = await getBookingById(id);
    if (!booking) {
      return NextResponse.json(
        { error: "Prenotazione non trovata" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Errore nel recuperare la prenotazione:", error);
    return NextResponse.json({ error: "Errore del server" }, { status: 500 });
  }
}
