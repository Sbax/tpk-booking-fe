import { getAdventures } from "@/lib/adventures";
import { addBooking, deleteBooking, updateBooking } from "@/lib/bookings";
import { sendConfirmationEmail } from "@/lib/email";
import { Adventure, Booking, BookingFormInputs } from "@/types";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

function getAvailabilityError(
  availableSeats: Adventure["availableSeats"]
): Adventure["id"] {
  if (availableSeats === 0) return "Nessun posto disponibile";
  if (availableSeats === 1) return "Solo un posto disponibile";
  return `Solo ${availableSeats} posti disponibili`;
}

async function validateBookingData({
  adventureId,
  seats,
}: {
  adventureId: Adventure["id"];
  seats: Booking["seats"];
}) {
  const adventures = await getAdventures();
  const foundAdventure = adventures.find((a) => a.id === adventureId);

  if (!foundAdventure) {
    return { error: "Avventura non trovata", status: 400 };
  }

  if (seats > foundAdventure.availableSeats) {
    const availabilityError = getAvailabilityError(
      foundAdventure.availableSeats
    );
    return { error: availabilityError, status: 400 };
  }

  return { adventure: foundAdventure, error: null };
}

async function handleBookingRequest(
  input: BookingFormInputs,
  processBooking: (params: {
    booking: Booking;
    adventure: Adventure;
  }) => Promise<void>
) {
  // adds a random UUID when creating the booking, keeps the current id otherwise
  const booking: Booking = { ...input, id: input.id || randomUUID() };

  try {
    const { adventure, error, status } = await validateBookingData({
      adventureId: booking.adventureId,
      seats: booking.seats,
    });

    if (error || !adventure) {
      return NextResponse.json({ error }, { status });
    }

    await processBooking({
      booking,
      adventure,
    });

    return NextResponse.json({
      ...booking,
    });
  } catch (error) {
    console.error("Errore durante l'operazione:", error);
    return NextResponse.json(
      { error: "Errore durante l'operazione" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const input = await request.json();

  return handleBookingRequest(input, async ({ booking, adventure }) => {
    await addBooking(booking);
    await sendConfirmationEmail({ booking, adventure });
  });
}

export async function PATCH(request: Request) {
  const input = await request.json();

  return handleBookingRequest(input, async ({ booking, adventure }) => {
    await updateBooking(booking);
    await sendConfirmationEmail({ booking, adventure });
  });
}

export async function DELETE(request: Request) {
  const { id } = (await request.json()) as Booking;

  try {
    await deleteBooking(id);

    return NextResponse.json({
      message: "Prenotazione cancellata con successo!",
      id,
    });
  } catch (error) {
    console.error("Errore durante la cancellazione della prenotazione:", error);
    return NextResponse.json(
      { error: "Errore durante la cancellazione della prenotazione" },
      { status: 500 }
    );
  }
}
