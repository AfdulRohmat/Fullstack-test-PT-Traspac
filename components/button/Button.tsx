import { IconType } from "react-icons";
import React, { useCallback } from "react";

interface ButtonProps {
  label: string;
  onButtonClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onButtonClick,
  disabled,
  outline,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onButtonClick}
      className={`flex justify-center gap-4 items-center disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full text-sm py-2 font-semibold border-2
      ${outline ? "bg-white hover:bg-neutral-200" : "bg-rose-500"}
      ${outline ? "border-black" : "border-rose-500"}
      ${outline ? "text-black" : "text-white"}
      `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
