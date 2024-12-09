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
import CustomField from "@/src/components/custom-field/CustomField";
import CustomErros from "@/src/components/custom-errors/CustomErrors";
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

    if (response.error) {
      setErrors([response.error]);
    } else {
      getUsersListsFromGroup(groupId, setUsersInGroup);
    }
  };

  const handleRemoveUserToGroup = async () => {
    const response: any = await responseRemovetMemberToGroup(
      selectedItem.userid,
      groupId
    );

    if (response.error) {
      setErrors([response.error]);
    } else {
      getUsersListsFromGroup(groupId, setUsersInGroup);
    }
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4  rounded-xl  items-center pb-[200px]">
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
        {/* <div className="w-full h-[50px]">
          {errors.length > 0 && (
            <div className="text-red-500 text-xl font-mono">
              {errors.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div> */}
        <CustomErros errors={errors} />
        <div className="w-[97%] h-[600px] bg-colorNine p-4 rounded-lg shadow-md  relative">
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

              {Object.entries(selectedItem).map(([key, value]) => (
                <CustomField key={key} label={key} value={String(value)} />
              ))}
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
            <ButtonTab
              title={"Add"}
              onClick={handleAddUserToGroup}
              className=" bg-white text-colorFour font-bold shadow-sm border-[0.5px] border-gray-400
               hover:bg-colorFour hover:opacity-70 hover:text-colorOne"
            />
            <ButtonTab
              title={"Remove"}
              onClick={handleRemoveUserToGroup}
              className=" bg-white text-colorFour font-bold shadow-sm border-[0.5px] border-gray-400 
               hover:bg-colorFour hover:opacity-70 hover:text-colorOne"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsContentTab;
