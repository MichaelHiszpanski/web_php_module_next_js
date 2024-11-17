"use client";
import { NextPage } from "next";
import React, { useState } from "react";

const Dashboard: NextPage = () => {
  const [isBoardOpen, setIsBoardOpen] = useState<boolean>(true);
  return (
    <div className="flex flex-row min-h-screen bg-red-500">
      <div
        className={`min-h-screen  w-[250px] bg-green-500 transform transition-transform duration-300 ${
          isBoardOpen ? "translate-x-0" : "-translate-x-[80%]"
        }`}
      >
        <div className="flex flex-row justify-between">
          DashBoard
          <button type="button" onClick={() => setIsBoardOpen(!isBoardOpen)}>
            Close X
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full items-center ">
        <h1 className="mt-[300px]">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
