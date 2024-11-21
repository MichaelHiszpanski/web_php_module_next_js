"use client";
import CustomModal from "@/src/components/custom-modal/CustomModal";
import SidePanel from "@/src/components/dashboard/side-panel/SidePanel";
import Form from "@/src/components/form/Form";
import userStore from "@/src/mobX/user-store/user_store";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import React, { useState } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import {
  UserDetailsModel,
  defaultUserDetails,
} from "@/src/models/UserDetailsModel";
const Dashboard: NextPage = () => {
  const router = useRouter();
  const [isBoardOpen, setIsBoardOpen] = useState<boolean>(true);
  const [userData, setUserData] =
    useState<UserDetailsModel>(defaultUserDetails);
  const { isLoaded, isSignedIn, user } = useUser();
  const [isModal, setIsModal] = useState<boolean>(false);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/users/user?UserID=${user.id}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message === "User not found!") {
            setIsModal(true);
          }
          return;
        }
        const data = await response.json();

        setUserData(data);
        setIsModal(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isSignedIn) {
      fetchUserData();
      userStore.setUser({
        userId: user.id,
      });
    }
  }, [isSignedIn, user]);
  const handleFormSubmit = async (formData: UserDetailsModel) => {
    setUserData({ ...userData, ...formData });
    await addUserToDB(formData);
  };

  const addUserToDB = async (formData: UserDetailsModel) => {
    try {
      const role =
        formData.role == "Student" ? 1 : formData.role === "Teacher" ? 2 : 3;
      const response = await fetch("/api/users/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: userStore.user.userId,
          UserEmail: userStore.user.email,
          UserPassword: userStore.user.password,
          RoleId: role,
        }),
      });

      if (response.ok) {
        setTimeout(() => {
          addStudnetORTeacher(formData);
        }, 2000);
      } else {
        throw new Error("Error adding user to Users Table");
      }
    } catch (error) {
      console.error("Error adding user to database:", error);
    }
  };
  const addStudnetORTeacher = async (formData: UserDetailsModel) => {
    setUserData({ ...userData, ...formData });
    const setPath =
      formData.role === "Student" ? "students/student" : "teachers/teacher";
    try {
      console.log("Role:", formData);

      console.log("Form Data:", formData);
      const response = await fetch(`/api/${setPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: userStore.user.userId,
          FirstName: formData.name,
          LastName: formData.lastName,
          City: formData.city,
          Postcode: formData.postcode,
          StreetName: formData.street,
          HouseNumber: formData.houseNumber,
        }),
      });

      if (response.ok) {
        console.log("UserID being sent:", userStore.user.userId);
        router.push("/");
      } else {
        console.log("Something went wrong...!");
      }
    } catch (e) {}
  };

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
      <CustomModal
        isModalOpen={isModal}
        onCloseModal={() => setIsModal(false)}
        isCloseButtonavaiable={false}
      >
        <div className="md:w-[600px]">
          <h2 className="text-xl font-bold">Register new User</h2>
          <p className="mt-2">
            Please fill all the informations and select your Role.
          </p>
          <Form
            onSubmit={(formData) => {
              handleFormSubmit(formData);
            }}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default observer(Dashboard);
