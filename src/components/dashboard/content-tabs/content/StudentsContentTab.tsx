import {
  getAllStudentsList,
  getStudents,
} from "@/src/services/routes/studentRoutes";
import React, { useEffect, useState } from "react";
interface Props {
  teacherID?: string;
}
const StudentsContentTab: React.FC<Props> = ({ teacherID }) => {
  const [students, setStudents] = useState<any>([]);
  useEffect(() => {
    getAllStudentsList(setStudents);
  }, []);
  return (
    <div className="w-full flex flex-row  h-full bg-white items-center">
      <div className="w-full p-5">
        <h1 className="text-xl font-bold mb-4 w-full text-center">
          Students in Group
        </h1>
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
            students.map((item: any) => (
              <div
                key={item.studentid}
                className="w-full bg-white p-2 rounded-md shadow-sm border border-gray-200"
              >
                <div>
                  <strong>First Name:</strong> {item.firstname}
                </div>
                <div>
                  <strong>Last Name:</strong> {item.lastname}
                </div>
                <div>
                  <strong>City:</strong> {item.city}
                </div>
                <div>
                  <strong>Postcode:</strong> {item.postcode}
                </div>
                <div>
                  <strong>Street Name:</strong> {item.streetname}
                </div>
                <div>
                  <strong>House Number:</strong> {item.housenumber}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-full p-5">
        <h1 className="text-xl font-bold mb-4 w-full text-center">
          ALL Students
        </h1>
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
              <div
                key={item.studentid}
                className="w-full bg-white p-2 rounded-md shadow-sm border border-gray-200"
              >
                <div>
                  <strong>First Name:</strong> {item.firstname}
                </div>
                <div>
                  <strong>Last Name:</strong> {item.lastname}
                </div>
                <div>
                  <strong>City:</strong> {item.city}
                </div>
                <div>
                  <strong>Postcode:</strong> {item.postcode}
                </div>
                <div>
                  <strong>Street Name:</strong> {item.streetname}
                </div>
                <div>
                  <strong>House Number:</strong> {item.housenumber}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsContentTab;
