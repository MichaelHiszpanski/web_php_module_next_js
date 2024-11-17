"use client";
import SidePanel from "@/src/components/dashboard/side-panel/SidePanel";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import React, { useState } from "react";

const Dashboard: NextPage = () => {
  const [isBoardOpen, setIsBoardOpen] = useState<boolean>(true);
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) {
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
    return null;
  }
  return (
    <div className="flex flex-row min-h-screen bg-red-500">
      <SidePanel isBoardOpen={isBoardOpen} setIsBoardOpen={setIsBoardOpen} />

      <div className="flex flex-col w-full items-center ">
        <div
          className={`w-full h-[100px] bg-green-500 transform transition-transform duration-400 ${
            isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
          }`}
        ></div>
        <h1 className="mt-[300px]">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
