import React, { FC } from "react";

interface Props {
  isDisabled?: boolean;
  onClick?: () => void;
  title: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const ButtonPrimary: FC<Props> = ({
  isDisabled = false,
  onClick,
  title,
  type = "button",
  className = "bg-blue-500 text-white",
}) => {
  return (
    <button
      className={`w-full ${className} p-2 rounded-lg 
      disabled:bg-gray-400 disabled:cursor-not-allowed`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

export default ButtonPrimary;
