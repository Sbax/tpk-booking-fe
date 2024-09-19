import { AdventureSelector } from "@/components/AdventureSelector";
import { getAdventures } from "@/lib/adventures";
import { Booking } from "@/types";

export default async function AdventureSelectionFragment({
  params,
}: {
  params: { bookingId: Booking["id"] };
}) {
  const { bookingId } = params;
  const adventures = await getAdventures();

  return (
    <AdventureSelector
      adventures={adventures.filter(
        ({ availableSeats }) => availableSeats !== 0
      )}
      baseUrl={`/bookings/${bookingId}/adventure`}
    />
  );
}
