import React, { FC } from "react";
interface Props {
  isBoardOpen: boolean;
  setIsBoardOpen: (value: boolean) => void;
  isStudent?: boolean;
}
const SidePanel: FC<Props> = ({
  isBoardOpen,
  setIsBoardOpen,
  isStudent = true,
}) => {
  return (
    <div
      className={`min-h-screen  w-[250px] ${
        isStudent ? "bg-yellow-500" : "bg-green-500"
      } transform transition-transform duration-400 ${
        isBoardOpen ? "translate-x-0" : "-translate-x-[80%]"
      }`}
    >
      <div className="flex flex-row justify-between">
        DashBoard
        <button type="button" onClick={() => setIsBoardOpen(!isBoardOpen)}>
          Close X
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
