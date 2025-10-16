import NotFound from "@/app/not-found";
import { BookingDeleteButton } from "@/components/booking/BookingDeleteButton";
import { BookingForm } from "@/components/booking/BookingForm";
import { PageTitle } from "@/components/PageTitle";
import { SessionCard } from "@/components/session/SessionCard";
import { getBookingById } from "@/lib/bookings";
import { getSessions } from "@/lib/sessions";
import { Booking } from "@/types";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function BookingDetails({
  params,
}: {
  params: { bookingId: Booking["id"] };
}) {
  const t = await getTranslations({ namespace: "BookingDetails" });

  const { bookingId } = params;
  const booking = await getBookingById(bookingId);

  if (!booking)
    return (
      <NotFound
        description={t("NotFound.description")}
        ctaLabel={t("NotFound.ctaLabel")}
      />
    );

  const sessions = await getSessions();
  const selectedSession = sessions.find(({ id }) => id === booking.sessionId);

  const sessionSelectionPath = `/bookings/${bookingId}/session`;
  if (!selectedSession) redirect(sessionSelectionPath);

  return (
    <>
      <PageTitle title={t("title")} />

      <SessionCard {...selectedSession} expanded />

      <BookingForm defaultBooking={booking} selectedSession={selectedSession} />

      <section className="mt-4">
        <BookingDeleteButton bookingId={booking.id} />
      </section>
    </>
  );
}
