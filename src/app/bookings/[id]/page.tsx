"use client";

import { FormHandler } from "@/components/FormHandler";
import { Booking } from "@/types";

export default function BookingDetailsPage({
  params,
}: {
  params: { id: Booking["id"] };
}) {
  const { id } = params;

  return (
    <>
      <h1 className="mb-2 font-bold text-xl">Modifica la prenotazione</h1>
      <FormHandler bookingId={id} />
    </>
  );
}
