import {
  getUsersListsFromGroup,
  responsePostMemberToGroup,
  responseRemovetMemberToGroup,
  responseUsersFromGroup,
} from "@/src/services/routes/groupRoutes";
import {
  getAllStudentsList,
  responseStudents,
} from "@/src/services/routes/studentRoutes";
import React, { useEffect, useState } from "react";
import UserDisplayInGroup from "../../components/UserDisplayInGroup";
import StudentDisplayInGroup from "../../components/StudentsDisplayInGroup";
import ButtonTab from "@/src/components/buttons/button-tab/ButtonTab";
interface Props {
  groupId: number;
}
const StudentsContentTab: React.FC<Props> = ({ groupId }) => {
  const [students, setStudents] = useState<any>([]);
  const [usersInGroup, setUsersInGroup] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [errors, setErrors] = useState<any>([]);
  useEffect(() => {
    getAllStudentsList(setStudents);
  }, []);
  useEffect(() => {
    getUsersListsFromGroup(groupId, setUsersInGroup);
  }, [groupId]);
  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };
  const handleAddUserToGroup = async () => {
    const response: any = await responsePostMemberToGroup(
      selectedItem.userid,
      groupId
    );
    console.log("Error adding user:222", response.error);
    if (response.error) {
      setErrors([response.error]);
      console.error("Error adding user:", response.error);
    } else {
      getUsersListsFromGroup(groupId, setUsersInGroup);
    }
  };
  const handleRemoveUserToGroup = async () => {
    const response: any = await responseRemovetMemberToGroup(
      selectedItem.userid,
      groupId
    );
    console.log("Error adding user:222", response.error);
    if (response.error) {
      setErrors([response.error]);
      console.error("Error adding user:", response.error);
    } else {
      getUsersListsFromGroup(groupId, setUsersInGroup);
    }
  };
  return (
    <div className="w-full grid grid-cols-2 gap-4  bg-white rounded-xl  items-center pb-[200px]">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 p-4 w-full">
          <h1 className="text-xl font-bold  w-full text-center font-mono">
            Students in Group
          </h1>
          <h1 className="text-xl font-bold  w-full  text-center font-mono">
            ALL Students
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 w-full">
          <div
            className="w-full h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-gray-400 flex flex-col-reverse items-start 
                 gap-2 p-4 overflow-y-auto"
            aria-label="Students in Group"
            style={{ overflowY: "auto" }}
          >
            {students.length === 0 ? (
              <div>EMPTY</div>
            ) : (
              usersInGroup.map((item: any) => (
                <UserDisplayInGroup
                  item={item}
                  key={item.userid}
                  onClick={() => handleItemClick(item)}
                />
              ))
            )}
          </div>
          <div
            className="w-full h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-gray-400 flex flex-col-reverse items-start 
                 gap-2 p-4 overflow-y-auto"
            aria-label="All Students"
            style={{ overflowY: "auto" }}
          >
            {students.length === 0 ? (
              <div>EMPTY</div>
            ) : (
              students.map((item: any) => (
                <StudentDisplayInGroup
                  item={item}
                  key={item.studentid}
                  onClick={() => handleItemClick(item)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full h-[50px]">
          {errors.length > 0 && (
            <div className="text-red-500 text-xl font-mono">
              {errors.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="w-[97%] h-[600px] bg-colorEight p-4 rounded-lg shadow-md  relative">
          <div className="w-full  border-y border-y-colorOne">
            <h2 className="text-xl font-bold my-2 font-orbitron_variable">
              Details
            </h2>
          </div>

          {selectedItem ? (
            <div>
              <p className="text-sm font-semibold font-permanentMarker mt-2">
                Selected Item Details:
              </p>
              <pre className="bg-gray-200 p-2 mt-2 rounded-xl">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Click on a student or user to see details here.
            </p>
          )}
          <div className="mt-5 border-y border-y-colorOne">
            <h2 className="text-xl font-bold my-2 font-orbitron_variable">
              Actions
            </h2>
          </div>
          <div className=" absolute w-[95%] bottom-0">
            <ButtonTab title={"Add"} onClick={handleAddUserToGroup} />
            <ButtonTab title={"Remove"} onClick={handleRemoveUserToGroup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsContentTab;
