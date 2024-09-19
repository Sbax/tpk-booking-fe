"use client";

import { Booking, BookingFormInputs } from "@/types";
import { useForm } from "react-hook-form";

type InputFieldProps = {
  id: keyof Booking;
  type: string;
  register: ReturnType<typeof useForm<BookingFormInputs>>["register"];
  error?: string;
  validationRules: object;
};

export const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  register,
  error,
  validationRules,
}) => (
  <div>
    <input
      id={id}
      type={type}
      {...register(id, validationRules)}
      className={`input input-bordered w-full ${error ? "input-error" : ""}`}
    />
    {error && <span className="mt-1 text-error text-sm">{error}</span>}{" "}
  </div>
);
