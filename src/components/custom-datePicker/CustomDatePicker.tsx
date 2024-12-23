import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
}

const CustomDatePicker: React.FC<Props> = ({
  selectedDate,
  onChange,
  label,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        className="p-2 border rounded-md w-full"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default CustomDatePicker;
