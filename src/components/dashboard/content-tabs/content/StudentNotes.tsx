import CustomModal from "@/src/components/custom-modal/CustomModal";
import React, { useEffect, useState } from "react";
import AddStudentNote from "../../components/AddStudentNote";
import ButtonTab from "@/src/components/buttons/button-tab/ButtonTab";
import userStore from "@/src/mobX/user_store";
import {
  responseAddNote,
  responseDeleteNote,
  useStudentNotes,
} from "@/src/routes/studentNotesRoute";
import { useQueryClient } from "@tanstack/react-query";
import StudentNote from "../../components/StudentNote";

const StudentNotes: React.FC = () => {
  const [textInput, setTextInput] = useState("");
  const [description, setDescription] = useState("");
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

    await responseAddNote(id, textInput, description, selectedDate!);
    queryClient.invalidateQueries({ queryKey: ["studentNotes", id] });
    setTextInput("");
    setIsAddModal(false);
    setSelectedDate(null);
    setDescription("");
  };

  const handleDeleteNote = async (toDoId: number) => {
    await responseDeleteNote(toDoId);
    queryClient.invalidateQueries({ queryKey: ["studentNotes", id] });
  };

  const handleDatePickerChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (userStore.user.dataBaseID) {
      queryClient.invalidateQueries({ queryKey: ["studentNotes", id] });
    }
  }, [userStore.user.dataBaseID]);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6 h-screen md:px-[150px]">
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
          description={description}
          setDescriptiont={setDescription}
        />
      </CustomModal>

      <ul className="space-y-4 h-[80%]" style={{ overflowY: "auto" }}>
        {toDoList.map((item: any) => (
          <StudentNote
            key={item.todoid}
            item={item}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentNotes;
