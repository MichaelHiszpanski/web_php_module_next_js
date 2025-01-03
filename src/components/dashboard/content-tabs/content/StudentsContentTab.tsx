import {
  responsePostMemberToGroup,
  responseRemovetMemberToGroup,
  useGetGroupUsers,
} from "@/src/routes/groupRoutes";
import { useGetStudents } from "@/src/routes/studentRoutes";
import React, { useState } from "react";
import UserDisplayInGroup from "../../components/UserDisplayInGroup";
import StudentDisplayInGroup from "../../components/StudentsDisplayInGroup";
import ButtonTab from "@/src/components/buttons/button-tab/ButtonTab";
import CustomField from "@/src/components/custom-field/CustomField";
import CustomErros from "@/src/components/custom-errors/CustomErrors";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/src/utils/hooks/useTranslation";

interface Props {
  groupId: number;
}
const StudentsContentTab: React.FC<Props> = ({ groupId }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [errors, setErrors] = useState<any>([]);
  const { data: studentsAll = [], isLoading, isError } = useGetStudents();
  const { dictionary } = useTranslation();
  const {
    data: usersInGroup = [],
    isLoading: isLoadingGroupUsers,
    isError: isErrorGroupUsers,
  } = useGetGroupUsers(groupId);
  const queryClient = useQueryClient();

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
    }
    handleRefreshGroupUsers();
  };

  const handleRemoveUserToGroup = async () => {
    const response: any = await responseRemovetMemberToGroup(
      selectedItem.userid,
      groupId
    );

    if (response.error) {
      setErrors([response.error]);
    }
    handleRefreshGroupUsers();
  };

  function handleRefreshGroupUsers() {
    queryClient.invalidateQueries({ queryKey: ["groupUsers", groupId] });
  }

  if (isLoading)
    return (
      <p className="text-white">
        {dictionary.students_content_tab[0].loading_students}
      </p>
    );
  if (isError)
    return (
      <p className="text-white">
        {dictionary.students_content_tab[0].error_loading_students}
      </p>
    );

  return (
    <div className="w-full grid grid-cols-2 gap-4 h-full rounded-xl  items-center ">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 p-4 w-full">
          <h1 className="text-xl font-bold  w-full text-center font-mono text-white">
            {dictionary.students_content_tab[0].students_in_group}
          </h1>
          <h1 className="text-xl font-bold  w-full  text-center font-mono text-white">
            {dictionary.students_content_tab[0].all_studnets}
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
            {isLoadingGroupUsers ? (
              <div className="w-full text-center text-gray-700 font-bold">
                {dictionary.students_content_tab[0].loading}
              </div>
            ) : isErrorGroupUsers ? (
              <div className="w-full text-center text-red-500 font-bold">
                {dictionary.students_content_tab[0].error_loading_group_users}
              </div>
            ) : usersInGroup !== null && usersInGroup.length === 0 ? (
              <div className="w-full text-center">
                {dictionary.students_content_tab[0].empty}
              </div>
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
            {studentsAll !== null && studentsAll.length === 0 ? (
              <div className="w-full text-center text-2xl font-orbitron_variable">
                {dictionary.students_content_tab[0].empty}
              </div>
            ) : (
              studentsAll &&
              studentsAll.map((item: any) => (
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
        <div className="w-[97%] h-[600px] bg-white p-4 rounded-lg shadow-md  relative">
          <div className="w-full  border-y border-y-colorOne">
            <h2 className="text-xl font-bold my-2 font-orbitron_variable text-colorOne">
              {dictionary.students_content_tab[0].details}
            </h2>
          </div>

          {selectedItem ? (
            <div>
              <p className="text-sm font-semibold font-permanentMarker mt-2 text-colorOne">
                {dictionary.students_content_tab[0].selected_item_details}
              </p>

              {Object.entries(selectedItem).map(([key, value]) => (
                <CustomField key={key} label={key} value={String(value)} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {dictionary.students_content_tab[0].click_on_student}
            </p>
          )}
          <div className="mt-5 border-y border-y-colorOne">
            <h2 className="text-xl font-bold my-2 font-orbitron_variable text-colorOne">
              {dictionary.students_content_tab[0].actions}
            </h2>
          </div>
          <div className=" absolute w-[95%] bottom-0">
            <ButtonTab
              title={dictionary.students_content_tab[0].add}
              onClick={handleAddUserToGroup}
              className="  text-white font-bold shadow-sm border-[0.5px] border-gray-400
               hover:bg-blue-500 hover:opacity-70 hover:text-colorOne bg-green-500"
            />
            <ButtonTab
              title={dictionary.students_content_tab[0].remove}
              onClick={handleRemoveUserToGroup}
              className="  text-white font-bold shadow-sm border-[0.5px] border-gray-400 
               hover:bg-orange hover:opacity-70 hover:text-colorOne bg-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsContentTab;
