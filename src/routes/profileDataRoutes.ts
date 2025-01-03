import { useMutation, useQuery } from "@tanstack/react-query";
import { PersonalDetailModel } from "../models/PersonalDetailsModel";
import userStore from "../mobX/user_store";

export const responseStudentData = async (StudentID: number) => {
  const response = await fetch(
    `/api/students/student/data?StudentID=${StudentID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};

export const useGetStudentData = (StudentID: number) => {
  return useQuery({
    queryKey: ["studentData", StudentID],
    queryFn: () => responseStudentData(StudentID),
    enabled: !!StudentID,
  });
};

export const responseTeacherData = async (TeacherID: number) => {
  const response = await fetch(
    `/api/teachers/teacher/data?TeacherID=${TeacherID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};

export const useGetTeacherData = (TeacherID: number) => {
  return useQuery({
    queryKey: ["teacherData", TeacherID],
    queryFn: () => responseTeacherData(TeacherID),
    enabled: !!TeacherID,
  });
};

export const responsePUTStudnetORTeacher = async (
  isStudnet: boolean,
  formData: any,
  id: number
): Promise<any> => {
  const setPath = isStudnet ? "students/student" : "teachers/teacher";
  console.log("responsePUTStudnetORTeacher ID", formData.userId);
  const studentBody = {
    StudentID: id,
    FirstName: formData.name,
    LastName: formData.lastName,
    City: formData.city,
    Postcode: formData.postcode,
    StreetName: formData.street,
    HouseNumber: formData.houseNumber,
  };
  const teacherBody = {
    TeacherID: id,
    FirstName: formData.name,
    LastName: formData.lastName,
    City: formData.city,
    Postcode: formData.postcode,
    StreetName: formData.street,
    HouseNumber: formData.houseNumber,
  };
  const body = isStudnet ? studentBody : teacherBody;

  const response = await fetch(`/api/${setPath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    window.location.reload();
  }
};
