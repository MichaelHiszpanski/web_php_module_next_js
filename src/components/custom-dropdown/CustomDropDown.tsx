import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  error?: string | null;
}

const AnimatedDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  error = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div
        onClick={toggleDropdown}
        //   className="cursor-pointer p-2 border rounded bg-white shadow-md text-gray-700 focus:outline-none"
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {selectedOption || "Select an option"}
      </div>

      <div
        className={`absolute left-0 right-0 mt-1 bg-white border rounded shadow-md transition-all ease-in-out duration-300 ${
          isOpen
            ? "opacity-100 max-h-60 visible"
            : "opacity-0 max-h-0 invisible"
        }`}
      >
        <ul className="py-2">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer z-50"
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default AnimatedDropdown;
