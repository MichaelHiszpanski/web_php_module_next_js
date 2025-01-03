import React, { FC, ReactNode } from "react";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
  children: ReactNode;
  isCloseButtonavaiable?: boolean;
}

const CustomModal: FC<Props> = ({
  isModalOpen,
  onCloseModal,
  children,
  isCloseButtonavaiable = true,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-max">
        <div className="flex justify-end p-4 ">
          {isCloseButtonavaiable && (
            <button
              type="button"
              onClick={onCloseModal}
              className="text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          )}
        </div>

        <div className="px-6 py-2">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
