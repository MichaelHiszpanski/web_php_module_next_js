import React, { FC, useState } from "react";
import CustomModal from "../../custom-modal/CustomModal";
import PersonalDetailsForm from "../../forms/PersonalDetailsForm";
interface Props {
  isBoardOpen: boolean;
  setIsBoardOpen: (value: boolean) => void;
  isStudent?: boolean;
  openSecondModal: () => void;
}
const SidePanel: FC<Props> = ({
  isBoardOpen,
  setIsBoardOpen,
  isStudent = true,
  openSecondModal,
}) => {
  const handleFormSubmit = async (formData: any) => {};
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
      {!isStudent && (
        <div
          className="mt-10 px-2 border-[0.5px] border-black bg-white text-colorOne rounded-xl mx-5 cursor-pointer"
          onClick={openSecondModal}
        >
          Create new group.
        </div>
      )}
    </div>
  );
};

export default SidePanel;
