"use client";

import { BookingWizard } from "@/components/BookingWizard";
import { Loader } from "@/components/Loader";
import { useAdventures } from "@/hooks/useAdventures";
import { useBooking } from "@/hooks/useBooking";
import { useBookingForm } from "@/hooks/useBookingForm";
import { Booking, BookingFormInputs } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const FormHandler = ({ bookingId }: { bookingId?: Booking["id"] }) => {
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const {
    adventures,
    loading: fetchAdventuresLoading,
    error: fetchAdventuresError,
  } = useAdventures();

  const {
    booking,
    getBookingById,
    loading: getBookingLoading,
    error: getBookingError,
  } = useBooking();

  const { handleBookingSubmit, deleteBooking, loading, error, result } =
    useBookingForm();

  useEffect(() => {
    if (bookingId) {
      getBookingById(bookingId);
    }
  }, [bookingId]);

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  useEffect(() => {
    if (result && "id" in result) {
      redirect(`/bookings/${result.id}`);
    }

    if (result && "deleted" in result) {
      redirect(`/`);
    }
  }, [result]);

  const handleFormSubmit = ({ ...data }: BookingFormInputs) =>
    handleBookingSubmit({ ...data, id: booking?.id });

  if (fetchAdventuresLoading)
    return <Loader text="Generando gli incontri casuali" />;
  if (getBookingLoading) return <Loader text="Cercando tesori" />;
  if (fetchAdventuresError || getBookingError)
    return (
      <p className="text-error">
        Si è verificato un errore, prova a ricaricare la pagina tra qualche
        minuto o{" "}
        <Link href="/" className="link link-error">
          torna alla home
        </Link>
        .
      </p>
    );

  const selectedAdventure = adventures.find(
    (adventure) => adventure.id === booking?.adventureId
  );

  return (
    <>
      <section className="flex flex-col justify-center space-y-4">
        {loading && <Loader text="Basterà giusto un attimo" />}

        {booking && (
          <button
            type="button"
            className="btn btn-error"
            onClick={() => setConfirmationModalOpen(true)}
          >
            Elimina la Prenotazione
          </button>
        )}

        <BookingWizard
          adventures={adventures}
          defaultBooking={booking || undefined}
          onSubmit={handleFormSubmit}
        />

        {error && (
          <p className="text-error">
            Si è verificato un errore, prova a ricaricare la pagina tra qualche
            minuto.
          </p>
        )}
      </section>

      {confirmationModalOpen && booking && selectedAdventure && (
        <dialog id="my_modal_3" className="modal modal-open">
          <div className="modal-box">
            <form method="dialog">
              <button
                className="top-2 right-2 absolute btn btn-circle btn-ghost btn-sm"
                onClick={() => setConfirmationModalOpen(false)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">
              Stai eliminando una prenotazione
            </h3>
            <p className="py-4">
              Sei sicurə di voler eliminare la prenotazione per{" "}
              <strong>{selectedAdventure.title}</strong> (
              {selectedAdventure.rules}) nella fascia{" "}
              {selectedAdventure.timeSlot === 1
                ? "10.00 - 14.00"
                : "16.00 - 20.00"}
              ?
            </p>
            <div className="flex space-x-4 w-full">
              <button
                className="flex-1 btn btn-error"
                onClick={() => {
                  deleteBooking(booking.id);
                  setConfirmationModalOpen(false);
                }}
              >
                Sì, cancella la prenotazione
              </button>
              <button
                className="flex-1 btn"
                onClick={() => setConfirmationModalOpen(false)}
              >
                No, annulla l&apos;operazione
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
