import React, { FC } from "react";

interface Props {
  label: string;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  keyboardType?: string;
  error?: string;
}

const CustomInput: FC<Props> = ({
  label,
  value,
  onInputChange: onChange,
  placeholder = "",
  keyboardType: type = "text",
  error = "",
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CustomInput;
