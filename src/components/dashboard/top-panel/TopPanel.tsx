import React from "react";
interface Props {
  isBoardOpen: boolean;
  isStudent: boolean;
}
const TopPanel: React.FC<Props> = ({ isBoardOpen, isStudent }) => {
  return (
    <div
      className={`w-full h-[100px] transform transition-transform duration-400 ${
        isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
      } ${isStudent ? "bg-yellow-500" : "bg-green-500"}`}
    ></div>
  );
};

export default TopPanel;
