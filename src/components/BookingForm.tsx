"use client";

import { ErrorToast } from "@/components/ErrorToast";
import { Loader } from "@/components/Loader";
import { PrivacyCheckbox } from "@/components/PrivacyCheckbox";
import { useBookingForm } from "@/hooks/useBookingForm";
import { Adventure, BookingFormInputs } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { Label } from "./Label";

type BookingFormProps = {
  defaultBooking?: BookingFormInputs;
  selectedAdventure: Adventure;
};

export const BookingForm: React.FC<BookingFormProps> = ({
  defaultBooking,
  selectedAdventure,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BookingFormInputs>({
    defaultValues: defaultBooking,
    mode: "onChange",
  });

  const { availableSeats, id: adventureId } = selectedAdventure;

  const bookableSeats = (() => {
    if (defaultBooking && defaultBooking.adventureId === adventureId) {
      return availableSeats + defaultBooking.seats;
    }

    return availableSeats;
  })();

  const { createBooking, updateBooking, loading, result, error } =
    useBookingForm();

  const onSubmit = (data: BookingFormInputs) => {
    if (defaultBooking && defaultBooking.id) {
      updateBooking(defaultBooking.id, { ...data, adventureId });
      return;
    }

    createBooking({ ...data, adventureId });
  };

  const [privacyCheckbox, setPrivacyCheckbox] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <section className="space-y-4">
        {/* Nome */}
        <div>
          <Label htmlFor="name" text="Nome" />
          <InputField
            id="name"
            type="text"
            register={register}
            error={errors.name?.message}
            validationRules={{ required: "Il nome è obbligatorio" }}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" text="Email" />
          <InputField
            id="email"
            type="email"
            register={register}
            error={errors.email?.message}
            validationRules={{
              required: "L'email è obbligatoria",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Indirizzo email non valido",
              },
            }}
          />
        </div>

        {/* Numero di posti */}
        <div>
          <Label
            htmlFor="seats"
            text={`Numero di posti da prenotare (massimo ${bookableSeats})`}
          />
          <InputField
            id="seats"
            type="number"
            register={register}
            error={errors.seats?.message}
            validationRules={{
              required: "Il numero di posti è obbligatorio",
              min: { value: 1, message: "Devi prenotare almeno un posto" },
              max: {
                value: bookableSeats,
                message: "Non ci sono abbastanza posti disponibili",
              },
            }}
          />
        </div>

        <div>
          <PrivacyCheckbox
            isChecked={privacyCheckbox}
            setIsChecked={setPrivacyCheckbox}
          />
        </div>
      </section>

      {/* Pulsante di invio */}
      <button
        type="submit"
        className={`${
          !privacyCheckbox || !isValid ? " btn-disabled" : " btn-primary"
        } p-2 btn w-full mt-4`}
        disabled={!privacyCheckbox || !isValid}
      >
        Prenota!
      </button>

      {loading && <Loader text="Giusto un attimo" />}

      <ErrorToast error={Boolean(error)} />

      {result && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Prenotazione inviata!</h3>
            <p className="py-4">
              Riceverai una mail di conferma all&apos;indirizzo indicato.
            </p>
            <div className="flex justify-center space-x-4 w-full">
              <Link href="/">
                <button className="flex-1 btn">Ok</button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </form>
  );
};
