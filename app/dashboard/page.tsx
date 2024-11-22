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
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";
import {
  RolesResponseModel,
  defaulrRolesResponseModel,
} from "@/src/models/RolesResponseModel";
import {
  UserDetailsModel,
  defaultUserDetails,
} from "@/src/models/UserDetailsModel";
import { getRoles, getUser, postUser } from "@/src/services/userRoutes";
const Dashboard: NextPage = () => {
  const router = useRouter();
  const [isBoardOpen, setIsBoardOpen] = useState<boolean>(true);
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(defaultUserDetails);
  const [roles, setRoles] = useState<RolesResponseModel>(
    defaulrRolesResponseModel
  );
  const { isLoaded, isSignedIn, user } = useUser();
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const response = await getUser(user.id);

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message === "User not found!") {
            setIsModal(true);
          }
          return;
        }
        const data = await response.json();

        setUserData({ ...data });

        setIsModal(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isSignedIn) {
      getRoleNames();
      fetchUserData();
      userStore.setUser({
        userId: user.id,
      });
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    setIsStudent(userData.roleid === 1 ? true : false);
  }, [userData]);

  const handleFormSubmit = async (formData: PersonalDetailModel) => {
    setUserData({ ...userData, ...formData });
    await addUserToDB(formData);
  };

  const addUserToDB = async (formData: PersonalDetailModel) => {
    try {
      const role =
        formData.userId == "Student"
          ? 1
          : formData.userId === "Teacher"
          ? 2
          : 3;

      const data: UserDetailsModel = {
        userid: userStore.user.userId,
        userEmail: userStore.user.email,
        userPassword: userStore.user.password,
        roleId: role,
      };
      const response = await postUser(data);

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

  const addStudnetORTeacher = async (formData: PersonalDetailModel) => {
    setUserData({ ...userData, ...formData });
    const setPath =
      formData.userId === "Student" ? "students/student" : "teachers/teacher";
    const studentBody = {
      UserID: userStore.user.userId,
      FirstName: formData.name,
      LastName: formData.lastName,
      City: formData.city,
      Postcode: formData.postcode,
      StreetName: formData.street,
      HouseNumber: formData.houseNumber,
    };
    const teacherBody = {
      UserID: userStore.user.userId,
      FirstName: formData.name,
      LastName: formData.lastName,
      City: formData.city,
      Postcode: formData.postcode,
      StreetName: formData.street,
      HouseNumber: formData.houseNumber,
      Department: "Random",
      Title: formData.type,
    };
    const body = formData.userId === "Student" ? studentBody : teacherBody;
    try {
      const response = await fetch(`/api/${setPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.log("Something went wrong...!");
      }
    } catch (e) {}
  };

  const getRoleNames = async () => {
    try {
      const response = await getRoles();
      if (response.ok) {
        const rolesData = await response.json();

        setRoles(rolesData);
      }
    } catch (error) {}
  };

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
    return null;
  }

  return (
    <div
      className={`flex flex-row min-h-screen  ${
        isStudent ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      <SidePanel isBoardOpen={isBoardOpen} setIsBoardOpen={setIsBoardOpen} />

      <div className="flex flex-col w-full items-center ">
        <div
          className={`w-full h-[100px] transform transition-transform duration-400 ${
            isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
          } ${isStudent ? "bg-yellow-500" : "bg-green-500"}`}
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
