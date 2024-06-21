"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface InputProps {
  lable: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabaled: boolean;
}

const Input: React.FC<InputProps> = ({
  lable,
  id,
  type,
  required,
  register,
  errors,
  disabaled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {lable}
      </label>
      <div className=" mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabaled}
          {...register(id, { required })}
          className={clsx(
            `
              form-input
              block
              w-full
              rounded-md
              border-0
              py-1.5
              text-gray-900
              shadow-sm
              ring-4
              ring-inset
              ring-gray-300
              placohlder:text-gray-400
              focus:ring-2
              focus:ring-inset
              focus:ring-sky-600
              sm:text-sm 
              sm:leading-6
             `,
            errors[id] && "focus:ring-rose-500",
            disabaled && "opacity",
          )}
        />
      </div>
    </div>
  );
};

export default Input;
