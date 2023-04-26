import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  disabled,
  type = "text",
  required,
  register,
  errors,
}) => {
  return (
    <div className="form-control w-full max-w-xl mb-4">
      <label className="label">
        <span className="label-text font-semibold">{label} : </span>
      </label>
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder="Type here"
        className={`input input-bordered input-secondary  w-full
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
    </div>
  );
};

export default TextInput;
