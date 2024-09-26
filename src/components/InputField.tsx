"use client";

import { BookingFormInputs } from "@/types";
import { InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: keyof BookingFormInputs;
  register?: ReturnType<typeof useForm<BookingFormInputs>>["register"];
  error?: string;
  validationRules?: object;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  register = () => {},
  error,
  validationRules,
  ...props
}) => (
  <div>
    <input
      {...register(id, validationRules)}
      className={`input input-bordered w-full ${error ? "input-error" : ""}`}
      {...props}
    />
    {error && <span className="mt-1 text-error text-sm">{error}</span>}{" "}
  </div>
);
