import { getGroups } from "@/src/services/routes/groupRoutes";
import React, { FC, useState } from "react";
import {
  FaCircle,
  FaCross,
  FaHelicopter,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";

interface Props {
  isBoardOpen: boolean;
  setIsBoardOpen: (value: boolean) => void;
  isStudent?: boolean;
  openSecondModal: () => void;
  teacherID?: number;
}
const SidePanel: FC<Props> = ({
  isBoardOpen,
  setIsBoardOpen,
  isStudent = true,
  openSecondModal,
  teacherID,
}) => {
  const [groups, setGroups] = useState<any[]>([]);
  const getTeacherGroups = async () => {
    try {
      if (teacherID) {
        const response = await getGroups(teacherID);
        setGroups(response);
      }
    } catch (error) {
      console.error("Error fetching Groups:", error);
    }
  };
  return (
    <div
      className={`min-h-screen  w-[250px] ${
        isStudent ? "bg-yellow-500" : "bg-colorSix"
      } transform transition-transform duration-400 ${
        isBoardOpen ? "translate-x-0" : "-translate-x-[80%]"
      }`}
    >
      <div className="flex flex-row justify-end">
        <button
          type="button"
          onClick={() => setIsBoardOpen(!isBoardOpen)}
          className="mt-2 px-2 border-[0.5px] border-black bg-white text-colorOne rounded-xl  cursor-pointer"
        >
          {isBoardOpen ? <FaToggleOn /> : <FaToggleOff />}
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
      <div>
        <div className="flex  flex-row w-full items-center justify-center">
          <h2 className="text-white my-2 text-xl w-full text-center ">
            Groups Created
          </h2>
          <button
            className=" px-2 border-[0.5px] border-black bg-white text-colorOne rounded-xl mx-5 cursor-pointer"
            onClick={() => getTeacherGroups()}
          >
            <FaCircle />
            <FaHelicopter />
          </button>
        </div>
        <div>
          {groups.length > 0 ? (
            groups.map((group) => (
              <div
                key={group.groupid}
                className="p-2 bg-white border  border-colorSeven shadow-sm rounded-xl m-2 overflow-hidden"
              >
                <h3 className=" text-lg text-colorFour font-orbitron_variable">
                  Name: {group.groupname}
                </h3>
                <p>Info: {group.description}</p>
                {/* <p>Teacher ID: {group.teacherid}</p> */}
                <p>Date Created: {group.datecreated || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No groups available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
