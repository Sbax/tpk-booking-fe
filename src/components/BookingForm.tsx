import { BookingFormInputs } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { Label } from "./Label";

type BookingFormProps = {
  onSubmit: SubmitHandler<BookingFormInputs>;
  defaultBooking?: Partial<BookingFormInputs>;

  availableSeats: number;
};

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  defaultBooking,
  availableSeats,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BookingFormInputs>({
    defaultValues: defaultBooking,
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto">
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
        <Label htmlFor="seats" text="Numero di posti da prenotare" />
        <InputField
          id="seats"
          type="number"
          register={register}
          error={errors.seats?.message}
          validationRules={{
            required: "Il numero di posti è obbligatorio",
            min: { value: 1, message: "Devi prenotare almeno un posto" },
            max: {
              value: availableSeats || defaultBooking?.seats,
              message: "Non ci sono abbastanza posti disponibili",
            },
          }}
        />
      </div>

      {/* Pulsante di invio */}
      <button
        type="submit"
        className={`${
          !isValid ? " btn-disabled" : " btn-primary"
        } p-2 btn w-full`}
        disabled={!isValid}
      >
        Prenota!
      </button>
    </form>
  );
};
