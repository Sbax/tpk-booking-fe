import { Booking } from "@/types";
import { useState } from "react";

export const useBooking = () => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBookingById = async (id: Booking["id"]) => {
    setLoading(true);
    setError(null);
    setBooking(null);

    try {
      const response = await fetch(`/api/bookings/${id}`);
      if (!response.ok) {
        throw new Error("Errore nel recuperare la prenotazione");
      }

      const data = await response.json();
      setBooking(data);
    } catch (err: any) {
      setError(err.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  return {
    booking,
    getBookingById,
    loading,
    error,
  };
};
