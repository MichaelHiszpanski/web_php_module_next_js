import React from "react";

const StudentNotes: React.FC = () => {
  return (
    <div className="w-[80vw] h-[80vh] mx-auto border-2 border-black flex flex-col items-center justify-center bg-gray-100">
      <span>Notes</span>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/9gWIIIr2Asw?si=zi1585jvwQ3dj3_a"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      {/* <iframe
        width="100%"
        height="100%"
        src="https://www.google.com"
        frameBorder="0"
        allowFullScreen
      ></iframe> */}
    </div>
  );
};

export default StudentNotes;
