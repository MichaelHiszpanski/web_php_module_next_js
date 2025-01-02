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
import { observer } from "mobx-react-lite";
import { useTranslation } from "@/src/utils/hooks/useTranslation";

const StudentNotes: React.FC = () => {
  const [textInput, setTextInput] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const { dictionary } = useTranslation();
  const [id, setId] = useState(-99);
  const [erros, setErrors] = useState({
    textInput: "",
    description: "",
    selectedDate: "",
  });
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {
    data: toDoList = [],
    isLoading,
    isFetching,
    error,
  } = useStudentNotes(userStore.user.dataBaseID);

  useEffect(() => {
    setId(userStore.user.dataBaseID);
  }, [userStore.user.dataBaseID]);

  const handleAddNote = async () => {
    const newErrors = {
      textInput: "",
      description: "",
      selectedDate: "",
    };

    if (textInput.trim() === "") {
      newErrors.textInput = dictionary.student_notes[0].error_title;
    }

    if (description.trim() === "") {
      newErrors.description = dictionary.student_notes[0].error_description;
    }

    if (!selectedDate) {
      newErrors.selectedDate = dictionary.student_notes[0].error_selected_date;
    }
    if (
      newErrors.textInput.trim() !== "" ||
      newErrors.description.trim() !== "" ||
      newErrors.selectedDate.trim() !== ""
    ) {
      setErrors(newErrors);
      return;
    }

    setErrors({
      textInput: "",
      description: "",
      selectedDate: "",
    });
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

  if (isLoading || isFetching)
    return (
      <div className="text-white text-2xl w-full mt-10 text-center">
        {dictionary.student_notes[0].loading_notes}
      </div>
    );

  if (error)
    return (
      <div>
        {dictionary.student_notes[0].error_notes} {error.message}
      </div>
    );

  return (
    <div className="container mx-auto p-6 h-screen md:px-[150px]">
      <ButtonTab
        title={dictionary.student_notes[0].add_note}
        className="text-2xl font-orbitron_variable text-white bg-blue-500"
        onClick={() => setIsAddModal(true)}
      />
      <CustomModal
        isModalOpen={isAddModal}
        onCloseModal={() => {
          setIsAddModal(false);
          setErrors({
            textInput: "",
            description: "",
            selectedDate: "",
          });
          setTextInput("");
          setSelectedDate(null);
          setDescription("");
        }}
      >
        <AddStudentNote
          textInput={textInput}
          setTextInput={setTextInput}
          selectedDate={selectedDate}
          handleDateChange={handleDatePickerChange}
          handleAddNote={handleAddNote}
          description={description}
          setDescriptiont={setDescription}
          errors={erros}
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

export default observer(StudentNotes);
