import { auth } from "@clerk/nextjs/server";
import { NextPage } from "next";
import React from "react";

const Dashboard: NextPage = async () => {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="mt-[300px]">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
