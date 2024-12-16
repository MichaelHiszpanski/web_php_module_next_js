import { responseGetGroups } from "@/src/services/routes/groupRoutes";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FaScroll, FaToggleOff, FaToggleOn } from "react-icons/fa";
import SidePanelItem from "./SidePanelItem";
import { responseStudentGroups } from "@/src/services/routes/studentRoutes";
import userStore from "@/src/mobX/user-store/user_store";
import { useTranslation } from "@/src/utils/hooks/useTranslation";

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
  const [name, setName] = useState<string>("");
  const { dictionary } = useTranslation();
  const getTeacherGroups = useCallback(async () => {
    try {
      if (teacherID) {
        const response = await responseGetGroups(teacherID);
        setGroups(response);
      }
    } catch (error) {
      console.error("Error: Something went wrong!", error);
    }
  }, [teacherID]);

  const getStudentsGroups = useCallback(async () => {
    try {
      if (!teacherID) {
        const response = await responseStudentGroups(userStore.user.userId);
        setGroups(response);
      }
    } catch (error) {
      console.error("Error: Something went wrong!", error);
    }
  }, [isStudent == true]);

  useEffect(() => {
    if (teacherID) {
      getTeacherGroups();
    } else {
      getStudentsGroups();
    }
  }, [teacherID, getTeacherGroups, isStudent, openSecondModal]);

  const handleGroupClick = (groupid: number, groupName: string) => {
    setGroupId(groupid);
    setName(groupName);
  };

  return (
    <div
      className={`min-h-[700px]  w-[250px]  border border-colorOne ${
        isStudent ? "bg-colorEight" : "bg-colorSix"
      } transform transition-transform duration-400 ${
        isBoardOpen ? "translate-x-0" : "-translate-x-[80%]"
      }`}
    >
      <div className="flex flex-row w-full items-center text-start px-2">
        <span style={{ fontSize: "14px" }} className=" font-mono">
          {dictionary.side_panel[0].selected}
        </span>
        <p
          className=" font-mono ml-1 text-colorFive"
          style={{ fontSize: "16px" }}
        >
          <strong> {name !== "" && ` ${name}`}</strong>
        </p>
      </div>
      <div>
        <div className="flex mt-2 px-2   flex-row w-full items-center justify-between">
          {/* <p className="font-mono text-sm mr-10">Refresh -{">"} </p> */}
          <button
            className=" p-1 border-[0.5px] border-black bg-white  font-orbitron_variable  text-colorOne rounded-xl  flex flex-row items-center  cursor-pointer"
            onClick={() => getTeacherGroups()}
            style={{ fontSize: "12px" }}
          >
            {dictionary.side_panel[0].refresh_group}
            <FaScroll size={18} />
          </button>
          <div className="flex flex-row justify-start">
            <button
              type="button"
              onClick={() => setIsBoardOpen(!isBoardOpen)}
              className="mt-2 px-2 border-[0.5px] border-black bg-white text-colorOne rounded-xl  cursor-pointer"
            >
              {isBoardOpen ? (
                <FaToggleOn size={18} />
              ) : (
                <FaToggleOff size={18} />
              )}
            </button>
          </div>
        </div>

        {/* <h2 className="text-colorOne  my-2 text-sm w-full text-start ml-[15px] font-mono">
          Groups Created
        </h2> */}

        <div
          style={{ overflowY: "auto" }}
          className=" h-[500px]  rounded-md p-2 mx-2 bg-white bg-opacity-50 mt-5"
        >
          {groups.length > 0 ? (
            groups.map((group) => (
              <SidePanelItem
                key={group.groupid}
                groupName={group.groupname}
                description={group.description}
                dateCreated={group.datecreated}
                groupid={group.groupid}
                onClick={() => handleGroupClick(group.groupid, group.groupname)}
              />
            ))
          ) : (
            <p> {dictionary.side_panel[0].no_groups}</p>
          )}
        </div>
      </div>
      <div>
        {!isStudent && (
          <div
            className="mt-2 text-sm mb-2 p-1 border-[0.5px] border-black text-center bg-white
                font-orbitron_variable text-colorOne rounded-xl mx-5 cursor-pointer"
            onClick={openSecondModal}
          >
            {dictionary.side_panel[0].new_group}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
