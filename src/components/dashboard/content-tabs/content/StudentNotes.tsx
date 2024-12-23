import CustomDatePicker from "@/src/components/custom-datePicker/CustomDatePicker";
import CustomModal from "@/src/components/custom-modal/CustomModal";
import React, { useEffect, useState } from "react";
import AddStudentNote from "../../components/AddStudentNote";
import ButtonTab from "@/src/components/buttons/button-tab/ButtonTab";
interface Props {
  studentId: number;
}
const StudentNotes: React.FC<Props> = ({ studentId }) => {
  const [toDoList, setToDoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  //??????????????????????????????????????  fix file
  const fetchToDoList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/students/student/to-do?StudentID=${studentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch To-Do list");
      }
      const data = await response.json();
      setToDoList(data);
    } catch (error) {
      console.error("Error fetching To-Do list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (textInput.trim() === "") return;
    try {
      const response = await fetch(`/api/students/student/to-do`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          StudentID: studentId,
          TaskTitle: textInput.trim(),
          TaskDescription: "Default description",
          DueDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

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
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (toDoId: number) => {
    try {
      const response = await fetch(`/api/students/student/to-do`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ToDoID: toDoId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setToDoList((prev) => prev.filter((item) => item.ToDoID !== toDoId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  useEffect(() => {
    fetchToDoList();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <ButtonTab title={"Add Note"} onClick={() => setIsAddModal(true)} />
      <CustomModal
        isModalOpen={isAddModal}
        onCloseModal={() => setIsAddModal(false)}
      >
        <AddStudentNote
          textInput={textInput}
          setTextInput={setTextInput}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          handleAddNote={handleAddNote}
        />
      </CustomModal>

      {loading ? (
        <p>Loading To-Do list...</p>
      ) : (
        <ul className="space-y-4">
          {toDoList.map((item) => (
            <li
              key={item.ToDoID}
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
