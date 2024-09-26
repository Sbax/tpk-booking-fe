import { Booking, BookingFormInputs } from "@/types";
import { useState } from "react";

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
      const { name, email, seats, adventureId } = bookingData;

      const requiredFieldMissing =
        [name, email, seats, adventureId].filter(Boolean).length === 0;

      if (requiredFieldMissing) {
        throw new Error("Errore durante l'aggiornamento della prenotazione");
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        PageTitles: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, seats, adventureId }),
      });

      if (!response.ok) {
        throw new Error("Errore durante la creazione della prenotazione");
      }

      const result = await response.json();
      setResult(result);
    } catch (error) {
      setError(
        (error as Error).message ||
          "Errore durante la creazione della prenotazione."
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
      const { name, seats, adventureId } = bookingData;

      const requiredFieldMissing =
        [name, seats, adventureId].filter(Boolean).length === 0;

      if (requiredFieldMissing) {
        throw new Error("Errore durante l'aggiornamento della prenotazione");
      }

      const response = await fetch(`/api/bookings`, {
        method: "PATCH",
        PageTitles: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, seats, adventureId }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento della prenotazione");
      }

      const result = await response.json();
      setResult(result);
    } catch (error) {
      setError(
        (error as Error).message ||
          "Errore durante l'aggiornamento della prenotazione."
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
        PageTitles: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Errore durante la cancellazione della prenotazione");
      }

      await response.json();
      setResult({ deleted: id });
    } catch (error) {
      setError(
        (error as Error).message ||
          "Errore durante la cancellazione della prenotazione."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    updateBooking,
    deleteBooking,

    loading,
    result,
    error,
  };
};
