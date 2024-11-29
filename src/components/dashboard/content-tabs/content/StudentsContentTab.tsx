import {
  getUsersListsFromGroup,
  responseUsersFromGroup,
} from "@/src/services/routes/groupRoutes";
import {
  getAllStudentsList,
  responseStudents,
} from "@/src/services/routes/studentRoutes";
import React, { useEffect, useState } from "react";
import UserDisplayInGroup from "../../components/UserDisplayInGroup";
import StudentDisplayInGroup from "../../components/StudentsDisplayInGroup";
interface Props {
  groupId: number;
}
const StudentsContentTab: React.FC<Props> = ({ groupId }) => {
  const [students, setStudents] = useState<any>([]);
  const [usersInGroup, setUsersInGroup] = useState<any>([]);
  useEffect(() => {
    getAllStudentsList(setStudents);
  }, []);
  useEffect(() => {
    getUsersListsFromGroup(groupId, setUsersInGroup);
  }, [groupId]);
  return (
    <div className="w-full grid grid-cols-2 gap-4 bg-white items-center pb-[200px]">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 p-4 w-full">
          <h1 className="text-xl font-bold mb-4 w-full text-center">
            Students in Group
          </h1>
          <h1 className="text-xl font-bold mb-4 w-full bg-green-400 text-center">
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
                <UserDisplayInGroup item={item} key={item.userid} />
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
                <StudentDisplayInGroup item={item} key={item.studentid} />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="w-full">Messages</div>
    </div>
  );
};

export default StudentsContentTab;
