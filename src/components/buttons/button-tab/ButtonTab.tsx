import React, { FC } from "react";

interface Props {
  isDisabled?: boolean;
  onClick?: () => void;
  title: string;
  type?: "button" | "submit" | "reset";
}

const ButtonTab: FC<Props> = ({
  isDisabled = false,
  onClick,
  title,
  type = "button",
}) => {
  return (
    <button
      className="w-full bg-blue-500 p-2 rounded-lg text-white my-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

export default ButtonTab;
