import React, { useEffect, useState } from "react";
interface Props {
  studentId: number;
}
const StudentNotes: React.FC<Props> = ({ studentId }) => {
  const [toDoList, setToDoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState("");
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

  useEffect(() => {
    fetchToDoList();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Student To-Do List</h1>

      <div className="flex w-full gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your note"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      {loading ? (
        <p>Loading To-Do list...</p>
      ) : (
        <ul className="space-y-4">
          {toDoList.map((item) => (
            <li
              key={item.ToDoID}
              className="p-4 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center"
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
