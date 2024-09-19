"use client";

import { ErrorToast } from "@/components/ErrorToast";
import { Loader } from "@/components/Loader";
import { useBookingForm } from "@/hooks/useBookingForm";
import { Booking } from "@/types";
import { redirect, useParams } from "next/navigation";

import { useEffect, useState } from "react";

export const DeleteBooking = () => {
  const { bookingId } = useParams<{ bookingId: Booking["id"] }>();

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const { loading, result, error, deleteBooking } = useBookingForm();

  useEffect(() => {
    if (result) redirect("/");
  }, [result]);

  useEffect(() => {
    setConfirmationModalOpen(false);
  }, [error]);

  return (
    <>
      <button
        type="button"
        className="w-full btn btn-error"
        onClick={() => setConfirmationModalOpen(true)}
      >
        Elimina la Prenotazione
      </button>

      {loading && <Loader />}

      <ErrorToast error={Boolean(error)} />

      {bookingId && confirmationModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <button
              className="top-2 right-2 absolute btn btn-circle btn-ghost btn-sm"
              onClick={() => setConfirmationModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">
              Stai eliminando una prenotazione
            </h3>
            <p className="py-4">
              Sei sicurə di voler eliminare la prenotazione?
            </p>
            <div className="flex space-x-4 w-full">
              <button
                className="flex-1 btn btn-error"
                onClick={() => {
                  deleteBooking(bookingId);
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
