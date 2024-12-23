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

export const responseAddNote = async (
  id: number,
  textInput: string,
  description: string,
  selectedDate: Date
) => {
  const response = await fetch(`/api/students/student/to-do`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      StudentID: id,
      TaskTitle: textInput.trim(),
      TaskDescription: description,
      DueDate: selectedDate.toISOString(),
    }),
  });
  return response;
};
export const responseDeleteNote = async (id: number) => {
  const response = await fetch(`/api/students/student/to-do`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ToDoID: id }),
  });
  return response;
};
