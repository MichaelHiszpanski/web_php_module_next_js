import React from "react";

const LoaderComponent: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center ">
      <div className="w-full text-center text-5xl font-bold font-permanentMarker mt-[200px]">
        Loading...
      </div>
    </div>
  );
};

export default LoaderComponent;
