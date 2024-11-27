import React from "react";

const StudentsContentTab: React.FC = () => {
  return (
    <div className="w-full flex flex-col min-h-[700px] bg-white items-center">
      <h1 className="text-xl font-bold mb-4">Students</h1>
      <div
        className="w-[90%] h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-gray-400 flex flex-col-reverse items-start 
                 gap-2 p-4 overflow-y-auto"
        aria-label="Students List"
        style={{ overflowY: "auto" }}
      >
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((item) => (
          <div
            key={item}
            className="w-full bg-white p-2 rounded-md shadow-sm border border-gray-200"
          >
            Student {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsContentTab;
