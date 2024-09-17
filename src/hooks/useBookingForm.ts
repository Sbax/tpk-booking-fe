import { useState } from "react";
import { Booking, BookingFormInputs } from "@/types";
import { SubmitHandler } from "react-hook-form";

export const useBookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    Booking | { deleted: Booking["id"] } | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: BookingFormInputs) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Errore durante la creazione della prenotazione");
      }

      const result = await response.json();
      setResult(result);
    } catch (error: any) {
      setError(
        error.message || "Errore durante la creazione della prenotazione."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (
    id: Booking["id"],
    bookingData: BookingFormInputs
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/bookings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...bookingData }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento della prenotazione");
      }

      const result = await response.json();
      setResult(result);
    } catch (error: any) {
      setError(
        error.message || "Errore durante l'aggiornamento della prenotazione."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: Booking["id"]) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/bookings`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Errore durante la cancellazione della prenotazione");
      }

      await response.json();
      setResult({ deleted: id });
    } catch (error: any) {
      setError(
        error.message || "Errore durante la cancellazione della prenotazione."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit: SubmitHandler<BookingFormInputs> = async (
    data
  ) => {
    if (data.id) {
      await updateBooking(data.id, data);
    } else {
      await createBooking(data);
    }
  };

  return {
    handleBookingSubmit,
    deleteBooking,
    loading,
    result,
    error,
  };
};
