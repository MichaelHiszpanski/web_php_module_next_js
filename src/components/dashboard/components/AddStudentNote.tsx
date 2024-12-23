import React, { Dispatch, SetStateAction } from "react";
import CustomDatePicker from "../../custom-datePicker/CustomDatePicker";
interface Props {
  textInput: string;
  description: string;
  setTextInput: Dispatch<SetStateAction<string>>;
  setDescriptiont: Dispatch<SetStateAction<string>>;
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  handleAddNote: () => void;
}
const AddStudentNote: React.FC<Props> = ({
  textInput,
  description,
  setTextInput,
  setDescriptiont,
  selectedDate,
  handleAddNote,
  handleDateChange,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Student To-Do List</h1>

      <div className="flex flex-col w-full gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your note Title"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Enter your note Description"
          value={description}
          onChange={(e) => setDescriptiont(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2"
        />
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Select a Date</h1>
          <CustomDatePicker
            selectedDate={selectedDate}
            onChange={handleDateChange}
            label="Pick a date"
          />
          {selectedDate && (
            <p className="mt-4">Selected Date: {selectedDate.toDateString()}</p>
          )}
        </div>
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default AddStudentNote;
