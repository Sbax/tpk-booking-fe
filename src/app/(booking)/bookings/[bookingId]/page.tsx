import NotFound from "@/app/not-found";
import { AdventureCard } from "@/components/AdventureCard";
import { BookingForm } from "@/components/BookingForm";
import { DeleteBooking } from "@/components/DeleteBooking";
import { PageTitle } from "@/components/PageTitle";
import { getAdventures } from "@/lib/adventures";
import { getBookingById } from "@/lib/bookings";
import { Booking } from "@/types";
import { redirect } from "next/navigation";

export default async function BookingDetails({
  params,
}: {
  params: { bookingId: Booking["id"] };
}) {
  const { bookingId } = params;
  const booking = await getBookingById(bookingId);

  if (!booking)
    return (
      <NotFound
        description="La prenotazione non esiste o è stata cancellata"
        ctaLabel="Crea una nuova prenotazione"
      />
    );

  const adventures = await getAdventures();
  const selectedAdventure = adventures.find(
    ({ id }) => id === booking.adventureId
  );

  const adventureSelectionPath = `/bookings/${bookingId}/adventure`;
  if (!selectedAdventure) redirect(adventureSelectionPath);

  return (
    <>
      <PageTitle title="Modifica la prenotazione" />

      <AdventureCard {...selectedAdventure} expanded />

      <BookingForm
        defaultBooking={booking}
        selectedAdventure={selectedAdventure}
      />

      <section className="mt-4">
        <DeleteBooking bookingId={booking.id} />
      </section>
    </>
  );
}
