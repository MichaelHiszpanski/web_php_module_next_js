import { useQuery } from "@tanstack/react-query";

export const responseStudents = async () => {
  const response = await fetch(`/api/students`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getAllStudentsList = async (
  setStudents: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const result = await responseStudents();

    if (Array.isArray(result)) {
      setStudents(result);
    } else {
      setStudents([]);
    }
  } catch (error) {
    setStudents([]);
  }
};
export const useGetStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: responseStudents,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: true,
  });
};

export const responseStudentGroups = async (userId: string) => {
  const response = await fetch(`/api/users/user/user-groups?UserID=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
export const useGetStudentGroups = (userId: string) => {
  return useQuery({
    queryKey: ["studentGroups", userId],
    queryFn: () => responseStudentGroups(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const getStudentID = async (userId: string) => {
  const response = await fetch(
    `/api/students/student/student-id?UserID=${userId}`,
    {
      method: "GET",
    }
  );

  return response.json();
};

export const useGetStudentId = (userId: string) => {
  return useQuery({
    queryKey: ["StudentId", userId],
    queryFn: () => getStudentID(userId),
    enabled: !!userId,
  });
};
