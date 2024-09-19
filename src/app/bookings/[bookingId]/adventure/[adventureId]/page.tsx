import { AdventureCard } from "@/components/AdventureCard";
import { BookingForm } from "@/components/BookingForm";
import { getAdventures } from "@/lib/adventures";
import { getBookingById } from "@/lib/bookings";
import { Adventure, Booking } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BookingDetails({
  params,
}: {
  params: { bookingId: Booking["id"]; adventureId: Adventure["id"] };
}) {
  const { bookingId, adventureId } = params;
  const booking = await getBookingById(bookingId);

  if (!booking) redirect("/");

  const adventures = await getAdventures();
  const selectedAdventure = adventures.find(({ id }) => id === adventureId);

  const adventureSelectionPath = `/bookings/${bookingId}/adventure`;
  if (!selectedAdventure) redirect(adventureSelectionPath);

  return (
    <>
      <section className="flex space-x-4 my-4">
        <Link href={`/bookings/${bookingId}/adventure`}>
          <button type="button" className="btn">
            <ArrowLeftIcon className="w-6 h-6" />
            Scegli un&apos;altra sessione
          </button>
        </Link>
      </section>

      <AdventureCard {...selectedAdventure} expanded />

      <BookingForm
        defaultBooking={booking}
        selectedAdventure={selectedAdventure}
      />
    </>
  );
}
