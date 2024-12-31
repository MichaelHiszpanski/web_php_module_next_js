import { useQuery } from "@tanstack/react-query";

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
    staleTime: 5 * 60 * 1000,
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
    staleTime: 5 * 60 * 1000,
    enabled: !!TeacherID,
  });
};
