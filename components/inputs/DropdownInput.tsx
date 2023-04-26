import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface DropdownInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  dataOptions: { id: any; name: string }[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  id,
  label,
  disabled,
  required,
  dataOptions,
  register,
  errors,
}) => {
  return (
    <div className="form-control w-full max-w-xl mb-4">
      <p className="text-sm font-semibold text-black p-1">{label} :</p>
      <select
        id={id}
        disabled={disabled}
        placeholder="Choose data"
        className={`select select-bordered select-secondary w-full
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        {...register(id, { required })}
      >
        <option disabled selected>
          Select data
        </option>
        {dataOptions.map((data) => {
          return (
            <>
              <option
                key={data.id}
                value={data.id}
                placeholder="Type here"
                className="input input-bordered input-secondary  w-full max-w-lg md:max-w-xl"
              >
                {data.name}
              </option>
            </>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownInput;
