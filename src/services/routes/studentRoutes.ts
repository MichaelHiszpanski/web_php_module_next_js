export const getStudents = async () => {
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
    const result = await getStudents();

    if (Array.isArray(result)) {
      setStudents(result);
    } else {
      setStudents([]);
    }
  } catch (error) {
    setStudents([]);
  }
};