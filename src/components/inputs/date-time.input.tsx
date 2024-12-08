import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface DateTimeInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "valueAsNumber" | "defaultValue"
  > {
  label?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
  defaultValue?: Date;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  register,
  name,
  error,
  placeholder,
  defaultValue,
  className = "",
  ...rest
}) => {
  const id = `input-${name}`;

  const classForInput =
    className ||
    `w-full rounded-lg border-[1.5px] py-3 px-5 transition outline-none ${
      error ? "border-red-500" : "border-stroke"
    } bg-transparent text-black dark:border-form-strokedark dark:bg-form-input dark:text-white`;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mb-2.5 block font-medium text-black dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type="datetime-local"
        placeholder={placeholder}
        className={classForInput}
        {...register(name, { valueAsDate: true })}
        {...rest}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};
