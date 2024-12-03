import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputProp extends Omit<Partial<HTMLInputElement>, 'valueAsNumber'> {
  label?: string;
  register: UseFormRegister<any>;
  name: string;
  valueAsNumber?: boolean;
  error?: FieldError;
}

export const InputText = ({
  label,
  register,
  name,
  valueAsNumber = false,
  error,
  type,
  placeholder,
  className,
  ...props
}: InputProp) => {
  return (
    <div>
      {label && (
        <label className="mb-3 block text-black dark:text-white text-left mr-1">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={className || "w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"}
        {...{ props }}
        {...register(name, { valueAsNumber: type === 'number' })}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};
