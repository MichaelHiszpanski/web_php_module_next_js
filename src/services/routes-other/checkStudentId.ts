import { useQuery } from "@tanstack/react-query";

export const getTeacherID = async (userId: string) => {
  const response = await fetch(
    `/api/teachers/teacher/teacher-id?UserID=${userId}`,
    {
      method: "GET",
    }
  );

  return response.json();
};

export const useGetTeacherId = (userId: string) => {
  return useQuery({
    queryKey: ["TeacherId", userId],
    queryFn: () => getTeacherID(userId),
    enabled: !!userId,
  });
};
