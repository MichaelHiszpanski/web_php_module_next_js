import { dateTimeFormater } from "@/src/utils/tools/date_formater";
import React from "react";

interface Props {
  item: any;
  handleDeleteNote: (id: number) => void;
}

const StudentNote: React.FC<Props> = ({ item, handleDeleteNote }) => {
  return (
    <li
      key={item.todoid}
      className="p-4 border border-gray-300 bg-white rounded-lg shadow-sm flex justify-between items-center"
    >
      <div>
        <h3 className="text-lg font-semibold">{item.tasktitle}</h3>
        <p>{item.taskdescription}</p>
        <p className="text-sm text-gray-500">
          Due: {dateTimeFormater(item.todoid)}
        </p>
      </div>
      <button
        onClick={() => handleDeleteNote(item.todoid)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </li>
  );
};

export default StudentNote;
