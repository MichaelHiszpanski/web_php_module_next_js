import React, { Dispatch, SetStateAction } from "react";
import CustomDatePicker from "../../custom-datePicker/CustomDatePicker";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
interface Props {
  textInput: string;
  description: string;
  setTextInput: Dispatch<SetStateAction<string>>;
  setDescriptiont: Dispatch<SetStateAction<string>>;
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  handleAddNote: () => void;
  errors?: {
    textInput?: string;
    description?: string;
    selectedDate?: string;
  };
}
const AddStudentNote: React.FC<Props> = ({
  textInput,
  description,
  setTextInput,
  setDescriptiont,
  selectedDate,
  handleAddNote,
  handleDateChange,
  errors,
}) => {
  const { dictionary } = useTranslation();
  return (
    <div className="bg-white w-[600px]">
      <h1
        className="text-3xl font-bold mb-6 font-orbitron_variable
              text-colorFour"
      >
        {dictionary.add_student_note[0].list_title}
      </h1>

      <div className="flex flex-col w-full gap-4 mb-3">
        <input
          type="text"
          placeholder={dictionary.add_student_note[0].title_placeholder}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2 text-colorOne"
        />
        {errors?.textInput && (
          <p className="text-red-500 text-sm ">{errors.textInput}</p>
        )}
        <textarea
          placeholder={dictionary.add_student_note[0].description_placeholder}
          value={description}
          onChange={(e) => setDescriptiont(e.target.value)}
          rows={4}
          className="flex-1 border border-gray-300 rounded-lg p-2 text-colorOne"
        />
        {errors?.description && (
          <p className="text-red-500 text-sm ">{errors.description}</p>
        )}
        <div className="p-4">
          <CustomDatePicker
            selectedDate={selectedDate}
            onChange={(date) => handleDateChange(date)}
            label={dictionary.add_student_note[0].select_date}
          />
          {errors?.selectedDate && (
            <p className="text-red-500 text-sm mt-1">{errors.selectedDate}</p>
          )}
          {selectedDate && (
            <p className="mt-4 text-colorOne">
              {dictionary.add_student_note[0].select_date}{" "}
              {selectedDate.toDateString()}
            </p>
          )}
        </div>
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          {dictionary.add_student_note[0].add_note}
        </button>
      </div>
    </div>
  );
};

export default AddStudentNote;
