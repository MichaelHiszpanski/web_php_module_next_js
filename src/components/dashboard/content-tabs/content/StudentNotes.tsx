import CustomDatePicker from "@/src/components/custom-datePicker/CustomDatePicker";
import CustomModal from "@/src/components/custom-modal/CustomModal";
import React, { useEffect, useState } from "react";
import AddStudentNote from "../../components/AddStudentNote";
import ButtonTab from "@/src/components/buttons/button-tab/ButtonTab";
import userStore from "@/src/mobX/user_store";
interface Props {
  studentId: number;
}
const StudentNotes: React.FC<Props> = ({ studentId }) => {
  const [toDoList, setToDoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [id, setId] = useState(userStore.user.dataBaseID);
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchToDoList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `/api/students/student/to-do?StudentID=${userStore.user.dataBaseID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch To-Do list");
      }
      const data = await response.json();
      setToDoList(data);
    } catch (error) {
      setError("Failed to load To-Do list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (textInput.trim() === "") return;

    const response = await fetch(`/api/students/student/to-do`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        StudentID: id,
        TaskTitle: textInput.trim(),
        TaskDescription: "Default description",
        DueDate: new Date().toISOString(),
      }),
    });

    const newNote = await response.json();
    setToDoList((prev) => [
      ...prev,
      {
        ToDoID: newNote.toDoId,
        TaskTitle: textInput.trim(),
        TaskDescription: "Default description",
        DueDate: new Date().toISOString(),
      },
    ]);
    setTextInput("");
    setIsAddModal(false);
  };

  const handleDeleteNote = async (toDoId: number) => {
    const response = await fetch(`/api/students/student/to-do`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ToDoID: toDoId }),
    });

    setToDoList((prev) => prev.filter((item) => item.ToDoID !== toDoId));
    fetchToDoList();
  };
  const handleDatePickerChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (userStore.user.dataBaseID) {
      fetchToDoList();
    }
  }, [userStore.user.dataBaseID]);

  return (
    <div className="container mx-auto p-6 h-screen">
      <ButtonTab
        title={"Add Note"}
        className="text-2xl font-orbitron_variable text-white bg-blue-500"
        onClick={() => setIsAddModal(true)}
      />
      <CustomModal
        isModalOpen={isAddModal}
        onCloseModal={() => setIsAddModal(false)}
      >
        <AddStudentNote
          textInput={textInput}
          setTextInput={setTextInput}
          selectedDate={selectedDate}
          handleDateChange={handleDatePickerChange}
          handleAddNote={handleAddNote}
        />
      </CustomModal>
      {error && (
        <p className="text-red-500 bg-white p-1 text-center rounded-xl mx-10">
          {error}
        </p>
      )}
      {loading ? (
        <p>Loading To-Do list...</p>
      ) : (
        <ul className="space-y-4 h-[80%]" style={{ overflowY: "auto" }}>
          {toDoList.map((item) => (
            <li
              key={item.todoid}
              className="p-4 border border-gray-300 bg-white rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.TaskTitle}</h3>
                <p>{item.tasktitle}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(item.DueDate).toLocaleDateString()}
                </p>
                <p>ID: {item.todoid}</p>
              </div>
              <button
                onClick={() => handleDeleteNote(item.todoid)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentNotes;
