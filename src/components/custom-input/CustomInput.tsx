import React, { FC, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
interface Props {
  label: string;
  value: string;
  name: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  keyboardType?: string;
  error?: string | null;
  isLabel?: boolean;
  className?: string;
}

const CustomInput: FC<Props> = ({
  label,
  value,
  name,
  onInputChange: onChange,
  placeholder = "",
  keyboardType = "text",
  error = "",
  onFocus = () => {},
  isLabel = true,
  className,
}) => {
  const [currentKeyboardType, setCurrentKeyboardType] = useState(keyboardType);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const showPassword = () => {
    setCurrentKeyboardType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  return (
    <div className={`mb-4 w-full `}>
      {isLabel && (
        <label className="block text-sm font-medium text-colorOne bg-white  mb-1">
          {label}
        </label>
      )}
      <div className=" relative">
        <input
          type={currentKeyboardType}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={(e) => {
            onFocus(e);
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          className={`w-full text-colorOne p-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
        {keyboardType === "password" && (
          <button
            type="button"
            onClick={showPassword}
            className={`absolute right-2 top-2 text-gray-500 hover:text-colorFive focus:outline-none `}
          >
            {currentKeyboardType === "password" ? (
              <FaRegEye size={25} />
            ) : (
              <FaRegEyeSlash size={25} />
            )}
          </button>
        )}
      </div>
      {error && error.length > 0 && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
