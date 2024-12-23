import { useQuery } from "@tanstack/react-query";

export const getStudentNotes = async (id: number) => {
  const response = await fetch(`/api/students/student/to-do?StudentID=${id}`);

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const useStudentNotes = (id: number) => {
  return useQuery({
    queryKey: ["studentNotes", id],
    queryFn: () => getStudentNotes(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
