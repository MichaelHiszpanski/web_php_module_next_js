"use client";
import CustomModal from "@/src/components/custom-modal/CustomModal";
import SidePanel from "@/src/components/dashboard/side-panel/SidePanel";
import PersonalDetailsForm from "@/src/components/forms/PersonalDetailsForm";
import userStore from "@/src/mobX/user-store/user_store";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import React, { useState } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";

import {
  UserDetailsModel,
  defaultUserDetails,
} from "@/src/models/UserDetailsModel";
import { getUser, postUser } from "@/src/services/routes/userRoutes";
import {
  addStudnetORTeacher,
  usePostStudentOrTeacher,
} from "@/src/services/api-calls/dashboard_api";
import NewGroupForm from "@/src/components/forms/NewGroupForm";
import { NewGroupModel } from "@/src/models/NewGroupModel";
import {
  getGroups,
  postNewGroup,
  usePostNewGroup,
} from "@/src/services/routes/groupRoutes";
import {
  getTeacherID,
  useGetTeacherId,
} from "@/src/services/api-calls/checkStudentId";
import TopPanel from "@/src/components/dashboard/top-panel/TopPanel";
import ContentTabs from "@/src/components/dashboard/content-tabs/ContentTabs";
import Footer from "@/src/components/footer/Footer";
const Dashboard: NextPage = () => {
  const router = useRouter();
  const [isBoardOpen, setIsBoardOpen] = useState<boolean>(true);
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(defaultUserDetails);

  const { isLoaded, isSignedIn, user } = useUser();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<PersonalDetailModel | null>(null);
  //const { data, isLoading, error } = usePostStudentOrTeacher(formData);
  const [groupForm, setGroupForm] = useState<NewGroupModel | null>(null);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const response = await getUser(user.id);
        userStore.setUser({
          userId: user.id,
        });
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
      fetchUserData();
      userStore.setUser({
        userId: user.id,
      });
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    setIsStudent(userData.roleid === 1 ? true : false);
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData.roleid === 2) {
        await fetchTeacherID();
      }
    };
    fetchData();
  }, [userData.roleid]);

  const fetchTeacherID = async () => {
    try {
      const teacherResponse = await getTeacherID(userData.userid);
      console.log("Teacher ID response:", teacherResponse);

      const teacherId = teacherResponse?.TeacherID;

      if (teacherId) {
        setGroupForm((prev: NewGroupModel | null) => ({
          ...prev,
          teacherID: teacherId,
          groupName: prev?.groupName ?? "",
          groupDescription: prev?.groupDescription ?? "",
        }));
        console.log("Teacher ID set in state:", teacherId);
      } else {
        console.error("No Teacher ID found in response!");
      }
    } catch (error) {
      console.error("Error fetching Teacher ID:", error);
    }
  };

  const addUserToDB = async (formData: PersonalDetailModel) => {
    try {
      const role =
        formData.role == "Student" ? 1 : formData.role === "Teacher" ? 2 : 3;

      const data: UserDetailsModel = {
        userid: userStore.user.userId,
        userEmail: userStore.user.email,
        userPassword: userStore.user.password,
        roleId: role,
      };
      const response = await postUser(data);

      if (response.ok) {
        setTimeout(async () => {
          // usePostStudentOrTeacher(formData);
          await addStudnetORTeacher(formData);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding user to database:", error);
    }
  };

  const openSecondModal = async () => {
    setIsSecondModalOpen(true);
  };

  const handleFormSubmit = async (formData: PersonalDetailModel) => {
    setFormData(formData);
    setUserData({ ...userData, ...formData });
    await addUserToDB(formData);
  };

  const handleSubmit = async (groupForm: NewGroupModel) => {
    console.log("Group Form:", groupForm);
    if (!groupForm?.teacherID) {
      console.error("Teacher ID is missing!");
      return;
    }
    const response = await postNewGroup(groupForm);
    if (response.message === "success") {
      setIsSecondModalOpen(false);
    }
  };

  const handleTabChange = (index: number) => {
    console.log("Index", index);
    setActiveTab(index);
  };

  if (!isLoaded)
    return (
      <div className="flex flex-col w-screen h-full items-center ">
        <div className="w-full text-center text-5xl font-bold font-permanentMarker mt-[200px]">
          Loading...
        </div>
      </div>
    );

  if (!isSignedIn) {
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
    return null;
  }

  return (
    <div
      className={`flex flex-row h-full  ${
        isStudent ? "bg-red-500" : "bg-white"
      }`}
    >
      <SidePanel
        isBoardOpen={isBoardOpen}
        setIsBoardOpen={setIsBoardOpen}
        openSecondModal={openSecondModal}
        isStudent={isStudent}
        teacherID={groupForm?.teacherID}
      />

      <div className="flex flex-col w-full items-center ">
        <TopPanel
          isBoardOpen={isBoardOpen}
          isStudent={isStudent}
          onChnageTab={handleTabChange}
        />

        <ContentTabs
          isBoardOpen={isBoardOpen}
          isStudent={isStudent}
          currentActiveTab={activeTab}
        />
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
          <PersonalDetailsForm
            onSubmit={(formData) => {
              handleFormSubmit(formData);
            }}
          />
        </div>
      </CustomModal>
      <CustomModal
        isModalOpen={isSecondModalOpen}
        onCloseModal={() => setIsSecondModalOpen(false)}
        isCloseButtonavaiable={true}
      >
        <div className="md:w-[600px]">
          <h2 className="text-xl font-bold">Create new group</h2>
          <p className="mt-2">
            This is the second modal attached to the Dashboard component.
          </p>
          <NewGroupForm
            onSubmit={(groupForm) => handleSubmit(groupForm)}
            groupForm={groupForm}
          />
        </div>
      </CustomModal>
      <Footer backgroudnColor="bg-colorSix " fontColor="text-colorOne" />
    </div>
  );
};

export default observer(Dashboard);
