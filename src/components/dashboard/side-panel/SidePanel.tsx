import { useGetGroups } from "@/src/services/routes/groupRoutes";
import React, { FC, useEffect, useState } from "react";
import { FaScroll, FaToggleOff, FaToggleOn } from "react-icons/fa";
import SidePanelItem from "./SidePanelItem";
import { responseStudentGroups } from "@/src/services/routes/studentRoutes";
import userStore from "@/src/mobX/user_store";
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
  const [studentGroups, setStudentGroups] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const { dictionary } = useTranslation();

  const {
    data: teacherGroups = [],
    isLoading: isTeacherLoading,
    isError: isTeacherError,
    refetch: refetchTeacherGroups,
  } = useGetGroups(teacherID!);

  const getStudentsGroups = async () => {
    try {
      const response = await responseStudentGroups(userStore.user.userId);
      setStudentGroups(response);
    } catch (error) {
      console.error("Error fetching student groups:", error);
    }
  };

  useEffect(() => {
    if (!teacherID) {
      getStudentsGroups();
    }
  }, [teacherID]);

  const groups = teacherID ? teacherGroups : studentGroups;

  const handleGroupClick = (groupid: number, groupName: string) => {
    setGroupId(groupid);
    setName(groupName);
  };
  const handleRefresh = () => {
    if (teacherID) {
      refetchTeacherGroups();
    } else {
      getStudentsGroups();
    }
  };

  return (
    <div
      className={`min-h-[700px]  w-[250px] bg-transparent  border border-colorOne
       transform transition-transform duration-400 ${
         isBoardOpen ? "translate-x-0" : "-translate-x-[80%] z-0"
       }`}
    >
      <div className="flex flex-col w-full items-center text-start px-2 bg-white h-[60px]">
        <span
          style={{ fontSize: "14px" }}
          className=" font-mono w-full text-start"
        >
          {dictionary.side_panel[0].selected}
        </span>
        <p
          className=" font-mono ml-1 text-colorFive w-full text-start"
          style={{ fontSize: "18px" }}
        >
          <strong> {name !== "None" && ` ${name}`}</strong>
        </p>
      </div>
      <div>
        <div className="flex mt-1 px-2   flex-row w-full items-center justify-between">
          {/* <p className="font-mono text-sm mr-10">Refresh -{">"} </p> */}

          <div className="flex flex-row justify-end w-full">
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

        <div
          style={{ overflowY: "auto" }}
          className=" h-[500px]  rounded-md p-2 mx-2 bg-white bg-opacity-50 mt-5"
        >
          {isTeacherLoading ? (
            <p className="text-white w-full text-center">Loading...</p>
          ) : isTeacherError ? (
            <p className="text-white w-full text-center">
              Error loading groups.
            </p>
          ) : groups.length > 0 ? (
            groups.map((group: any) => (
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
      <div className="w-full flex flex-col items-center justify-center mt-5">
        <button
          className=" p-1 border-[0.5px]  w-[180px] border-black bg-white  font-orbitron_variable  text-colorOne 
                      rounded-xl  flex flex-row items-center justify-between px-2  cursor-pointer"
          onClick={handleRefresh}
          style={{ fontSize: "14px" }}
        >
          {dictionary.side_panel[0].refresh_group}
          <FaScroll size={18} />
        </button>
      </div>
      <div>
        {!isStudent && (
          <div
            className="mt-2 text-sm mb-2 p-1 w-[180px] border-[0.5px] border-black text-center bg-white
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
