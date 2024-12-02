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

export const responseStudentGroups = async (userId: string) => {
  const response = await fetch(
    `/api/students/student/student-groups?UserID=${userId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};
