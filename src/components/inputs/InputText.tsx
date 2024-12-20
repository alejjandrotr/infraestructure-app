import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface InputProp
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "valueAsNumber"> {
  label?: string;
  register: UseFormRegister<any>;
  name: string;
  valueAsNumber?: boolean;
  error?: FieldError;
}

export const InputText: React.FC<InputProp> = ({
  label,
  register,
  name,
  valueAsNumber,
  error,
  type = "text",
  placeholder,
  className = "",
  ...rest // Usar rest para otras props
}) => {
  const id = `input-${name}`;
  valueAsNumber = valueAsNumber || (type === "number" ? true : false);
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
        id={id} // Asignar el ID al input
        type={type}
        placeholder={placeholder}
        className={classForInput}
        {...register(name, { valueAsNumber })}
        {...rest} // Desestructurar otras props
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};
