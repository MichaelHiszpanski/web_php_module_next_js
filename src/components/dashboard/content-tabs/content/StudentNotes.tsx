import CustomDatePicker from "@/src/components/custom-datePicker/CustomDatePicker";
import CustomModal from "@/src/components/custom-modal/CustomModal";
import React, { useEffect, useState } from "react";
import AddStudentNote from "../../components/AddStudentNote";
import ButtonTab from "@/src/components/buttons/button-tab/ButtonTab";
import userStore from "@/src/mobX/user_store";
import { useStudentNotes } from "@/src/routes/studentNotesRoute";
import { useQueryClient } from "@tanstack/react-query";

interface Props {}
const StudentNotes: React.FC<Props> = () => {
  const [textInput, setTextInput] = useState("");
  const queryClient = useQueryClient();
  const [id, setId] = useState(userStore.user.dataBaseID);
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {
    data: toDoList = [],
    isLoading,
    isFetching,
    error,
  } = useStudentNotes(id);

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
    queryClient.invalidateQueries({ queryKey: ["studentNotes", id] });
    setTextInput("");
    setIsAddModal(false);
  };

  const handleDeleteNote = async (toDoId: number) => {
    const response = await fetch(`/api/students/student/to-do`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ToDoID: toDoId }),
    });

    queryClient.invalidateQueries({ queryKey: ["studentNotes", id] });
  };
  const handleDatePickerChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    console.log("Fetched student notes:", toDoList);
    if (userStore.user.dataBaseID) {
      queryClient.invalidateQueries({ queryKey: ["studentNotes", id] });
    }
  }, [userStore.user.dataBaseID]);
  if (isLoading || isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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

      {
        <ul className="space-y-4 h-[80%]" style={{ overflowY: "auto" }}>
          {/* {toDoList.map((item) => ( */}
          {toDoList.map((item: any) => (
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
      }
    </div>
  );
};

export default StudentNotes;
