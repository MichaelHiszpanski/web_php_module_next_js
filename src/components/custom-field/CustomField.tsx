import React from "react";
interface Props {
  label: string;
  value: string;
}
const CustomField: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="w-full h-8 flex flex-row items-center">
      <span className="font-bold text-colorOne">{label}: </span>
      <p className="ml-2 text-colorOne">{value}</p>
    </div>
  );
};

export default CustomField;
