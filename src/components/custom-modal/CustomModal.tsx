import React, { FC, ReactNode } from "react";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
  children: ReactNode;
}

const CustomModal: FC<Props> = ({ isModalOpen, onCloseModal, children }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onCloseModal}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
