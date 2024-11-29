import { responseGetGroups } from "@/src/services/routes/groupRoutes";
import React, { FC, useEffect, useState } from "react";
import {
  FaCircle,
  FaCross,
  FaFileArchive,
  FaHelicopter,
  FaScroll,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import SidePanelItem from "./SidePanelItem";

interface Props {
  isBoardOpen: boolean;
  setIsBoardOpen: (value: boolean) => void;
  isStudent?: boolean;
  openSecondModal: () => void;
  teacherID?: number;
  setGroupId: React.Dispatch<React.SetStateAction<any>>;
}
const SidePanel: FC<Props> = ({
  isBoardOpen,
  setIsBoardOpen,
  isStudent = true,
  openSecondModal,
  teacherID,
  setGroupId,
}) => {
  const [groups, setGroups] = useState<any[]>([]);

  const getTeacherGroups = async () => {
    try {
      if (teacherID) {
        const response = await responseGetGroups(teacherID);
        setGroups(response);
      }
    } catch (error) {
      console.error("Error fetching Groups:", error);
    }
  };
  useEffect(() => {
    if (teacherID) {
      getTeacherGroups();
    }
  }, [teacherID]);

  const handleGroupClick = (groupid: number) => {
    setGroupId(groupid);
    console.log("Selected Group ID:", groupid);
  };
  return (
    <div
      className={`min-h-[700px]  w-[250px] ${
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

      <div>
        <div className="flex mt-2  flex-row w-full items-center justify-center">
          <h2 className="text-white  my-2 text-lg w-full text-center font-mono">
            Groups Created
          </h2>
          <button
            className=" p-1 border-[0.5px] border-black bg-white  text-colorOne rounded-xl   cursor-pointer"
            onClick={() => getTeacherGroups()}
          >
            {/* <FaCircle />
            <FaHelicopter /> */}

            <FaScroll size={20} />
          </button>
        </div>
        {!isStudent && (
          <div
            className="mt-2 text-sm mb-2 px-2 border-[0.5px] border-black bg-white
                font-orbitron_variable text-colorOne rounded-xl mx-5 cursor-pointer"
            onClick={openSecondModal}
          >
            Create new group.
          </div>
        )}
        <div
          style={{ overflowY: "auto" }}
          className=" h-[700px] bg-white rounded-md p-2 ml-2"
        >
          {groups.length > 0 ? (
            groups.map((group) => (
              <SidePanelItem
                key={group.groupid}
                groupName={group.groupname}
                description={group.description}
                dateCreated={group.datecreated}
                groupid={group.groupid}
                onClick={handleGroupClick}
              />
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
