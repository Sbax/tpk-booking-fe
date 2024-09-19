"use client";

import { Booking } from "@/types";
import { useParams } from "next/navigation";

export const Header = () => {
  const { bookingId } = useParams<{ bookingId?: Booking["id"] }>();

  if (bookingId) {
    return <h1 className="mb-2 font-bold text-xl">Modifica la prenotazione</h1>;
  }

  return <h1 className="mb-2 font-bold text-xl">Prenota una sessione</h1>;
};
